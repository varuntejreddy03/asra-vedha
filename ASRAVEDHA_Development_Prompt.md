# ASRA VEDHA WELLNESS — Full-Stack Website Development Prompt
### Phase-wise AI Tool Prompt Guide | Vite + Tailwind CSS + Node.js + Express

---

## 🧭 PROJECT MASTER BRIEF

> Give this to your AI tool at the start of every session as context.

```
You are building a full-stack premium wellness e-commerce website for ASRA VEDHA WELLNESS PVT LTD — a luxury Indian herbal and nutraceutical brand.

Brand Identity:
- Company: ASRA VEDHA WELLNESS PVT LTD
- Tagline: "Rooted in Nature, Crafted for Wellness"
- Tone: Premium, nature-inspired, luxury, trustworthy, modern
- Brand Colors:
    Primary Gold:     #C8A45D
    Deep Black:       #111111
    Forest Green:     #1F4D36
    Off-White:        #F8F5EF
    Muted Gold:       #A8813A
    Light Sage:       #E8F0E9

Tech Stack:
- Frontend: Vite + React 18 + TypeScript + Tailwind CSS v3
- Backend: Node.js + Express.js + PostgreSQL
  - Database now: Neon PostgreSQL
  - Later after deployment: migrate/update connection to VPS-hosted PostgreSQL
- Auth: Google OAuth 2.0 (via Passport.js or Firebase Auth)
- Payments: Razorpay
- State: Zustand (cart, auth, UI state)
- API Client: Axios with interceptors
- Image Storage: Cloudinary
- Email: Nodemailer (with Gmail SMTP or Resend)

Key Features:
1. Full public website (8 pages)
2. Customer Google Login + profile dashboard
3. Product catalog with cart & checkout
4. Razorpay payment gateway
5. Admin panel (products, banners, coupons, orders)
6. Blog CMS (admin-managed)
7. WhatsApp & enquiry forms
8. B2B distributor/export enquiry page
```

---

## CURRENT BUILD STATUS

- Frontend design pages: completed in the current root Vite + React app.
- Current implementation phase: backend foundation first, then admin panel on real APIs.
- Project structure decision: keep the current root Vite + Express structure; organize backend code under `src/server/` and keep root `server.ts` as the entrypoint.
- Database decision: PostgreSQL only.
  - Use Neon PostgreSQL for now.
  - After deployment, switch `DATABASE_URL` and `DIRECT_URL` to VPS-hosted PostgreSQL and run migrations/backups.
- Backend implementation should use relational schema, migrations, Prisma models/types, and parameterized queries.

---

## 📁 PHASE 0 — PROJECT STRUCTURE & SETUP

### Prompt for AI Tool:

```
Create a monorepo project for ASRA VEDHA WELLNESS with the following structure:

asravedha/
├── client/                    # Vite + React + TypeScript
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/            # Fonts, images, icons, logo
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/            # Button, Badge, Card, Input, Modal, etc.
│   │   │   ├── layout/        # Navbar, Footer, AdminLayout
│   │   │   └── shared/        # ProductCard, TestimonialCard, BlogCard
│   │   ├── pages/             # Route-level pages
│   │   │   ├── public/        # Home, About, Products, Quality, Sustainability, Blog, Contact, Distributor
│   │   │   ├── auth/          # Login, Callback
│   │   │   ├── user/          # Dashboard, Orders, Profile
│   │   │   └── admin/         # Dashboard, Products, Banners, Coupons, Orders
│   │   ├── store/             # Zustand stores (auth, cart, ui)
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API service functions (axios)
│   │   ├── utils/             # Helpers, formatters, validators
│   │   ├── types/             # TypeScript interfaces
│   │   ├── constants/         # Site content, nav links, product data
│   │   ├── router/            # React Router v6 config with protected routes
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── tailwind.config.ts
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── server/                    # Node.js + Express
│   ├── src/
│   │   ├── config/            # DB, Cloudinary, Razorpay, Passport config
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Auth, Admin guard, error handler, rate limiter
│   │   ├── models/            # PostgreSQL/Prisma models and types
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic (email, payment, upload)
│   │   ├── utils/             # Helpers
│   │   └── app.ts
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md

Run: 
- client: npm create vite@latest client -- --template react-ts, then install deps
- server: npm init, install express @prisma/client cors dotenv passport razorpay cloudinary nodemailer
- database: use Neon PostgreSQL for now; after deployment, switch DATABASE_URL to VPS PostgreSQL

Install client deps:
npm install axios zustand react-router-dom @tanstack/react-query react-hot-toast framer-motion lucide-react react-hook-form zod @hookform/resolvers

Install server deps:
npm install express @prisma/client cors dotenv helmet morgan passport passport-google-oauth20 express-session jsonwebtoken bcryptjs razorpay cloudinary multer multer-storage-cloudinary nodemailer express-rate-limit
npm install -D typescript @types/node @types/express ts-node nodemon prisma
npx prisma init
```

---

## 🎨 PHASE 1 — DESIGN SYSTEM & TAILWIND CONFIGURATION

