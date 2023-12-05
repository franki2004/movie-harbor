/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import * as reviewService from '../../services/reviewService'
import AuthContext from '../../contexts/authContext'

export default function ReviewForm({ movieId, onReviewCreated }) {
    const [reviewText, setReviewText] = useState('');
    const [isThumbsUpSelected, setIsThumbsUpSelected] = useState(false);
    const [isThumbsDownSelected, setIsThumbsDownSelected] = useState(false);
    const [errors, setErrors] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);

    const handleThumbsUpClick = () => {
        setIsThumbsUpSelected(!isThumbsUpSelected);
        setIsThumbsDownSelected(false);
    };

    const handleThumbsDownClick = () => {
        setIsThumbsDownSelected(!isThumbsDownSelected);
        setIsThumbsUpSelected(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = [];
        if (!isAuthenticated) {
            newErrors.push('You need to be logged in to review the movie.');
        }

        if (reviewText.trim().length < 10) {
            newErrors.push('Review must be at least 10 characters.');
        } else if (reviewText.trim().length > 2000) {
            newErrors.push("Review must not exceed 2000 characters")
        }

        if (!isThumbsUpSelected && !isThumbsDownSelected) {
            newErrors.push('Please choose either thumbs up or thumbs down.');
        }

        setErrors(newErrors);
        const thumbs = {
            thumbsUp: isThumbsUpSelected,
            thumbsDown: isThumbsDownSelected,
        };

        if (newErrors.length === 0) {


            setIsThumbsDownSelected(false)
            setIsThumbsUpSelected(false)
            setReviewText("")
            await reviewService.create(movieId, reviewText, thumbs)
            onReviewCreated()
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="review-input">
                <textarea
                    placeholder="Your Review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    style={{ color: 'black', marginBottom: "0" }}
                />
                {errors.length > 0 && (
                    <div className="error-messages">
                        {errors.map((error, index) => (
                            <p key={index} className="error-message" style={{ color: 'red', fontSize: "bold" }} > {error}</p>
                        ))}
                    </div>
                )}
                <div className="review-buttons">
                    <button
                        type="button"
                        className={`thumbs-up ${isThumbsUpSelected ? 'selected' : ''}`}
                        onClick={handleThumbsUpClick}
                        style={{ marginRight: "0.5rem" }}
                    >
                        <i className={`fa ${isThumbsUpSelected ? 'fa-thumbs-up' : 'fa-thumbs-o-up'}`}></i>
                    </button>
                    <button
                        type="button"
                        className={`thumbs-down ${isThumbsDownSelected ? 'selected' : ''}`}
                        onClick={handleThumbsDownClick}
                        style={{ marginRight: "2rem" }}
                    >
                        <i className={`fa ${isThumbsDownSelected ? 'fa-thumbs-down' : 'fa-thumbs-o-down'}`}></i>
                    </button>
                    <button type="submit"><i className="fa fa-location-arrow"></i> Review</button>
                </div>
            </div>
        </form >
    );
}
