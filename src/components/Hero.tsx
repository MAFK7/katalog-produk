import type { Product } from "../types";
import { formatRupiah } from "../utils/format";

type HeroProps = {
    image: string;
    product: Product;
};

export default function Hero({ image, product }: HeroProps) {
    return (
        <section className="hero">
            <img className="hero__img" src={image} alt="Katalog Produk" />

            <h1 className="hero__title">Katalog Produk</h1>

            <div className="hero__tag">
                <span className="hero__tag-label">Unggulan</span>
                <span className="hero__tag-name">{product.name}</span>
                <span className="hero__tag-price">{formatRupiah(product.price)}</span>
            </div>
        </section>
    );
}