import { useState } from "react";
import { addCity } from "./cityUtils";

export default function AddCity() {
    const [cityName, setCityName] = useState("");
    const [countryName, setCountryName] = useState("");
    const [timeZone, setTimeZone] = useState<number>(0);
    const [featured, setFeatured] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!cityName || !countryName) {
            setMessage("Du måste fylla i stad och land");
            return;
        }

        const newCity = addCity(
            cityName,
            countryName,
            timeZone,
            featured ? "true" : "false",
            favorite
        );

        if (newCity) {
            setMessage(`Staden ${newCity.cityName} lades till!`);
            setCityName("");
            setCountryName("");
            setTimeZone(0);
            setFeatured(false);
            setFavorite(false);
        } else {
            setMessage("Staden finns redan i listan");
        }
    }

    return (
        <main>
            <h1>Lägg till en ny stad</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "300px" }}>
                <input
                    type="text"
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    placeholder="Stad..."
                />
                <input
                    type="text"
                    value={countryName}
                    onChange={(e) => setCountryName(e.target.value)}
                    placeholder="Land..."
                />
                <input
                    type="number"
                    value={timeZone}
                    onChange={(e) => setTimeZone(Number(e.target.value))}
                    placeholder="Tidszon (t.ex. 1, -5)"
                />
                <label>
                    <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                    />
                    Featured
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={favorite}
                        onChange={(e) => setFavorite(e.target.checked)}
                    />
                    Favorit
                </label>
                <button type="submit">Lägg till stad</button>
            </form>
            {message && <p>{message}</p>}
        </main>
    );
}
