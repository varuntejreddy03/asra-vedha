import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Clock, Copy, Facebook, MessageCircle, Search, UserRound } from 'lucide-react';
import { motion } from 'motion/react';
import { ViewState } from '../types';

interface BlogViewProps {
  setView: (view: ViewState) => void;
}

type BlogPost = {
  slug: string;
  title: string;
  category: 'Nutrition' | 'Herbs' | 'Lifestyle' | 'Recipes' | 'Research';
  date: string;
  author: string;
  readTime: string;
  image: string;
  excerpt: string;
  body: string[];
};

const posts: BlogPost[] = [
  {
    slug: 'moringa-daily-nutrition',
    title: 'Why Moringa Fits a Modern Daily Nutrition Routine',
    category: 'Nutrition',
    date: 'June 12, 2026',
    author: 'ASRA VEDHA Team',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1400&q=80',
    excerpt: 'A practical look at moringa powder, micronutrients, smoothies, and how to build a steady morning habit.',
    body: [
      'Moringa is valued because it is simple to add to everyday food. A small serving can blend into warm water, smoothies, chutneys, or breakfast bowls without changing the routine too much.',
      'The best wellness habits are repeatable. Keep the serving small, use it consistently, and pair it with a balanced diet instead of treating any single herb as a shortcut.',
      'ASRA VEDHA positions moringa as a daily green nutrition support product, with purity checks and clean labeling as the foundation.'
    ]
  },
  {
    slug: 'ashwagandha-stress-vitality',
    title: 'Ashwagandha for Stress Support and Vitality',
    category: 'Herbs',
    date: 'June 8, 2026',
    author: 'ASRA VEDHA Team',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1400&q=80',
    excerpt: 'How this classic adaptogen is used in Indian wellness routines, and what responsible use should look like.',
    body: [
      'Ashwagandha has a long place in traditional wellness systems. It is commonly used in evening routines, strength routines, and stress-support habits.',
      'Responsible use matters. Customers with medical conditions, pregnancy, lactation, or prescription medicines should speak with a qualified professional before adding concentrated herbs.',
      'For ASRA VEDHA, the focus is clear product information, clean sourcing, and practical directions that customers can understand.'
    ]
  },
  {
    slug: 'turmeric-golden-milk',
    title: 'A Simple Golden Milk Ritual with Turmeric',
    category: 'Recipes',
    date: 'June 4, 2026',
    author: 'ASRA VEDHA Team',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?auto=format&fit=crop&w=1400&q=80',
    excerpt: 'A warm turmeric drink recipe for evenings, with simple ingredients and clean preparation.',
    body: [
      'Golden milk is one of the easiest ways to use turmeric powder. Warm milk or plant milk, turmeric, a pinch of black pepper, and a little jaggery or honey can create a steady evening drink.',
      'Keep the heat gentle and stir well. The goal is comfort, consistency, and a taste profile that feels natural enough to repeat.',
      'Use high-quality turmeric powder with no synthetic color and clear batch controls.'
    ]
  },
  {
    slug: 'clean-label-wellness',
    title: 'What Clean Label Means for Herbal Wellness',
    category: 'Research',
    date: 'May 30, 2026',
    author: 'ASRA VEDHA Team',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1400&q=80',
    excerpt: 'Purity, testing, transparent ingredients, and why fewer inputs often build more trust.',
    body: [
      'Clean label is not a slogan. It means customers can understand the ingredient list, the purpose of the product, and the quality checks behind it.',
      'For herbal powders, this includes avoiding unnecessary fillers, synthetic colors, and unclear blends. For nutraceuticals, it also means consistent dosage and responsible claims.',
      'A strong wellness brand should keep claims grounded and records organized from day one.'
    ]
  },
  {
    slug: 'seasonal-immunity-habits',
    title: 'Seasonal Immunity Habits Beyond One Product',
    category: 'Lifestyle',
    date: 'May 24, 2026',
    author: 'ASRA VEDHA Team',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=1400&q=80',
    excerpt: 'Food, sleep, hydration, and herbs work best when they support a wider lifestyle system.',
    body: [
      'Seasonal wellness is strongest when it is built around basics: sleep, hydration, balanced food, movement, and stress management.',
      'Herbs can support the routine, but they should not be the whole routine. Amla, turmeric, tulsi, and moringa all fit best when daily habits are already moving in the right direction.',
      'ASRA VEDHA content should keep customers informed without overpromising.'
    ]
  }
];

