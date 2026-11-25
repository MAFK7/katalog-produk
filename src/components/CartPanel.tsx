import type { CartItem } from "../types";
import { formatRupiah } from "../utils/format";

type CartPanelProps = {
    items: CartItem[];
    isOpen: boolean;
    onClose: () => void;
    onRemove: (id: number) => void;
    total: number;
};

export default function CartPanel({
    items,
    isOpen,
    onClose,
    onRemove,
    total,
}: CartPanelProps) {
    if (!isOpen) return null;

    return (
        <aside className="cart" aria-label="Keranjang belanja">
            <div className="cart__header">
                <h2 className="cart__title">Keranjang</h2>
                <button className="cart__close" onClick={onClose} aria-label="Tutup keranjang">
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
                                        {item.qty} x {formatRupiah(item.product.price)}
                                    </p>
                                </div>
                                <button
                                    className="cart__remove"
                                    onClick={() => onRemove(item.product.id)}
                                    aria-label={`Hapus ${item.product.name}`}
                                >
                                    Hapus
                                </button>
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
    );
}