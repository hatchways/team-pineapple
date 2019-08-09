import { GET_TOKEN, LOGIN } from '../actions/types';

export const login = (user) => ({
    type: LOGIN,
    user
});

export const getToken = () => ({
    type: GET_TOKEN
});
