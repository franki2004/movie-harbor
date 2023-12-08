import LatestMoviesList from "./NewMoviesList/LatestMovieList";
import MovieList from "./MovieList/MovieList";

export default function Main() {
    return (

        <section className="product spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="trending__product">
                            <div className="row">
                                <div className="col-lg-8 col-md-8 col-sm-8">
                                    <div className="section-title">
                                        <h4>Movies</h4>
                                    </div>
                                </div>
                            </div>
                    
                                <MovieList />
                        </div>

                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-8">
                        <div className="product__sidebar">
                            <div className="product__sidebar__view">
                                <div className="section-title">
                                    <h5>Latest</h5>
                                </div>

                                <div className="filter__gallery">
                                    <LatestMoviesList />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}