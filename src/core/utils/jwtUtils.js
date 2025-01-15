const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    };  

    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '8h' });
};

module.exports = { generateToken };