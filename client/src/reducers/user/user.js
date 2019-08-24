import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_RESPONSE,
    LOGIN_ERROR,
    GET_TOKEN_SUCCESS,
    EDIT_PROFILE_SUCCESS,
    SAVE_INTERESTS_SUCCESS,
    SAVE_INTERESTS_ERROR,
    FOLLOW_SUCCESS,
    UNFOLLOW_SUCCESS,
    FETCH_FOLLOWING_SUCCESS,
    FETCH_FOLLOWING_ERROR,
    FETCH_FOLLOWERS_SUCCESS,
    FETCH_FOLLOWERS_ERROR,
    DELETE_SUCCESS,
    DELETE_FAIL,
    ADD_BOARD_SUCCESS,
    ADD_BOARD_ERROR,
    ADD_POST_SUCCESS,
    ADD_POST_ERROR, CLEAR_ERROR, CREATE_POST_LOADING, EDIT_PROFILE_FAIL, UNFOLLOW_ERROR, FOLLOW_ERROR
} from '../../actions/types';

const initialState = {
    authenticated: false
};

export default (state = initialState, action) => {
    const response = action.response;

    switch (action.type) {
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
            return { ...state };
    case GET_TOKEN_SUCCESS:
        return { ...state, authenticated: true, user: action.user, token: action.token };
    case EDIT_PROFILE_SUCCESS:
        return { ...state, user: { ...state.user, ...action.payload.user } };
    case EDIT_PROFILE_FAIL:
        return { ...state, error: action.payload.error };
    case FOLLOW_SUCCESS:
        if (state.following) {
            state.following.push(action.payload);
        }
        state.user.following += 1;
        return {
            ...state,
            loading: false,
            error: ''
        };
    case UNFOLLOW_SUCCESS:
        if (state.following) {
            state.following = state.following.filter(followee => followee._id !== action.payload);
        }
        state.user.following -= 1;
        return {
            ...state,
            loading: false,
            error: action.payload
        };
        case SAVE_INTERESTS_ERROR:
    case FOLLOW_ERROR:
    case UNFOLLOW_ERROR:
        return { ...state, error: action.error };
    case FETCH_FOLLOWING_SUCCESS:
        return { ...state, following: action.following };
    case FETCH_FOLLOWING_ERROR:
    case FETCH_FOLLOWERS_ERROR:
        return { ...state, error: action.error };
    case FETCH_FOLLOWERS_SUCCESS:
        return { ...state, followers: action.followers };
    case ADD_BOARD_SUCCESS:
        state.user.boards.push(response.board);
        localStorage.setItem('user', JSON.stringify(state.user));
        return { ...state };
    case ADD_BOARD_ERROR:
        return { ...state, error: action.err };
    case CREATE_POST_LOADING:
        return { ...state, loading: true, error: {} };
    case ADD_POST_SUCCESS:
        if (response.board) {
            state.user.boards.find(board => board._id === response.board).posts.push(response.post);
        }
        state.user.posts.push(response.post);
        localStorage.setItem('user', JSON.stringify(state.user));
        return {
            ...state,
            loading: false,
            error: response.error
        };
    case ADD_POST_ERROR:
        return { ...state, error: action.err, loading: false };
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
    case CLEAR_ERROR:
        return { ...state, error: {} };
    default:
        return state;
    }
};
