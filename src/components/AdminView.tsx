import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  BadgePercent,
  FileText,
  Image,
  Inbox,
  LayoutDashboard,
  Package,
  RefreshCcw,
  Save,
  ShoppingBag,
  Trash2,
  Users
} from 'lucide-react';
import { Product } from '../types';

type AdminTab = 'dashboard' | 'products' | 'orders' | 'enquiries' | 'blog' | 'coupons' | 'banners' | 'customers';

type AdminProduct = Product & {
  databaseId?: string;
  stock?: number;
  isPublished?: boolean;
  isFeatured?: boolean;
};

const tabs: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingBag },
  { id: 'enquiries', label: 'Enquiries', icon: Inbox },
  { id: 'blog', label: 'Blog', icon: FileText },
  { id: 'coupons', label: 'Coupons', icon: BadgePercent },
  { id: 'banners', label: 'Banners', icon: Image },
  { id: 'customers', label: 'Customers', icon: Users }
];

const initialProductForm = {
  name: '',
  slug: '',
  category: 'herbal-powders',
  price: '299',
  stock: '100',
  image: '',
  description: '',
  benefitTagline: '',
  ingredients: ''
};

async function apiGet(path: string) {
  const response = await fetch(path, { credentials: 'include' });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `Request failed: ${response.status}`);
  }
  return response.json();
}

async function apiSend(path: string, method: string, body?: unknown) {
  const response = await fetch(path, {
    method,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `Request failed: ${response.status}`);
  }
  return response.json();
}

