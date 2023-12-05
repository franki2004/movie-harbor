/* eslint-disable react/prop-types */

import { useContext, useState } from 'react';
import * as reviewService from '../../services/reviewService'
import styles from './ReviewEditModal.module.css'
import AuthContext from '../../contexts/authContext';


export default function ReviewEditModal({openEditModal, reviewData, refresh}) {
    const [reviewText, setReviewText] = useState(reviewData.reviewText);
    const [isThumbsUpSelected, setIsThumbsUpSelected] = useState(reviewData.thumbsUp);
    const [isThumbsDownSelected, setIsThumbsDownSelected] = useState(reviewData.thumbsDown);
    const [errors, setErrors] = useState([]);
    const {isAuthenticated} = useContext(AuthContext)

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


        if (newErrors.length === 0) {


            setIsThumbsDownSelected(false)
            setIsThumbsUpSelected(false)
            setReviewText("")
            openEditModal(false)
            const movieId = reviewData.movieId
            const ownerId = reviewData.owner._Id
            const _createdOn = reviewData._createdOn

            await reviewService.edit(reviewData._id, {reviewText, thumbsUp:isThumbsUpSelected, thumbsDown:isThumbsDownSelected, movieId, ownerId, _createdOn })
            refresh()
        }
    }
    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <div className={styles.titleCloseBtn}>
                    <button className={styles.xbtn} onClick={() => { 
                        openEditModal(false) }}>
                        X
                    </button>
                </div>
                <form className={styles.editForm}onSubmit={handleSubmit}>
                    <div className={styles.textAreaContainer}>
                        <input
                            className={styles.editTextArea}
                            placeholder="Your Review"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            style={{ color: 'black', marginBottom: "0" }}
                        />
                        {errors.length > 0 && (
                            <div className={styles.errorMessages}>
                                {errors.map((error, index) => (
                                    <p key={index} className="error-message" style={{ color: 'red', fontSize: "bold" }} > {error}</p>
                                ))}
                            </div>
                        )}
                        <div className={styles.buttonContainer}>
                            <button
                                type="button"
                                className={styles.thumbsButton}
                                onClick={handleThumbsUpClick}
                                style={{ marginRight: "0.5rem" }}
                            >
                                <i className={`fa ${isThumbsUpSelected ? 'fa-thumbs-up' : 'fa-thumbs-o-up'}`}></i>
                            </button>
                            <button
                                type="button"
                                className={styles.thumbsButton}
                                onClick={handleThumbsDownClick}
                                style={{ marginRight: "2rem" }}
                            >
                                <i className={`fa ${isThumbsDownSelected ? 'fa-thumbs-down' : 'fa-thumbs-o-down'}`}></i>
                            </button>
                            <button className={styles.reviewButton} type="submit"><i className="fa fa-location-arrow"></i> REVIEW</button>
                        </div>
                    </div>
                </form >
            </div>
        </div>
    )
}