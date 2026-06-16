import { ProductCategory, type Prisma } from '@prisma/client';

export const categoryFromParam: Record<string, ProductCategory> = {
  'herbal-powders': ProductCategory.herbal_powders,
  nutraceuticals: ProductCategory.nutraceuticals,
  superfoods: ProductCategory.superfoods,
  immunity: ProductCategory.immunity,
  fitness: ProductCategory.fitness
};

export const categoryToSlug: Record<ProductCategory, string> = {
  [ProductCategory.herbal_powders]: 'herbal-powders',
  [ProductCategory.nutraceuticals]: 'nutraceuticals',
  [ProductCategory.superfoods]: 'superfoods',
  [ProductCategory.immunity]: 'immunity',
  [ProductCategory.fitness]: 'fitness'
};

export function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function serializeProduct(
  product: Prisma.ProductGetPayload<{
    include: { images: true; weights: true };
  }>
) {
  const benefits = Array.isArray(product.benefits) ? product.benefits : [];
  const primaryImage = product.images[0]?.url || product.image || '';

  return {
    ...product,
    databaseId: product.id,
    id: product.slug,
    category: categoryToSlug[product.category],
    price: Number(product.price),
    currencySymbol: 'Rs.',
    image: primaryImage,
    subheading: product.benefitTagline,
    scientificBadge: product.tags[0] || 'Lab Tested',
    benefits,
    ingredientsDetail: product.howToUse || product.ingredients,
    qualityTesting: {
      badges: product.qualityBadges,
      description:
        product.metaDescription ||
        'Batch testing records cover purity, moisture, microbial safety, and contaminant screening before dispatch.'
    },
    comparePrice: product.comparePrice ? Number(product.comparePrice) : null,
    weights: product.weights.map((weight) => ({
      ...weight,
      price: Number(weight.price)
    }))
  };
}
