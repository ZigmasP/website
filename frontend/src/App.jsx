import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Reviews from "./pages/Reviews";
import Contacts from "./pages/Contacts";
import "./index.scss";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/atsiliepimai" element={<Reviews />} />
        <Route path="/kontaktai" element={<Contacts />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
