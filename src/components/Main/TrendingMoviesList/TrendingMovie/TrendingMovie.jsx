/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

export default function TrendingMovie({
    _id,
    title,
    category,
    clickCount,
    img }) {
    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="product__item">
                <div
                    className="product__item__pic"
                    style={{
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',  
                        backgroundPosition: 'center',  
                    }}
                >
                    <div className="comment"><i className="fa fa-comments"></i> 11</div>
                    <div className="view"><i className="fa fa-eye"></i> {clickCount} </div>
                </div>
                <div className="product__item__text">
                    <ul>
                        <li>{category}</li>
                    </ul>
                    <Link to={`/movies/${_id}`}>{title}</Link>
                </div>
            </div>
        </div>
    )
}