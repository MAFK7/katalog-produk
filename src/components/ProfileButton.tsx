import { useState } from "react";
import { profile } from "../data/profile";

export default function ProfileButton() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="profile">
            <button
                className="profile__btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-label="Profil mahasiswa"
            >
                {profile.name.charAt(0)}
            </button>

            {isOpen && (
                <div className="profile__card" role="dialog" aria-label="Profil mahasiswa">
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
            )}
        </div>
    );
}