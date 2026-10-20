import React, { useState, useMemo } from 'react';
import { Product, CartItem, Stage, Category } from './types';
import { PRODUCTS } from './data/products';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MilestoneFilter } from './components/MilestoneFilter';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BundleBuilderModal } from './components/BundleBuilderModal';
import { GiftFinderModal } from './components/GiftFinderModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { TrustProofSection } from './components/TrustProofSection';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';
import { Toast } from './components/Toast';
import { Sparkles, Gift, ArrowRight } from 'lucide-react';

export default function App() {
  // Cart & Wishlist state
  const [cart, setCart] = useState<CartItem[]>(() => [
    // Pre-populate with 1 gentle favorite so mama sees the cart experience immediately
    {
      product: PRODUCTS[0],
      quantity: 1,
      selectedColor: PRODUCTS[0].colors[0]?.name,
      selectedSize: PRODUCTS[0].sizes?.[0],
    },
  ]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Filtering state
  const [selectedStage, setSelectedStage] = useState<Stage>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isBundleBuilderOpen, setIsBundleBuilderOpen] = useState(false);
  const [isGiftFinderOpen, setIsGiftFinderOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [checkoutGiftWrap, setCheckoutGiftWrap] = useState(false);

  // Toast feedback state
  const [toast, setToast] = useState<{
    message: string;
    type: 'cart' | 'wishlist';
    actionText?: string;
    onAction?: () => void;
  } | null>(null);

  const showToast = (message: string, type: 'cart' | 'wishlist' = 'cart', actionText?: string, onAction?: () => void) => {
    setToast({ message, type, actionText, onAction });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Filter products based on stage, category, and search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Stage match
      if (selectedStage !== 'all' && product.stage !== selectedStage) {
        return false;
      }
      // Category match
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesTagline = product.tagline.toLowerCase().includes(query);
        const matchesHighlight = product.mamaHighlight.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesTagline && !matchesHighlight && !matchesCat) {
          return false;
        }
      }
      return true;
    });
  }, [selectedStage, selectedCategory, searchQuery]);

  // Cart operations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleAddToCart = (
    product: Product,
    quantity = 1,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    setCart((prev) => {
      const colorToUse = selectedColor || product.colors[0]?.name;
      const sizeToUse = selectedSize || product.sizes?.[0];
      const existingIndex = prev.findIndex(
        (i) =>
          i.product.id === product.id &&
          i.selectedColor === colorToUse &&
          i.selectedSize === sizeToUse
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor: colorToUse,
          selectedSize: sizeToUse,
        },
      ];
    });

    showToast(`Added ${product.name} to Bag!`, 'cart', 'View Bag', () => setIsCartOpen(true));
  };

  const handleInstantBuy = (
    product: Product,
    quantity = 1,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    handleAddToCart(product, quantity, selectedColor, selectedSize);
    setQuickViewProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleAddBundleToCart = (
    items: { product: Product; color: string; size?: string }[]
  ) => {
    items.forEach((item) => {
      handleAddToCart(item.product, 1, item.color, item.size);
    });
    setCheckoutDiscount(15);
    setIsCartOpen(true);
    showToast('3-Piece Zorite Bundle Added with 15% Savings!', 'cart');
  };

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(index);
      return;
    }
    setCart((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], quantity };
      return next;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed from saved list`, 'wishlist');
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved ${product.name} to Zorite wishlist!`, 'wishlist', 'View Saved', () => setIsWishlistOpen(true));
        return [...prev, product];
      }
    });
  };

  const handleScrollToMilestones = () => {
    const el = document.getElementById('milestones');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* Strict Section 2 Navigation Header */}
      <Header
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenBundleBuilder={() => setIsBundleBuilderOpen(true)}
        onOpenGiftFinder={() => setIsGiftFinderOpen(true)}
        onSelectStage={(stage) => {
          setSelectedStage(stage as Stage);
          handleScrollToMilestones();
        }}
      />

      <main className="flex-1">
        {/* Hero Section with Pink, Sky Blue, and White Presence */}
        <Hero
          onShopClick={handleScrollToMilestones}
          onOpenBundleBuilder={() => setIsBundleBuilderOpen(true)}
          onOpenGiftFinder={() => setIsGiftFinderOpen(true)}
        />

        {/* Catalog Container */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Milestone & Category Interactive Filter */}
          <MilestoneFilter
            selectedStage={selectedStage}
            onSelectStage={setSelectedStage}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            totalFilteredCount={filteredProducts.length}
          />

          {/* Product Grid (3-columns on desktop, 2-columns on tablet/mobile) */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-3xl border border-sky-100 my-8 p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-sky-50 mx-auto flex items-center justify-center text-[#0284C7]">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#0F172A]">
                No nursery items match this filter
              </h3>
              <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                Try clearing your search term or exploring "All Essentials" to browse the full Zorite collection.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedStage('all');
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 bg-[#0284C7] text-white text-xs font-semibold rounded-full cursor-pointer hover:bg-[#0369A1]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.some((p) => p.id === product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  onQuickAdd={(p, color, size) => handleAddToCart(p, 1, color, size)}
                />
              ))}
            </div>
          )}

          {/* Mid-Page Interactive Banner: Bundle Builder & Gift Matcher in Pink & Sky Blue */}
          <div className="mt-16 bg-gradient-to-br from-sky-50 via-white to-pink-50 rounded-3xl p-6 sm:p-10 border border-sky-100 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-xs">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0284C7]">
                <Sparkles className="w-4 h-4 text-[#EC4899]" />
                <span>Smart Zorite Bundle Builder</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F172A]">
                Mix & Match Any 3 Items. Save 15% Automatically.
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Take the guesswork out of preparing baby's nursery. Choose your favorite sleepsuit, silicone dinner set, and wooden Montessori toy in our interactive bundle builder.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsBundleBuilderOpen(true)}
                  className="px-6 py-3 bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold rounded-full inline-flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Open Interactive Bundle Builder</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-pink-100 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EC4899]">
                <Gift className="w-4 h-4 text-[#EC4899]" />
                <span>Shopping For a Friend or Baby Shower?</span>
              </div>
              <h4 className="font-serif text-lg font-bold text-[#0F172A]">
                Take the 30-Second Gift Quiz
              </h4>
              <p className="text-xs text-[#64748B]">
                Get personalized recommendations based on the mother’s due date, nursery theme, and your gift budget.
              </p>
              <button
                type="button"
                onClick={() => setIsGiftFinderOpen(true)}
                className="w-full py-2.5 bg-pink-50 hover:bg-pink-100 border border-pink-200 text-[#BE185D] rounded-xl text-xs font-semibold cursor-pointer transition-colors"
              >
                Launch Gift Matcher →
              </button>
            </div>
          </div>
        </section>

        {/* Pediatrician Standards & Motherhood Testimonials */}
        <TrustProofSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Thumb Bar */}
      <MobileQuickBar
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenBundleBuilder={() => setIsBundleBuilderOpen(true)}
        onScrollToCatalog={handleScrollToMilestones}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={(discount, isGiftWrapped) => {
          setCheckoutDiscount(discount);
          setCheckoutGiftWrap(isGiftWrapped);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onExplore={handleScrollToMilestones}
      />

      {/* Saved Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlist}
        onRemove={handleToggleWishlist}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isWishlisted={quickViewProduct ? wishlist.some((p) => p.id === quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onInstantBuy={handleInstantBuy}
      />

      {/* Interactive Bundle Builder Modal */}
      <BundleBuilderModal
        isOpen={isBundleBuilderOpen}
        onClose={() => setIsBundleBuilderOpen(false)}
        products={PRODUCTS}
        onAddBundleToCart={handleAddBundleToCart}
      />

      {/* Interactive Gift Finder Modal */}
      <GiftFinderModal
        isOpen={isGiftFinderOpen}
        onClose={() => setIsGiftFinderOpen(false)}
        products={PRODUCTS}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* Express Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        discountAmount={checkoutDiscount}
        isGiftWrapped={checkoutGiftWrap}
        onOrderComplete={() => setCart([])}
      />

      {/* Toast Feedback */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          actionText={toast.actionText}
          onAction={toast.onAction}
        />
      )}
    </div>
  );
}
