import { useState } from "react";
import { addCity } from "../utils/cityUtils";
import CityForm from "./CityForm.tsx";
import Message from "./Message.tsx";



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
            <CityForm
                cityName={cityName}
                setCityName={setCityName}
                countryName={countryName}
                setCountryName={setCountryName}
                timeZone={timeZone}
                setTimeZone={setTimeZone}
                featured={featured}
                setFeatured={setFeatured}
                favorite={favorite}
                setFavorite={setFavorite}
                handleSubmit={handleSubmit}
            />
            <Message text={message} />
        </main>
    );
}
