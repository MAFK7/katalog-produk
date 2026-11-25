# Katalog Produk

Katalog produk satu halaman untuk elektronik, buku, alat tulis, dan aksesoris. Pengguna bisa mencari produk, memfilter berdasarkan kategori, menandai favorit, melihat detail produk, dan mengelola keranjang belanja.

Demo: https://katalog.nugasgas.my.id

## Fitur

- Pencarian produk berdasarkan nama
- Filter kategori: Semua, Elektronik, Buku, Alat Tulis, Aksesoris
- Favorit: tandai produk dan tampilkan favorit saja
- Detail produk: tampilkan atau sembunyikan deskripsi pada kartu
- Keranjang: tambah produk, hapus item, jumlah item, dan total harga
- Tampilan responsif untuk desktop dan mobile

## Teknologi

- React
- Vite
- TypeScript
- CSS

## Struktur Proyek

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── ProfileButton.tsx
│   ├── Hero.tsx
│   ├── SearchBar.tsx
│   ├── CategoryFilter.tsx
│   ├── ProductList.tsx
│   ├── ProductCard.tsx
│   ├── PromoBanner.tsx
│   ├── CartPanel.tsx
│   └── Footer.tsx
├── data/
│   ├── products.ts
│   └── profile.ts
├── utils/
│   └── format.ts
├── types.ts
├── App.tsx
└── App.css
```

## Menjalankan di Komputer

```bash
git clone <url-repository>
cd katalog-react
npm install
npm run dev
```

Buka alamat yang muncul di terminal (biasanya http://localhost:5173).

## Build untuk Produksi

```bash
npm run build
npm run preview
```