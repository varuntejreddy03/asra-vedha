import { Router } from 'express';
import { z } from 'zod';
import { serializeProduct } from '../catalog';
import { HttpError, asyncHandler, validateBody } from '../http';
import { prisma } from '../prisma';

const router = Router();

const productInclude = {
  images: { orderBy: { sortOrder: 'asc' as const } },
  weights: { orderBy: { price: 'asc' as const } }
};

const profileSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional()
});

const addressSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(6),
  line1: z.string().min(3),
  line2: z.string().optional().default(''),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().min(4),
  country: z.string().min(2).default('India'),
  isDefault: z.boolean().default(false)
});

function serializeOrder(order: any) {
  return {
    ...order,
    subtotal: Number(order.subtotal),
    discount: Number(order.discount),
    shippingFee: Number(order.shippingFee),
    total: Number(order.total),
    items: order.items.map((item: any) => ({
      ...item,
      price: Number(item.price)
    }))
  };
}

async function resolveProduct(productIdOrSlug: string) {
  const product = await prisma.product.findFirst({
    where: {
      OR: [{ id: productIdOrSlug }, { slug: productIdOrSlug }]
    }
  });

  if (!product) {
    throw new HttpError(404, 'Product not found.');
  }

  return product;
}

router.get(
  '/users/me',
  asyncHandler(async (req, res) => {
    const user = req.authUser!;
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
        role: user.role
      }
    });
  })
);

router.patch(
  '/users/me',
  asyncHandler(async (req, res) => {
    const body = validateBody(profileSchema, req.body);
    const user = await prisma.user.update({
      where: { id: req.authUser!.id },
      data: body
    });

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        phone: user.phone,
        role: user.role
      }
    });
  })
);

router.get(
  '/users/me/orders',
  asyncHandler(async (req, res) => {
    const orders = await prisma.order.findMany({
      where: { userId: req.authUser!.id },
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ items: orders.map(serializeOrder) });
  })
);

router.get(
  '/users/me/addresses',
  asyncHandler(async (req, res) => {
    const addresses = await prisma.address.findMany({
      where: { userId: req.authUser!.id },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }]
    });

    res.json({ items: addresses });
  })
);

router.post(
  '/users/me/addresses',
  asyncHandler(async (req, res) => {
    const body = validateBody(addressSchema, req.body);
    const userId = req.authUser!.id;

    if (body.isDefault) {
      await prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false }
      });
    }

    const address = await prisma.address.create({
      data: {
        ...body,
        userId
      }
    });

    res.status(201).json({ address });
  })
);

router.put(
  '/users/me/addresses/:id',
  asyncHandler(async (req, res) => {
    const body = validateBody(addressSchema, req.body);
    const userId = req.authUser!.id;

    const existing = await prisma.address.findFirst({
      where: { id: req.params.id, userId }
    });
    if (!existing) {
      throw new HttpError(404, 'Address not found.');
    }

    if (body.isDefault) {
      await prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false }
      });
    }

    const address = await prisma.address.update({
      where: { id: req.params.id },
      data: body
    });

    res.json({ address });
  })
);

router.delete(
  '/users/me/addresses/:id',
  asyncHandler(async (req, res) => {
    const address = await prisma.address.findFirst({
      where: { id: req.params.id, userId: req.authUser!.id }
    });
    if (!address) {
      throw new HttpError(404, 'Address not found.');
    }

    await prisma.address.delete({ where: { id: req.params.id } });
    res.json({ ok: true });
  })
);

router.get(
  '/users/me/wishlist',
  asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { id: req.authUser!.id },
      include: { wishlist: { include: productInclude } }
    });

    res.json({ items: (user?.wishlist || []).map(serializeProduct) });
  })
);

router.post(
  '/users/me/wishlist/:productId',
  asyncHandler(async (req, res) => {
    const product = await resolveProduct(req.params.productId);
    const user = await prisma.user.update({
      where: { id: req.authUser!.id },
      data: {
        wishlist: {
          connect: { id: product.id }
        }
      },
      include: { wishlist: { include: productInclude } }
    });

    res.status(201).json({ items: user.wishlist.map(serializeProduct) });
  })
);

router.delete(
  '/users/me/wishlist/:productId',
  asyncHandler(async (req, res) => {
    const product = await resolveProduct(req.params.productId);
    const user = await prisma.user.update({
      where: { id: req.authUser!.id },
      data: {
        wishlist: {
          disconnect: { id: product.id }
        }
      },
      include: { wishlist: { include: productInclude } }
    });

    res.json({ items: user.wishlist.map(serializeProduct) });
  })
);

export default router;