const categories = ['All', 'Nutrition', 'Herbs', 'Lifestyle', 'Recipes', 'Research'] as const;

export default function BlogView({ setView }: BlogViewProps) {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All');
  const [query, setQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const featuredPost = posts[0];

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      const categoryMatch = activeCategory === 'All' || post.category === activeCategory;
      const searchMatch =
        !normalizedQuery ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.excerpt.toLowerCase().includes(normalizedQuery) ||
        post.category.toLowerCase().includes(normalizedQuery);
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, query]);

  if (selectedPost) {
    return (
      <article className="min-h-screen bg-[#EDEDEC] text-[#2B2B2B] pt-24">
        <section className="relative min-h-[56vh] flex items-end px-6 md:px-12 py-14 overflow-hidden">
          <img src={selectedPost.image} alt={selectedPost.title} className="absolute inset-0 w-full h-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#EDEDEC] via-[#EDEDEC]/70 to-[#EDEDEC]/10" />
          <div className="relative max-w-4xl">
            <button
              onClick={() => setSelectedPost(null)}
              className="inline-flex items-center gap-2 text-[#C9A84C] hover:text-[#B8963C] text-xs uppercase tracking-widest font-bold mb-8 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </button>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B6B6B] mb-5">
              <span className="bg-[#C9A84C] text-[#2B2B2B] px-3 py-1 rounded-full font-bold uppercase tracking-wider">{selectedPost.category}</span>
              <span>{selectedPost.date}</span>
              <span>{selectedPost.readTime}</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl leading-tight text-[rgba(0,0,0,0.87)]">{selectedPost.title}</h1>
          </div>
        </section>

        <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 text-sm text-[#8C8C8C] mb-10">
              <UserRound className="w-4 h-4 text-[#C9A84C]" />
              <span>{selectedPost.author}</span>
            </div>
            <div className="space-y-7">
              {selectedPost.body.map((paragraph) => (
                <p key={paragraph} className="font-sans text-lg leading-[1.8] text-[#6B6B6B]">{paragraph}</p>
              ))}
              <blockquote className="border-l-2 border-[#C9A84C] pl-6 py-2 font-display text-2xl text-[#C9A84C]">
                Wellness content should help customers build better habits, not chase shortcuts.
              </blockquote>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-[#FFFFFF] border border-[#C9A84C]/30 rounded-lg p-6">
              <h3 className="font-sans text-xs uppercase tracking-[0.18em] text-[#C9A84C] font-bold">Share</h3>
              <div className="flex gap-3 mt-5">
                <a href="https://wa.me/?text=ASRA%20VEDHA%20Wellness%20Insights" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#C9A84C] text-white flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </a>
                <button className="w-10 h-10 rounded-full bg-[#E5E4E2] border border-[#C9A84C]/40 text-[#C9A84C] flex items-center justify-center">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-[#E5E4E2] border border-[#C9A84C]/40 text-[#C9A84C] flex items-center justify-center">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="bg-white card-shadow rounded-lg p-6">
              <h3 className="font-display text-2xl text-[rgba(0,0,0,0.87)]">Explore the collection</h3>
              <p className="font-sans text-sm text-[rgba(0,0,0,0.58)] mt-2 leading-relaxed">Pair wellness reading with real products from the ASRA VEDHA catalog.</p>
              <button
                onClick={() => setView('shop')}
                className="mt-5 bg-[#C9A84C] text-[#2B2B2B] px-5 py-3 rounded text-xs uppercase tracking-widest font-bold inline-flex items-center gap-2 cursor-pointer"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </aside>
        </section>
      </article>
    );
  }

  return (
    <div className="min-h-screen bg-[#EDEDEC] text-[#2B2B2B] pt-24">
      <section className="px-6 md:px-12 py-16 md:py-20 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-[#C9A84C]/30 pb-10">
          <div>
            <span className="font-sans text-xs tracking-[0.24em] uppercase text-[#C9A84C] font-bold">Wellness Insights</span>
            <h1 className="font-display text-4xl md:text-6xl text-[rgba(0,0,0,0.87)] leading-tight mt-4">Journal for Natural Living</h1>
            <p className="font-sans text-base text-[#8C8C8C] leading-relaxed max-w-2xl mt-4">
              Practical writing on herbs, nutrition, recipes, and responsible wellness for ASRA VEDHA customers.
            </p>
          </div>
          <div className="relative w-full lg:max-w-sm">
            <Search className="w-4 h-4 text-[#8C8C8C] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search articles..."
              className="w-full bg-[#E5E4E2] border border-[#C9A84C]/50 rounded-lg pl-11 pr-4 py-3 text-sm text-[#2B2B2B] focus:outline-none focus:border-[#C9A84C]"
            />
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#FFFFFF] border border-[#C9A84C]/25 rounded-xl overflow-hidden"
        >
          <div className="lg:col-span-7 min-h-[320px]">
            <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" />
          </div>
          <div className="lg:col-span-5 p-8 flex flex-col justify-center">
            <span className="font-sans text-xs uppercase tracking-[0.18em] text-[#C9A84C] font-bold">Featured Post</span>
            <h2 className="font-display text-3xl md:text-4xl text-[rgba(0,0,0,0.87)] mt-4">{featuredPost.title}</h2>
            <p className="font-sans text-sm text-[#8C8C8C] leading-relaxed mt-4">{featuredPost.excerpt}</p>
            <button
              onClick={() => setSelectedPost(featuredPost)}
              className="mt-7 text-[#C9A84C] hover:text-[#B8963C] text-xs uppercase tracking-widest font-bold inline-flex items-center gap-2 cursor-pointer self-start"
            >
              Read More
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </section>

      <section className="px-6 md:px-12 py-12 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-sans font-bold transition-all cursor-pointer ${
                activeCategory === category
                  ? 'bg-[#C9A84C] text-[#2B2B2B]'
                  : 'bg-[#E5E4E2] text-[#6B6B6B] border border-[#C9A84C]/30 hover:border-[#C9A84C]/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="bg-[#FFFFFF] border border-[#C9A84C]/30 hover:border-[#C9A84C]/45 rounded-xl overflow-hidden flex flex-col"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                <span className="absolute top-4 left-4 bg-[#C9A84C] text-[#2B2B2B] text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-[11px] text-[#8C8C8C] mb-4">
                  <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                </div>
                <h3 className="font-display text-2xl leading-tight text-[rgba(0,0,0,0.87)]">{post.title}</h3>
                <p className="font-sans text-sm text-[#8C8C8C] leading-relaxed mt-3 flex-grow">{post.excerpt}</p>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="mt-6 text-[#C9A84C] hover:text-[#B8963C] text-xs uppercase tracking-widest font-bold inline-flex items-center gap-2 cursor-pointer self-start"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="bg-[#E5E4E2] border border-[#C9A84C]/30 rounded-lg p-10 text-center">
            <BookOpen className="w-8 h-8 text-[#C9A84C] mx-auto mb-4" />
            <p className="font-sans text-sm text-[#8C8C8C]">No posts match this search.</p>
          </div>
        )}
      </section>
    </div>
  );
}







