import { combineReducers } from 'redux';
import UserStore from './user/user';
import PostStore from './posts/post';
import ProfileStore from './profile/profile';
import BoardStore from './user/board';

const root = combineReducers({
    UserStore,
    PostStore,
    ProfileStore,
    BoardStore
});
export default root;
