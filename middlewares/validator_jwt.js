const jwt = require('jsonwebtoken');

const validatorJWT = (req, res, next) => {
    // Leer el token
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No se envió un token',
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido!',
        });
    }
}

module.exports = {
    validatorJWT,
}