export default function AdminView() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [summary, setSummary] = useState<Record<string, number>>({});
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<{ contact: any[]; distributor: any[] }>({ contact: [], distributor: [] });
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [coupons, setCoupons] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [productForm, setProductForm] = useState(initialProductForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const unreadEnquiryRows = useMemo(
    () => [
      ...enquiries.contact.map((item) => ({ ...item, type: 'Contact' })),
      ...enquiries.distributor.map((item) => ({ ...item, type: 'Distributor', name: item.fullName, subject: item.businessType }))
    ],
    [enquiries]
  );

  const loadAdminData = async () => {
    setLoading(true);
    setError('');
    try {
      const [summaryData, productData, orderData, enquiryData, blogData, couponData, bannerData, customerData] =
        await Promise.all([
          apiGet('/api/admin/summary'),
          apiGet('/api/admin/products'),
          apiGet('/api/admin/orders'),
          apiGet('/api/admin/enquiries'),
          apiGet('/api/admin/blog'),
          apiGet('/api/admin/coupons'),
          apiGet('/api/admin/banners'),
          apiGet('/api/admin/customers')
        ]);

      setSummary(summaryData);
      setProducts(productData.items || []);
      setOrders(orderData.items || []);
      setEnquiries(enquiryData);
      setBlogPosts(blogData.items || []);
      setCoupons(couponData.items || []);
      setBanners(bannerData.items || []);
      setCustomers(customerData.items || []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load admin data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const createProduct = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      const price = Number(productForm.price);
      const stock = Number(productForm.stock);
      await apiSend('/api/admin/products', 'POST', {
        ...productForm,
        price,
        stock,
        images: productForm.image ? [{ url: productForm.image, alt: productForm.name, sortOrder: 0 }] : [],
        weights: [{ label: productForm.category === 'nutraceuticals' ? '60 capsules' : '100g', price, stock }],
        benefits: [],
        qualityBadges: ['Lab Tested'],
        tags: ['Lab Tested'],
        isOrganic: true,
        isPublished: true,
        isFeatured: false
      });
      setProductForm(initialProductForm);
      await loadAdminData();
      setActiveTab('products');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Unable to save product.');
    } finally {
      setSaving(false);
    }
  };

  const toggleProductPublished = async (product: AdminProduct) => {
    const id = product.databaseId || product.id;
    await apiSend(`/api/admin/products/${id}`, 'PATCH', { isPublished: !product.isPublished });
    await loadAdminData();
  };

  const deleteProduct = async (product: AdminProduct) => {
    const id = product.databaseId || product.id;
    await apiSend(`/api/admin/products/${id}`, 'DELETE');
    await loadAdminData();
  };

  return (
    <div className="min-h-screen bg-[#EDEDEC] text-[rgba(0,0,0,0.87)] pt-24 px-6 md:px-12 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[rgba(0,0,0,0.06)] pb-8">
          <div>
            <span className="font-sans text-xs tracking-[0.22em] uppercase text-[#C9A84C] font-bold">Admin Panel</span>
            <h1 className="font-display text-4xl md:text-5xl text-[rgba(0,0,0,0.87)] mt-3">Asra Vedha Operations</h1>
          </div>
          <button
            onClick={loadAdminData}
            className="border border-[#C9A84C]/40 text-[#C9A84C] px-4 py-3 rounded-full text-sm font-bold inline-flex items-center justify-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {error && (
          <div className="mt-6 bg-red-100 border border-red-400/30 text-red-100 rounded-lg p-4 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          <aside className="lg:col-span-3">
            <nav className="bg-white border border-[rgba(0,0,0,0.06)] rounded-lg p-2 sticky top-28">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left text-xs uppercase tracking-wider transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#C9A84C]/35 text-[#C9A84C]'
                        : 'text-[rgba(0,0,0,0.58)] hover:text-[#C9A84C] hover:bg-[#EDEDEC]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          <main className="lg:col-span-9 space-y-8">
            {loading ? (
              <div className="bg-white border border-[rgba(0,0,0,0.06)] rounded-lg p-10 text-sm text-[rgba(0,0,0,0.38)]">
                Loading admin data...
              </div>
            ) : (
              <>
                {activeTab === 'dashboard' && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      ['Products', summary.products || 0],
                      ['Orders', summary.orders || 0],
                      ['Customers', summary.customers || 0],
                      ['Unread Enquiries', summary.unreadEnquiries || 0],
                      ['Coupons', summary.coupons || 0],
                      ['Blog Posts', summary.blogPosts || 0]
                    ].map(([label, value]) => (
                      <div key={label} className="bg-white border border-[rgba(0,0,0,0.06)] rounded-lg p-5">
                        <span className="text-[10px] uppercase tracking-widest text-[rgba(0,0,0,0.38)]">{label}</span>
                        <div className="font-display text-3xl text-[#C9A84C] mt-2">{value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'products' && (
                  <section className="space-y-6">
                    <form onSubmit={createProduct} className="bg-white border border-[rgba(0,0,0,0.06)] rounded-lg p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <h2 className="md:col-span-2 font-display text-2xl text-[rgba(0,0,0,0.87)]">Create Product</h2>
                      {[
                        ['name', 'Product name'],
                        ['slug', 'Slug'],
                        ['price', 'Price'],
                        ['stock', 'Stock'],
                        ['image', 'Image URL'],
                        ['benefitTagline', 'Short tagline'],
                        ['ingredients', 'Ingredients']
                      ].map(([field, label]) => (
                        <label key={field} className="space-y-2">
                          <span className="text-[10px] uppercase tracking-widest text-[rgba(0,0,0,0.38)]">{label}</span>
                          <input
                            value={(productForm as any)[field]}
                            onChange={(event) => setProductForm({ ...productForm, [field]: event.target.value })}
                            className="w-full bg-[#EDEDEC] border border-[#C9A84C]/55 rounded px-3 py-2.5 text-sm text-[rgba(0,0,0,0.87)] focus:outline-none focus:border-[#C9A84C]"
                            required={field !== 'slug' && field !== 'image'}
                          />
                        </label>
                      ))}
                      <label className="space-y-2">
                        <span className="text-[10px] uppercase tracking-widest text-[rgba(0,0,0,0.38)]">Category</span>
                        <select
                          value={productForm.category}
                          onChange={(event) => setProductForm({ ...productForm, category: event.target.value })}
                          className="w-full bg-[#EDEDEC] border border-[#C9A84C]/55 rounded px-3 py-2.5 text-sm text-[rgba(0,0,0,0.87)] focus:outline-none focus:border-[#C9A84C]"
                        >
                          <option value="herbal-powders">Herbal Powders</option>
                          <option value="nutraceuticals">Nutraceuticals</option>
                          <option value="superfoods">Superfoods</option>
                          <option value="immunity">Immunity</option>
                          <option value="fitness">Fitness</option>
                        </select>
                      </label>
                      <label className="md:col-span-2 space-y-2">
                        <span className="text-[10px] uppercase tracking-widest text-[rgba(0,0,0,0.38)]">Description</span>
                        <textarea
                          value={productForm.description}
                          onChange={(event) => setProductForm({ ...productForm, description: event.target.value })}
                          className="w-full bg-[#EDEDEC] border border-[#C9A84C]/55 rounded px-3 py-2.5 text-sm text-[rgba(0,0,0,0.87)] focus:outline-none focus:border-[#C9A84C]"
                          rows={3}
                          required
                        />
                      </label>
                      <button
                        type="submit"
                        disabled={saving}
                        className="md:col-span-2 bg-[#C9A84C] text-[rgba(0,0,0,0.87)] px-5 py-3 rounded-full text-sm font-bold inline-flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        {saving ? 'Saving...' : 'Create Product'}
                      </button>
                    </form>

                    <div className="bg-white border border-[rgba(0,0,0,0.06)] rounded-lg overflow-hidden">
                      {products.map((product) => (
                        <div key={product.databaseId || product.id} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 p-4 border-b border-[#C9A84C]/20 last:border-0">
                          <div className="flex gap-4">
                            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded bg-white" />
                            <div>
                              <h3 className="font-display text-lg text-[rgba(0,0,0,0.87)]">{product.name}</h3>
                              <p className="text-xs text-[rgba(0,0,0,0.38)] mt-1">{product.category} | Rs. {product.price} | Stock {product.stock ?? 0}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleProductPublished(product)}
                              className="border border-[#C9A84C]/40 text-[#C9A84C] px-3 py-2 rounded text-[10px] uppercase tracking-wider"
                            >
                              {product.isPublished ? 'Published' : 'Draft'}
                            </button>
                            <button
                              onClick={() => deleteProduct(product)}
                              className="border border-red-400/35 text-red-300 px-3 py-2 rounded"
                              aria-label={`Delete ${product.name}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {activeTab === 'orders' && <SimpleRows rows={orders} columns={['orderNumber', 'orderStatus', 'paymentStatus', 'total']} empty="No orders yet." />}
                {activeTab === 'enquiries' && <SimpleRows rows={unreadEnquiryRows} columns={['type', 'name', 'email', 'phone', 'subject', 'status']} empty="No enquiries yet." />}
                {activeTab === 'blog' && <SimpleRows rows={blogPosts} columns={['title', 'category', 'isPublished', 'publishedAt']} empty="No blog posts yet." />}
                {activeTab === 'coupons' && <SimpleRows rows={coupons} columns={['code', 'discountType', 'value', 'minOrderValue', 'isActive']} empty="No coupons yet." />}
                {activeTab === 'banners' && <SimpleRows rows={banners} columns={['title', 'position', 'displayOrder', 'isActive']} empty="No banners yet." />}
                {activeTab === 'customers' && <SimpleRows rows={customers} columns={['name', 'email', 'phone', 'role', 'createdAt']} empty="No customers yet." />}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function SimpleRows({ rows, columns, empty }: { rows: any[]; columns: string[]; empty: string }) {
  if (!rows.length) {
    return (
      <div className="bg-white border border-[rgba(0,0,0,0.06)] rounded-lg p-8 text-sm text-[rgba(0,0,0,0.38)]">
        {empty}
      </div>
    );
  }

  return (
    <div className="bg-white border border-[rgba(0,0,0,0.06)] rounded-lg overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="bg-[#f2f0eb] text-[#C9A84C] uppercase tracking-wider">
          <tr>
            {columns.map((column) => (
              <th key={column} className="p-3 whitespace-nowrap">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || index} className="border-t border-[#C9A84C]/20">
              {columns.map((column) => (
                <td key={column} className="p-3 text-[rgba(0,0,0,0.58)] whitespace-nowrap">
                  {String(row[column] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}










