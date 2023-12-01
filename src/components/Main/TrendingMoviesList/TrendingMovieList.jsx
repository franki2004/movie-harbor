import { useEffect, useState } from "react";
import TrendingMovie from "./TrendingMovie/TrendingMovie";
import * as movieService from '../../../services/MovieService';
export default function TrendingMovieList() {

    const [trendingMovies, setTrendingMovies] = useState([])

    useEffect(() => {
        movieService.getTrending()
            .then(result => setTrendingMovies(result))
            .catch(err => {
                console.log(err);
            });
    }, []);
    return (
        <>
            {trendingMovies.map(trendingMovie => (
                <TrendingMovie key={trendingMovie._id} {...trendingMovie}/>
            ))}

            {trendingMovies.length === 0 && (
                <h3>No Trending Movies at the moment</h3>
            )}
        </>
    )
}