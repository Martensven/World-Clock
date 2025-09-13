import { useState, useEffect, useRef } from "react";
import { getCities, toggleFavorite } from "../utils/cityUtils";
import { type City, type CityCard } from "../../interfaces/cityCard";
import SearchBar from "./SearchBar.tsx";
import CityCardComponent from "./CityCard";


export default function FrontPage() {
    const [cityInput, setCityInput] = useState("");
    const [cityCards, setCityCards] = useState<CityCard[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [suggestions, setSuggestions] = useState<City[]>([]);
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const searchRef = useRef<HTMLDivElement>(null);

    function calculateLocalTime(offset: number): Date {
        const nowUTC = new Date();
        const utcMillis = nowUTC.getTime() + nowUTC.getTimezoneOffset() * 60000;
        const localMillis = utcMillis + offset * 3600000;
        return new Date(localMillis);
    }

    function handleSearch(cityName?: string) {
        const searchTerm = cityName ?? cityInput;
        const cities = getCities();
        const match = cities.find(
            (c) => c.cityName.toLowerCase() === searchTerm.trim().toLowerCase()
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
        setSuggestions([]);
        setHighlightIndex(-1);
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

    // Hantera suggestions
    useEffect(() => {
        if (!cityInput.trim()) {
            setSuggestions([]);
            setHighlightIndex(-1);
            return;
        }
        const cities = getCities();
        const matches = cities.filter((c) =>
            c.cityName.toLowerCase().includes(cityInput.toLowerCase())
        );
        setSuggestions(matches);
        setHighlightIndex(-1);
    }, [cityInput]);

    // Klick utanför stänger listan
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setSuggestions([]);
                setHighlightIndex(-1);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Tangentbordsnavigation
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (suggestions.length === 0) return;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlightIndex((prev) =>
                prev < suggestions.length - 1 ? prev + 1 : 0
            );
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlightIndex((prev) =>
                prev > 0 ? prev - 1 : suggestions.length - 1
            );
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
                handleSearch(suggestions[highlightIndex].cityName);
            } else {
                handleSearch();
            }
        } else if (e.key === "Escape") {
            setSuggestions([]);
            setHighlightIndex(-1);
        }
    }

    // Ladda featured cities
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

    // Uppdatera klockorna varje sekund
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
        <main>
            <h1>Städer & klockor</h1>

            <SearchBar
                cityInput={cityInput}
                setCityInput={setCityInput}
                suggestions={suggestions}
                highlightIndex={highlightIndex}
                searchRef={searchRef}
                onKeyDown={handleKeyDown}
                onSearch={handleSearch}
            />

            {error && <p>{error}</p>}

            <div className="cardContainer">
                {cityCards.map((card) => (
                    <CityCardComponent
                        key={card.cityName}
                        card={card}
                        onRemove={removeCard}
                        onToggleMode={toggleMode}
                        onFavorite={handleFavorite}
                    />
                ))}
            </div>
        </main>
    );
}
