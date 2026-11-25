type SearchBarProps = {
    value: string;
    onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <input
            className="search"
            type="search"
            placeholder="Cari produk..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            aria-label="Cari produk"
        />
    );
}