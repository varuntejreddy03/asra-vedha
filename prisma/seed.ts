import 'dotenv/config';
import { CouponDiscountType, ProductCategory, Role } from '@prisma/client';
import { products } from '../src/data';
import { prisma } from '../src/server/prisma';

const categoryMap: Record<string, ProductCategory> = {
  'herbal-powders': ProductCategory.herbal_powders,
  nutraceuticals: ProductCategory.nutraceuticals,
  superfoods: ProductCategory.superfoods,
  immunity: ProductCategory.immunity,
  fitness: ProductCategory.fitness
};

async function seedAdmin() {
  await prisma.user.upsert({
    where: { email: 'asravedha@gmail.com' },
    update: {
      name: 'ASRA VEDHA Admin',
      role: Role.admin
    },
    create: {
      email: 'asravedha@gmail.com',
      name: 'ASRA VEDHA Admin',
      role: Role.admin
    }
  });
}

async function seedProducts() {
  for (const item of products) {
    const product = await prisma.product.upsert({
      where: { slug: item.id },
      update: {
        name: item.name,
        category: categoryMap[item.category],
        description: item.description,
        benefitTagline: item.subheading || item.description,
        price: item.price,
        stock: 100,
        image: item.image,
        benefits: item.benefits,
        ingredients: item.ingredients,
        howToUse: item.ingredientsDetail,
        qualityBadges: item.qualityTesting.badges,
        tags: [item.scientificBadge || 'Lab Tested'],
        isOrganic: item.isOrganic ?? true,
        isPublished: true,
        isFeatured: ['moringa-powder', 'ashwagandha-powder', 'amla-powder'].includes(item.id),
        metaTitle: item.name,
        metaDescription: item.qualityTesting.description
      },
      create: {
        slug: item.id,
        name: item.name,
        category: categoryMap[item.category],
        description: item.description,
        benefitTagline: item.subheading || item.description,
        price: item.price,
        stock: 100,
        image: item.image,
        benefits: item.benefits,
        ingredients: item.ingredients,
        howToUse: item.ingredientsDetail,
        qualityBadges: item.qualityTesting.badges,
        tags: [item.scientificBadge || 'Lab Tested'],
        isOrganic: item.isOrganic ?? true,
        isPublished: true,
        isFeatured: ['moringa-powder', 'ashwagandha-powder', 'amla-powder'].includes(item.id),
        metaTitle: item.name,
        metaDescription: item.qualityTesting.description
      }
    });

    await prisma.productImage.deleteMany({ where: { productId: product.id } });
    await prisma.productImage.createMany({
      data: [
        {
          productId: product.id,
          url: item.image,
          alt: item.name,
          sortOrder: 0
        }
      ]
    });

    await prisma.productWeight.deleteMany({ where: { productId: product.id } });
    await prisma.productWeight.createMany({
      data: [
        {
          productId: product.id,
          label: item.category === 'nutraceuticals' ? '60 capsules' : '100g',
          price: item.price,
          stock: 100
        },
        {
          productId: product.id,
          label: item.category === 'nutraceuticals' ? '120 capsules' : '250g',
          price: Math.round(item.price * 2.2),
          stock: 60
        }
      ]
    });
  }
}

