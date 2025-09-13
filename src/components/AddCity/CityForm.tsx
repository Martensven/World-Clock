interface CityFormProps {
    cityName: string;
    setCityName: (v: string) => void;
    countryName: string;
    setCountryName: (v: string) => void;
    timeZone: number;
    setTimeZone: (v: number) => void;
    featured: boolean;
    setFeatured: (v: boolean) => void;
    favorite: boolean;
    setFavorite: (v: boolean) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

export default function CityForm({
    cityName,
    setCityName,
    countryName,
    setCountryName,
    timeZone,
    setTimeZone,
    featured,
    setFeatured,
    favorite,
    setFavorite,
    handleSubmit,
}: CityFormProps) {
    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                maxWidth: "300px",
            }}
        >
            <input
                className="textInput"
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="Stad..."
            />
            <input
                className="textInput"
                type="text"
                value={countryName}
                onChange={(e) => setCountryName(e.target.value)}
                placeholder="Land..."
            />
            <input
                className="textInput"
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
                Fäst på startsida
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={favorite}
                    onChange={(e) => setFavorite(e.target.checked)}
                />
                Lägg till som favorit
            </label>
            <button type="submit">Lägg till stad</button>
        </form>
    );
}
