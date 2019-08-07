const jwt = require('jsonwebtoken');
const secret = 'secret';

// module.exports = function () {
//     return function (req, res, next) {
//         const token = req.body.token || req.body.query || req.headers['access-token']; // Check for token in body, URL, or headers

//         if (token) {
//             jwt.verify(token, secret, function (err, decoded) {
//                 if (err) {
//                     res.status(401).json({ success: false, message: 'Token invalid' });
//                 } else {
//                     req.decoded = decoded;
//                     next();
//                 }
//             });
//         } else {
//             return res.status(401).json({ success: false, message: 'No token provided' });
//         }
//     };
// };

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('access-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, secret);

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
