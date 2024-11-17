import { useState, useEffect } from "react";
import Rating from "../components/Rating";
import axios from "axios";
import "../index.scss";

const Home = () => {
  const [showContactBox, setShowContactBox] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  // Uždelstas kontaktų laukelio rodymas
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContactBox(true);
    }, 2300);
    return () => clearTimeout(timer);
  }, []);

  // Vidutinio reitingo gavimas iš serverio
  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/reviews") // Pakeiskite URL į serverio adresą
      .then((response) => {
        const reviews = response.data.reviews;
        if (Array.isArray(reviews) && reviews.length > 0) {
          const totalRating = reviews.reduce(
            (acc, review) => acc + (review.Vertinimas || 0),
            0
          );
          const avgRating = Math.round(totalRating / reviews.length);
          setAverageRating(avgRating);
        } else {
          setAverageRating(0); // Nėra atsiliepimų, nustatome 0
        }
      })
      .catch((error) => {
        console.error("Klaida gaunant vidutinį reitingą:", error.message);
        setAverageRating(0); // Klaidos atveju nustatome 0
      });
  }, []);

  return (
    <div className="home-container">
      <section className="hero">
        <h1>Sveiki atvykę į ZigmasWebDev.lt</h1>
        <p>Kuriu modernias svetaines</p>
        {showContactBox && (
          <div className="contact-box">
            <p>Susisiekime. +37060627573</p>
          </div>
        )}
        <Rating averageRating={averageRating} />
      </section>
    </div>
  );
};

export default Home;
