const User  = require('../../src/models/user');
const { request, login } = require('../utils/common');

const chai = require('chai');
const expect = chai.expect;

describe('User Routes', () => {
    after(async () => {
        User.collection.drop();
    });

    describe('Register', () => {
        it('Should return valid', () => {
            return request
                .post('/users/register')
                .send({
                    'name': 'temp',
                    'username': 'temp',
                    'email': 'temp@gmail.com',
                    'password': 'Password1',
                })
                .expect(201)
                .then((res) => {
                    expect(res.body.success).to.be.true;
                });
        });

        it('Should return invalid', () => {
            return request
                .post('/users/register')
                .send({
                    'name': 'temp',
                    'username': '',
                    'email': 'temp@gmail.com',
                    'password': 'Password1',
                })
                .expect(422)
                .then((res) => {
                    expect(res.body.success).to.be.false;
                });
        });

        it('Should return duplicate', () => {
            return request
                .post('/users/register')
                .send({
                    'name': 'temp',
                    'username': 'temp',
                    'email': 'temp@gmail.com',
                    'password': 'Password1',
                })
                .expect(400)
                .then((res) => {
                    expect(res.body.success).to.be.false;
                });
        });
    });

    describe('Login', () => {
        it('Should return vaild', () => {
            return login({
                username: 'temp',
                password: 'Password1'
            }).expect(200).then((res) => {
                expect(res.body.success).to.be.true;
            });
        });

        it('Should return invaild', () => {
            return login({
                username: 'temp',
                password: 'Password2'
            }).expect(400).then((res) => {
                expect(res.body.success).to.be.false;
            });
        });

        it('Should return no password', () => {
            return login({
                username: 'temp',
                password: ''
            }).expect(422).then((res) => {
                expect(res.body.success).to.be.false;
            });
        });
    });

    describe('Create User Post', () => {
        it('Should return valid', () => {
            return request
                .post('/users/temp/posts')
                .field('title', 'test post')
                .field('description', 'testing posts')
                .field('link', 'test')
                .field('tags', '[]')
                .expect(201)
                .then((res) => {
                    expect(res.body.success).to.be.true;
                    expect(res.body.post.title).to.be.equal('test post');
                });
        });

        it('Should return no user', () => {
            return request
                .post('/users/test/posts')
                .field('title', 'test post')
                .field('description', 'testing posts')
                .field('link', 'test')
                .field('tags', '[]')
                .expect(400)
                .then((res) => {
                    expect(res.body.success).to.be.false;
                });
        });

        it('Should return invalid', () => {
            return request
                .post('/users/temp/posts')
                .field('title', 'test post')
                .field('link', 'test')
                .expect(422)
                .then((res) => {
                    expect(res.body.success).to.be.false;
                });
        });
    });
});