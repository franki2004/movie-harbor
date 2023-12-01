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

export const create = async (movieId, text) => {
    const newReview = await request.post(baseUrl, {
        movieId,
        text,
    });

    return newReview;
};