export default interface CityFormProps {
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

export default interface MessageProps {
    text: string | null;
}