import { useEffect, useRef, useState } from "react";
import type { Product } from "../types";
import { formatRupiah } from "../utils/format";

type ProductModalProps = {
    product: Product | null;
    isFavorite: boolean;
    onClose: () => void;
    onToggleFavorite: (id: number) => void;
    onAddToCart: (product: Product, qty: number) => void;
};

type ModalContentProps = {
    product: Product;
    isFavorite: boolean;
    onClose: () => void;
    onToggleFavorite: (id: number) => void;
    onAddToCart: (product: Product, qty: number) => void;
};

function ModalContent({
    product,
    isFavorite,
    onClose,
    onToggleFavorite,
    onAddToCart,
}: ModalContentProps) {
    const [qty, setQty] = useState(1);
    const closeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        closeRef.current?.focus();
    }, []);

    const handleAdd = () => {
        onAddToCart(product, qty);
        onClose();
    };

    return (
        <>
            <button
                ref={closeRef}
                className="modal__close"
                onClick={onClose}
                aria-label="Tutup"
            >
                ×
            </button>

            <div className="modal__image">
                <img src={product.image} alt={product.name} />
            </div>

            <div className="modal__info">
                <p className="modal__category">{product.category}</p>
                <h2 className="modal__name">{product.name}</h2>
                <p className="modal__price">{formatRupiah(product.price)}</p>
                <p className="modal__desc">{product.description}</p>

                <div className="modal__row">
                    <span className="modal__label">Jumlah</span>
                    <div className="modal__stepper">
                        <button
                            className="modal__step"
                            onClick={() => setQty(Math.max(1, qty - 1))}
                            aria-label="Kurangi jumlah"
                        >
                            −
                        </button>
                        <span className="modal__count">{qty}</span>
                        <button
                            className="modal__step"
                            onClick={() => setQty(Math.min(99, qty + 1))}
                            aria-label="Tambah jumlah"
                        >
                            +
                        </button>
                    </div>
                </div>

                <button className="modal__add" onClick={handleAdd}>
                    Tambah ke Keranjang · {formatRupiah(product.price * qty)}
                </button>

                <button
                    className={`modal__fav ${isFavorite ? "is-active" : ""}`}
                    onClick={() => onToggleFavorite(product.id)}
                    aria-pressed={isFavorite}
                >
                    {isFavorite ? "♥ Tersimpan di Favorit" : "♡ Simpan ke Favorit"}
                </button>
            </div>
        </>
    );
}

export default function ProductModal({
    product,
    isFavorite,
    onClose,
    onToggleFavorite,
    onAddToCart,
}: ProductModalProps) {
    const [current, setCurrent] = useState<Product | null>(product);
    const [render, setRender] = useState(product !== null);
    const isOpen = product !== null;

    if (product && product !== current) setCurrent(product);
    if (isOpen && !render) setRender(true);

    useEffect(() => {
        if (isOpen) return;
        const timer = setTimeout(() => setRender(false), 300);
        return () => clearTimeout(timer);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (!isOpen) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = previous;
        };
    }, [isOpen]);

    if (!render || !current) return null;

    const state = isOpen ? "is-open" : "is-closing";

    return (
        <>
            <div className={`modal__backdrop ${state}`} onClick={onClose} />
            <div
                className={`modal ${state}`}
                role="dialog"
                aria-modal="true"
                aria-label={current.name}
            >
                <ModalContent
                    key={current.id}
                    product={current}
                    isFavorite={isFavorite}
                    onClose={onClose}
                    onToggleFavorite={onToggleFavorite}
                    onAddToCart={onAddToCart}
                />
            </div>
        </>
    );
}