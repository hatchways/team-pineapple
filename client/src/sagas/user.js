import { put, takeLatest, call } from 'redux-saga/effects';
import {
    LOGIN, LOGIN_SUCCESS, LOGIN_ERROR,
    GET_TOKEN, GET_TOKEN_SUCCESS,
    LOGOUT, LOGOUT_SUCCESS,
    FOLLOW, FOLLOW_ERROR, FOLLOW_SUCCESS,
    UNFOLLOW, UNFOLLOW_ERROR, UNFOLLOW_SUCCESS
} from '../actions/types';
import { userService } from '../services/user';

/*
call user service login
call redux with put
 */
function * login (request) {
    try {
        const response = yield call(userService.login, request.user);
        yield put({ type: LOGIN_SUCCESS, response });
    } catch (error) {
        yield put({ type: LOGIN_ERROR, error });
    }
}

// listen for 'LOGIN' action -> call login*
export function * loginSaga () {
    yield takeLatest(LOGIN, login);
}

function * logout () {
    yield call(userService.logout);
    yield put({ type: LOGOUT_SUCCESS });
}

// listen for 'LOGIN' action -> call login*
export function * logoutSaga () {
    yield takeLatest(LOGOUT, logout);
}

function * getToken () {
    const token = yield call(userService.getToken);
    if (token) {
        const user = yield call(userService.getUser);
        yield put({ type: GET_TOKEN_SUCCESS, token, user });
    } else {
        yield logout();
    }
}

export function * getTokenSaga () {
    yield takeLatest(GET_TOKEN, getToken);
}

function * follow (request) {
    try {
        yield call(userService.follow, request);
        yield put({ type: FOLLOW_SUCCESS, payload: request.followee });
    } catch (err) {
        console.log(err);
        yield put({ type: FOLLOW_ERROR, payload: 'could not follow user' });
    }
}

export function * followSaga () {
    yield takeLatest(FOLLOW, follow);
}

function * unFollow (request) {
    try {
        yield call(userService.unfollow, request);
        yield put({ type: UNFOLLOW_SUCCESS, payload: request.followee });
    } catch (err) {
        console.log(err);
        yield put({ type: UNFOLLOW_ERROR, payload: 'could not unfollow user' });
    }
}

export function * unFollowSaga () {
    yield takeLatest(UNFOLLOW, unFollow);
}
