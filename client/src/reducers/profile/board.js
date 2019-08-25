import {
    GET_BOARD_POSTS_SUCCESS,
    GET_BOARD_POSTS_ERROR,
    ADD_BOARD_SUCCESS, ADD_BOARD_ERROR, ADD_BOARD_POST_SUCCESS, ADD_BOARD_POST_ERROR
} from '../../actions/types';

const initialState = {
    board: {
        posts: []
    },
    loading: true
};

export default (state = initialState, action) => {
    const { type, response } = action;
    console.log(action);
    switch (type) {
    case GET_BOARD_POSTS_SUCCESS:
        console.log(response);
        return { ...state, loading: false, board: response.board };
    case GET_BOARD_POSTS_ERROR:
        return { ...state, loading: false };
    case ADD_BOARD_SUCCESS:
        state.boards.push(response.board);
        return { ...state };
    case ADD_BOARD_POST_SUCCESS:
        state.boards.find(board => board._id === action.response._id).posts = action.response.posts;
        return { ...state };
    case ADD_BOARD_POST_ERROR:
    case ADD_BOARD_ERROR:
        return { ...state, error: action.err };
    default:
        return state;
    }
};
