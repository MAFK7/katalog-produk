import { Fragment } from "react";
import type { ReactNode } from "react";
import type { Product } from "../types";
import ProductCard from "./ProductCard";

type ProductListProps = {
    products: Product[];
    favorites: number[];
    onToggleFavorite: (id: number) => void;
    onAddToCart: (product: Product) => void;
    banner?: ReactNode;
};

export default function ProductList({
    products,
    favorites,
    onToggleFavorite,
    onAddToCart,
    banner,
}: ProductListProps) {
    if (products.length === 0) {
        return <p className="empty">Produk tidak ditemukan.</p>;
    }

    return (
        <div className="grid" id="produk">
            {products.map((product, index) => (
                <Fragment key={product.id}>
                    <ProductCard
                        product={product}
                        isFavorite={favorites.includes(product.id)}
                        onToggleFavorite={onToggleFavorite}
                        onAddToCart={onAddToCart}
                    />
                    {index === 2 && products.length > 3 && banner}
                </Fragment>
            ))}
        </div>
    );
}