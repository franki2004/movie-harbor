/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"

import * as movieService from '../../services/movieService'
import * as reviewService from '../../services/reviewService'

import ReviewForm from "./ReviewForm"
import AuthContext from "../../contexts/authContext"
import ReviewEditModal from '../ReviewEditModal/ReviewEditModal'
import styles from './MovieDetails.module.css'

export default function MovieDetails() {
    const { movieId } = useParams()
    const { userId } = useContext(AuthContext)
    const [movie, setMovie] = useState({})
    const [reviews, setReviews] = useState([])
    const [openEditModal, setOpenEditModal] = useState(false)
    const [reviewToEditData, setReviewToEditData] = useState({})

    const fetchMovieAndReviews = async () => {
        try {
            const movieData = await movieService.getOne(movieId);
            const reviewsData = await reviewService.getAll(movieId);
            setMovie(movieData);
            setReviews(reviewsData);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchMovieAndReviews();
    }, [movieId]);

    const positiveReviews = Object.values(reviews).filter((review) => review.thumbsUp)
    const percentPositive = (positiveReviews.length / Object.values(reviews).length) * 100
    let color
    if (percentPositive < 25) {
        color = "red"
    } else if (percentPositive >= 25 && percentPositive < 75) {
        color = "darkorange"
    } else {
        color = "green"
    }
    const handleEditClick = async (values) => {
        setReviewToEditData({ ...values })
        setOpenEditModal(true)
    }
    const handleDeleteClick = async (reviewId) => {
        await reviewService.deleteReview(reviewId)
        fetchMovieAndReviews()
    }

    return (
        <>

            {openEditModal && <ReviewEditModal refresh={() =>fetchMovieAndReviews()} openEditModal={setOpenEditModal} reviewData={reviewToEditData} />}
            <section className="anime-details spad">
                <div className="container">
                    <div className="anime__details__content">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="anime__details__pic"
                                    style={{
                                        backgroundImage: `url(${movie.img})`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                    }}>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="anime__details__text">
                                    <div className="anime__details__title">
                                        <h3>{movie.title}</h3>
                                        <span>{movie.category}</span>
                                    </div>
                                    <div className="anime__details__rating">
                                        {reviews.length > 0 && <div className="rating" style={{ color: color }}> Positive Reviews: {percentPositive.toFixed(2)}%</div>}
                                        <span>{reviews.length} Reviews</span>
                                    </div>
                                    <p>{movie.description}</p>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-8">
                            <div className="anime__details__review">
                                <div className="anime__details__form" style={{ marginBottom: "2rem" }}>
                                    <div className="section-title">
                                        <h5>Your Review</h5>
                                    </div>
                                    <ReviewForm
                                        movieId={movie._id}
                                        onReviewCreated={fetchMovieAndReviews}

                                    />
                                </div>
                                <div className="section-title">
                                    <h5>Reviews</h5>
                                </div>

                                {reviews.map(({ _id, reviewText, _createdOn, thumbsUp, thumbsDown, owner }) => {
                                    const reviewDate = new Date(_createdOn)
                                    const formattedDate = `${reviewDate.getDate()}-${reviewDate.getMonth() + 1}-${reviewDate.getFullYear()}`
                                    return (
                                        <div key={_id} className="anime__review__item">
                                            <div className="anime__review__item__text">
                                                <h6>{owner.email} | {thumbsUp ? <i className="fa fa-thumbs-up"></i> : <i className="fa fa-thumbs-down"></i>} | <span>{formattedDate}</span></h6>
                                                <p>{reviewText}</p>
                                                {userId === owner._id && <div><button onClick={() => { handleEditClick({ owner, reviewText, thumbsUp, thumbsDown, movieId, _createdOn, _id,  }) }} 
                                                className={styles.editDeleteBtn}>EDIT</button>
                                                    <button onClick={() => handleDeleteClick(_id)} className={styles.editDeleteBtn}>DELETE</button></div>}
                                            </div>
                                        </div>)
                                })}

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}