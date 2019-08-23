import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_RESPONSE,
    LOGIN_ERROR,
    GET_TOKEN_SUCCESS,
    EDIT_PROFILE_SUCCESS,
    LOGING_IN,
    AUTHORIZING,
    SIGN_UP_FAIL,
    SIGN_UP_SUCCESS
} from '../actions/types';

const initialState = {
    authenticated: false,
    loading: false,
    error: { message: '', status: null }
};

export default (state = initialState, action) => {
    const response = action.response;

    switch (action.type) {
    case LOGING_IN:
    case AUTHORIZING:
        return { ...state, loading: true };
    case LOGIN_SUCCESS:
        return {
            authenticated: true,
            user: response.user,
            token: response.token,
            loading: false
        };
    case LOGIN_ERROR:
        return { ...state, authenticated: false, error: action.error, loading: false };
    case LOGIN_RESPONSE:
        delete state.error;
        return { ...state, loading: false };
    case LOGOUT_SUCCESS:
        return initialState;
    case GET_TOKEN_SUCCESS:
        return {
            ...state,
            authenticated: true,
            user: action.user,
            token: action.token,
            loading: false
        };
    case EDIT_PROFILE_SUCCESS:
        return {
            ...state,
            user: {
                ...state.user,
                profile: action.payload.user.profile,
                name: action.payload.user.name
            },
            loading: false
        };
    case SIGN_UP_FAIL:
        return { ...state, loading: false, error: action.payload };
    case SIGN_UP_SUCCESS:
        return { ...state, loading: false, error: action.payload };
    default:
        return state;
    }
};
