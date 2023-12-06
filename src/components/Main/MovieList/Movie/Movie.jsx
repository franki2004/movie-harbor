/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

export default function Movie({
    _id,
    title,
    percentPositive,
    reviewsCount,
    img }) {
    let color
    if (percentPositive < 25) {
        color = "red"
    } else if (percentPositive >= 25 && percentPositive < 75) {
        color = "darkorange"
    } else {
        color = "green"
    }
    return (

        <div className="product__item">
            <div
                className="product__item__pic"
                style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="comment"><i className="fa fa-comments"></i> {reviewsCount} </div>
                {reviewsCount > 0 && <div style={{ color: color }} className="view"><i className={'fa fa-thumbs-up'}></i> {percentPositive}% </div>}
            </div>
            <div className="product__item__text">
                <Link to={`/movies/${_id}`}>{title}</Link>
            </div>
        </div>
    )
}