import { axios } from './utils';

export const profileService = {
    getBoardsandPosts: ({ username }) => {
        return axios.get(`/users/${username}`).then(res => {
            return res.data;
        }).catch(err => {
            throw err;
        });
    },
    follow: ({ followee }) => {
        return axios.post('/users/follow', { followee }).then(res => {
            return res.data;
        }).catch(err => {
            throw err;
        });
    },
    unfollow: ({ followee }) => {
        return axios.post('/users/unfollow', { followee }).then(res => {
            return res.data;
        }).catch(err => {
            throw err;
        });
    }
};
