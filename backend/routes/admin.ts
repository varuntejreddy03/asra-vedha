import { Router } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CouponDiscountType, EnquiryStatus, OrderStatus, PaymentStatus } from '@prisma/client';
import { z } from 'zod';
import { categoryFromParam, serializeProduct, toSlug } from '../catalog';
import { env } from '../config';
import { HttpError, asyncHandler, validateBody } from '../http';
import { prisma } from '../prisma';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

const productInclude = {
  images: { orderBy: { sortOrder: 'asc' as const } },
  weights: { orderBy: { price: 'asc' as const } }
};

const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().optional(),
  category: z.string().min(2),
  description: z.string().min(5),
  benefitTagline: z.string().min(2),
  price: z.coerce.number().nonnegative(),
  comparePrice: z.coerce.number().nonnegative().optional().nullable(),
  stock: z.coerce.number().int().nonnegative().default(0),
  image: z.string().optional().default(''),
  benefits: z.any().default([]),
  ingredients: z.string().min(2),
  howToUse: z.string().optional().default(''),
  qualityBadges: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  isOrganic: z.boolean().default(true),
  isPublished: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  metaTitle: z.string().optional().default(''),
  metaDescription: z.string().optional().default(''),
  images: z
    .array(
      z.object({
        url: z.string().min(1),
        alt: z.string().optional().default(''),
        sortOrder: z.coerce.number().int().default(0)
      })
    )
    .default([]),
  weights: z
    .array(
      z.object({
        label: z.string().min(1),
        price: z.coerce.number().nonnegative(),
        stock: z.coerce.number().int().nonnegative().default(0)
      })
    )
    .default([])
});

const bannerSchema = z.object({
  title: z.string().min(2),
  subtitle: z.string().optional().default(''),
  image: z.string().optional().default(''),
  buttonText: z.string().optional().default(''),
  buttonLink: z.string().optional().default(''),
  position: z.string().default('home'),
  displayOrder: z.coerce.number().int().default(0),
  isActive: z.boolean().default(true)
});

const couponSchema = z.object({
  code: z.string().min(2),
  discountType: z.nativeEnum(CouponDiscountType),
  value: z.coerce.number().positive(),
  minOrderValue: z.coerce.number().nonnegative().default(0),
  maxDiscountCap: z.coerce.number().nonnegative().optional().nullable(),
  totalUsageLimit: z.coerce.number().int().positive().optional().nullable(),
  perUserLimit: z.coerce.number().int().positive().optional().nullable(),
  expiresAt: z.string().datetime().optional().nullable(),
  isActive: z.boolean().default(true)
});

const blogSchema = z.object({
  title: z.string().min(2),
  slug: z.string().optional(),
  category: z.string().min(2),
  coverImage: z.string().optional().default(''),
  excerpt: z.string().min(5),
  content: z.string().min(5),
  author: z.string().default('ASRA VEDHA Team'),
  tags: z.array(z.string()).default([]),
  metaTitle: z.string().optional().default(''),
  metaDescription: z.string().optional().default(''),
  isPublished: z.boolean().default(false),
  publishedAt: z.string().datetime().optional().nullable()
});

const orderPatchSchema = z.object({
  orderStatus: z.nativeEnum(OrderStatus).optional(),
  paymentStatus: z.nativeEnum(PaymentStatus).optional(),
  trackingNumber: z.string().optional().nullable()
});

function serializeOrder(order: any) {
  return {
    ...order,
    subtotal: Number(order.subtotal),
    discount: Number(order.discount),
    shippingFee: Number(order.shippingFee),
    total: Number(order.total),
    items: order.items?.map((item: any) => ({
      ...item,
      price: Number(item.price)
    }))
  };
}

function couponData(body: z.infer<typeof couponSchema>) {
  return {
    ...body,
    code: body.code.trim().toUpperCase(),
    expiresAt: body.expiresAt ? new Date(body.expiresAt) : null
  };
}

async function findProductId(idOrSlug: string) {
  const product = await prisma.product.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] }
  });
  if (!product) {
    throw new HttpError(404, 'Product not found.');
  }
  return product.id;
}

