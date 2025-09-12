
import { Routes, Route } from "react-router-dom";
import FetchAPI from "./mockDB/fetchAPI";
import AddCity from "./mockDB/addCity";
import Favorites from "./mockDB/favorites";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import "./style.css"



export default function App() {
  return <>
    <Header></Header>

    <Routes>
      <Route path="/World-Clock/" element={<FetchAPI />}></Route>
      <Route path="/World-Clock/add-city" element={<AddCity />}></Route>
      <Route path="/World-Clock/favorites" element={<Favorites />}></Route>
    </Routes>

    <Footer></Footer>
  </>;
}