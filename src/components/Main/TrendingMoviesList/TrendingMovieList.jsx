import { useEffect, useState } from "react";
import TrendingMovie from "./TrendingMovie/TrendingMovie";
import * as movieService from '../../../services/movieService';
import * as reviewService from '../../../services/reviewService';
export default function TrendingMovieList() {

    const [trendingMovies, setTrendingMovies] = useState([])
    const [reviewsCounts, setReviewsCounts] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movies = await movieService.getTrending();
                setTrendingMovies(movies);
                }
            catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []); 
    useEffect(() => {
        const fetchReviewsCounts = async () => {
            try {
                const counts = {};
                for (const movie of trendingMovies) {
                    const reviews = await reviewService.getAll(movie._id);
                    counts[movie._id] = reviews.length;
                }
                console.log(counts);
                setReviewsCounts(counts);
                
            } catch (error) {
                console.error(error);
            }
        };
        fetchReviewsCounts()
    }, [trendingMovies]);

    return (
        <>
            {trendingMovies.map(trendingMovie => (
                <TrendingMovie key={trendingMovie._id} {...trendingMovie} reviewsCount={reviewsCounts[trendingMovie._id]} />
            ))}

            {trendingMovies.length === 0 && (
                <h2>No Trending Movies at the moment</h2>
            )}
        </>
    )
}