type CategoryFilterProps = {
    categories: string[];
    active: string;
    onSelect: (category: string) => void;
    showFavoritesOnly: boolean;
    onToggleFavoritesOnly: () => void;
};

export default function CategoryFilter({
    categories,
    active,
    onSelect,
    showFavoritesOnly,
    onToggleFavoritesOnly,
}: CategoryFilterProps) {
    return (
        <div className="filter">
            <div className="filter__categories">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`filter__btn ${active === category ? "is-active" : ""}`}
                        onClick={() => onSelect(category)}
                        aria-pressed={active === category}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <button
                className={`filter__fav ${showFavoritesOnly ? "is-active" : ""}`}
                onClick={onToggleFavoritesOnly}
                aria-pressed={showFavoritesOnly}
            >
                {showFavoritesOnly ? "♥" : "♡"} Favorit Saja
            </button>
        </div>
    );
}