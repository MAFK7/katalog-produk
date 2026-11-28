import ProfileButton from "./ProfileButton";

type NavbarProps = {
    cartCount: number;
    searchValue: string;
    onSearchChange: (value: string) => void;
    onSearchFocus: () => void;
    onCartClick: () => void;
    onSearchClick: () => void;
};

export default function Navbar({
    cartCount,
    searchValue,
    onSearchChange,
    onSearchFocus,
    onCartClick,
    onSearchClick,
}: NavbarProps) {
    return (
        <header className="navbar">
            <a href="#top" className="navbar__brand" aria-label="MAFKO, kembali ke atas">
                <img
                    className="navbar__logo"
                    src="/brand/logo-horizontal.webp"
                    alt="MAFKO"
                />
            </a>

            <nav className="navbar__links">
                <a href="#produk">Produk</a>
                <a href="#tentang">Tentang</a>
            </nav>

            <label className="navbar__search">
                <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20l-3.5-3.5" />
                </svg>
                <input
                    id="navbar-search"
                    type="text"
                    inputMode="search"
                    placeholder="Cari produk..."
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    onFocus={onSearchFocus}
                    aria-label="Cari produk"
                />
            </label>

            <div className="navbar__right">
                <button
                    className="navbar__icon navbar__icon--search"
                    onClick={onSearchClick}
                    aria-label="Cari produk"
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <circle cx="11" cy="11" r="7" />
                        <path d="M20 20l-3.5-3.5" />
                    </svg>
                </button>

                <button
                    className="navbar__icon"
                    onClick={onCartClick}
                    aria-label={`Buka keranjang, ${cartCount} item`}
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M3 4h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L20 8H6.2" />
                        <circle cx="9.5" cy="19.5" r="1.3" />
                        <circle cx="17" cy="19.5" r="1.3" />
                    </svg>
                    {cartCount > 0 && (
                        <span key={cartCount} className="navbar__badge">
                            {cartCount}
                        </span>
                    )}
                </button>

                <ProfileButton />
            </div>
        </header>
    );
}