// cityUtils.ts
import cityList from "../../mockDB/cityList";

export interface City {
    cityName: string;
    countryName: string;
    timeZone: number;
    featuredCity: string;
    favorite?: boolean; // ny flagga
}

const STORAGE_KEY = "cities";

export function getCities(): City[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored) as City[];
    }
    return cityList.map((c) => ({ ...c, favorite: false })); // fallback
}

function saveCities(cities: City[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
}

export function addCity(
    cityName: string,
    countryName: string,
    timeZone: number,
    featuredCity: "true" | "false" = "false",
    favorite: boolean = false
): City | null {
    const cities = getCities();

    const alreadyExists = cities.some(
        (c) => c.cityName.toLowerCase() === cityName.toLowerCase()
    );

    if (alreadyExists) {
        return null;
    }

    const newCity: City = {
        cityName,
        countryName,
        timeZone,
        featuredCity,
        favorite,
    };

    const updatedCities = [...cities, newCity];
    saveCities(updatedCities);

    return newCity;
}

export function toggleFavorite(cityName: string): City[] {
    const cities = getCities().map((c) =>
        c.cityName === cityName ? { ...c, favorite: !c.favorite } : c
    );
    saveCities(cities);
    return cities;
}