### Prompt for AI Tool:

```
Set up the complete design system for ASRA VEDHA WELLNESS. This is a LUXURY wellness brand. The aesthetic is: refined botanical luxury — think premium organic tea brand meets Ayurvedic apothecary. Dark backgrounds with gold accents, lush green, and creamy off-whites.

Configure tailwind.config.ts with full custom tokens:

module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C8A45D',
          light: '#DFC285',
          dark: '#A8813A',
          muted: '#C8A45D33',
        },
        black: {
          DEFAULT: '#111111',
          soft: '#1A1A1A',
          card: '#1E1E1E',
        },
        forest: {
          DEFAULT: '#1F4D36',
          light: '#2A6347',
          pale: '#E8F0E9',
        },
        cream: {
          DEFAULT: '#F8F5EF',
          dark: '#EDE8DF',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        accent: ['"Cinzel"', 'serif'],
      },
      fontSize: {
        '7xl': ['5rem', { lineHeight: '1.05' }],
        '8xl': ['6.5rem', { lineHeight: '1' }],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C8A45D 0%, #DFC285 50%, #A8813A 100%)',
        'dark-gradient': 'linear-gradient(180deg, #111111 0%, #1A1A1A 100%)',
        'forest-gradient': 'linear-gradient(135deg, #1F4D36 0%, #2A6347 100%)',
      },
      boxShadow: {
        'gold': '0 0 30px rgba(200, 164, 93, 0.15)',
        'gold-lg': '0 0 60px rgba(200, 164, 93, 0.25)',
        'card': '0 4px 24px rgba(0,0,0,0.3)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

Add Google Fonts in index.html:
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=Cinzel:wght@400;500;600&display=swap" rel="stylesheet">

Create src/index.css with:
- CSS custom properties mapping brand tokens
- Smooth scroll behavior
- Custom scrollbar (thin, gold thumb on black track)
- ::selection highlight in gold
- Utility classes: .text-gradient-gold, .border-gold-subtle, .bg-card

Create reusable UI components:
1. Button.tsx — variants: primary (gold), outline (gold border), ghost (transparent), danger
2. Badge.tsx — for "Lab Tested", "Organic", "100% Natural" labels
3. SectionTitle.tsx — display font heading + decorative gold underline + optional subtitle
4. Divider.tsx — elegant gold line divider with centered leaf/dot motif SVG
5. Container.tsx — max-w-7xl centered wrapper with responsive px
6. ProductCard.tsx — dark card, product image, gold hover border glow, name, price, Add to Cart
7. LoadingSpinner.tsx — circular gold spinner
8. Toast — use react-hot-toast with custom gold/dark theme config
```

---

## 🧭 PHASE 2 — NAVBAR & FOOTER

### Prompt for AI Tool:

```
Build the Navbar and Footer for ASRA VEDHA WELLNESS. These appear on every public page.

NAVBAR REQUIREMENTS:
- Full width, fixed position, starts transparent over hero, transitions to bg-black/95 with blur on scroll
- Left: Gold text logo "ASRA VEDHA" in Cinzel font with small leaf SVG icon
- Center: Navigation links — Home | About | Products | Quality | Sustainability | Blog | Contact
- Right: Search icon | Cart icon (with item count badge in gold) | User icon (Google login) | "Shop Now" CTA button
- Mobile: Hamburger menu with full-screen dark overlay slide-in drawer
- Active link: gold color + subtle underline animation
- On scroll > 80px: add backdrop-blur-md and border-b border-gold/20

FOOTER REQUIREMENTS:
Build a premium 4-column dark footer:

Column 1 — Brand:
  Logo + "ASRA VEDHA WELLNESS PVT LTD"
  Tagline: "Rooted in Nature, Crafted for Wellness"
  Short description: "Premium Herbal Nutrition | Nutraceuticals | Wellness Products"
  Social icons: Instagram (https://www.instagram.com/asra_vedha_wellness), Facebook (placeholder), LinkedIn (placeholder)

Column 2 — Quick Links:
  Home, About Us, Products, Quality & Certifications, Sustainability, Blog, Contact Us

Column 3 — Products:
  Moringa Powder, Ashwagandha Powder, Amla Powder, Turmeric Powder, Spirulina Powder, Wheatgrass Powder, Beetroot Powder, View All Products

Column 4 — Contact:
  📱 Phone: 7989255841
  ✉️ Email: asravedha@gmail.com
  📍 Plot No. 4, New Ragavendra Colony, Nalgonda — 508001
  Business Hours:
    Mon–Fri: 9:00 AM – 6:30 PM
    Saturday: 9:00 AM – 1:00 PM
    Sunday: Holiday

Bottom bar:
  "© 2024 ASRA VEDHA WELLNESS PVT LTD. All rights reserved."
  Links: Privacy Policy | Terms & Conditions | Refund Policy

WhatsApp Floating Button:
  Fixed bottom-right, green WhatsApp icon, links to wa.me/917989255841
  Show tooltip "Chat with us on WhatsApp" on hover

Design:
  Background: #111111
  Top decorative border: 1px gold gradient line
  Subtle grid texture overlay on footer background
```

