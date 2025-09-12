import "./header.css";
import { Link } from "react-router";

export default function Header() {

    return (
        <>
            <header>
                <h1>World Clock</h1>
                <section>
                    <Link to="/World-Clock"><button>Start</button></Link>
                    <Link to="/World-Clock/add-city"><button>Lägg till</button></Link>
                    <Link to="/World-Clock/favorites"><button>Favoriter</button></Link>
                </section>
            </header>
        </>
    )
}