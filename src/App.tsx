import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";
import PromoBanner from "./components/PromoBanner";
import CartPanel from "./components/CartPanel";
import Footer from "./components/Footer";
import { products } from "./data/products";
import type { CartItem, Product } from "./types";
import "./App.css";

const categories = ["Semua", "Elektronik", "Buku", "Alat Tulis", "Aksesoris"];

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
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
        onCartClick={() => setIsCartOpen(!isCartOpen)}
      />

      <Hero image="/banner/hero.webp" product={products[0]} />

      <main>
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          categories={categories}
          active={category}
          onSelect={setCategory}
          showFavoritesOnly={showFavoritesOnly}
          onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
        />
        <ProductList
          products={filteredProducts}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onAddToCart={addToCart}
          banner={
            <PromoBanner
              title="Setup Kampus & Kerja"
              image="/banner/setup-kampus.webp"
              product={products[7]}
            />
          }
        />
      </main>

      <Footer />

      <CartPanel
        items={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemove={removeFromCart}
        total={cartTotal}
      />
    </div>
  );
}