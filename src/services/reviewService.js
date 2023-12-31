import * as request from '../../lib/request';

const baseUrl = 'http://localhost:3030/data/reviews';

export const getAll = async (movieId) => {
    const query = new URLSearchParams({
        where: `movieId="${movieId}"`,
        load: `owner=_ownerId:users`,
    });

    const result = await request.get(`${baseUrl}?${query}`);

    return result;
};

export const create = async (movieId, reviewText, thumbs) => {
    const newReview = await request.post(baseUrl, {
        movieId,
        reviewText,
        ...thumbs
    });

    return newReview;
};
export const getUserReviews = async (userId) => {
    const result = await request.get(`${baseUrl}?where=_ownerId%3D%22${userId}%22`)
    return result;
}
export const deleteReview = async (reviewId) => {
    const result = await request.remove(`${baseUrl}/${reviewId}`)
    return result
}
export const edit = async (reviewId, reviewData) => {
    const result = await request.put(`${baseUrl}/${reviewId}`, reviewData);

    return result;
};