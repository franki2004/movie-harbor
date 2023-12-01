/* eslint-disable react/prop-types */
export default function Review({
    content,
    _createdOn,
}) {
    const date = new Date(_createdOn)
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    return (
        <div className="anime__review__item">
            <div className="anime__review__item__pic">
                <img src="img/anime/review-1.jpg" alt="" />
            </div>
            <div className="anime__review__item__text">
                <h6>Chris Curry - <span>{formattedDate}</span></h6>
                <p>{content}</p>
            </div>
        </div>
    )
}