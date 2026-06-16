import { Product } from './types';

const productImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCkNJkPV88HZ_Lb-4ByRf-TuzlzegoMXXHtSYtL2KRW0k9B_6i45beE3EX8sNSZXd6sg7dl1sSF3sG-NjrGolpptCLuuqp8mTc53Eu5c6kXRus6X-V6fTKAlvImdnRvJb3DsSH3JAIQd0PJZIpnIWWEspRAKzXhoTLE7rvTbH3mvK3CEIxOb0x012YhZ_lugd_bfu7kBHkLCPvn491O8SZzMSsi-JWdcnKeLaSZG4ONAirWheRYk_HiLcPOlFYSeJNfOp0K5i-miqw',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBiI0fnT_zjvoJPGcdrMhiflhBMWy2Kn0Gw5c7B1rie_nXx0lMOxtcwxrlNqFCoiI3FVJLB8nPhwU2umdt0HWQ_kz9pZHlp4qygItq63dusyQhq61_wmXgTfJI_U-eQD9S5vuxDH_bk5jLqa50TCi2QYiuJA45s-O_-fZ3JVxysLmxfBLkpENqlYLCjHjtzAs2ztfZmAG8IsWynKJvMErd3d92nM1aoUo2S-bkzwn75QXNY4sYMl_etooCO2ItXUCkqJGUrJdwCGaU',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ5Ot2SfT7dCsSDAedhSlO-vZKN5nBuFlAdNSnWeH3s9RPZ8ya4UNmOlRLhbCZhS-JZ6yvs0BKA1ZnVt0puYEQClizpY1KQkfLE1Ym0IiHFCUaGqw98KEi0xd19e3QEXmfvUy4wiySfIoChoaCE9unkjCmtPyLgvClfJOHqFwRL3l-mIslq6tdm88SExCpgE-PaLomjOuqpUW3WTzwtxBxhyta8P-KzmnJ5Q8Ui47W9hTjwbRFT09pu_DOYgrAqgTQeKaHVgXw1aU',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC8LCIFG_O3z8vrHmA9ZsbM0PLj6E01EMQtdWmsDjRa4zti3Y5Y38vFU20C9HYABB-9uxOHvMcFZU3bKnAjWn1BnM3ONwhRzy4ShcWmCgN-BgQ3l3sW3b3sqAw7GsDZCsk2HcpRuDZrs0ChKv44PpJrAiKuKB5OfdbaaXiABxLyo2ZI8oEAF9-U_0nDW-LaZLUoqVgJrw0idr7erto0VU13R0xB4BEIfhgRz1qUc_AtuIUkQhqfMJD8jccx1g2qY0fys9vqaEm_lro',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuANmkJGY-JEjEX2Z3OLf-18urLVmD_X3g-ahqM1AG7-iw-f6-9xrsJ5IJu-4TmNXmtU45cwlHpZTeNIXmbvV57rbsjsWL-sbVJQNyxd8gGR02JjhDPeZDh7kPChhj8heohZ1M6QroKgDfBfUsYgGLgv7dTLydtWso4-qvaquLalut9tD48JTl7Y9AGfqnzUDgsx_17nctsESUS-I2-eXmbyyLHGXN7rN5s0wwTzuXyT0DAb4hUAsbNK3wdT3p-Fk2Dl4vSzyWdP2Ww',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD6vMYLqMrE81Kj5syl458XX8f_0FBmNkIuUB2X-UKv0bvOrAl_AN4Z9R-9bumUwIjU-Ff8lmsslI2nLCEFOOJsjZ7SQ-AMPrzBjhxqcIAtPd3XtyIi2hQqx5Yfgbd-QO9BKp4kQ6W7BE5zolSEZF8ofJbldFq0KIFWLWglf7tA6M_EwK9NyllVKvI9sVrsnYgqSoENftuUOeCtwDn9GT6mxSWs_ZfL131KGLxYOoXiSXnqKhN4OY5WarBiFHfqs8SRVncN6XZ4SWo',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuANq_X1PPtt0X95cUTJkOZt207jQ5hrGAh7vlEFHYBK7DD9GYX_G11QpFTOBUTXA0jwpt012oFaISXIyNzwccfyUIxUWb3fJA7uwoWCchoERI_JpnCijLP1osMztPClrpVMKC3ZhN_KBLoYBuamWyHCxmXlngSccvc0Yb2DTVIdCmcSgCG15vDbgjEEqjftwzfjLo7sYhzNHWo4Cbt-wuPjuy8SfouFYILKs-lZoxqP6amtWhhEuKxQnKFe1DCm4e6GmHZubqJZIFM',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDnWUwog1UzmHoPUo9cgFDzSNPgL5TZYVW241uJLYIVph8mwsRdbUuJUr9HMYgRkY7lxC_DtHWHzraIu5dYg3d_x_Ip-Vl5GL9vME-KhfuWqe48_c8MdQ1W9gBAs3eL339UFBPIJ1RtUFlogUaA_Y_S3iBjCLBXusts9FjQct2OxT4UUM1fnxiOWAtTrorZVhMNqegK4-UDzKbiVMh-aMtdysQ_EpxlMTHQ3acFDstVO_Tbyx7YRNeIUg81FHOhuE0h5WSwB9FHmro',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAQOhXOm26dho8IZXM7Gk71vhJp9957DQ6PLgsL2JNLGrAANpUKascRvF9fhMrQ0QtJop6ziA2FvCyvhSvc0-mBZlNO5_sVXXomGHYXkAwho0Ve_c3iWTvJtlk9VakQ22LHLI7JQ95PSuGgeDO1rGvxM3rdUF9xemfm4KCxpJoDmbts8_S_rSGCVkJPKU6_3c9tTM2bcrzKlngEvLDXXRqwJQFleA1FvW_XKX_WfaSjSgmQNn7OvpgF10dg_5Dr2s19xSlbROYUlXU',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ5Ot2SfT7dCsSDAedhSlO-vZKN5nBuFlAdNSnWeH3s9RPZ8ya4UNmOlRLhbCZhS-JZ6yvs0BKA1ZnVt0puYEQClizpY1KQkfLE1Ym0IiHFCUaGqw98KEi0xd19e3QEXmfvUy4wiySfIoChoaCE9unkjCmtPyLgvClfJOHqFwRL3l-mIslq6tdm88SExCpgE-PaLomjOuqpUW3WTzwtxBxhyta8P-KzmnJ5Q8Ui47W9hTjwbRFT09pu_DOYgrAqgTQeKaHVgXw1aU',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCcIQz2hK_6DvZTnpO1Ihjg0Zclov0uyZEGsG-lbl0vnSCsJ2AC2gU8kuruHar_g0fGpOf8kq_crxdfAPxAuQhNtc_Ofz-SR-JY83B8dJ_uVhka0LkeUeQQOlLmzpCwX5SA53j1EReakJKDK4A80lRBJgOOUwGewIrWJiuqD2qUeIfpsJPcUrEGwd7od36NNymeP1MAWVKduaUn18IOiba2aEjhSmsFnJfjTlrFm4ZYkC_NNhF_s_J7xpjGyX1s4xSD5J5UD6WEjTk',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCkNJkPV88HZ_Lb-4ByRf-TuzlzegoMXXHtSYtL2KRW0k9B_6i45beE3EX8sNSZXd6sg7dl1sSF3sG-NjrGolpptCLuuqp8mTc53Eu5c6kXRus6X-V6fTKAlvImdnRvJb3DsSH3JAIQd0PJZIpnIWWEspRAKzXhoTLE7rvTbH3mvK3CEIxOb0x012YhZ_lugd_bfu7kBHkLCPvn491O8SZzMSsi-JWdcnKeLaSZG4ONAirWheRYk_HiLcPOlFYSeJNfOp0K5i-miqw'
];

