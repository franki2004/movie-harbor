import { useEffect, useState } from "react";
import Movie from "./Movie/Movie";
import * as movieService from '../../../services/movieService';
import * as reviewService from '../../../services/reviewService';
export default function MovieList() {

    const [movies, setMovies] = useState([])
    const [reviewsCounts, setReviewsCounts] = useState({});
    const [percentages, setPercentages] = useState({})
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const movies = await movieService.getAll(currentPage)
                setMovies(movies)
            }
            catch (error) {
                console.error(error)
            }
        };

        fetchData()
    }, [currentPage])
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleGoBackToFIrstPage = () => {
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
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
        <>
            {movies.map(movie => (
                <Movie key={movie._id} {...movie} reviewsCount={reviewsCounts[movie._id]} percentPositive={percentages[movie._id]} />
            ))}

            {movies.length === 0 && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '300px',
                    margin: '0',
                    width: '100%'
                }}>
                    <p className="no-movies-message" style={{
                        fontSize: '50px',
                        color: '#ff5252',
                        fontWeight: 'bold',
                    }}>
                        No more Movies
                    </p >
                </div >
            )
            }
            <div className="pagination" style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                {currentPage > 1 && <button style={{ backgroundColor: "#e53637", color: "white", fontWeight: "bold" }} onClick={handlePrevPage}>
                    Previous Page
                </button>}
                {!(movies.length === 0) ? <button style={{ backgroundColor: "#e53637", color: "white", fontWeight: "bold" }} onClick={handleNextPage}>
                    Next Page
                </button> :
                    <button style={{ backgroundColor: "#e53637", color: "white", fontWeight: "bold" }} onClick={handleGoBackToFIrstPage}>
                        First Page
                    </button>}
            </div>
        </>
    )
}