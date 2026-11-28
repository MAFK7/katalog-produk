import { Fragment } from "react";
import type { ReactNode } from "react";
import type { Product } from "../types";
import ProductCard from "./ProductCard";

type ProductListProps = {
    products: Product[];
    favorites: number[];
    onToggleFavorite: (id: number) => void;
    onAddToCart: (product: Product) => void;
    onOpenDetail: (product: Product) => void;
    onReset: () => void;
    banner?: ReactNode;
};

export default function ProductList({
    products,
    favorites,
    onToggleFavorite,
    onAddToCart,
    onOpenDetail,
    onReset,
    banner,
}: ProductListProps) {
    if (products.length === 0) {
        return (
            <div className="empty">
                <p className="empty__text">Produk tidak ditemukan.</p>
                <button className="empty__btn" onClick={onReset}>
                    Reset pencarian
                </button>
            </div>
        );
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
                        onOpenDetail={onOpenDetail}
                    />
                    {index === 2 && products.length > 3 && banner}
                </Fragment>
            ))}
        </div>
    );
}