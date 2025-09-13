import { useEffect, useState } from "react";
import { getCities, toggleFavorite, type City } from "../components/utils/cityUtils";

export interface CityCard extends City {
    currentTime: Date;
    mode: "analog" | "digital";
}

function calculateLocalTime(offset: number): Date {
    const nowUTC = new Date();
    const utcMillis = nowUTC.getTime() + nowUTC.getTimezoneOffset() * 60000;
    const localMillis = utcMillis + offset * 3600000;
    return new Date(localMillis);
}

export function useFavorites() {
    const [favorites, setFavorites] = useState<CityCard[]>([]);

    function refreshFavorites() {
        const favs = getCities()
            .filter((c) => c.favorite)
            .map((c) => ({
                ...c,
                currentTime: calculateLocalTime(c.timeZone),
                mode: "digital" as const,
            }));
        setFavorites(favs);
    }

    function removeFavorite(cityName: string) {
        toggleFavorite(cityName); // uppdatera localStorage
        refreshFavorites(); // ladda om listan
    }

    function toggleMode(cityName: string) {
        setFavorites((prev) =>
            prev.map((card) =>
                card.cityName === cityName
                    ? { ...card, mode: card.mode === "digital" ? "analog" : "digital" }
                    : card
            )
        );
    }

    useEffect(() => {
        refreshFavorites();
    }, []);

    // Uppdatera klockor varje sekund
    useEffect(() => {
        const interval = setInterval(() => {
            setFavorites((prev) =>
                prev.map((card) => ({
                    ...card,
                    currentTime: calculateLocalTime(card.timeZone),
                }))
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return { favorites, removeFavorite, toggleMode };
}
