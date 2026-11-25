import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";
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

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory = category === "Semua" || product.category === category;
    const matchFavorite = !showFavoritesOnly || favorites.includes(product.id);
    return matchSearch && matchCategory && matchFavorite;
  });

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div id="top">
      <Navbar cartCount={cartCount} onCartClick={() => { }} />
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
        />
      </main>
    </div>
  );
}