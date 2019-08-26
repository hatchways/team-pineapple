import { ADD_FAVOURITE_ERROR, ADD_FAVOURITE_SUCCESS } from '../../actions/types';

export default (state = {}, action) => {
    const { type } = action;
    switch (type) {
    case ADD_FAVOURITE_SUCCESS:
        state.push(action.post);
        return { ...state };
    case ADD_FAVOURITE_ERROR:
        state = state.filter(post => post !== action.post);
        return { ...state, err: action.err };
    default:
        return state;
    }
};
