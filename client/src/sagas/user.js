import { put, takeLatest, takeEvery, call } from 'redux-saga/effects';
import {
    LOGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    GET_TOKEN,
    GET_TOKEN_SUCCESS,
    GET_USER_BOARDS_POSTS,
    GET_USER_BOARDS_POSTS_SUCCESS,
    GET_USER_BOARDS_POSTS_ERROR,
    ADD_BOARD,
    ADD_BOARD_ERROR,
    ADD_BOARD_SUCCESS
} from '../actions/types';
import { userService } from '../services/user';
import axios from 'axios';

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
    console.log('token_fetch');
    if (token) {
        axios.defaults.headers.common['access-token'] = token;
        const user = yield call(userService.getUser);
        yield put({ type: GET_TOKEN_SUCCESS, token, user });
    } else {
        // TODO: logout
        yield call(userService.logout);
    }
}

export function * getTokenSaga () {
    yield takeLatest(GET_TOKEN, getToken);
}

function * getBoardsandPosts (request) {
    try {
        const response = yield call(userService.getBoardsandPosts, { ...request });
        yield put({ type: GET_USER_BOARDS_POSTS_SUCCESS, response });
    } catch (err) {
        yield put({ type: GET_USER_BOARDS_POSTS_ERROR });
    }
}

export function * getBoardsPostsSaga () {
    yield takeLatest(GET_USER_BOARDS_POSTS, getBoardsandPosts);
}

function * addBoard (request) {
    try {
        const response = yield call(userService.addBoard, { ...request });
        yield put({ type: ADD_BOARD_SUCCESS, response });
    } catch (err) {
        yield put({ type: ADD_BOARD_ERROR, err });
    }
}

export function * addBoardSaga () {
    yield takeEvery(ADD_BOARD, addBoard);
}
