import boards from './board';
import favourites from './favourite';
import posts from './post';
import follow from './follow';
import user from './user';

const initialState = {
    boards: {},
    favourites: {},
    posts: {},
    user: {}
};

export default (state = initialState, action) => {
    return {
        boards: boards(state.boards, action),
        favourites: favourites(state.favourites, action),
        posts: posts(state.posts, action),
        ...user(state, action),
        ...follow(state, action)
    };
};
