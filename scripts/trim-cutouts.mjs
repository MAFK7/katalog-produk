import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const DIR = "public/banner";
const ALPHA_MIN = 40; // piksel dengan alpha di bawah ini dianggap kosong
const PAD = 4;

const files = fs
    .readdirSync(DIR)
    .filter((f) => /^hero-.*\.(webp|png)$/i.test(f));

if (files.length === 0) {
    console.log("Tidak ada file hero-* di public/banner");
}

for (const name of files) {
    const file = path.join(DIR, name);
    const { data, info } = await sharp(file)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    let minX = width;
    let minY = height;
    let maxX = -1;
    let maxY = -1;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (data[(y * width + x) * channels + 3] > ALPHA_MIN) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }

    if (maxX < 0) {
        console.log(`${name}: tidak ada isi, dilewati`);
        continue;
    }

    const left = Math.max(0, minX - PAD);
    const top = Math.max(0, minY - PAD);
    const w = Math.min(width, maxX + PAD + 1) - left;
    const h = Math.min(height, maxY + PAD + 1) - top;

    const out = file.replace(/\.(png|jpe?g)$/i, ".webp");
    const buffer = await sharp(file)
        .extract({ left, top, width: w, height: h })
        .webp({ quality: 90, alphaQuality: 100 })
        .toBuffer();

    fs.writeFileSync(out, buffer);
    if (out !== file) fs.unlinkSync(file);

    console.log(`${name}: ${width}x${height} -> ${w}x${h}`);
}