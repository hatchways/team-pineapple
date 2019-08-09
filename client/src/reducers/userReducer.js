import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR, GET_TOKEN_SUCCESS, GET_USER_BOARDS_POSTS_SUCCESS
} from '../actions/types';

const initialState = {
    authenticated: false
    // boards: [{ title: '1', _id: '1234' }, { title: '2', _id: '567' }, { title: '3', _id: '8910' }]
};

export default (state = initialState, action) => {
    const response = action.response;

    switch (action.type) {
    case LOGIN_USER_SUCCESS:
        return { authenticated: true, user: response.user, token: response.token };
    case LOGIN_USER_ERROR:
        return { ...state, authenticated: false };
    case GET_TOKEN_SUCCESS:
        return { ...state, authenticated: true, user: action.user, token: action.token };
    case GET_USER_BOARDS_POSTS_SUCCESS:
        return { ...state, boards: response.user.boards, posts: response.user.posts };
    default:
        return state;
    }
};
