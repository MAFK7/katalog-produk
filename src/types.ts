export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    image: string;
};

export type CartItem = {
    product: Product;
    qty: number;
};
