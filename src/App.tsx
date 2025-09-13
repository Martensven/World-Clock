
import { Routes, Route } from "react-router-dom";
import AddCity from "./components/AddCity/addCity";
import Favorites from "./components/Favorites/favorites";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import "./style.css"
import FrontPage from "./components/frontPage/FrontPage";



export default function App() {
  return <>
    <Header></Header>

    <Routes>
      <Route path="/World-Clock/" element={<FrontPage />}></Route>
      <Route path="/World-Clock/add-city" element={<AddCity />}></Route>
      <Route path="/World-Clock/favorites" element={<Favorites />}></Route>
    </Routes>

    <Footer></Footer>
  </>;
}