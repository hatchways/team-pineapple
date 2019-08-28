import {
    GET_TOKEN,
    LOGIN,
    LOGIN_RESPONSE,
    LOGOUT,
    AUTHORIZING,
    SIGN_UP_FAIL,
    SIGN_UP_SUCCESS,
    SAVE_INTERESTS,
    FOLLOW,
    UNFOLLOW, FETCH_FOLLOWING, FETCH_FOLLOWERS, ADD_FAVOURITE, REMOVE_FAVOURITE
} from '../actions/types';
import axios from 'axios';

export const login = user => ({
    type: LOGIN,
    user
});

export const loginResponse = () => ({
    type: LOGIN_RESPONSE
});

export const logout = () => ({
    type: LOGOUT
});

export const getToken = () => ({
    type: GET_TOKEN
});

export const signUp = body => async dispatch => {
    try {
        const config = {
            'Content-Type': 'application/json'
        };
        dispatch({
            type: AUTHORIZING
        });
        await axios.post('/users/register', body, config);
        dispatch({
            type: SIGN_UP_SUCCESS,
            payload: { message: 'Registration success!', status: 'success' }
        });
    } catch (err) {
        dispatch({
            type: SIGN_UP_FAIL,
            payload: { message: 'Something went wrong with the registration', status: 'error' }
        });
    }
};
export const saveInterests = (username, interests) => ({
    type: SAVE_INTERESTS,
    username,
    interests
});

export const favouritePost = (username, post) => ({
    type: ADD_FAVOURITE,
    username,
    post
});

export const unFavouritePost = (username, post) => ({
    type: REMOVE_FAVOURITE,
    username,
    post
});

export const getFollowing = user => ({
    type: FETCH_FOLLOWING,
    user
});

export const getFollowers = user => ({
    type: FETCH_FOLLOWERS,
    user
});

export const follow = followee => ({
    type: FOLLOW,
    followee
});

export const unfollow = followee => ({
    type: UNFOLLOW,
    followee
});
