import type { Product } from "../types";

export const products: Product[] = [
    { id: 1, name: "Laptop Ultrabook", price: 8500000, category: "Elektronik", description: "Ringan, baterai tahan 10 jam, cocok untuk kuliah.", image: "/products/laptop.webp" },
    { id: 2, name: "Headphone Nirkabel", price: 450000, category: "Elektronik", description: "Bluetooth 5.0 dengan peredam bising.", image: "/products/headphone.webp" },
    { id: 3, name: "Mouse Gaming", price: 250000, category: "Elektronik", description: "Sensor presisi dengan 6 tombol.", image: "/products/mouse.webp" },
    { id: 4, name: "Buku Pemrograman Web", price: 120000, category: "Buku", description: "Panduan lengkap HTML, CSS, dan JavaScript.", image: "/products/buku-web.webp" },
    { id: 5, name: "Buku Basis Data", price: 95000, category: "Buku", description: "Dasar SQL, ERD, dan normalisasi.", image: "/products/buku-database.webp" },
    { id: 6, name: "Notebook A5", price: 25000, category: "Alat Tulis", description: "100 halaman, kertas tebal anti tembus.", image: "/products/notebook.webp" },
    { id: 7, name: "Pulpen Gel Set", price: 30000, category: "Alat Tulis", description: "Isi 5 warna, tinta cepat kering.", image: "/products/pulpen.webp" },
    { id: 8, name: "Tas Ransel Kampus", price: 275000, category: "Aksesoris", description: "Muat laptop 15 inci, anti air.", image: "/products/tas.webp" },
    { id: 9, name: "Botol Minum 1L", price: 65000, category: "Aksesoris", description: "Stainless steel, tahan panas dan dingin.", image: "/products/botol.webp" },
];