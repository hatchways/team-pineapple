import {
    FETCHING_BOARD_POSTS,
    FETCH_BOARD_POSTS_FAIL,
    FETCH_BOARD_POSTS_SUCCESS,
    ADD_BOARD_SUCCESS, ADD_BOARD_ERROR, ADD_BOARD_POST_SUCCESS, ADD_BOARD_POST_ERROR
} from '../../actions/types';

const INITIAL_STATE = {
    board: {
        posts: []
    },
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    const { type, payload, response } = action;
    switch (type) {
    case ADD_BOARD_SUCCESS:
        state.user.boards.push(response.board);
        localStorage.setItem('user', JSON.stringify(state.user));
        return { ...state };
    case ADD_BOARD_POST_SUCCESS:
        state.user.boards.find(board => board._id === action.response._id).posts = action.response.posts;
        localStorage.setItem('user', JSON.stringify(state.user));
        return { ...state };
    case ADD_BOARD_POST_ERROR:
    case ADD_BOARD_ERROR:
        return { ...state, error: action.err };
    case FETCHING_BOARD_POSTS:
        return { ...state, loading: true, board: INITIAL_STATE.board };
    case FETCH_BOARD_POSTS_SUCCESS:
        return { ...state, loading: false, board: payload.board };
    case FETCH_BOARD_POSTS_FAIL:
        return { ...state, loading: false };
    default:
        return state;
    }
};
