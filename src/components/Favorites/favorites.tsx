import { useFavorites } from "../../hooks/useFavorites";
import CityCardComponent from "./favoriteCityCard";

export default function Favorites() {
    const { favorites, removeFavorite, toggleMode } = useFavorites();

    return (
        <main>
            <h1>Mina favoriter</h1>
            {favorites.length === 0 ? (
                <p>Du har inga favoriter ännu.</p>
            ) : (
                <div className="cardContainer">
                    {favorites.map((card) => (
                        <CityCardComponent
                            key={card.cityName}
                            card={card}
                            onRemove={removeFavorite}
                            onToggleMode={toggleMode}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}
