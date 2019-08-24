import boards from './board';
import favourites from './favourite';
import posts from './post';
import follow from './follow';
import profile from './profile';

const initialState = {
    boards: {},
    favourites: {},
    posts: {},
    profile: {}
};

export default (state = initialState, action) => {
    return {
        boards: boards(state.boards, action),
        favourites: favourites(state.favourites, action),
        posts: posts(state.posts, action),
        ...profile(state, action)
    };
};
