const Path = {
    Home: '/',
    Login: '/login',
    Register: '/register',
    Logout: '/logout',
    ReviewEdit: '/reviews/:reviewId/edit',
    ReviewDelete: '/reviews/:reviewId/delete',
    MovieDetails: '/movies/:movieId',
    Search: '/movies/search',
    UserReviews: '/my-reviews',
    NotFound: '*'
};

export default Path;