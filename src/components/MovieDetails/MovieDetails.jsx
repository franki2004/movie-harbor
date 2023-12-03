/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import * as movieService from '../../services/movieService'
import * as reviewService from '../../services/reviewService'
import ReviewForm from "./ReviewForm"

export default function MovieDetails() {
    const { movieId } = useParams()
    const [movie, setMovie] = useState({})
    const [reviews, setReviews] = useState([])
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
    return (
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
                                <div className="comment"><i className="fa fa-comments"></i> {reviews.length}</div>
                                <div className="view"><i className="fa fa-eye"></i> {movie.clickCount}</div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="anime__details__text">
                                <div className="anime__details__title">
                                    <h3>{movie.title}</h3>
                                    <span>{movie.category}</span>
                                </div>
                                <div className="anime__details__rating">
                                    <div className="rating">
                                        Percent Positive Reviews
                                    </div>
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
                                <ReviewForm movieId={movie._id} onReviewCreated={fetchMovieAndReviews} />
                            </div>
                            <div className="section-title">
                                <h5>Reviews</h5>
                            </div>

                            {reviews.map(({ _id, reviewText, _createdOn, owner: { email } }) => {
                                const reviewDate = new Date(_createdOn)
                                const formattedDate = `${reviewDate.getDate()}-${reviewDate.getMonth() + 1}-${reviewDate.getFullYear()}`
                                return (
                                    <div key={_id} className="anime__review__item">
                                        <div className="anime__review__item__text">
                                            <h6>{email} - <span>{formattedDate}</span></h6>
                                            <p>{reviewText}</p>
                                        </div>
                                    </div>)
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}