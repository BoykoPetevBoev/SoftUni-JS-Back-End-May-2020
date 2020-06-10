const jsonwebtoken = require('jsonwebtoken');

const secret = 'SuperSecretKey';

function encodeToken(user) {
    const payloads = {
        _id: user._id,
        username: user.username
    };
    const options = { expiresIn: '2d'};
    const token = jsonwebtoken.sign(payloads, secret, options);

    console.log('Token: ', token);
    return token;
}
function decodeToken(jwt) {
    if (!jwt) {
        return req.redirect('/login');
    }
    const decodedToken = jsonwebtoken.verify(jwt, secret);

    console.log('Decoded Token: ', decodedToken);
    return decodedToken;
}

module.exports = {
    encodeToken,
    decodeToken
}