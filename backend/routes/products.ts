import { Router } from 'express';
import type { Prisma } from '@prisma/client';
import { categoryFromParam, serializeProduct } from '../catalog';
import { HttpError, asyncHandler } from '../http';
import { prisma } from '../prisma';

const router = Router();

const productInclude = {
  images: { orderBy: { sortOrder: 'asc' } },
  weights: { orderBy: { price: 'asc' } }
} satisfies Prisma.ProductInclude;

router.get(
  '/products',
  asyncHandler(async (req, res) => {
    const page = Math.max(Number(req.query.page || 1), 1);
    const limit = Math.min(Math.max(Number(req.query.limit || 12), 1), 60);
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';
    const category = typeof req.query.category === 'string' ? req.query.category : '';

    const where: Prisma.ProductWhereInput = {
      isPublished: true
    };

    if (category && category !== 'all') {
      const mappedCategory = categoryFromParam[category];
      if (mappedCategory) {
        where.category = mappedCategory;
      }
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { benefitTagline: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [items, total] = await prisma.$transaction([
      prisma.product.findMany({
        where,
        include: productInclude,
        orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.product.count({ where })
    ]);

    res.json({
      items: items.map(serializeProduct),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  })
);

router.get(
  '/products/featured',
  asyncHandler(async (_req, res) => {
    const items = await prisma.product.findMany({
      where: { isPublished: true, isFeatured: true },
      include: productInclude,
      orderBy: { createdAt: 'desc' },
      take: 8
    });

    res.json({ items: items.map(serializeProduct) });
  })
);

router.get(
  '/products/:slug',
  asyncHandler(async (req, res) => {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
      include: productInclude
    });

    if (!product || !product.isPublished) {
      throw new HttpError(404, 'Product not found.');
    }

    res.json({ product: serializeProduct(product) });
  })
);

export default router;
