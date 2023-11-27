import TrendingMovieList from "./TrendingMoviesList/TrendingMovieList";

export default function Main() {
    return (
        <>
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="trending__product">
                                <div className="row">
                                    <div className="col-lg-8 col-md-8 col-sm-8">
                                        <div className="section-title">
                                            <h4>New and Notable</h4>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-sm-4">
                                        <div className="btn__all">
                                            <a href="#" className="primary-btn">View All <span className="arrow_right"></span></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <TrendingMovieList/>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-8">
                            <div className="product__sidebar">
                                <div className="product__sidebar__view">
                                    <div className="section-title">
                                        <h5>Trending</h5>
                                    </div>

                                    <div className="filter__gallery">
                                        <div className="product__sidebar__view__item set-bg mix day years"
                                            data-setbg="img/sidebar/tv-1.jpg">
                                            <div className="ep">18 / ?</div>
                                            <div className="view"><i className="fa fa-eye"></i> 9141</div>
                                            <h5><a href="#">Boruto: Naruto next generations</a></h5>
                                        </div>
                                        <div className="product__sidebar__view__item set-bg mix month week"
                                            data-setbg="img/sidebar/tv-2.jpg">
                                            <div className="ep">18 / ?</div>
                                            <div className="view"><i className="fa fa-eye"></i> 9141</div>
                                            <h5><a href="#">The Seven Deadly Sins: Wrath of the Gods</a></h5>
                                        </div>
                                        <div className="product__sidebar__view__item set-bg mix week years"
                                            data-setbg="img/sidebar/tv-3.jpg">
                                            <div className="ep">18 / ?</div>
                                            <div className="view"><i className="fa fa-eye"></i> 9141</div>
                                            <h5><a href="#">Sword art online alicization war of underworld</a></h5>
                                        </div>
                                        <div className="product__sidebar__view__item set-bg mix years month"
                                            data-setbg="img/sidebar/tv-4.jpg">
                                            <div className="ep">18 / ?</div>
                                            <div className="view"><i className="fa fa-eye"></i> 9141</div>
                                            <h5><a href="#">Fate/stay night: Heavens Feel I. presage flower</a></h5>
                                        </div>
                                        <div className="product__sidebar__view__item set-bg mix day"
                                            data-setbg="img/sidebar/tv-5.jpg">
                                            <div className="ep">18 / ?</div>
                                            <div className="view"><i className="fa fa-eye"></i> 9141</div>
                                            <h5><a href="#">Fate stay night unlimited blade works</a></h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}