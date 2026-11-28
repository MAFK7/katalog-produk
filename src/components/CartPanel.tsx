import { useEffect, useState } from "react";
import type { CartItem } from "../types";
import { formatRupiah } from "../utils/format";

type CartPanelProps = {
    items: CartItem[];
    isOpen: boolean;
    onClose: () => void;
    onRemove: (id: number) => void;
    onChangeQty: (id: number, delta: number) => void;
    total: number;
};

export default function CartPanel({
    items,
    isOpen,
    onClose,
    onRemove,
    onChangeQty,
    total,
}: CartPanelProps) {
    const [render, setRender] = useState(isOpen);

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

    if (!render) return null;

    const state = isOpen ? "is-open" : "is-closing";

    return (
        <>
            <div className={`cart__backdrop ${state}`} onClick={onClose} />

            <aside className={`cart ${state}`} aria-label="Keranjang belanja">
                <div className="cart__header">
                    <h2 className="cart__title">Keranjang</h2>
                    <button
                        className="cart__close"
                        onClick={onClose}
                        aria-label="Tutup keranjang"
                    >
                        ×
                    </button>
                </div>

                {items.length === 0 ? (
                    <p className="cart__empty">Keranjang kosong.</p>
                ) : (
                    <>
                        <ul className="cart__list">
                            {items.map((item) => (
                                <li key={item.product.id} className="cart__item">
                                    <img
                                        className="cart__img"
                                        src={item.product.image}
                                        alt={item.product.name}
                                    />

                                    <div className="cart__info">
                                        <p className="cart__name">{item.product.name}</p>
                                        <p className="cart__qty">
                                            {formatRupiah(item.product.price)}
                                        </p>
                                    </div>

                                    <div className="cart__side">
                                        <div className="cart__stepper">
                                            <button
                                                className="cart__step"
                                                onClick={() => onChangeQty(item.product.id, -1)}
                                                aria-label={`Kurangi ${item.product.name}`}
                                            >
                                                −
                                            </button>
                                            <span className="cart__count">{item.qty}</span>
                                            <button
                                                className="cart__step"
                                                onClick={() => onChangeQty(item.product.id, 1)}
                                                aria-label={`Tambah ${item.product.name}`}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            className="cart__remove"
                                            onClick={() => onRemove(item.product.id)}
                                            aria-label={`Hapus ${item.product.name}`}
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="cart__total">
                            <span>Total</span>
                            <strong>{formatRupiah(total)}</strong>
                        </div>
                    </>
                )}
            </aside>
        </>
    );
}