import type { Product } from "../types";
import { formatRupiah } from "../utils/format";

type PromoBannerProps = {
    title: string;
    image: string;
    product: Product;
};

export default function PromoBanner({ title, image, product }: PromoBannerProps) {
    return (
        <section className="banner">
            <img className="banner__img" src={image} alt={title} />

            <h2 className="banner__title">{title}</h2>

            <div className="banner__tag">
                <span className="banner__tag-category">{product.category}</span>
                <span className="banner__tag-name">{product.name}</span>
                <span className="banner__tag-price">{formatRupiah(product.price)}</span>
            </div>
        </section>
    );
}