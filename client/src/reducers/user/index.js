import follow from './follow';
import user from './user';

export default (state = {}, action) => {
    return {
        ...follow(state, action),
        ...user(state, action)
    };
};