async function seedBanners() {
  await prisma.banner.upsert({
    where: { id: 'seed-home-hero' },
    update: {
      title: 'Premium Herbal Wellness Inspired by Nature',
      subtitle: 'Natural herbal powders, superfoods, nutraceuticals, immunity, and fitness nutrition.',
      image: products[0].image,
      buttonText: 'Shop Products',
      buttonLink: '/shop',
      position: 'home',
      displayOrder: 1,
      isActive: true
    },
    create: {
      id: 'seed-home-hero',
      title: 'Premium Herbal Wellness Inspired by Nature',
      subtitle: 'Natural herbal powders, superfoods, nutraceuticals, immunity, and fitness nutrition.',
      image: products[0].image,
      buttonText: 'Shop Products',
      buttonLink: '/shop',
      position: 'home',
      displayOrder: 1,
      isActive: true
    }
  });

  await prisma.banner.upsert({
    where: { id: 'seed-shop-quality' },
    update: {
      title: 'Lab Tested Natural Nutrition',
      subtitle: 'Clean products with disciplined batch checks before dispatch.',
      image: products[3].image,
      buttonText: 'View Quality',
      buttonLink: '/quality',
      position: 'shop',
      displayOrder: 1,
      isActive: true
    },
    create: {
      id: 'seed-shop-quality',
      title: 'Lab Tested Natural Nutrition',
      subtitle: 'Clean products with disciplined batch checks before dispatch.',
      image: products[3].image,
      buttonText: 'View Quality',
      buttonLink: '/quality',
      position: 'shop',
      displayOrder: 1,
      isActive: true
    }
  });
}

async function seedCoupons() {
  await prisma.coupon.upsert({
    where: { code: 'WELCOME10' },
    update: {
      discountType: CouponDiscountType.percentage,
      value: 10,
      minOrderValue: 499,
      maxDiscountCap: 150,
      totalUsageLimit: 1000,
      perUserLimit: 1,
      isActive: true
    },
    create: {
      code: 'WELCOME10',
      discountType: CouponDiscountType.percentage,
      value: 10,
      minOrderValue: 499,
      maxDiscountCap: 150,
      totalUsageLimit: 1000,
      perUserLimit: 1,
      isActive: true
    }
  });

  await prisma.coupon.upsert({
    where: { code: 'WELLNESS50' },
    update: {
      discountType: CouponDiscountType.fixed,
      value: 50,
      minOrderValue: 399,
      totalUsageLimit: 1000,
      perUserLimit: 3,
      isActive: true
    },
    create: {
      code: 'WELLNESS50',
      discountType: CouponDiscountType.fixed,
      value: 50,
      minOrderValue: 399,
      totalUsageLimit: 1000,
      perUserLimit: 3,
      isActive: true
    }
  });
}

async function seedBlog() {
  const posts = [
    {
      slug: 'how-to-use-moringa-powder-daily',
      title: 'How to Use Moringa Powder Daily',
      category: 'Wellness Guides',
      coverImage: products[0].image,
      excerpt: 'A practical guide to adding moringa to morning wellness routines.',
      content:
        'Start with a small serving of moringa powder in warm water, smoothies, or food. Keep the routine consistent and follow product label guidance.',
      tags: ['moringa', 'daily wellness', 'herbal powders']
    },
    {
      slug: 'ashwagandha-for-evening-balance',
      title: 'Ashwagandha for Evening Balance',
      category: 'Ayurvedic Nutrition',
      coverImage: products[1].image,
      excerpt: 'Simple timing and use notes for ashwagandha root powder.',
      content:
        'Ashwagandha is traditionally used in evening routines. Customers with health conditions should speak with a qualified clinician first.',
      tags: ['ashwagandha', 'adaptogen', 'routine']
    },
    {
      slug: 'what-lab-tested-means-for-herbal-products',
      title: 'What Lab Tested Means for Herbal Products',
      category: 'Quality',
      coverImage: products[3].image,
      excerpt: 'Why batch checks matter for purity, safety, and customer trust.',
      content:
        'Lab testing helps verify purity, moisture, microbial safety, and screening for unwanted contaminants before product dispatch.',
      tags: ['quality', 'lab tested', 'safety']
    }
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        ...post,
        author: 'ASRA VEDHA Team',
        isPublished: true,
        publishedAt: new Date()
      },
      create: {
        ...post,
        author: 'ASRA VEDHA Team',
        isPublished: true,
        publishedAt: new Date()
      }
    });
  }
}

async function main() {
  await seedAdmin();
  await seedProducts();
  await seedBanners();
  await seedCoupons();
  await seedBlog();
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed completed.');
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exitCode = 1;
  });
