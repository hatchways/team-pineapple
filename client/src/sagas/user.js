import { put, takeLatest, call, select } from 'redux-saga/effects';
import {
    LOGIN, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR,
    GET_TOKEN, GET_TOKEN_SUCCESS,
    GET_USER_BOARDS_POSTS, GET_USER_BOARDS_POSTS_SUCCESS, GET_USER_BOARDS_POSTS_ERROR
} from '../actions/types';
import { userService } from '../services/user';

const getUserStore = (state) => state.UserStore;

/*
call user service login
call redux with put
 */
function * login (request) {
    try {
        const response = yield call(userService.login, request.user);
        yield put({ type: LOGIN_USER_SUCCESS, response });
    } catch (error) {
        yield put({ type: LOGIN_USER_ERROR, error });
    }
}

// listen for 'LOGIN' action -> call login*
export function * loginSaga () {
    yield takeLatest(LOGIN, login);
}

function * getToken (request) {
    const token = yield call(userService.getToken);
    if (token) {
        const user = yield call(userService.getUser);
        yield put({ type: GET_TOKEN_SUCCESS, token, user });
    } else {
        // logout
        yield call(userService.logout);
    }
}

export function * getTokenSaga () {
    yield takeLatest(GET_TOKEN, getToken);
}

function * getBoardsandPosts (request) {
    const UserStore = yield select(getUserStore);
    try {
        const response = yield call(userService.getBoardsandPosts, {
            username: request.username,
            token: UserStore.token
        });
        yield put({ type: GET_USER_BOARDS_POSTS_SUCCESS, response });
    } catch (err) {
        yield put({ type: GET_USER_BOARDS_POSTS_ERROR });
    }
}

export function * getBoardsPostsSaga () {
    yield takeLatest(GET_USER_BOARDS_POSTS, getBoardsandPosts);
}
