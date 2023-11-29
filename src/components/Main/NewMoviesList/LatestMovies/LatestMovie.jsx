import { Link } from "react-router-dom"

export default function NewMovie({
    _id,
    title,
    clickCount,
    img
}) {
    return (
        <div
            className="product__sidebar__view__item"
            style={{
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="view"><i className="fa fa-eye"></i> {clickCount}</div>
            <h5>
                <Link to={`/movies/${_id}`}>{title}</Link>
            </h5>
        </div>
    )
}