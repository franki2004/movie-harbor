/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

export default function NewMovie({
    _id,
    title,
    img
}) {
    return (
        <>
            <div
                className="product__sidebar__view__item"
                style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition:  '50% 35%',
                    marginBottom: '0px',
                    height: '280px'
                }}>

            </div >
            <h5
                style={{
                    backgroundColor: 'rgba(1, 1, 25)',
                    padding: '10px',
                    textAlign: 'center',      
                    marginBottom: '10px',
  
                }}
            >
                <Link to={`/movies/${_id}`}>{title}</Link>
            </h5>
        </>
    )
}