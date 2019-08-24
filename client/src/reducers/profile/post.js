import { ADD_POST_ERROR, ADD_POST_SUCCESS } from '../../actions/types';

export default (state = {}, action) => {
    const { type, response } = action;
    switch (type) {
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
    default:
        return state;
    }
};