---

## 🏠 PHASE 3 — HOME PAGE

### Prompt for AI Tool:

```
Build the complete Home page for ASRA VEDHA WELLNESS. This is the flagship page — make it stunning.

SECTIONS (in order):

1. HERO SECTION
   Full-viewport height. Dark background (#111111) with subtle botanical SVG pattern overlay (leaves, branches in forest green at 5% opacity).
   Large centered layout:
     - Small gold eyebrow text: "PREMIUM AYURVEDIC WELLNESS"
     - Main heading in Cormorant Garamond 7xl: "Premium Herbal Wellness\nInspired by Nature"
     - Gold gradient on "Inspired by Nature"
     - Subtext in DM Sans: "Empowering healthier lifestyles through premium herbal nutrition, superfoods, and natural wellness products."
     - Two CTA buttons: "Shop Now" (gold filled) | "Become a Distributor" (gold outlined)
     - Hero image: floating mortar-and-pestle or herbal powder jar (use a placeholder or CSS art)
     - Scroll indicator: animated chevron in gold at bottom
   Animation: staggered fade-up on heading, subtext, buttons (0.2s delays)

2. TRUST BADGES STRIP
   Dark card strip below hero:
   6 icons in a horizontal row (on mobile: 2x3 grid):
   - 🌿 "100% Natural"
   - 🧪 "Lab Tested"
   - 🌱 "Sustainably Sourced"  
   - 🏆 "Premium Quality"
   - 🤝 "Farmer Supported"
   - 💊 "Clinically Inspired"
   Gold icon, white label, subtle separator lines

3. FEATURED PRODUCTS
   Section title: "Our Signature Products"
   Horizontal scroll or 4-column grid of ProductCards:
   Show: Moringa, Ashwagandha, Amla, Turmeric, Spirulina, Wheatgrass, Beetroot Powder
   Each card: dark bg (#1E1E1E), product name, short benefit line, price placeholder, "Add to Cart" button, gold glow on hover
   "View All Products" CTA below

4. WHY CHOOSE US
   Alternating layout (text left / icon right):
   6 points from brand doc:
   - Premium Quality | Natural Ingredients | Lab Tested | Sustainable Sourcing | Modern Wellness | Trusted Brand
   Each with gold icon, bold title, description
   Background: very subtle forest green tint

5. OUR PROCESS
   Horizontal stepped flow (5 steps):
   Step 1: Raw Material Selection → Step 2: Quality Inspection → Step 3: Processing & Packaging → Step 4: Quality Control → Step 5: Premium Delivery
   Connected by gold dashed line
   Mobile: vertical stepper

6. STATS COUNTER
   4 animated counters (count up on scroll into view):
   - "500+" Farmer Partners
   - "8+" Product Range
   - "100%" Natural Ingredients
   - "10K+" Happy Customers

7. TESTIMONIALS
   Dark section with 3 customer cards in a slider
   Each: quote text, star rating, customer name and city
   Use placeholder testimonials

8. BLOG PREVIEW
   Section title: "Wellness Insights"
   3 latest blog post cards: thumbnail, category badge, title, excerpt, "Read More" link
   Link to /blog

9. CTA BANNER
   Forest green background, gold text:
   "Start Your Wellness Journey Today"
   Subtitle: "Pure. Natural. Effective."
   Two buttons: "Shop Now" | "Contact Us"
```

---

## 📖 PHASE 4 — ABOUT, QUALITY, SUSTAINABILITY, DISTRIBUTOR PAGES

### Prompt for AI Tool:

```
Build 4 content pages for ASRA VEDHA WELLNESS. Each should use the same design language.

PAGE 1: ABOUT US (/about)
Sections:
  1. Page Hero — "Our Story" heading, dark background with gold botanical border
  2. Brand Story — company description, mission to bring nature to modern lifestyles
  3. Mission & Vision — two-column cards: forest green (Mission) + dark (Vision)
     Mission points: 5 bullet items from brief
     Vision: "Globally trusted wellness brand..."
  4. Core Values — 7 values in animated icon grid:
     Purity | Integrity | Sustainability | Wellness | Innovation | Transparency | Customer Trust
  5. Meet Our Promise — full-width text block with gold accent quote
  6. CTA: "Explore Our Products"

PAGE 2: QUALITY & CERTIFICATIONS (/quality)
Sections:
  1. Page Hero — "Uncompromising Quality"
  2. Our Process (detailed) — 5-step vertical timeline with icons and descriptions
  3. Quality Pillars — grid of 4: Sourcing | Testing | Processing | Packaging
  4. Lab Testing — "Every batch rigorously tested" section with checklist items
  5. Certifications — placeholder cert badges (FSSAI, GMP, ISO, Organic) with descriptions
  6. Quality Promise — dark CTA section

PAGE 3: SUSTAINABILITY (/sustainability)
Sections:
  1. Page Hero — forest green gradient, "Rooted in Responsibility"
  2. Our Commitment — 5 commitment cards:
     Supporting Local Farmers | Sustainable Sourcing | Eco-conscious Packaging | Natural Wellness | Reducing Environmental Impact
  3. Farmer Partnership Story — image + text alternating layout
  4. Future Goals — timeline of eco initiatives
  5. Join Our Mission CTA

PAGE 4: DISTRIBUTOR / EXPORT ENQUIRY (/distributor)
Sections:
  1. Hero: "Partner With ASRA VEDHA"
  2. Why Partner — 4 benefits with icons
  3. Who We're Looking For — distributors, retailers, exporters, wellness stores
  4. Future Products Pipeline — Herbal Capsules, Gummies, Functional Foods, Herbal Teas, Beverages, Sports Nutrition, Ayurvedic Skincare, International Distribution
  5. B2B Enquiry Form:
     Fields: Full Name, Company Name, Country, City, Phone, Email, Business Type (dropdown: Distributor / Retailer / Export / Wellness Chain), Message
     Submit button → POST /api/enquiry/distributor
     On success: show gold success toast + "Our team will contact you within 24 hours"
```

