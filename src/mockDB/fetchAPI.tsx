import { useState, useEffect } from "react";
import cityList from "./cityList";
import AnalogClock from "../components/clocks/AnalogClock";
import "./style.css";

interface City {
    cityName: string;
    countryName: string;
    timeZone: number;
    featuredCity: string;
}

interface CityCard extends City {
    currentTime: Date;
    mode: "analog" | "digital";
}

export default function FetchAPI() {
    const [cityInput, setCityInput] = useState("");
    const [cityCards, setCityCards] = useState<CityCard[]>([]);
    const [error, setError] = useState<string | null>(null);

    function getCityData(name: string): City | null {
        return (
            cityList.find(
                (c) => c.cityName.toLowerCase() === name.trim().toLowerCase()
            ) ?? null
        );
    }

    function calculateLocalTime(offset: number): Date {
        const nowUTC = new Date();
        const utcMillis = nowUTC.getTime() + nowUTC.getTimezoneOffset() * 60000;
        const localMillis = utcMillis + offset * 3600000;
        return new Date(localMillis);
    }

    function handleSearch() {
        const match = getCityData(cityInput);
        if (!match) {
            setError("Staden hittades inte");
            return;
        }

        const alreadyExists = cityCards.some(
            (c) => c.cityName.toLowerCase() === match.cityName.toLowerCase()
        );
        if (alreadyExists) {
            setError("Staden är redan tillagd");
            return;
        }

        // 🔄 Markera staden som featured
        match.featuredCity = "true";

        const newCard: CityCard = {
            ...match,
            currentTime: calculateLocalTime(match.timeZone),
            mode: "digital",
        };

        setCityCards([...cityCards, newCard]);
        setError(null);
        setCityInput("");
    }

    function toggleMode(cityName: string) {
        setCityCards((prev) =>
            prev.map((card) =>
                card.cityName === cityName
                    ? { ...card, mode: card.mode === "digital" ? "analog" : "digital" }
                    : card
            )
        );
    }

    function removeCard(cityName: string) {
        setCityCards((prev) =>
            prev.filter((card) => card.cityName !== cityName)
        );
    }

    // ✅ Lägg till alla featured-städer vid första renderingen
    useEffect(() => {
        const featuredCities = cityList
            .filter((c) => c.featuredCity === "true")
            .map((c) => ({
                ...c,
                currentTime: calculateLocalTime(c.timeZone),
                mode: "digital" as const,
            }));

        setCityCards(featuredCities);
    }, []);

    // ✅ Uppdatera klockan varje sekund
    useEffect(() => {
        const interval = setInterval(() => {
            setCityCards((prev) =>
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
            <h1>Städer & klockor</h1>

            {/* Sökruta */}
            <div className="searchContainer">
                <input
                    type="search"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    placeholder="Skriv en stad..."
                />
                <button onClick={handleSearch} disabled={!cityInput}>
                    Sök
                </button>
            </div>

            {error && <p>{error}</p>}

            {/* Grid med städer */}
            <div className="cardContainer">
                {cityCards.map((card) => (
                    <div key={card.cityName} className="cityCard">
                        <button onClick={() => removeCard(card.cityName)}>✕</button>
                        <h2>{card.cityName}</h2>
                        <p>{card.countryName}</p>
                        <p>
                            UTC{card.timeZone >= 0 ? "+" : ""}
                            {card.timeZone}
                        </p>

                        {card.mode === "digital" ? (
                            <p>{card.currentTime.toLocaleTimeString("sv-SE", { hour12: false })}</p>
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
        </div>
    );
}
