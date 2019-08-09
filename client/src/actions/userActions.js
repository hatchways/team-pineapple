import { GET_TOKEN, GET_USER_BOARDS_POSTS, LOGIN } from '../actions/types';

export const login = (user) => ({
    type: LOGIN,
    user
});

export const getToken = () => ({
    type: GET_TOKEN
});

export const getBoardsandPosts = (username) => ({
    type: GET_USER_BOARDS_POSTS,
    username
});