---

## 🛍️ PHASE 5 — PRODUCTS PAGE & PRODUCT DETAIL

### Prompt for AI Tool:

```
Build the Products catalog page and Product Detail page for ASRA VEDHA WELLNESS.

PRODUCTS PAGE (/products):
  1. Page Header: "Our Wellness Collection" with category filter tabs
  2. Category Filter Tabs (horizontal pill tabs):
     All | Herbal Powders | Nutraceuticals | Superfoods | Immunity | Fitness
  3. Product Grid: responsive 4-col desktop / 2-col tablet / 1-col mobile
     Each ProductCard:
       - Product image (use placeholder with herb name)
       - Category badge (gold)
       - Product name (Cormorant Garamond, 20px)
       - Benefit tagline (DM Sans, muted)
       - Price (gold, bold)
       - "Add to Cart" button + Wishlist heart icon
       - "Lab Tested" micro-badge
       - Hover: card lifts with gold glow shadow
  4. No-results empty state with illustration

Initial products to seed (from brand brief):
  Herbal Powders:
    1. Moringa Powder — "Rich in vitamins and antioxidants" — ₹299
    2. Ashwagandha Powder — "Adaptogen for stress and vitality" — ₹349
    3. Amla Powder — "Vitamin C powerhouse for immunity" — ₹249
    4. Turmeric Powder — "Anti-inflammatory golden spice" — ₹199
    5. Curry Leaves Powder — "Iron-rich hair and digestion booster" — ₹249
    6. Spirulina Powder — "Complete protein superfood" — ₹449
    7. Wheatgrass Powder — "Detox and energy green superfood" — ₹349
    8. Beetroot Powder — "Natural nitric oxide for stamina" — ₹299
  Nutraceuticals:
    9. Herbal Capsules — "Concentrated wellness in a capsule" — ₹599
    10. Superfood Blend — "Multi-herb daily wellness formula" — ₹799
    11. Immunity Booster — "7-herb immune support complex" — ₹499
    12. Fitness Nutrition — "Plant-based performance blend" — ₹699

PRODUCT DETAIL PAGE (/products/:slug):
  1. Breadcrumb: Home > Products > Moringa Powder
  2. Product Hero: 2-column layout
     Left: Image gallery (main + 3 thumbnails)
     Right:
       - Category badge
       - Product name (large Cormorant Garamond)
       - Star rating + review count
       - Price (gold)
       - Short description
       - Benefits list (5 bullet points)
       - Quantity selector (- number +)
       - "Add to Cart" (gold button) + "Buy Now" (forest green)
       - Wishlist | Share icons
       - Delivery info: "Free delivery on orders above ₹499"
  3. Tabs Section: Description | Ingredients | How to Use | Reviews
  4. Related Products row (4 cards)
```

---

## ✍️ PHASE 6 — BLOG & CONTACT PAGES

### Prompt for AI Tool:

```
Build the Blog and Contact pages for ASRA VEDHA WELLNESS.

BLOG PAGE (/blog):
  1. Header: "Wellness Insights" + search bar
  2. Featured post (large card at top)
  3. Category filter: All | Nutrition | Herbs | Lifestyle | Recipes | Research
  4. Blog grid: 3-column, each card:
     - Thumbnail image with category overlay badge
     - Published date
     - Title (Cormorant Garamond)
     - Excerpt (2 lines, truncated)
     - Author name + "Read More →"
  5. Pagination

BLOG POST PAGE (/blog/:slug):
  1. Hero: full-width post image + overlay gradient
  2. Category badge + title + author + date + read time
  3. Article body — styled prose:
     Use Tailwind typography-like styles:
     Headings in Cormorant Garamond
     Body in DM Sans 18px line-height 1.8
     Blockquotes in gold left-border style
  4. Sidebar: Related Posts + Newsletter Signup box
  5. Author card at bottom
  6. Social share: WhatsApp | Facebook | Copy Link

CONTACT PAGE (/contact):
  Layout: 2-column — left form, right info card
  
  LEFT — Contact Form:
    Full Name | Email | Phone | Subject (dropdown) | Message
    Submit → POST /api/contact
    Success: gold toast + "We'll respond within 24 hours"
  
  RIGHT — Contact Info Card (dark forest green card):
    📱 Phone: 7989255841 (clickable tel:)
    ✉️ Email: asravedha@gmail.com (clickable mailto:)
    📍 Plot No. 4, New Ragavendra Colony, Nalgonda — 508001
    
    Business Hours:
      Monday–Friday: 9:00 AM – 6:30 PM
      Saturday: 9:00 AM – 1:00 PM
      Sunday: Holiday
    
    WhatsApp CTA: "Chat with us" → wa.me/917989255841
  
  Below: Google Maps embed (Nalgonda, Telangana, India)
```

