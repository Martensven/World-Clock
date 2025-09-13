import { type CityCard } from "../../interfaces/cityCard";
import AnalogClock from "../clocks/AnalogClock";

interface CityCardProps {
    card: CityCard;
    onRemove: (cityName: string) => void;
    onToggleMode: (cityName: string) => void;
    onFavorite: (cityName: string) => void;
}

export default function CityCardComponent({
    card,
    onRemove,
    onToggleMode,
    onFavorite,
}: CityCardProps) {
    return (
        <div className="cityCard">
            <button className="removeBtn" onClick={() => onRemove(card.cityName)}>✕</button>
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

            <button onClick={() => onToggleMode(card.cityName)}>
                Byt till {card.mode === "digital" ? "analog" : "digital"}
            </button>

            <button onClick={() => onFavorite(card.cityName)}>
                {card.favorite ? "★ Favorit" : "☆ Lägg till favorit"}
            </button>
        </div>
    );
}