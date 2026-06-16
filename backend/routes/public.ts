import { Router } from 'express';
import { CouponDiscountType } from '@prisma/client';
import { z } from 'zod';
import { HttpError, asyncHandler, validateBody } from '../http';
import { prisma } from '../prisma';

const router = Router();

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().default(''),
  subject: z.string().min(2),
  message: z.string().min(5)
});

const distributorSchema = z.object({
  fullName: z.string().min(2),
  companyName: z.string().optional().default(''),
  country: z.string().min(2),
  city: z.string().min(2),
  phone: z.string().min(6),
  email: z.string().email(),
  businessType: z.string().min(2),
  message: z.string().min(5)
});

const couponSchema = z.object({
  code: z.string().min(2),
  subtotal: z.number().nonnegative()
});

router.post(
  '/contact',
  asyncHandler(async (req, res) => {
    const body = validateBody(contactSchema, req.body);
    const enquiry = await prisma.contactEnquiry.create({ data: body });
    res.status(201).json({ enquiry });
  })
);

router.post(
  '/enquiry/distributor',
  asyncHandler(async (req, res) => {
    const body = validateBody(distributorSchema, req.body);
    const enquiry = await prisma.distributorEnquiry.create({ data: body });
    res.status(201).json({ enquiry });
  })
);

router.post(
  '/coupons/validate',
  asyncHandler(async (req, res) => {
    const body = validateBody(couponSchema, req.body);
    const coupon = await prisma.coupon.findUnique({
      where: { code: body.code.trim().toUpperCase() },
      include: { uses: true }
    });

    if (!coupon || !coupon.isActive) {
      throw new HttpError(404, 'Coupon is not valid.');
    }

    if (coupon.expiresAt && coupon.expiresAt.getTime() < Date.now()) {
      throw new HttpError(400, 'Coupon has expired.');
    }

    if (coupon.totalUsageLimit && coupon.uses.length >= coupon.totalUsageLimit) {
      throw new HttpError(400, 'Coupon usage limit reached.');
    }

    const minOrderValue = Number(coupon.minOrderValue);
    if (body.subtotal < minOrderValue) {
      throw new HttpError(400, `Minimum order value is Rs. ${minOrderValue}.`);
    }

    const rawDiscount =
      coupon.discountType === CouponDiscountType.percentage
        ? (body.subtotal * Number(coupon.value)) / 100
        : Number(coupon.value);

    const cappedDiscount = coupon.maxDiscountCap
      ? Math.min(rawDiscount, Number(coupon.maxDiscountCap))
      : rawDiscount;
    const discount = Math.min(cappedDiscount, body.subtotal);

    res.json({
      valid: true,
      code: coupon.code,
      discountType: coupon.discountType,
      value: Number(coupon.value),
      discount,
      total: Math.max(body.subtotal - discount, 0)
    });
  })
);

export default router;
