import { useEffect, useState } from "react";
import { getCities, toggleFavorite, type City } from "./cityUtils";
import AnalogClock from "../components/clocks/AnalogClock";

interface CityCard extends City {
    currentTime: Date;
    mode: "analog" | "digital";
}

export default function Favorites() {
    const [favorites, setFavorites] = useState<CityCard[]>([]);

    function calculateLocalTime(offset: number): Date {
        const nowUTC = new Date();
        const utcMillis = nowUTC.getTime() + nowUTC.getTimezoneOffset() * 60000;
        const localMillis = utcMillis + offset * 3600000;
        return new Date(localMillis);
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

    function removeFavorite(cityName: string) {
        // Uppdatera localStorage
        const updatedCities = toggleFavorite(cityName);

        // Ladda om listan så bara favoriter visas
        const favs = updatedCities
            .filter((c) => c.favorite)
            .map((c) => ({
                ...c,
                currentTime: calculateLocalTime(c.timeZone),
                mode: "digital" as const,
            }));

        setFavorites(favs);
    }

    useEffect(() => {
        const favs = getCities()
            .filter((c) => c.favorite)
            .map((c) => ({
                ...c,
                currentTime: calculateLocalTime(c.timeZone),
                mode: "digital" as const,
            }));

        setFavorites(favs);
    }, []);

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

    return (
        <div>
            <h1>Mina favoriter</h1>
            {favorites.length === 0 ? (
                <p>Du har inga favoriter ännu.</p>
            ) : (
                <div className="cardContainer">
                    {favorites.map((card) => (
                        <div key={card.cityName} className="cityCard">
                            <button onClick={() => removeFavorite(card.cityName)}>✕</button>
                            <h2>{card.cityName}</h2>
                            <p>{card.countryName}</p>
                            <p>
                                UTC{card.timeZone >= 0 ? "+" : ""}
                                {card.timeZone}
                            </p>

                            {card.mode === "digital" ? (
                                <p>
                                    {card.currentTime.toLocaleTimeString("sv-SE", {
                                        hour12: false,
                                    })}
                                </p>
                            ) : (
                                <AnalogClock
                                    time={card.currentTime}
                                    faceColor="#ffffff"
                                    borderColor="#333333"
                                    lineColor="#999999"
                                    largeColor="#000000"
                                    secondColor="#ff0000"
                                    setAnalogSettings={() => { }}
                                />
                            )}

                            <button onClick={() => toggleMode(card.cityName)}>
                                Byt till {card.mode === "digital" ? "analog" : "digital"}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
