import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = "public";
const BACKUP_DIR = "assets-original";

// tetap PNG karena browser/iOS butuh PNG untuk ikon ini
const SKIP = new Set(["favicon.png", "apple-touch-icon.png"]);

// lebar maksimum per folder (px)
const MAX_WIDTH = { products: 900, banner: 1920, brand: 1200 };

function walk(dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name);
        return entry.isDirectory() ? walk(full) : [full];
    });
}

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;
let totalBefore = 0;
let totalAfter = 0;

for (const file of walk(PUBLIC_DIR)) {
    const ext = path.extname(file).toLowerCase();
    if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;
    if (SKIP.has(path.basename(file))) continue;

    const folder = path.basename(path.dirname(file));
    const isBrand = folder === "brand";
    const out = file.replace(/\.(png|jpe?g)$/i, ".webp");

    await sharp(file)
        .resize({ width: MAX_WIDTH[folder] ?? 1200, withoutEnlargement: true })
        .webp({ quality: isBrand ? 92 : 82, alphaQuality: 100 })
        .toFile(out);

    const before = fs.statSync(file).size;
    const after = fs.statSync(out).size;
    totalBefore += before;
    totalAfter += after;

    // simpan file asli di luar folder public
    const backupPath = path.join(BACKUP_DIR, path.relative(PUBLIC_DIR, file));
    fs.mkdirSync(path.dirname(backupPath), { recursive: true });
    fs.renameSync(file, backupPath);

    console.log(`${path.relative(PUBLIC_DIR, file)}  ${kb(before)} -> ${kb(after)}`);
}

console.log(`\nTotal: ${kb(totalBefore)} -> ${kb(totalAfter)}`);