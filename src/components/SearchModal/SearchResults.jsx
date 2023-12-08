import { useLocation } from 'react-router-dom';
import Movie from '../Main/MovieList/Movie/Movie'
import { useEffect, useState } from 'react';
import * as reviewService from '../../services/reviewService'

export default function SearchResults() {
    const location = useLocation();
    const movies = location.state?.moviesData;
    const [reviewsCounts, setReviewsCounts] = useState({});
    const [percentages, setPercentages] = useState({})

    useEffect(() => {
        const fetchReviewsCounts = async () => {
            try {
                const counts = {}
                const percentages = {}
                for (const movie of movies) {
                    const reviews = await reviewService.getAll(movie._id)
                    counts[movie._id] = reviews.length

                    const positiveReviews = reviews.filter((review) => review.thumbsUp)
                    const percentPositive = (positiveReviews.length / reviews.length) * 100
                    percentages[movie._id] = percentPositive.toFixed(0)
                }
                setReviewsCounts(counts)
                setPercentages(percentages)

            } catch (error) {
                console.error(error)
            }
        }
        fetchReviewsCounts()
    }, [movies])
    return (
        <section className="product spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="trending__product">
                            <div className="row">
                                <div className="col-lg-8 col-md-8 col-sm-8">
                                    <div className="section-title">
                                        <h4>Search Results</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {movies.length > 0 ? movies.map(movie => (
                                    <div key={movie._id} className="col-lg-3 col-md-4 col-sm-6">
                                        <Movie {...movie} reviewsCount={reviewsCounts[movie._id]} percentPositive={percentages[movie._id]} />
                                    </div>)) :
                                    <h5 style={{
                                        fontSize: "60px",
                                        color: "#ff5252",
                                        fontWeight: "bold",
                                        marginBottom: "45vh",

                                    }}>No Result Found</h5>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >

    )
}