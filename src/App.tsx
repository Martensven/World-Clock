// import CityContainer from "./components/cityCards/cityCard";
import FetchAPI from "./mockDB/fetchAPI";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import "./style.css"



export default function App() {
  return <>
    <Header></Header>

    <FetchAPI></FetchAPI>

    <Footer></Footer>
  </>;
}