---

## 🔐 PHASE 7 — AUTHENTICATION (GOOGLE LOGIN)

### Prompt for AI Tool:

```
Implement Google OAuth 2.0 authentication for ASRA VEDHA WELLNESS.

BACKEND SETUP (server/):

1. Install and configure passport-google-oauth20
   - Create Google OAuth app in Google Cloud Console
   - Callback URL: /api/auth/google/callback
   - Scopes: profile, email

2. PostgreSQL User model (Prisma schema + src/models/User.ts types):
   {
     id: UUID/string primary key,
     googleId: text unique,
     name: text,
     email: text unique,
     avatar: text nullable,
     phone: text nullable,
     role: enum ['customer', 'admin'] default 'customer',
     addresses: one-to-many Address relation,
     wishlist: many-to-many Product relation,
     createdAt, updatedAt timestamps
   }

3. Auth Routes (src/routes/auth.ts):
   GET /api/auth/google → redirect to Google
   GET /api/auth/google/callback → handle callback, set JWT in httpOnly cookie, redirect to frontend
   GET /api/auth/me → return current user from JWT
   POST /api/auth/logout → clear cookie

4. JWT middleware (src/middleware/auth.ts):
   - Extract JWT from httpOnly cookie
   - Verify and attach user to req.user
   - isAdmin middleware: check req.user.role === 'admin'

FRONTEND SETUP (client/):

1. Zustand auth store (src/store/authStore.ts):
   { user, isAuthenticated, isLoading, login, logout, fetchUser }

2. Google Login button component:
   - "Sign in with Google" gold-outlined button with Google icon
   - onClick: window.location.href = '/api/auth/google'
   - Show in Navbar dropdown + on /login page

3. Protected Route wrapper:
   - <ProtectedRoute> → redirect to /login if not authenticated
   - <AdminRoute> → redirect to / if not admin

4. On successful login:
   - Fetch /api/auth/me, store user in Zustand
   - Show user avatar in Navbar with dropdown:
     My Profile | My Orders | Wishlist | Logout

5. Login page (/login):
   Centered card on dark background:
   ASRA VEDHA logo
   "Welcome Back" heading
   "Sign in to continue your wellness journey"
   Google Sign In button
   "New here? Google login automatically creates your account"
```

---

## 🛒 PHASE 8 — CART, CHECKOUT & RAZORPAY

### Prompt for AI Tool:

```
Build the complete cart, checkout, and Razorpay payment flow for ASRA VEDHA WELLNESS.

CART (Zustand store + Slide-over panel):

Cart store (src/store/cartStore.ts):
  { items: CartItem[], addItem, removeItem, updateQuantity, clearCart, totalPrice, totalItems }
  CartItem: { product, quantity, selectedWeight }

Cart UI:
  - Slide-over panel from right (Framer Motion)
  - Cart icon in Navbar shows item count badge
  - Each cart item: image, name, weight, qty stepper, price, remove button
  - Order summary: subtotal, shipping (free above ₹499), discount (coupon), total
  - Coupon code input: "Apply Coupon" → POST /api/coupons/validate
  - "Proceed to Checkout" gold button (requires login)

CHECKOUT PAGE (/checkout):
  2-column layout:
  
  LEFT — Checkout Form:
    Step 1: Delivery Address
      Full Name | Phone | Pincode | Address Line 1 | City | State
      "Use saved address" if logged in
    Step 2: Order Review
      List of items with images
    Step 3: Payment
      Razorpay payment button
  
  RIGHT — Order Summary Card (sticky):
    Items | Subtotal | Shipping | Coupon Discount | Total in Gold

RAZORPAY INTEGRATION:

Backend (server/):
  POST /api/orders/create-razorpay-order:
    - Calculate total
    - Create Razorpay order: razorpay.orders.create({ amount: total*100, currency: 'INR', receipt })
    - Return { orderId, amount, currency, keyId }

  POST /api/orders/verify-payment:
    - Verify razorpay_payment_id + razorpay_order_id + razorpay_signature using HMAC SHA256
    - On success: create Order in DB, clear cart, send confirmation email

Frontend:
  - Load Razorpay checkout.js from CDN
  - On "Pay Now" click:
    1. Call /api/orders/create-razorpay-order
    2. Open Razorpay modal with:
       { key, amount, currency, name: "ASRA VEDHA WELLNESS", description, image: logo, order_id, prefill: { name, email, contact }, theme: { color: '#C8A45D' } }
    3. On payment success: call /api/orders/verify-payment
    4. On verified: redirect to /order-success page

Order Success Page:
  - Gold checkmark animation
  - "Order Placed Successfully!" heading
  - Order ID, estimated delivery
  - Buttons: "View Order" | "Continue Shopping"

ORDER MODEL (PostgreSQL/Prisma):
{
  id: UUID/string primary key,
  userId: UUID/string -> User.id,
  orderNumber: text unique, auto-generated: AV-YYYYMMDD-XXXX,
  items: JSON array or normalized OrderItem table [{ productId, name, image, price, quantity, weight }],
  shippingAddress: { name, phone, address, city, state, pincode },
  couponCode: text nullable,
  subtotal, discount, shippingFee, total: Decimal,
  paymentStatus: enum ['pending', 'paid', 'failed'],
  orderStatus: enum ['placed', 'processing', 'shipped', 'delivered', 'cancelled'],
  razorpayOrderId, razorpayPaymentId: text,
  createdAt, updatedAt timestamps
}
```

