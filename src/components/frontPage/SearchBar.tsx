// import { useRef } from "react";
import { type City } from "../../interfaces/cityCard";
import SuggestionList from "./SuggestionList";

interface SearchBarProps {
    cityInput: string;
    setCityInput: (value: string) => void;
    suggestions: City[];
    highlightIndex: number;
    searchRef: React.RefObject<HTMLDivElement | null>;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onSearch: (cityName?: string) => void;
}

export default function SearchBar({
    cityInput,
    setCityInput,
    suggestions,
    highlightIndex,
    searchRef,
    onKeyDown,
    onSearch,
}: SearchBarProps) {
    return (
        <div className="searchContainer" ref={searchRef}>
            <input
                className="textInput"
                type="search"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Skriv en stad..."
            />
            <button className="searchButton" onClick={() => onSearch()} disabled={!cityInput}>
                Sök
            </button>

            {suggestions.length > 0 && (
                <SuggestionList
                    suggestions={suggestions}
                    highlightIndex={highlightIndex}
                    onSelect={onSearch}
                />
            )}
        </div>
    );
}