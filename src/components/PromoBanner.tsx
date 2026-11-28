import type { Product } from "../types";
import { formatRupiah } from "../utils/format";

type PromoBannerProps = {
  titleLines: string[];
  image: string;
  product: Product;
  onShop: () => void;
  onView: () => void;
};

export default function PromoBanner({
  titleLines,
  image,
  product,
  onShop,
  onView,
}: PromoBannerProps) {
  return (
    <section className="banner">
      <img className="banner__img" src={image} alt={titleLines.join(" ")} />

      <div className="banner__content">
        <p className="banner__eyebrow">{product.category}</p>

        <h2 className="banner__title">
          {titleLines.map((line) => (
            <span key={line} className="banner__line">
              {line}
            </span>
          ))}
        </h2>

        <p className="banner__sub">
          {product.name} · {formatRupiah(product.price)}
        </p>

        <div className="banner__actions">
          <button className="banner__cta" onClick={onShop}>
            Belanja Aksesoris
          </button>
          <button className="banner__link" onClick={onView}>
            Lihat Produk
          </button>
        </div>
      </div>
    </section>
  );
}