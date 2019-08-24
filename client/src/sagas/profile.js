import { put, takeLatest, call, select } from 'redux-saga/effects';
import {
    GET_USER_BOARDS_POSTS, GET_USER_BOARDS_POSTS_SUCCESS, GET_USER_BOARDS_POSTS_ERROR
} from '../actions/types';
import { userService } from '../services/user';
const getUserStore = (state) => state.UserStore;

function * getBoardsandPosts (request) {
    const UserStore = yield select(getUserStore);

    if (UserStore.authenticated && UserStore.user.username === request.username) {
        yield put({ type: GET_USER_BOARDS_POSTS_SUCCESS, response: UserStore });
    } else {
        try {
            const response = yield call(userService.getBoardsandPosts, { ...request });
            yield put({ type: GET_USER_BOARDS_POSTS_SUCCESS, response });
        } catch (err) {
            yield put({ type: GET_USER_BOARDS_POSTS_ERROR });
        }
    }
}

export function * getBoardsPostsSaga () {
    yield takeLatest(GET_USER_BOARDS_POSTS, getBoardsandPosts);
}
