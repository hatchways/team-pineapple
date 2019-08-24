import {
    ADD_BOARD,
    ADD_POST,
    GET_USER_BOARDS_POSTS,
    FETCH_FOLLOWINGS_SUCCESS,
    FETCH_FOLLOWINGS_FAIL,
    FETCH_FOLLOWERS_SUCCESS,
    FETCH_FOLLOWERS_FAIL,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAIL,
    CLEAR_ERROR,
    DELETE_FAIL,
    DELETE_SUCCESS
} from '../actions/types';
import axios from 'axios';

export const getBoardsandPosts = username => ({
    type: GET_USER_BOARDS_POSTS,
    username
});

export const addBoard = (board, username) => ({
    type: ADD_BOARD,
    board,
    username
});

export const addPost = (post, username) => ({
    type: ADD_POST,
    post,
    username
});

export const fetchFollowing = username => async dispatch => {
    try {
        const res = await axios.get(`/users/${username}/following`);
        dispatch({
            type: FETCH_FOLLOWINGS_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: FETCH_FOLLOWINGS_FAIL,
            payload: { error: 'Something went wrong with fetching followings' }
        });
    }
};

export const fetchFollowers = username => async dispatch => {
    try {
        const res = await axios.get(`/users/${username}/following`);
        dispatch({
            type: FETCH_FOLLOWERS_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: FETCH_FOLLOWERS_FAIL,
            payload: { error: 'Something went wrong with fetching followers' }
        });
    }
};

export const editProfile = (formData, username) => async dispatch => {
    try {
        const res = await axios.put(`/users/${username}`, formData);
        dispatch({
            type: EDIT_PROFILE_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: EDIT_PROFILE_FAIL,
            payload: { error: 'Something went wrong with updating the profile' }
        });
    }
};

export const clearError = () => ({
    type: CLEAR_ERROR
});

export const favouritePost = (username, post) => async dispatch => {
    try {
        await axios.post(`/users/${username}/favourite`, { post });
    } catch (err) {
        console.log('Something went wrong with favouriting this post');
    }
};

export const deleteItem = (item, id) => async dispatch => {
    try {
        dispatch({
            type: CLEAR_ERROR
        });
        await axios.delete(`/${item}/${id}`);
        dispatch({
            type: DELETE_SUCCESS,
            payload: {
                item,
                id,
                error: { message: `Successfully deleted the ${item.slice(0, -1)}`, status: 'success' }
            }
        });
    } catch (err) {
        dispatch({
            type: DELETE_FAIL,
            payload: {
                error: {
                    message: `Something went wrong with deleting the ${item.slice(0, -1)}`,
                    status: 'error'
                }
            }
        });
    }
};
