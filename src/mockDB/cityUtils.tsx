import cityList from "./cityList";

export interface City {
    cityName: string;
    countryName: string;
    timeZone: number;
    featuredCity: string;
}

/**
 * Lägg till en ny stad i cityList
 * @param cityName Namn på staden
 * @param countryName Namn på landet
 * @param timeZone Tidszon (t.ex. +1, -5)
 * @param featuredCity "true" eller "false"
 * @returns Den nya staden om den lades till, annars null
 */
export function addCity(
    cityName: string,
    countryName: string,
    timeZone: number,
    featuredCity: "true" | "false" = "false"
): City | null {
    const alreadyExists = cityList.some(
        (c) => c.cityName.toLowerCase() === cityName.toLowerCase()
    );

    if (alreadyExists) {
        console.warn("Staden finns redan i listan.");
        return null;
    }

    const newCity: City = {
        cityName,
        countryName,
        timeZone,
        featuredCity,
    };

    cityList.push(newCity); // 🔄 lägg till i listan
    return newCity;
}