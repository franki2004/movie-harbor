import { useState } from "react";
import * as reviewService from '../../services/reviewService'
export default function ReviewForm(movieId) {
    const [reviewText, setReviewText] = useState('');
    const [isThumbsUpSelected, setIsThumbsUpSelected] = useState(false);
    const [isThumbsDownSelected, setIsThumbsDownSelected] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleThumbsUpClick = () => {
        setIsThumbsUpSelected(!isThumbsUpSelected);
        setIsThumbsDownSelected(false);
    };

    const handleThumbsDownClick = () => {
        setIsThumbsDownSelected(!isThumbsDownSelected);
        setIsThumbsUpSelected(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = [];

        if (reviewText.trim().length < 20) {
            newErrors.push('Review must be at least 20 characters.');
        }

        if (!isThumbsUpSelected && !isThumbsDownSelected) {
            newErrors.push('Please choose either thumbs up or thumbs down.');
        }

        setErrors(newErrors);

        if (newErrors.length === 0) {
            reviewService.create(movieId, e.target.value)
        }
    };

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
                            <p key={index} className="error-message" style={{ color: 'red', fontSize: "bold" }} > { error }</p>
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

