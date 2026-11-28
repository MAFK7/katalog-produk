import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";
import PromoBanner from "./components/PromoBanner";
import ProductModal from "./components/ProductModal";
import CartPanel from "./components/CartPanel";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import { products } from "./data/products";
import type { CartItem, Product } from "./types";
import "./App.css";

const categories = ["Semua", "Elektronik", "Buku", "Alat Tulis", "Aksesoris"];

type ToastState = { id: number; message: string } | null;

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const addToCart = (product: Product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prev, { product, qty }];
    });
    const label = qty > 1 ? `${qty}× ${product.name}` : product.name;
    setToast({ id: Date.now(), message: `${label} ditambahkan ke keranjang` });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const changeQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.product.id === id ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("Semua");
    setShowFavoritesOnly(false);
  };

  const scrollToCatalog = () => {
    document.getElementById("katalog")?.scrollIntoView({ behavior: "smooth" });
  };

  const shopAccessories = () => {
    setSearch("");
    setShowFavoritesOnly(false);
    setCategory("Aksesoris");
    scrollToCatalog();
  };

  const focusSearch = () => {
    scrollToCatalog();
    window.setTimeout(() => {
      document
        .getElementById("search-input")
        ?.focus({ preventScroll: true });
    }, 400);
  };

  const handleSearchFocus = () => {
    const catalog = document.getElementById("katalog");
    if (catalog && catalog.getBoundingClientRect().top > 120) {
      scrollToCatalog();
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory = category === "Semua" || product.category === category;
    const matchFavorite = !showFavoritesOnly || favorites.includes(product.id);
    return matchSearch && matchCategory && matchFavorite;
  });

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  return (
    <div id="top">
      <Navbar
        cartCount={cartCount}
        searchValue={search}
        onSearchChange={setSearch}
        onSearchFocus={handleSearchFocus}
        onCartClick={() => setIsCartOpen(!isCartOpen)}
        onSearchClick={focusSearch}
      />

      <Hero
        left={{ product: products[1], image: "/banner/hero-headphone.webp" }}
        center={{ product: products[0], image: "/banner/hero-laptop.webp" }}
        right={{ product: products[4], image: "/banner/hero-book.webp" }}
        onView={setSelected}
        onExplore={scrollToCatalog}
      />

      <main id="katalog">
        <div className="toolbar">
          <CategoryFilter
            categories={categories}
            active={category}
            onSelect={setCategory}
            showFavoritesOnly={showFavoritesOnly}
            onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
          />
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <p className="results" aria-live="polite">
          {filteredProducts.length} produk
        </p>

        <ProductList
          products={filteredProducts}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onAddToCart={addToCart}
          onOpenDetail={setSelected}
          onReset={resetFilters}
          banner={
            <PromoBanner
              titleLines={["Setup Kampus", "& Kerja"]}
              image="/banner/setup-kampus.webp"
              product={products[7]}
              onShop={shopAccessories}
              onView={() => setSelected(products[7])}
            />
          }
        />
      </main>

      <Footer />

      <ProductModal
        product={selected}
        isFavorite={selected ? favorites.includes(selected.id) : false}
        onClose={() => setSelected(null)}
        onToggleFavorite={toggleFavorite}
        onAddToCart={addToCart}
      />

      <CartPanel
        items={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemove={removeFromCart}
        onChangeQty={changeQty}
        total={cartTotal}
      />

      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          onView={() => {
            setIsCartOpen(true);
            setToast(null);
          }}
        />
      )}
    </div>
  );
}