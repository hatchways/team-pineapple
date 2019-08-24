import {
    GET_TOKEN,
    LOGIN,
    LOGIN_RESPONSE,
    LOGOUT,
    FOLLOW,
    UNFOLLOW, FETCH_FOLLOWING, FETCH_FOLLOWERS
} from '../actions/types';

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
