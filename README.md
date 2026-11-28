# MAFKO

MAFKO adalah toko satu halaman untuk perangkat elektronik, buku, alat tulis, dan aksesoris. Pengunjung bisa mencari produk, memfilter berdasarkan kategori, melihat detail produk, menandai favorit, dan mengelola keranjang belanja.

Demo: https://katalog-react.nugas.my.id

## Fitur

- Pencarian produk berdasarkan nama
- Filter kategori: Semua, Elektronik, Buku, Alat Tulis, Aksesoris
- Favorit: tandai produk dan tampilkan favorit saja
- Detail produk dengan foto besar, deskripsi, dan pilihan jumlah
- Keranjang: tambah produk, ubah jumlah, hapus item, dan total harga
- Notifikasi saat produk masuk keranjang
- Tampilan responsif untuk desktop, tablet, dan mobile

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
│   ├── ProductModal.tsx
│   ├── PromoBanner.tsx
│   ├── CartPanel.tsx
│   ├── Toast.tsx
│   └── Footer.tsx
├── data/
│   ├── products.ts
│   └── profile.ts
├── utils/
│   └── format.ts
├── types.ts
├── App.tsx
└── App.css
scripts/
├── to-webp.mjs
└── trim-cutouts.mjs
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

## Mengelola Gambar

Simpan gambar baru sebagai PNG di `public/products`, `public/banner`, atau `public/brand`, lalu jalankan:

```bash
node scripts/to-webp.mjs
```

Skrip ini mengubah gambar menjadi WebP dan memindahkan file asli ke folder `assets-original`. Untuk gambar produk hero (`hero-*`), jalankan juga:

```bash
node scripts/trim-cutouts.mjs
```