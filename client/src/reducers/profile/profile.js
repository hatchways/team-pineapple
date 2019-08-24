import {
    GET_USER_BOARDS_POSTS_SUCCESS,
    GET_USER_BOARDS_POSTS_ERROR,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAIL,
    FETCHING_PROFILE,
    CLEAR_ERROR, FOLLOW_SUCCESS, UNFOLLOW_SUCCESS
} from '../../actions/types';

const INITIAL_STATE = {
    loading: false,
    error: {}
};

export default (state = INITIAL_STATE, action) => {
    const response = action.response;

    switch (action.type) {
    case FOLLOW_SUCCESS:
        state.profileInfo.following += 1;
        state.profileInfo.isFollowing = true;
        return {
            ...state,
            loading: false,
            error: ''
        };
    case UNFOLLOW_SUCCESS:
        state.profileInfo.following -= 1;
        state.profileInfo.isFollowing = false;
        return {
            ...state,
            loading: false,
            error: ''
        };
    case FETCHING_PROFILE:
    case FETCH_PROFILE_SUCCESS:
        return { ...state, profileInfo: action.payload, loading: false };
    case FETCH_PROFILE_FAIL:
        return { ...state, error: action.payload.error };
    case GET_USER_BOARDS_POSTS_SUCCESS:
        return {
            ...state,
            profileInfo: response.user
        };
    case GET_USER_BOARDS_POSTS_ERROR:
        return { ...state, error: action.err };
    case CLEAR_ERROR:
        return { ...state, error: {} };
    default:
        return state;
    }
};
