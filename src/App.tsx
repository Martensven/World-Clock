
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FetchAPI from "./mockDB/fetchAPI";
import AddCity from "./mockDB/addCity";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import "./style.css"



export default function App() {
  return <>
    <Header></Header>
    <Router>
      <Routes>
        <Route path="/" element={<FetchAPI />}></Route>
        <Route path="/add-city" element={<AddCity />}></Route>
        <Route path="" element={<FetchAPI />}></Route>
      </Routes>
    </Router>
    <Footer></Footer>
  </>;
}