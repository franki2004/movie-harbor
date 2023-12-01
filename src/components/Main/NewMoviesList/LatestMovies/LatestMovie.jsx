/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

export default function NewMovie({
    _id,
    title,
    img
}) {
    return (
        <div
            className="product__sidebar__view__item"
            style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}>
            <h5>
                <Link to={`/movies/${_id}`}>{title}</Link>
            </h5>
        </div>
    )
}