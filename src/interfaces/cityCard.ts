export interface cityCard {
    city: string,
    country: string,
    timezone: number
}

export interface CityCard extends City {
    currentTime: Date;
    mode: "analog" | "digital";
}

export interface City {
    cityName: string;
    countryName: string;
    timeZone: number;
    featuredCity: string;
    favorite?: boolean;
}

