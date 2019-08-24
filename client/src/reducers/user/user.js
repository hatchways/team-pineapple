import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_RESPONSE,
    LOGIN_ERROR,
    GET_TOKEN_SUCCESS,
    EDIT_PROFILE_SUCCESS,
    SAVE_INTERESTS_SUCCESS,
    SAVE_INTERESTS_ERROR,
    DELETE_SUCCESS,
    DELETE_FAIL,
    CLEAR_ERROR,
    CREATE_POST_LOADING,
    EDIT_PROFILE_FAIL,
    ADD_BOARD_POST_SUCCESS, ADD_BOARD_POST_ERROR
} from '../../actions/types';

const initialState = {
    authenticated: false
};

export default (state = initialState, action) => {
    const { type, response } = action;

    switch (type) {
    case LOGIN_SUCCESS:
        return { authenticated: true, user: response.user, token: response.token };
    case LOGIN_ERROR:
        return { ...state, authenticated: false, error: action.error };
    case LOGIN_RESPONSE:
        delete state.error;
        return { ...state };
    case LOGOUT_SUCCESS:
        return { authenticated: false };
    case SAVE_INTERESTS_SUCCESS:
        state.user.interests = action.user.interests;
        localStorage.setItem('user', JSON.stringify(state.user));
        return { ...state };
    case GET_TOKEN_SUCCESS:
        return { ...state, authenticated: true, user: action.user, token: action.token };
    case EDIT_PROFILE_SUCCESS:
        return { ...state, user: { ...state.user, ...action.payload.user } };
    case EDIT_PROFILE_FAIL:
        return { ...state, error: action.payload.error };
    case SAVE_INTERESTS_ERROR:
    case ADD_BOARD_POST_ERROR:
        return { ...state, error: action.error };

    case CREATE_POST_LOADING:
        return { ...state, loading: true, error: {} };

    case DELETE_SUCCESS:
        let boards = state.user.boards;
        if (action.payload.item === 'posts') {
            boards = state.user.boards.map(board => {
                board.posts = board.posts.filter(post => post._id !== action.payload.id);
                return board;
            });
        }
        const user = {
            ...state.user,
            boards,
            [action.payload.item]: state.user[action.payload.item].filter(item => item._id !== action.payload.id)
        };
        localStorage.setItem('user', JSON.stringify(user));
        return {
            ...state,
            user,
            loading: false,
            error: action.payload.error
        };
    case DELETE_FAIL:
        return { ...state, error: action.payload.error };
    case ADD_BOARD_POST_SUCCESS:
        state.user.boards.find(board => board._id === action.response._id).posts = action.response.posts;
        localStorage.setItem('user', JSON.stringify(state.user));
        return { ...state };
    case CLEAR_ERROR:
        return { ...state, error: {} };
    default:
        return state;
    }
};
