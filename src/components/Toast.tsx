import { useEffect, useState } from "react";

type ToastProps = {
    message: string;
    onView: () => void;
};

export default function Toast({ message, onView }: ToastProps) {
    const [leaving, setLeaving] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLeaving(true), 2200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className={`toast ${leaving ? "is-leaving" : ""}`}
            role="status"
            aria-live="polite"
        >
            <span>{message}</span>
            <button className="toast__btn" onClick={onView}>
                Lihat
            </button>
        </div>
    );
}