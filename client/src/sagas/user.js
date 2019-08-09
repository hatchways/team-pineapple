import { put, takeLatest, call } from 'redux-saga/effects';
import {
    LOGIN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    GET_TOKEN,
    GET_TOKEN_SUCCESS
} from '../actions/types';
import { userService } from '../services/user';

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