function productData(body: z.infer<typeof productSchema>, slug: string) {
  const category = categoryFromParam[body.category];
  if (!category) {
    throw new HttpError(400, 'Invalid product category.');
  }

  return {
    slug,
    name: body.name,
    category,
    description: body.description,
    benefitTagline: body.benefitTagline,
    price: body.price,
    comparePrice: body.comparePrice ?? null,
    stock: body.stock,
    image: body.image,
    benefits: body.benefits,
    ingredients: body.ingredients,
    howToUse: body.howToUse,
    qualityBadges: body.qualityBadges,
    tags: body.tags,
    isOrganic: body.isOrganic,
    isPublished: body.isPublished,
    isFeatured: body.isFeatured,
    metaTitle: body.metaTitle,
    metaDescription: body.metaDescription
  };
}

router.get(
  '/summary',
  asyncHandler(async (_req, res) => {
    const [products, orders, customers, contactEnquiries, distributorEnquiries, coupons, blogPosts] =
      await prisma.$transaction([
        prisma.product.count(),
        prisma.order.count(),
        prisma.user.count(),
        prisma.contactEnquiry.count({ where: { status: EnquiryStatus.unread } }),
        prisma.distributorEnquiry.count({ where: { status: EnquiryStatus.unread } }),
        prisma.coupon.count(),
        prisma.blogPost.count()
      ]);

    res.json({
      products,
      orders,
      customers,
      unreadEnquiries: contactEnquiries + distributorEnquiries,
      coupons,
      blogPosts
    });
  })
);

router.get(
  '/products',
  asyncHandler(async (_req, res) => {
    const items = await prisma.product.findMany({
      include: productInclude,
      orderBy: { createdAt: 'desc' }
    });
    res.json({ items: items.map(serializeProduct) });
  })
);

router.post(
  '/products',
  asyncHandler(async (req, res) => {
    const body = validateBody(productSchema, req.body);
    const slug = toSlug(body.slug || body.name);
    const product = await prisma.product.create({
      data: {
        ...productData(body, slug),
        images: { create: body.images.length ? body.images : body.image ? [{ url: body.image, alt: body.name }] : [] },
        weights: { create: body.weights }
      },
      include: productInclude
    });

    res.status(201).json({ product: serializeProduct(product) });
  })
);

router.put(
  '/products/:id',
  asyncHandler(async (req, res) => {
    const body = validateBody(productSchema, req.body);
    const productId = await findProductId(req.params.id);
    const product = await prisma.$transaction(async (tx) => {
      await tx.productImage.deleteMany({ where: { productId } });
      await tx.productWeight.deleteMany({ where: { productId } });
      return tx.product.update({
        where: { id: productId },
        data: {
          ...productData(body, toSlug(body.slug || body.name)),
          images: { create: body.images.length ? body.images : body.image ? [{ url: body.image, alt: body.name }] : [] },
          weights: { create: body.weights }
        },
        include: productInclude
      });
    });

    res.json({ product: serializeProduct(product) });
  })
);

router.patch(
  '/products/:id',
  asyncHandler(async (req, res) => {
    const productId = await findProductId(req.params.id);
    const product = await prisma.product.update({
      where: { id: productId },
      data: req.body,
      include: productInclude
    });

    res.json({ product: serializeProduct(product) });
  })
);

router.delete(
  '/products/:id',
  asyncHandler(async (req, res) => {
    const productId = await findProductId(req.params.id);
    await prisma.product.delete({ where: { id: productId } });
    res.json({ ok: true });
  })
);

router.get(
  '/orders',
  asyncHandler(async (_req, res) => {
    const orders = await prisma.order.findMany({
      include: { user: true, items: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ items: orders.map(serializeOrder) });
  })
);

router.get(
  '/orders/:id',
  asyncHandler(async (req, res) => {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { user: true, items: true }
    });
    if (!order) {
      throw new HttpError(404, 'Order not found.');
    }
    res.json({ order: serializeOrder(order) });
  })
);

router.patch(
  '/orders/:id',
  asyncHandler(async (req, res) => {
    const body = validateBody(orderPatchSchema, req.body);
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: body,
      include: { user: true, items: true }
    });
    res.json({ order: serializeOrder(order) });
  })
);

router.get(
  '/enquiries',
  asyncHandler(async (_req, res) => {
    const [contact, distributor] = await prisma.$transaction([
      prisma.contactEnquiry.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.distributorEnquiry.findMany({ orderBy: { createdAt: 'desc' } })
    ]);

    res.json({ contact, distributor });
  })
);

router.patch(
  '/enquiries/contact/:id',
  asyncHandler(async (req, res) => {
    const enquiry = await prisma.contactEnquiry.update({
      where: { id: req.params.id },
      data: { status: EnquiryStatus.read }
    });
    res.json({ enquiry });
  })
);

