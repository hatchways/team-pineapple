import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
} from '../actions/types';

const initialState = {
    authenticated: false,
};

export default (state = initialState, action) => {
    const response = action.response;

    switch (action.type) {
    case LOGIN_USER_SUCCESS:
        return { authenticated: true, user: response.user, token: response.token};
    case LOGIN_USER_ERROR:
        return { ...state, ...response };
    default:
        return state;
    }
};