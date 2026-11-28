import { useEffect, useRef, useState } from "react";
import { profile } from "../data/profile";

export default function ProfileButton() {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const onClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("mousedown", onClickOutside);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onClickOutside);
            document.removeEventListener("keydown", onKey);
        };
    }, [isOpen]);

    return (
        <div className="profile" ref={ref}>
            <button
                className="profile__btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="Profil mahasiswa"
            >
                {profile.name.charAt(0)}
            </button>

            <div
                className={`profile__card ${isOpen ? "is-open" : ""}`}
                role="dialog"
                aria-label="Profil mahasiswa"
                aria-hidden={!isOpen}
            >
                <button
                    className="profile__close"
                    onClick={() => setIsOpen(false)}
                    aria-label="Tutup"
                >
                    ×
                </button>
                <p className="profile__label">Nama</p>
                <p className="profile__value">{profile.name}</p>
                <p className="profile__label">NIM</p>
                <p className="profile__value">{profile.nim}</p>
            </div>
        </div>
    );
}