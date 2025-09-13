import { type City } from "../../interfaces/cityCard";

interface SuggestionListProps {
    suggestions: City[];
    highlightIndex: number;
    onSelect: (cityName: string) => void;
}

export default function SuggestionList({
    suggestions,
    highlightIndex,
    onSelect,
}: SuggestionListProps) {
    return (
        <ul className="suggestionList">
            {suggestions.map((city, idx) => (
                <li
                    key={city.cityName}
                    className={idx === highlightIndex ? "highlighted" : ""}
                    onClick={() => onSelect(city.cityName)}
                >
                    {city.cityName}, {city.countryName}
                </li>
            ))}
        </ul>
    );
}