/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext, useState } from "react"
import AuthContext from "../../contexts/authContext"
import * as reviewService from '../../services/reviewService'
import * as movieService from '../../services/movieService'
import ReviewEditModal from "../ReviewEditModal/ReviewEditModal"
import styles from './UserReviews.module.css'
import { useNavigate } from "react-router-dom"
import Path from "../../paths"

export default function UserReviews() {
    const [userReviews, setUserReviews] = useState([])
    const { userId, email, isAuthenticated } = useContext(AuthContext)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [reviewToEditData, setReviewToEditData] = useState({})
    const navigate = useNavigate()

    if (!isAuthenticated) {
        navigate(Path.Login)
    }

    const fetchReviews = async () => {
        try {
            const reviews = await reviewService.getUserReviews(userId);

            const moviePromises = reviews.map(async (review) => {
                const movie = await movieService.getOne(review.movieId);
                return { review, movie };
            });

            const reviewsWithMovies = await Promise.all(moviePromises);

            setUserReviews(reviewsWithMovies);
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [userId])

    const handleEditClick = async (values) => {
        setReviewToEditData({ ...values })
        setOpenEditModal(true)
    }
    const handleDeleteClick = async (reviewId) => {
        await reviewService.deleteReview(reviewId)
        fetchReviews()
    }

    return (
        <>
            {openEditModal && <ReviewEditModal refresh={() => fetchReviews()} openEditModal={setOpenEditModal} reviewData={reviewToEditData} />}
            {userReviews.length > 0 ? userReviews.map(({ review, movie }) => {
                const reviewDate = new Date(review._createdOn);
                const formattedDate = `${reviewDate.getDate()}-${reviewDate.getMonth() + 1}-${reviewDate.getFullYear()}`;

                return (
                    <div key={review._id} className="anime__review__item" style={{ display: 'flex' }}>
                        <div className="anime__review__item__text" style={{ flex: '1' }}>
                            <h6>
                                {email} |{' '}
                                {review.thumbsUp ? (
                                    <i className="fa fa-thumbs-up"></i>
                                ) : (
                                    <i className="fa fa-thumbs-down"></i>
                                )}{' '}
                                | <span>{formattedDate}</span>
                            </h6>
                            <p>{review.reviewText}</p>
                            <div className="anime__review__item__actions">
                                <button
                                    className={styles.editDeleteBtn}
                                    onClick={() =>
                                        handleEditClick({
                                            _ownerId: review._ownerId,
                                            reviewText: review.reviewText,
                                            thumbsUp: review.thumbsUp,
                                            thumbsDown: review.thumbsDown,
                                            movieId: review.movieId,
                                            _createdOn: review._createdOn,
                                            _id: review._id,
                                        })
                                    }
                                >
                                    EDIT
                                </button>
                                <button className={styles.editDeleteBtn} onClick={() => handleDeleteClick(review._id)}>
                                    DELETE
                                </button>
                            </div>
                        </div>
                        <div className="anime__review__item__movie" style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div className="anime__review__item__image" style={{ marginBottom: '8px', width: '100px' }}>
                                <img src={movie.img} alt={movie.title} style={{ width: '100%' }} />
                            </div>
                            <div className="anime__review__item__info" style={{ textAlign: 'center' }}>
                                <h6 style={{ marginBottom: '8px', color: "white" }}>{movie.title}</h6>
                            </div>
                        </div>
                    </div>
                );
            }) :
                <h5 style={{
                    fontSize: "60px",
                    color: "#ff5252",
                    fontWeight: "bold",
                    margin: "0",
                    marginLeft: "20%",
                    marginBottom: "61vh",
                    marginTop: "5%"
                }}>You don&apos;t have any reviews yet.</h5>}
        </>)
}

