import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import ReviewForm from "../components/ReviewForm";
import axios from "axios";
import "../index.scss";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Naudojama datos formatavimui
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("lt-LT"); // Lietuvos datos formatas
  };

  // Atsiliepimų gavimas iš serverio
  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/reviews")
      .then((response) => {
        console.log("Atsiliepimai iš serverio:", response.data);

        // Patikriname, ar serverio atsakymas yra masyvas
        if (Array.isArray(response.data.reviews)) {
          setReviews(response.data.reviews);
        } else {
          console.error("Serverio atsakymas nėra masyvas.");
          setReviews([]); // Nustatome tuščią masyvą, jei atsakymas netinkamas
        }
      })
      .catch((error) => {
        console.error("Klaida gaunant atsiliepimus:", error.message);
      });
  }, []);

  // Atsiliepimo pridėjimas
  const handleReviewSubmit = (newReview) => {
    const updatedReviews = [
      ...reviews,
      { ...newReview, date: new Date().toLocaleDateString() },
    ];
    setReviews(updatedReviews);
    setShowForm(false); // Uždarome formą po pridėjimo
  };

  return (
    <div className="reviews-container">
      <h2>Klientų atsiliepimai</h2>

      {/* Rodoma tik jei forma dar nerodoma */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="leave-review-button"
        >
          Palikite atsiliepimą
        </button>
      )}

      {/* Rodoma, kai showForm yra true */}
      {showForm && <ReviewForm onSubmit={handleReviewSubmit} />}

      <div className="reviews-wrapper">
        {/* Patikriname, ar reviews yra masyvas */}
        {Array.isArray(reviews) &&
          reviews.map((review) => (
            <div key={review.id || review.Vardas} className="review">
              <h3>{review.Vardas}</h3>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < review.Vertinimas ? "filled" : "empty"}
                  />
                ))}
              </div>
              <p>{review.Atsiliepimas}</p>
              <p>{formatDate(review.Data)}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Reviews;
