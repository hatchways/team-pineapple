import {
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR, GET_TOKEN_SUCCESS,
    GET_USER_BOARDS_POSTS_SUCCESS, GET_USER_BOARDS_POSTS_ERROR,
    ADD_BOARD_SUCCESS, ADD_BOARD_ERROR
} from '../actions/types';

const initialState = {
    authenticated: false
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
    case GET_USER_BOARDS_POSTS_ERROR:
        return { ...state, error: action.err };
    case ADD_BOARD_SUCCESS:
        state.boards.push(response.board);
        return { ...state };
    case ADD_BOARD_ERROR:
        return { ...state, error: action.err };
    default:
        return state;
    }
};
