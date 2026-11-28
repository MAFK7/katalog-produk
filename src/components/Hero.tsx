import type { Product } from "../types";
import { formatRupiah } from "../utils/format";

type HeroItem = {
  product: Product;
  image: string;
};

type HeroProps = {
  left: HeroItem;
  center: HeroItem;
  right: HeroItem;
  onView: (product: Product) => void;
  onExplore: () => void;
};

export default function Hero({
  left,
  center,
  right,
  onView,
  onExplore,
}: HeroProps) {
  const items = [
    { position: "left", ...left },
    { position: "center", ...center },
    { position: "right", ...right },
  ];

  return (
    <section className="hero">
      <div className="hero__media">
        <h1 className="hero__brand">
          <img src="/brand/wordmark.svg" alt="MAFKO" />
        </h1>

        <button className="hero__cta" onClick={onExplore}>
          Belanja Sekarang
          <span className="hero__cta-icon" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </span>
        </button>

        {items.map(({ position, product, image }) => (
          <div
            key={product.id}
            className={`hero__item hero__item--${position}`}
          >
            <button
              className="hero__product"
              onClick={() => onView(product)}
              aria-label={`Lihat detail ${product.name}`}
            >
              <img className="hero__cutout" src={image} alt={product.name} />
              <span className="hero__sticker">
                <span className="hero__sticker-name">{product.name}</span>
                <span className="hero__sticker-price">
                  {formatRupiah(product.price)}
                </span>
              </span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}