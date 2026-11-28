export default function Footer() {
    return (
        <footer className="footer" id="tentang">
            <div className="footer__about">
                <img
                    className="footer__logo"
                    src="/brand/logo-horizontal.webp"
                    alt="MAFKO"
                />
                <p className="footer__text">
                    Pilihan perangkat elektronik, buku, alat tulis, dan aksesoris untuk
                    menunjang kuliah dan kerja sehari-hari.
                </p>
            </div>

            <div className="footer__bottom">
                <span>© 2026 MAFKO</span>
                <span>Semua hak dilindungi</span>
            </div>
        </footer>
    );
}