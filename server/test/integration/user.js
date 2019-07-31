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

    describe('Update profile', () => {
        //need abs path to file
        it.skip('Should return vaild', () => {
            return request
                .put('/users/temp')
                .attach('image', '/Users/nick/Desktop/team-pineapple/server/test/utils/test-data/kenny.png')
                .expect(200)
                .then((res) => {
                    expect(res.body.user.profile).to.be.not.empty;
                    expect(res.body.success).to.be.true;
                });
        }).timeout(10000);

        it('Should return vaild (no image)', () => {
            return request
                .put('/users/temp')
                .field('name', 'test')
                .expect(200)
                .then((res) => {
                    expect(res.body.user.name).to.be.equal('test');
                    expect(res.body.success).to.be.true;
                });
        }).timeout(10000);
    });
});