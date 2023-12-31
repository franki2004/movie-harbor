import { useEffect, useState } from "react"
import * as movieService from '../../../services/movieService'
import LatestMovie from './LatestMovies/LatestMovie'


export default function NewMovieList() {
    const [latestMovies, setLatestMovies] = useState([])

    useEffect(() => {
        movieService.getLatest()
            .then(result => setLatestMovies(result))
            .catch(err => console.log(err))
    }, [])
    return (
        <>
            {latestMovies.map(latestMovie => (
                <LatestMovie key={latestMovie._id} {...latestMovie} />
            ))}

            {latestMovies.length === 0 && (
                <h2 style={{color:"#ff5252"}}>No new Movies</h2>)
            }
        </>

    )
}