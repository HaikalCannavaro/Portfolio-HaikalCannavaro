"use client";

import { useEffect } from "react";

export default function ResetOnRefresh() {
    useEffect(() => {
        // 1. Matiin scroll restoration bawaan Chrome/Safari
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        // 2. Bersihin URL dari hashtag (misal dari /#about balik jadi /)
        if (window.location.hash) {
            window.history.replaceState(
                null,
                "",
                window.location.pathname + window.location.search
            );
        }

        // 3. Paksa layar nge-snap mentok atas seketika
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    // Komponen ini gak ngerender apa-apa secara visual
    return null;
}
