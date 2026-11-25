import ProfileButton from "./ProfileButton";

type NavbarProps = {
    cartCount: number;
    onCartClick: () => void;
};

export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
    return (
        <header className="navbar">
            <nav className="navbar__links">
                <a href="#produk">Produk</a>
                <a href="#tentang">Tentang</a>
            </nav>

            <a href="#top" className="navbar__brand">Katalog Produk</a>

            <div className="navbar__right">
                <button className="navbar__cart" onClick={onCartClick}>
                    Keranjang ({cartCount})
                </button>
                <ProfileButton />
            </div>
        </header>
    );
}