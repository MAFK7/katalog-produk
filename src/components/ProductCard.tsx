import { useState } from "react";
import type { Product } from "../types";
import { formatRupiah } from "../utils/format";

type ProductCardProps = {
    product: Product;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
    onAddToCart: (product: Product) => void;
};

export default function ProductCard({
    product,
    isFavorite,
    onToggleFavorite,
    onAddToCart,
}: ProductCardProps) {
    const [showDetail, setShowDetail] = useState(false);

    return (
        <article className="card">
            <div className="card__top">
                <span className="card__category">{product.category}</span>
                <div className="card__meta">
                    <span className="card__price">{formatRupiah(product.price)}</span>
                    <button
                        className={`card__fav ${isFavorite ? "is-active" : ""}`}
                        onClick={() => onToggleFavorite(product.id)}
                        aria-pressed={isFavorite}
                        aria-label={isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
                    >
                        {isFavorite ? "♥" : "♡"}
                    </button>
                </div>
            </div>

            <div className="card__image">
                <img src={product.image} alt={product.name} loading="lazy" />
            </div>

            <h3 className="card__name">{product.name}</h3>

            <div className="card__actions">
                <button
                    className="card__detail"
                    onClick={() => setShowDetail(!showDetail)}
                    aria-expanded={showDetail}
                >
                    {showDetail ? "Tutup Detail −" : "Detail +"}
                </button>
                <button className="card__add" onClick={() => onAddToCart(product)}>
                    + Keranjang
                </button>
            </div>

            {showDetail && <p className="card__desc">{product.description}</p>}
        </article>
    );
}