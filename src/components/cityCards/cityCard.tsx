// import type { cityCard } from "../../interfaces/cityCard"
import "./cityCard.css"
import type { AnalogClockSettings } from "../../interfaces/AnalogClock"
import AnalogClock from "../clocks/AnalogClock"
import DigitalClock from "../clocks/DigitalClock"
import { useState } from "react"


export default function CityContainer() {

    const [typeAnalog, setTypeAnalog] = useState(false);
    const [analogSettings, setAnalogSettings] = useState<AnalogClockSettings>({
        faceColor: '#f4f4f4',
        borderColor: '#800000',
        lineColor: '#000000',
        largeColor: '#800000',
        secondColor: '#ff7f50'
    });

    return (
        <>
            <article className="cityContainer">
                <button onClick={() => setTypeAnalog(!typeAnalog)}>
                    {typeAnalog ? 'Digital' : 'Analog'}
                </button>

                {typeAnalog ? (
                    <AnalogClock {...{ ...analogSettings, setAnalogSettings }} />
                ) : (
                    <DigitalClock />
                )}
            </article>
        </>
    )
}