export const products: Product[] = [
  {
    id: 'moringa-powder',
    name: 'Moringa Powder',
    price: 299,
    currencySymbol: '₹',
    image: productImages[0],
    description: 'A nutrient-dense green superfood made from carefully dried moringa leaves for everyday vitality and nourishment.',
    subheading: 'Rich in vitamins and antioxidants.',
    category: 'herbal-powders',
    isOrganic: true,
    scientificBadge: '100% Natural',
    benefits: [
      { title: 'Daily Vitality', description: 'Supports natural energy with plant-based micronutrients.', icon: 'Zap' },
      { title: 'Antioxidant Support', description: 'Naturally rich in protective phytonutrients.', icon: 'Sparkles' },
      { title: 'Clean Nutrition', description: 'Simple herbal powder for smoothies, warm water, or recipes.', icon: 'Leaf' }
    ],
    ingredients: '100% shade-dried Moringa oleifera leaf powder.',
    ingredientsDetail: 'Prepared in small batches to retain natural color, aroma, and nutrient value.',
    qualityTesting: {
      badges: ['Lab Tested', 'No Added Sugar', 'No Artificial Color'],
      description: 'Every batch should be tested for purity, moisture, and heavy metals before packing.'
    }
  },
  {
    id: 'ashwagandha-powder',
    name: 'Ashwagandha Powder',
    price: 349,
    currencySymbol: '₹',
    image: productImages[1],
    description: 'Traditional ashwagandha root powder crafted for stress support, vitality, stamina, and daily wellness routines.',
    subheading: 'Adaptogen for stress and vitality.',
    category: 'herbal-powders',
    isOrganic: true,
    scientificBadge: 'Adaptogen',
    benefits: [
      { title: 'Stress Support', description: 'Helps support calm and resilience as part of a balanced lifestyle.', icon: 'Brain' },
      { title: 'Vitality', description: 'Traditionally used for strength, stamina, and restoration.', icon: 'Activity' },
      { title: 'Night Routine', description: 'Pairs well with warm milk or water before rest.', icon: 'Moon' }
    ],
    ingredients: '100% ashwagandha root powder.',
    ingredientsDetail: 'Root material is cleaned, dried, and milled for smooth daily use.',
    qualityTesting: {
      badges: ['Lab Tested', 'Root Powder', 'No Fillers'],
      description: 'Batch testing should verify purity, microbial safety, and absence of unwanted contaminants.'
    }
  },
  {
    id: 'amla-powder',
    name: 'Amla Powder',
    price: 249,
    currencySymbol: '₹',
    image: productImages[2],
    description: 'Indian gooseberry powder with a naturally tangy profile, used traditionally for immunity, digestion, and hair wellness.',
    subheading: 'Vitamin C powerhouse for immunity.',
    category: 'herbal-powders',
    isOrganic: true,
    scientificBadge: 'Vitamin C',
    benefits: [
      { title: 'Immune Support', description: 'Amla is naturally valued for antioxidant-rich nutrition.', icon: 'ShieldCheck' },
      { title: 'Hair Wellness', description: 'Traditionally used in hair and scalp care rituals.', icon: 'Sparkles' },
      { title: 'Digestive Balance', description: 'Supports a clean daily wellness routine.', icon: 'HeartPulse' }
    ],
    ingredients: '100% dried amla fruit powder.',
    ingredientsDetail: 'Made from selected amla fruits and milled into a fine powder.',
    qualityTesting: {
      badges: ['Lab Tested', 'Vegan', 'No Preservatives'],
      description: 'Quality checks should cover moisture, microbial safety, and clean-label compliance.'
    }
  },
  {
    id: 'turmeric-powder',
    name: 'Turmeric Powder',
    price: 199,
    currencySymbol: '₹',
    image: productImages[3],
    description: 'Golden turmeric powder with a warm earthy aroma for food, wellness drinks, and traditional daily use.',
    subheading: 'Anti-inflammatory golden spice.',
    category: 'herbal-powders',
    isOrganic: true,
    scientificBadge: 'Golden Spice',
    benefits: [
      { title: 'Golden Milk', description: 'Ideal for warm milk, teas, and traditional recipes.', icon: 'Sun' },
      { title: 'Joint Wellness', description: 'Traditionally used to support comfort and mobility.', icon: 'ShieldAlert' },
      { title: 'Kitchen Staple', description: 'Clean, aromatic spice for daily cooking.', icon: 'Flame' }
    ],
    ingredients: '100% turmeric root powder.',
    ingredientsDetail: 'Ground from selected turmeric roots for deep color and natural aroma.',
    qualityTesting: {
      badges: ['Lab Tested', 'No Synthetic Color', 'High Curcumin Focus'],
      description: 'Testing should verify purity and screen for adulterants or artificial coloring.'
    }
  },
  {
    id: 'curry-leaves-powder',
    name: 'Curry Leaves Powder',
    price: 249,
    currencySymbol: '₹',
    image: productImages[4],
    description: 'Aromatic curry leaves powder prepared for traditional digestion, iron support, and hair wellness routines.',
    subheading: 'Iron-rich hair and digestion booster.',
    category: 'herbal-powders',
    isOrganic: true,
    scientificBadge: 'Traditional Herb',
    benefits: [
      { title: 'Digestive Support', description: 'A familiar Indian herb for food and wellness rituals.', icon: 'HeartPulse' },
      { title: 'Hair Rituals', description: 'Traditionally used for hair nourishment practices.', icon: 'Leaf' },
      { title: 'Everyday Mineral Support', description: 'Adds a naturally green herbal boost to meals.', icon: 'Sparkles' }
    ],
    ingredients: '100% dried curry leaves powder.',
    ingredientsDetail: 'Dried gently and milled to preserve aroma and green color.',
    qualityTesting: {
      badges: ['Lab Tested', 'No Additives', 'Pure Leaf Powder'],
      description: 'Batch quality should check freshness, moisture, microbial safety, and cleanliness.'
    }
  },
  {
    id: 'spirulina-powder',
    name: 'Spirulina Powder',
    price: 449,
    currencySymbol: '₹',
    image: productImages[5],
    description: 'Blue-green superfood powder valued for plant protein, minerals, and intense nutritional density.',
    subheading: 'Complete protein superfood.',
    category: 'superfoods',
    isOrganic: true,
    scientificBadge: 'Protein Rich',
    benefits: [
      { title: 'Plant Protein', description: 'Naturally protein-rich nutrition for active routines.', icon: 'Activity' },
      { title: 'Mineral Dense', description: 'Supports daily nutrient intake with concentrated greens.', icon: 'Sparkles' },
      { title: 'Smoothie Ready', description: 'Easy to blend into juices, smoothies, and bowls.', icon: 'Zap' }
    ],
    ingredients: '100% spirulina powder.',
    ingredientsDetail: 'Packed carefully to protect color, aroma, and nutritional value.',
    qualityTesting: {
      badges: ['Lab Tested', 'Heavy Metal Screened', 'Vegan'],
      description: 'Spirulina should be screened for heavy metals, microbial safety, and purity.'
    }
  },
  {
    id: 'wheatgrass-powder',
    name: 'Wheatgrass Powder',
    price: 349,
    currencySymbol: '₹',
    image: productImages[6],
    description: 'Fresh green wheatgrass powder for detox-focused morning routines, smoothies, and active wellness plans.',
    subheading: 'Detox and energy green superfood.',
    category: 'superfoods',
    isOrganic: true,
    scientificBadge: 'Green Detox',
    benefits: [
      { title: 'Morning Greens', description: 'Supports a fresh start with concentrated plant nutrition.', icon: 'Leaf' },
      { title: 'Natural Energy', description: 'A caffeine-free green addition to active days.', icon: 'Zap' },
      { title: 'Clean Routine', description: 'Pairs well with lemon water, juices, and smoothies.', icon: 'Droplet' }
    ],
    ingredients: '100% wheatgrass powder.',
    ingredientsDetail: 'Prepared from young wheatgrass and packed for freshness.',
    qualityTesting: {
      badges: ['Lab Tested', 'No Preservatives', 'Chlorophyll Rich'],
      description: 'Quality checks should verify freshness, purity, and clean-label safety.'
    }
  },
  {
    id: 'beetroot-powder',
    name: 'Beetroot Powder',
    price: 299,
    currencySymbol: '₹',
    image: productImages[7],
    description: 'Naturally vibrant beetroot powder for stamina drinks, smoothies, color-rich recipes, and fitness routines.',
    subheading: 'Natural nitric oxide for stamina.',
    category: 'superfoods',
    isOrganic: true,
    scientificBadge: 'Stamina Support',
    benefits: [
      { title: 'Workout Support', description: 'Popular in pre-workout and stamina-focused routines.', icon: 'Activity' },
      { title: 'Natural Color', description: 'Adds a rich ruby tone to foods and drinks.', icon: 'Sparkles' },
      { title: 'Heart-Friendly Routine', description: 'Traditionally valued for circulation-focused wellness.', icon: 'Heart' }
    ],
    ingredients: '100% beetroot powder.',
    ingredientsDetail: 'Made from selected beetroot and milled for smooth blending.',
    qualityTesting: {
      badges: ['Lab Tested', 'No Added Sugar', 'No Artificial Color'],
      description: 'Testing should confirm the powder is free from synthetic colors and unwanted residues.'
    }
  },
  {
    id: 'herbal-capsules',
    name: 'Herbal Capsules',
    price: 599,
    currencySymbol: '₹',
    image: productImages[8],
    description: 'Convenient herbal capsules designed for customers who prefer measured, travel-friendly daily wellness support.',
    subheading: 'Concentrated wellness in a capsule.',
    category: 'nutraceuticals',
    isOrganic: true,
    scientificBadge: 'Measured Dose',
    benefits: [
      { title: 'Easy Routine', description: 'Simple capsule format for consistent daily intake.', icon: 'CheckCircle' },
      { title: 'Travel Friendly', description: 'Designed for clean, convenient wellness on the move.', icon: 'Package' },
      { title: 'Modern Wellness', description: 'Bridges herbal tradition with practical nutraceutical format.', icon: 'ShieldCheck' }
    ],
    ingredients: 'Herbal extract blend in vegetarian capsules.',
    ingredientsDetail: 'Final formula should be locked during backend/admin product setup.',
    qualityTesting: {
      badges: ['Lab Tested', 'Veg Capsule', 'Standardized'],
      description: 'Capsules should be tested for fill weight, purity, and microbial safety.'
    }
  },
  {
    id: 'superfood-blend',
    name: 'Superfood Blend',
    price: 799,
    currencySymbol: '₹',
    image: productImages[9],
    description: 'A multi-herb daily wellness formula combining green superfoods, antioxidant botanicals, and clean nutrition.',
    subheading: 'Multi-herb daily wellness formula.',
    category: 'superfoods',
    isOrganic: true,
    scientificBadge: 'Daily Blend',
    benefits: [
      { title: 'All-in-One Nutrition', description: 'A balanced daily mix for busy wellness routines.', icon: 'Sparkles' },
      { title: 'Green Support', description: 'Combines botanical nutrition with superfood density.', icon: 'Leaf' },
      { title: 'Easy Mixing', description: 'Designed for smoothies, shakes, and morning drinks.', icon: 'Zap' }
    ],
    ingredients: 'Moringa, wheatgrass, spirulina, amla, and botanical support blend.',
    ingredientsDetail: 'Blend ratios should be finalized during product formulation and admin setup.',
    qualityTesting: {
      badges: ['Lab Tested', 'Multi-Herb', 'No Artificial Flavor'],
      description: 'Blended powders should be checked for uniformity, safety, and clean-label compliance.'
    }
  },
  {
    id: 'immunity-booster',
    name: 'Immunity Booster',
    price: 499,
    currencySymbol: '₹',
    image: productImages[10],
    description: 'A 7-herb immune support complex created for daily seasonal wellness and balanced nourishment.',
    subheading: '7-herb immune support complex.',
    category: 'immunity',
    isOrganic: true,
    scientificBadge: '7-Herb Complex',
    benefits: [
      { title: 'Seasonal Support', description: 'Made for daily immune-focused wellness routines.', icon: 'ShieldCheck' },
      { title: 'Antioxidant Herbs', description: 'Combines traditional Indian botanicals with modern nutrition goals.', icon: 'Sparkles' },
      { title: 'Daily Use', description: 'Formulated as a practical wellness addition.', icon: 'HeartHandshake' }
    ],
    ingredients: 'Amla, turmeric, tulsi, moringa, and supporting herbal blend.',
    ingredientsDetail: 'Exact 7-herb composition should be finalized before launch.',
    qualityTesting: {
      badges: ['Lab Tested', 'No Preservatives', 'Immunity Support'],
      description: 'Immune blends should be checked for purity, microbial safety, and accurate formulation.'
    }
  },
  {
    id: 'fitness-nutrition',
    name: 'Fitness Nutrition',
    price: 699,
    currencySymbol: '₹',
    image: productImages[11],
    description: 'A plant-based performance blend designed for active lifestyles, stamina routines, and post-workout nourishment.',
    subheading: 'Plant-based performance blend.',
    category: 'fitness',
    isOrganic: true,
    scientificBadge: 'Performance Blend',
    benefits: [
      { title: 'Active Lifestyle', description: 'Supports fitness routines with plant-based nutrition.', icon: 'Activity' },
      { title: 'Stamina Focus', description: 'Designed around natural energy and endurance support.', icon: 'Zap' },
      { title: 'Recovery Routine', description: 'Pairs well with smoothies and post-workout shakes.', icon: 'HeartPulse' }
    ],
    ingredients: 'Beetroot, moringa, spirulina, and plant nutrition blend.',
    ingredientsDetail: 'Final performance formula should be confirmed before production.',
    qualityTesting: {
      badges: ['Lab Tested', 'Plant Based', 'Fitness Support'],
      description: 'Performance blends should be tested for consistency, purity, and label accuracy.'
    }
  }
];

export function getPrice(product: Product, currency: 'USD' | 'INR'): { price: number; formatted: string } {
  if (currency === 'INR') {
    return {
      price: product.price,
      formatted: `₹${product.price.toLocaleString('en-IN')}`
    };
  }

  const usd = product.price / 83;
  return {
    price: usd,
    formatted: `$${usd.toFixed(2)}`
  };
}