---

## 👤 PHASE 9 — USER DASHBOARD

### Prompt for AI Tool:

```
Build the User Dashboard for ASRA VEDHA WELLNESS (logged-in customers).

Route: /dashboard (protected, requires login)

Layout: Sidebar (collapsible on mobile) + Content Area

Sidebar menu items:
  👤 My Profile
  📦 My Orders
  ❤️ Wishlist
  📍 Saved Addresses
  🔔 Notifications
  🚪 Logout

PROFILE PAGE (/dashboard/profile):
  - Avatar (Google profile picture)
  - Editable: Display Name, Phone Number
  - Email (read-only, from Google)
  - Save changes button → PATCH /api/users/me

MY ORDERS PAGE (/dashboard/orders):
  - List of past orders sorted by date (newest first)
  - Each order row:
    Order #AV-XXXXXX | Date | Items count | Total | Status badge | "View Details" button
  - Status badges: Placed (blue) | Processing (amber) | Shipped (purple) | Delivered (green) | Cancelled (red)
  - Order detail modal:
    Items, delivery address, payment info, timeline progress tracker

WISHLIST PAGE (/dashboard/wishlist):
  - Product cards for wishlisted items
  - "Add to Cart" | "Remove from Wishlist" on each

SAVED ADDRESSES (/dashboard/addresses):
  - List saved delivery addresses
  - Add / Edit / Delete address
  - Set default address

Backend APIs for Dashboard:
  GET /api/users/me → profile
  PATCH /api/users/me → update name/phone
  GET /api/users/me/orders → paginated order history
  GET /api/users/me/wishlist → populated wishlist
  POST /api/users/me/wishlist/:productId → toggle wishlist
  GET /api/users/me/addresses → saved addresses
  POST /api/users/me/addresses → add address
  PUT /api/users/me/addresses/:id → update
  DELETE /api/users/me/addresses/:id → delete
```

---

## ⚙️ PHASE 10 — ADMIN PANEL

### Prompt for AI Tool:

