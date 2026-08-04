'use client';

import { useEffect, useState } from 'react';
import { formatPrice } from '@/lib/utils';
import { Package, Plus, Pencil, Trash2, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { CONDITION_LABELS } from '@/lib/constants';
import type { Product, ProductCondition, ProductSize } from '@/types/product';

const CONDITIONS: ProductCondition[] = ['pre-loved', 'recycled', 'upcycled'];
const ALL_SIZES: ProductSize[] = ['xs', 's', 'm', 'l', 'xl', 'xxl'];

interface ProductForm {
  name: string;
  price: string;
  compare_at_price: string;
  description: string;
  condition: ProductCondition;
  category: string;
  style: string;
  material: string;
  imageUrls: string[];
  selectedSizes: ProductSize[];
  in_stock: boolean;
  featured: boolean;
  eco_score: string;
}

const emptyForm: ProductForm = {
  name: '',
  price: '',
  compare_at_price: '',
  description: '',
  condition: 'pre-loved',
  category: 'dresses',
  style: 'minimal',
  material: '',
  imageUrls: [''],
  selectedSizes: [],
  in_stock: true,
  featured: false,
  eco_score: '50',
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ProductForm>(emptyForm);

  const loadProducts = () => {
    setLoading(true);
    fetch('/api/admin/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setProducts(data.products ?? []);
      })
      .catch((e) => toast.error(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(loadProducts, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: String(product.price),
      compare_at_price: product.compare_at_price ? String(product.compare_at_price) : '',
      description: product.description,
      condition: product.condition,
      category: product.category ?? '',
      style: product.style ?? '',
      material: product.material ?? '',
      imageUrls: product.images.length ? [...product.images] : [''],
      selectedSizes: product.sizes,
      in_stock: product.in_stock,
      featured: product.featured,
      eco_score: String(product.eco_score ?? 0),
    });
    setModalOpen(true);
  };

  const handleDelete = async (product: Product) => {
    if (!confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if (data.error) {
      toast.error(data.error);
      return;
    }
    toast.success('Product deleted');
    loadProducts();
  };

  const handleToggleFeature = async (product: Product) => {
    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ featured: !product.featured }),
    });
    const data = await res.json();
    if (data.error) {
      toast.error(data.error);
      return;
    }
    toast.success(product.featured ? 'Removed from featured' : 'Marked as featured');
    loadProducts();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const slug = form.name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    const payload = {
      name: form.name,
      slug,
      price: Number(form.price),
      compare_at_price: form.compare_at_price ? Number(form.compare_at_price) : null,
      description: form.description,
      condition: form.condition,
      category: form.category,
      style: form.style,
      material: form.material,
      images: form.imageUrls.filter((u) => u.trim()),
      sizes: form.selectedSizes,
      in_stock: form.in_stock,
      featured: form.featured,
      eco_score: Number(form.eco_score) || 0,
    };

    try {
      let res;
      if (editingId) {
        res = await fetch(`/api/admin/products/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      toast.success(editingId ? 'Product updated' : 'Product created');
      setModalOpen(false);
      loadProducts();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Package size={20} className="text-pink-500" />
            <h1 className="text-2xl sm:text-3xl font-display tracking-tight text-ink">
              Products
            </h1>
          </div>
          <p className="text-sm text-muted">
            {products.length} products in your catalog
          </p>
        </div>
        <Button onClick={openCreate} className="group">
          <Plus size={16} className="mr-1.5 group-hover:rotate-90 transition-transform" />
          Add Product
        </Button>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-2xl" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white border border-pink-100 rounded-2xl p-12 text-center shadow-soft">
          <Package size={40} className="text-pink-200 mx-auto mb-3" strokeWidth={1} />
          <p className="text-sm text-muted">No products yet — add your first one!</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.4) }}
              className="bg-white border border-pink-100 rounded-2xl shadow-soft overflow-hidden group"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] bg-pink-50 overflow-hidden">
                {product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-muted/30 text-xs">
                    No image
                  </div>
                )}
                {/* Featured badge */}
                {product.featured && (
                  <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-ink/80 text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                    <Star size={10} className="fill-pink-400 text-pink-400" />
                    Featured
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{product.name}</p>
                    <p className="text-[11px] text-muted mt-0.5 uppercase tracking-wide">
                      {CONDITION_LABELS[product.condition]}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-ink shrink-0">
                    {formatPrice(product.price)}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-pink-50">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider ${product.in_stock ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {product.in_stock ? 'In stock' : 'Out of stock'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleToggleFeature(product)}
                      className="p-1.5 text-muted/50 hover:text-amber-500 transition-colors rounded-lg hover:bg-pink-50"
                      title={product.featured ? 'Unfeature' : 'Feature'}
                    >
                      <Star size={15} className={product.featured ? 'fill-amber-400 text-amber-400' : ''} />
                    </button>
                    <button
                      onClick={() => openEdit(product)}
                      className="p-1.5 text-muted/50 hover:text-pink-500 transition-colors rounded-lg hover:bg-pink-50"
                      title="Edit"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="p-1.5 text-muted/50 hover:text-rose-500 transition-colors rounded-lg hover:bg-rose-50"
                      title="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-pink-100">
                <h2 className="text-lg font-display text-ink">
                  {editingId ? 'Edit Product' : 'Add Product'}
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 text-muted hover:text-ink rounded-lg hover:bg-pink-50 transition-colors"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5 block">
                    Product Name *
                  </label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="e.g. Vintage Floral Maxi Dress"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5 block">
                      Price (₦) *
                    </label>
                    <Input
                      type="number"
                      min="0"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      required
                      placeholder="4900"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5 block">
                      Compare-at Price (₦)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      value={form.compare_at_price}
                      onChange={(e) => setForm({ ...form, compare_at_price: e.target.value })}
                      placeholder="8900"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5 block">
                    Description *
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                    rows={3}
                    placeholder="Describe the piece..."
                    className="w-full border border-pink-200 bg-white px-4 py-2 text-sm text-ink rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5 block">
                      Condition *
                    </label>
                    <select
                      value={form.condition}
                      onChange={(e) => setForm({ ...form, condition: e.target.value as ProductCondition })}
                      className="w-full h-12 border border-pink-200 bg-white px-3 text-sm text-ink rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
                    >
                      {CONDITIONS.map((c) => (
                        <option key={c} value={c}>{CONDITION_LABELS[c]}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5 block">
                      Category
                    </label>
                    <Input
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      placeholder="dresses"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5 block">
                      Style
                    </label>
                    <Input
                      value={form.style}
                      onChange={(e) => setForm({ ...form, style: e.target.value })}
                      placeholder="boho / minimal / vintage"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5 block">
                    Material
                  </label>
                  <Input
                    value={form.material}
                    onChange={(e) => setForm({ ...form, material: e.target.value })}
                    placeholder="e.g. 100% Cotton"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5 block">
                    Image URLs (one per line)
                  </label>
                  <textarea
                    value={form.imageUrls.join('\n')}
                    onChange={(e) => setForm({ ...form, imageUrls: e.target.value.split('\n') })}
                    rows={2}
                    placeholder="https://..."
                    className="w-full border border-pink-200 bg-white px-4 py-2 text-sm text-ink rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-400 transition-all"
                  />
                  <p className="text-[11px] text-muted/60 mt-1">
                    Paste image URLs, one per line. First one is the main image.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5 block">
                    Available Sizes
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {ALL_SIZES.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() =>
                          setForm({
                            ...form,
                            selectedSizes: form.selectedSizes.includes(size)
                              ? form.selectedSizes.filter((s) => s !== size)
                              : [...form.selectedSizes, size],
                          })
                        }
                        className={`h-10 w-12 text-xs font-medium border-2 rounded-lg transition-all ${
                          form.selectedSizes.includes(size)
                            ? 'bg-ink text-white border-ink'
                            : 'bg-transparent text-ink/50 border-pink-200 hover:border-pink-400'
                        }`}
                      >
                        {size.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted mb-1.5 block">
                      Eco Score (0-100)
                    </label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={form.eco_score}
                      onChange={(e) => setForm({ ...form, eco_score: e.target.value })}
                    />
                  </div>
                  <div className="flex items-end gap-4 pb-1">
                    <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.in_stock}
                        onChange={(e) => setForm({ ...form, in_stock: e.target.checked })}
                        className="h-4 w-4 accent-pink-500"
                      />
                      In stock
                    </label>
                    <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                        className="h-4 w-4 accent-pink-500"
                      />
                      Featured
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="submit" className="flex-1" disabled={saving}>
                    {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Create Product'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
