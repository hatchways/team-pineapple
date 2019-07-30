const jwt = require('jsonwebtoken');

class UserClass {
    loginToken() {
        return jwt.sign({
            _id: this._id,
            username: this.username,
        }, process.env.SECRET, { expiresIn: '24hr' });
    };
}

module.exports = UserClass;