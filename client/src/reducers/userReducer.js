import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR, GET_TOKEN_SUCCESS
} from '../actions/types';

const initialState = {
    authenticated: false,
    boards: [{ title: '1', _id: '1234' }, { title: '2', _id: '567' }, { title: '3', _id: '8910' }]
};

export default (state = initialState, action) => {
    const response = action.response;

    switch (action.type) {
    case LOGIN_USER_SUCCESS:
        return { authenticated: true, user: response.user, token: response.token };
    case LOGIN_USER_ERROR:
        return { ...state, ...response };
    case GET_TOKEN_SUCCESS:
        return { ...state, authenticated: true, user: action.user, token: action.token };
    default:
        return state;
    }
};
