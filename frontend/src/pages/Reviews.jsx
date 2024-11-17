import { useState, useEffect } from "react"; 
import { FaStar } from "react-icons/fa";
import ReviewForm from "../components/ReviewForm";
import axios from "axios";
import "../index.scss";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Pirmiausia, paklauskite atsiliepimų iš serverio
    axios.get("http://127.0.0.1:3000/reviews")
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error("Klaida gaunant atsiliepimus:", error.message);
      });
  }, []);

  const handleReviewSubmit = (newReview) => {
    const updatedReviews = [
      ...reviews,
      { ...newReview, date: new Date().toLocaleDateString() },
    ];
    setReviews(updatedReviews);
    setShowForm(false);  // Uždarome formą po sėkmingo įrašymo
    // Galite čia įtraukti logiką, kad atnaujintumėte serverį, jei reikia
  };

  const handleReviewDelete = (id) => {
    axios.delete(`http://127.0.0.1:3000/reviews/${id}`)
      .then(response => {
        console.log(response.data.message);
        setReviews(reviews.filter(review => review.id !== id));
      })
      .catch(error => {
        console.error("Klaida šalinant atsiliepimą:", error.message);
      });
  };

  return (
    <div className="reviews-container">
      <h2>Klientų atsiliepimai</h2>
      
      {/* Rodoma tik jei forma dar nerodoma */}
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="leave-review-button">
          Palikite atsiliepimą
        </button>
      )}

      {/* Rodoma, kai showForm yra true */}
      {showForm && <ReviewForm onSubmit={handleReviewSubmit} />}

      <div className="reviews-wrapper">
        {reviews.map((review) => (
          <div key={review.id} className="review">
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
            <p>{review.Data}</p>
            <button onClick={() => handleReviewDelete(review.id)} className="delete-button">
              Ištrinti
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