router.patch(
  '/enquiries/distributor/:id',
  asyncHandler(async (req, res) => {
    const enquiry = await prisma.distributorEnquiry.update({
      where: { id: req.params.id },
      data: { status: EnquiryStatus.read }
    });
    res.json({ enquiry });
  })
);

router.get(
  '/customers',
  asyncHandler(async (_req, res) => {
    const items = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { orders: true, addresses: true, wishlist: true }
        }
      }
    });

    res.json({
      items: items.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        createdAt: user.createdAt,
        counts: user._count
      }))
    });
  })
);

router.get(
  '/banners',
  asyncHandler(async (_req, res) => {
    const items = await prisma.banner.findMany({ orderBy: [{ position: 'asc' }, { displayOrder: 'asc' }] });
    res.json({ items });
  })
);

router.post(
  '/banners',
  asyncHandler(async (req, res) => {
    const body = validateBody(bannerSchema, req.body);
    const banner = await prisma.banner.create({ data: body });
    res.status(201).json({ banner });
  })
);

router.put(
  '/banners/:id',
  asyncHandler(async (req, res) => {
    const body = validateBody(bannerSchema, req.body);
    const banner = await prisma.banner.update({ where: { id: req.params.id }, data: body });
    res.json({ banner });
  })
);

router.delete(
  '/banners/:id',
  asyncHandler(async (req, res) => {
    await prisma.banner.delete({ where: { id: req.params.id } });
    res.json({ ok: true });
  })
);

router.get(
  '/coupons',
  asyncHandler(async (_req, res) => {
    const items = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ items: items.map((coupon) => ({ ...coupon, value: Number(coupon.value), minOrderValue: Number(coupon.minOrderValue), maxDiscountCap: coupon.maxDiscountCap ? Number(coupon.maxDiscountCap) : null })) });
  })
);

router.post(
  '/coupons',
  asyncHandler(async (req, res) => {
    const body = validateBody(couponSchema, req.body);
    const coupon = await prisma.coupon.create({ data: couponData(body) });
    res.status(201).json({ coupon });
  })
);

router.put(
  '/coupons/:id',
  asyncHandler(async (req, res) => {
    const body = validateBody(couponSchema, req.body);
    const coupon = await prisma.coupon.update({ where: { id: req.params.id }, data: couponData(body) });
    res.json({ coupon });
  })
);

router.delete(
  '/coupons/:id',
  asyncHandler(async (req, res) => {
    await prisma.coupon.delete({ where: { id: req.params.id } });
    res.json({ ok: true });
  })
);

router.get(
  '/blog',
  asyncHandler(async (_req, res) => {
    const items = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ items });
  })
);

router.post(
  '/blog',
  asyncHandler(async (req, res) => {
    const body = validateBody(blogSchema, req.body);
    const post = await prisma.blogPost.create({
      data: {
        ...body,
        slug: toSlug(body.slug || body.title),
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : body.isPublished ? new Date() : null
      }
    });
    res.status(201).json({ post });
  })
);

router.put(
  '/blog/:id',
  asyncHandler(async (req, res) => {
    const body = validateBody(blogSchema, req.body);
    const post = await prisma.blogPost.update({
      where: { id: req.params.id },
      data: {
        ...body,
        slug: toSlug(body.slug || body.title),
        publishedAt: body.publishedAt ? new Date(body.publishedAt) : body.isPublished ? new Date() : null
      }
    });
    res.json({ post });
  })
);

router.delete(
  '/blog/:id',
  asyncHandler(async (req, res) => {
    await prisma.blogPost.delete({ where: { id: req.params.id } });
    res.json({ ok: true });
  })
);

router.post(
  '/upload',
  upload.single('file'),
  asyncHandler(async (req, res) => {
    if (!env.cloudinaryCloudName || !env.cloudinaryApiKey || !env.cloudinaryApiSecret) {
      throw new HttpError(501, 'Cloudinary is not configured.');
    }

    if (!req.file) {
      throw new HttpError(400, 'No upload file received.');
    }

    cloudinary.config({
      cloud_name: env.cloudinaryCloudName,
      api_key: env.cloudinaryApiKey,
      api_secret: env.cloudinaryApiSecret
    });

    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'asra-vedha' },
        (error, uploadResult) => {
          if (error || !uploadResult) {
            reject(error || new Error('Upload failed.'));
            return;
          }
          resolve(uploadResult);
        }
      );
      stream.end(req.file!.buffer);
    });

    res.status(201).json({
      url: result.secure_url,
      publicId: result.public_id
    });
  })
);

export default router;
