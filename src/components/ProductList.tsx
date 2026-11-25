import type { Product } from "../types";
import ProductCard from "./ProductCard";

type ProductListProps = {
    products: Product[];
    favorites: number[];
    onToggleFavorite: (id: number) => void;
    onAddToCart: (product: Product) => void;
};

export default function ProductList({
    products,
    favorites,
    onToggleFavorite,
    onAddToCart,
}: ProductListProps) {
    if (products.length === 0) {
        return <p className="empty">Produk tidak ditemukan.</p>;
    }

    return (
        <div className="grid" id="produk">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    isFavorite={favorites.includes(product.id)}
                    onToggleFavorite={onToggleFavorite}
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
    );
}