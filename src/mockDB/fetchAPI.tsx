import { useState, useEffect } from "react";
import { getCities, toggleFavorite } from "./cityUtils";
import AnalogClock from "../components/clocks/AnalogClock";
import "./style.css";

interface City {
    cityName: string;
    countryName: string;
    timeZone: number;
    featuredCity: string;
    favorite?: boolean;
}

interface CityCard extends City {
    currentTime: Date;
    mode: "analog" | "digital";
}

export default function FetchAPI() {
    const [cityInput, setCityInput] = useState("");
    const [cityCards, setCityCards] = useState<CityCard[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<City[]>([]);

    function calculateLocalTime(offset: number): Date {
        const nowUTC = new Date();
        const utcMillis = nowUTC.getTime() + nowUTC.getTimezoneOffset() * 60000;
        const localMillis = utcMillis + offset * 3600000;
        return new Date(localMillis);
    }

    function handleSearch(cityName?: string) {
        const cities = getCities();
        const query = cityName ?? cityInput;
        const match = cities.find(
            (c) => c.cityName.toLowerCase() === query.trim().toLowerCase()
        );

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

        match.featuredCity = "true";

        const newCard: CityCard = {
            ...match,
            currentTime: calculateLocalTime(match.timeZone),
            mode: "digital",
        };

        setCityCards([...cityCards, newCard]);
        setError(null);
        setCityInput("");
        setSuggestions([]); // stäng dropdown
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
        setCityCards((prev) => prev.filter((card) => card.cityName !== cityName));
    }

    function handleFavorite(cityName: string) {
        const updatedCities = toggleFavorite(cityName);
        setCityCards((prev) =>
            prev.map((card) =>
                card.cityName === cityName
                    ? {
                        ...card,
                        favorite:
                            updatedCities.find((c) => c.cityName === cityName)?.favorite ??
                            false,
                    }
                    : card
            )
        );
    }

    useEffect(() => {
        const featuredCities = getCities()
            .filter((c) => c.featuredCity === "true")
            .map((c) => ({
                ...c,
                currentTime: calculateLocalTime(c.timeZone),
                mode: "digital" as const,
            }));

        setCityCards(featuredCities);
    }, []);

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

    // Uppdatera förslag när man skriver
    useEffect(() => {
        if (!cityInput.trim()) {
            setSuggestions([]);
            return;
        }
        const cities = getCities();
        const matches = cities.filter((c) =>
            c.cityName.toLowerCase().includes(cityInput.toLowerCase())
        );
        setSuggestions(matches);
    }, [cityInput]);

    return (
        <main>
            <h1>Städer & klockor</h1>

            <div className="searchContainer">
                <input
                    className="textInput"
                    type="search"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    placeholder="Skriv en stad..."
                />
                <button className="searchBtn" onClick={() => handleSearch()} disabled={!cityInput}>
                    Sök
                </button>

                {/* Dropdown med förslag */}
                {suggestions.length > 0 && (
                    <ul className="suggestionList">
                        {suggestions.map((city) => (
                            <li
                                key={city.cityName}
                                onClick={() => handleSearch(city.cityName)}
                            >
                                {city.cityName}, {city.countryName}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {error && <p>{error}</p>}

            <div className="cardContainer">
                {cityCards.map((card) => (
                    <div key={card.cityName} className="cityCard">
                        <button className="removeBtn" onClick={() => removeCard(card.cityName)}>✕</button>
                        <h2>{card.cityName}</h2>
                        <p>{card.countryName}</p>
                        <p>
                            UTC{card.timeZone >= 0 ? "+" : ""}
                            {card.timeZone}
                        </p>

                        {card.mode === "digital" ? (
                            <p className="digitalClock">
                                {card.currentTime.toLocaleTimeString("sv-SE", { hour12: false })}
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

                        <button onClick={() => handleFavorite(card.cityName)}>
                            {card.favorite ? "★ Favorit" : "☆ Lägg till favorit"}
                        </button>
                    </div>
                ))}
            </div>
        </main>
    );
}
