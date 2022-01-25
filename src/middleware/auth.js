const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * Express middleware:
 * when express route is provided with a middleware, it will be executed before the route handler.
 * middleware declaration: (req, res, next) => {}
 * the req and res are the request and response objects of the route handler.
 * next is a function that must be called to pass the request to the next middleware or route handler.
 * next() must be called to 'move on' to the next middleware, otherwise the request will hang forever.
 * calling res.send() will send the response to the client  and end the current middleware chain.
 */
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');

        /**
         * jwt.verify() returns the decoded payload of the token.
         * We can then extract the user id from the payload, if the user is valid.
         * If the token is invalid an error is thrown - e.g. JsonWebTokenError: invalid signature
         */
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({
            _id: decoded._id,
            'tokens.token': token, //this will check for the token in the user's tokens array
        });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user; //this is the user that was already authenticated and extracted from the database
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = auth;