```
Build a complete Admin Panel for ASRA VEDHA WELLNESS. Access at /admin (protected: isAdmin role only).

ADMIN LAYOUT:
  Dark sidebar (bg-black-soft) + top header with admin name
  Sidebar menu:
    📊 Dashboard
    📦 Products
    🖼️ Banners
    🎟️ Coupons
    📋 Orders
    ✍️ Blog
    📩 Enquiries
    👥 Customers
    ⚙️ Settings

ADMIN DASHBOARD (/admin):
  Stats cards row (gold accent):
    Total Orders Today | Total Revenue | Pending Orders | Total Products
  Recent orders table (last 10)
  Revenue chart (last 7 days, simple bar chart with Recharts)
  Low stock alerts

PRODUCTS MANAGEMENT (/admin/products):
  Table: Image | Name | Category | Price | Stock | Status | Actions
  Actions: Edit | Delete | Toggle Published
  
  Add/Edit Product modal or drawer with form:
    Product Name | Slug (auto-generated) | Category (select) | Description | Benefits (textarea)
    Price (₹) | Compare Price (strikethrough) | Stock quantity
    Weight options: (100g, 250g, 500g, 1kg with prices)
    Images: Multi-image upload → Cloudinary
    Tags: (comma separated)
    Published: toggle
    How to Use | Ingredients fields
    SEO: Meta title, meta description
  
  Backend:
    GET /api/admin/products (paginated + search + filter)
    POST /api/admin/products
    PUT /api/admin/products/:id
    DELETE /api/admin/products/:id
    POST /api/admin/upload → upload to Cloudinary, return URL

BANNERS MANAGEMENT (/admin/banners):
  List of homepage/promo banners
  Each banner: image preview, title, subtitle, CTA link, position, active toggle
  Add/Edit: Image upload, title, subtitle, button text, button link, display order, active
  Backend: full CRUD on Banner model

COUPONS MANAGEMENT (/admin/coupons):
  Table: Code | Type | Value | Min Order | Usage | Expiry | Status | Actions
  
  Add/Edit Coupon form:
    Coupon Code (uppercase, unique)
    Discount Type: Percentage (%) | Fixed Amount (₹)
    Discount Value
    Minimum Order Value
    Maximum Discount Cap (for % type)
    Total Usage Limit
    Per User Limit
    Expiry Date
    Active toggle
  
  Backend:
    GET /api/admin/coupons
    POST /api/admin/coupons
    PUT /api/admin/coupons/:id
    DELETE /api/admin/coupons/:id
    POST /api/coupons/validate (public: validate code + apply discount)

ORDERS MANAGEMENT (/admin/orders):
  Table with filters: Status | Date Range | Search by order # or customer
  Each row: Order # | Customer | Items | Total | Payment | Status | Date | Actions
  
  Order detail side panel:
    Customer info + contact
    Order items with images
    Shipping address
    Payment details
    Update Order Status dropdown: (placed → processing → shipped → delivered / cancelled)
    Add tracking number input
    Send notification to customer on status change
  
  Backend:
    GET /api/admin/orders (paginated, filtered)
    GET /api/admin/orders/:id
    PATCH /api/admin/orders/:id/status → update status + send email

BLOG MANAGEMENT (/admin/blog):
  List: Title | Author | Category | Status | Date | Actions
  Add/Edit blog post form:
    Title | Slug | Category | Cover Image | Content (rich text — use react-quill or a textarea)
    Tags | SEO fields | Published toggle

ENQUIRIES (/admin/enquiries):
  Two tabs: Contact | Distributor
  Table: Name | Email | Phone | Type | Message | Date | Status (Read/Unread)
  Click row to view full message, mark as read

CUSTOMERS (/admin/customers):
  Table: Name | Email | Phone | Orders | Total Spent | Joined | Actions
  View customer order history

Backend admin routes all require isAdmin middleware.
Seed first admin: set role: 'admin' directly in PostgreSQL or via a Prisma seed script for the email: asravedha@gmail.com
```

---

## 📧 PHASE 11 — EMAIL NOTIFICATIONS

### Prompt for AI Tool:

```
Set up automated email notifications for ASRA VEDHA WELLNESS using Nodemailer.

Email service (server/src/services/emailService.ts):
  - Transport: Gmail SMTP or Resend API
  - From: "ASRA VEDHA WELLNESS <asravedha@gmail.com>"

EMAIL TEMPLATES (HTML emails, styled with inline CSS):
  Design tokens: gold (#C8A45D), black (#111111), off-white (#F8F5EF)
  Logo in header, footer with contact info

Templates to create:

1. ORDER CONFIRMATION (to customer on payment success):
   Subject: "Your ASRA VEDHA Order #AV-XXXX is Confirmed! 🌿"
   Content: 
     - Order summary with product names, quantities, prices
     - Delivery address
     - Total paid
     - "Track your order" CTA
     - Estimated delivery: 5-7 business days
     - WhatsApp contact for queries

2. ORDER STATUS UPDATE (on admin status change):
   Subject: "Your Order is [Processing/Shipped/Delivered]"
   Include tracking number if shipped

3. CONTACT FORM ACKNOWLEDGEMENT:
   Subject: "Thank you for contacting ASRA VEDHA WELLNESS"
   "We've received your message and will respond within 24 hours"

4. DISTRIBUTOR ENQUIRY ACKNOWLEDGEMENT:
   Subject: "Thank you for your Partnership Interest — ASRA VEDHA"
   "Our B2B team will reach out within 48 hours"

5. ADMIN NOTIFICATION (internal) on new order:
   Subject: "New Order Received — #AV-XXXX"
   Quick summary to asravedha@gmail.com

Trigger emails from:
  - POST /api/orders/verify-payment → order confirmation
  - PATCH /api/admin/orders/:id/status → status update
  - POST /api/contact → contact acknowledgement
  - POST /api/enquiry/distributor → distributor acknowledgement
```

---

## 🧪 PHASE 12 — FINAL SETUP, ENV & DEPLOYMENT GUIDE

### Prompt for AI Tool:

```
Complete the ASRA VEDHA WELLNESS project with environment configuration, error handling, and deployment setup.

ENVIRONMENT VARIABLES (.env for server):
  NODE_ENV=development
  PORT=5000
  DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require
  # Use Neon PostgreSQL now. After deployment, replace this with the VPS PostgreSQL connection URL.
  DIRECT_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require
  JWT_SECRET=your_jwt_secret_64chars
  JWT_EXPIRY=7d
  
  GOOGLE_CLIENT_ID=your_google_client_id
  GOOGLE_CLIENT_SECRET=your_google_client_secret
  GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
  
  CLOUDINARY_CLOUD_NAME=
  CLOUDINARY_API_KEY=
  CLOUDINARY_API_SECRET=
  
  RAZORPAY_KEY_ID=
  RAZORPAY_KEY_SECRET=
  
  SMTP_HOST=smtp.gmail.com
  SMTP_PORT=587
  SMTP_USER=asravedha@gmail.com
  SMTP_PASS=your_app_password
  
  ADMIN_EMAIL=asravedha@gmail.com
  FRONTEND_URL=http://localhost:5173
  SESSION_SECRET=your_session_secret

CLIENT .env:
  VITE_API_URL=http://localhost:5000/api
  VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
  VITE_GOOGLE_CLIENT_ID=your_google_client_id

GLOBAL ERROR HANDLING:
  - Express error handler middleware (catches all async errors)
  - 404 handler for unknown routes
  - Axios response interceptor: auto logout on 401, show toast on 500
  - React ErrorBoundary wrapping the app

SECURITY:
  - helmet() on Express for security headers
  - cors: allow only FRONTEND_URL origin with credentials
  - express-rate-limit: 100 req/15min on /api, stricter on /api/auth
  - Use Prisma/parameterized PostgreSQL queries only; never concatenate raw SQL input
  - Validate and sanitize request bodies with Zod before writing to PostgreSQL
  - JWT in httpOnly, SameSite=strict, Secure cookies (not localStorage)

PERFORMANCE:
  - Vite build optimizations: code splitting per route
  - Images: lazy loading, blur placeholder pattern
  - Tailwind: purge unused CSS
  - Express: gzip compression middleware

DATABASE SEEDING:
  Create server/src/seeds/seed.ts:
  - Seed 12 products from Phase 5 list
  - Seed 3 sample blog posts
  - Seed 2 home page banners
  - Seed 2 sample coupons: WELCOME10 (10% off, no min), WELLNESS50 (₹50 off, min ₹499)
  - Set admin role for asravedha@gmail.com

DEPLOYMENT CHECKLIST:
  Frontend → Vercel (set VITE_ env vars in dashboard)
  Backend → Railway or Render (set all env vars in dashboard)
  Database → Neon PostgreSQL for now
  Later database migration → VPS-hosted PostgreSQL; update DATABASE_URL/DIRECT_URL and run Prisma migrations/backups
  Images → Cloudinary (free tier)
  Update GOOGLE_CALLBACK_URL to production URL
  Update CORS FRONTEND_URL to production Vercel URL
  Test Razorpay with test keys first, switch to live keys on launch
  
FINAL CHECKS:
  ✅ All routes return proper HTTP status codes
  ✅ All forms have validation (frontend + backend)
  ✅ Mobile responsive on all 8 public pages
  ✅ Admin panel mobile usable (responsive table → cards)
  ✅ WhatsApp floating button on all pages
  ✅ Google Analytics ready (add GA4 script in index.html)
  ✅ Sitemap.xml and robots.txt
  ✅ favicon and OG meta tags for social sharing
  ✅ Page titles: "Moringa Powder | ASRA VEDHA WELLNESS"
  ✅ 404 page with "Back to Home" button
```

---

## 🗂️ QUICK REFERENCE — API ROUTE MAP

```
AUTH
  GET  /api/auth/google
  GET  /api/auth/google/callback
  GET  /api/auth/me
  POST /api/auth/logout

PRODUCTS (Public)
  GET  /api/products                    → all products (filter, search, paginate)
  GET  /api/products/featured           → 4 featured products for home page
  GET  /api/products/:slug              → single product detail

CART & WISHLIST
  POST /api/users/me/wishlist/:productId → toggle wishlist

COUPONS
  POST /api/coupons/validate            → { code, cartTotal } → discount

ORDERS
  POST /api/orders/create-razorpay-order
  POST /api/orders/verify-payment

CONTACT & ENQUIRY
  POST /api/contact
  POST /api/enquiry/distributor

USER DASHBOARD
  GET  /api/users/me
  PATCH /api/users/me
  GET  /api/users/me/orders
  GET  /api/users/me/wishlist
  GET/POST/PUT/DELETE /api/users/me/addresses

ADMIN (all require isAdmin)
  CRUD /api/admin/products
  CRUD /api/admin/banners
  CRUD /api/admin/coupons
  GET/PATCH /api/admin/orders
  CRUD /api/admin/blog
  GET  /api/admin/enquiries
  GET  /api/admin/customers
  POST /api/admin/upload
```

---

## 🌿 DESIGN SIGNATURE — ONE THING TO REMEMBER

> The ASRA VEDHA website must feel like opening a hand-crafted wooden box from an Indian apothecary. Dark, warm, and rich. Gold like the turmeric inside. Green like the moringa leaves. Every hover should feel like touching silk. The brand is **earned trust** — not flashy, not cheap. **Luxury that heals.**

---

*Document version: 1.0 | Built for: ASRA VEDHA WELLNESS PVT LTD*
*Tech: Vite + React 18 + TypeScript + Tailwind CSS v3 + Node.js + Express + PostgreSQL (Neon now, VPS later) + Razorpay*
