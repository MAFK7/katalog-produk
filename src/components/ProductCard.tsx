import { useEffect, useState } from "react";
import type { Product } from "../types";
import { formatRupiah } from "../utils/format";

type ProductCardProps = {
    product: Product;
    isFavorite: boolean;
    onToggleFavorite: (id: number) => void;
    onAddToCart: (product: Product) => void;
    onOpenDetail: (product: Product) => void;
};

export default function ProductCard({
    product,
    isFavorite,
    onToggleFavorite,
    onAddToCart,
    onOpenDetail,
}: ProductCardProps) {
    const [added, setAdded] = useState(false);

    useEffect(() => {
        if (!added) return;
        const timer = setTimeout(() => setAdded(false), 1400);
        return () => clearTimeout(timer);
    }, [added]);

    const handleAdd = () => {
        onAddToCart(product);
        setAdded(true);
    };

    return (
        <article className="card">
            <div className="card__top">
                <span className="card__category">{product.category}</span>
                <button
                    className={`card__fav ${isFavorite ? "is-active" : ""}`}
                    onClick={() => onToggleFavorite(product.id)}
                    aria-pressed={isFavorite}
                    aria-label={isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
                >
                    {isFavorite ? "♥" : "♡"}
                </button>
            </div>

            <button
                className="card__image"
                onClick={() => onOpenDetail(product)}
                aria-label={`Lihat detail ${product.name}`}
            >
                <img src={product.image} alt={product.name} loading="lazy" />
            </button>

            <h3 className="card__name">{product.name}</h3>
            <p className="card__price">{formatRupiah(product.price)}</p>

            <div className="card__actions">
                <button className="card__detail" onClick={() => onOpenDetail(product)}>
                    Detail
                </button>
                <button
                    className={`card__add ${added ? "is-added" : ""}`}
                    onClick={handleAdd}
                >
                    {added ? "✓ Keranjang" : "+ Keranjang"}
                </button>
            </div>
        </article>
    );
}