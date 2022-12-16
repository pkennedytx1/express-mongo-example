import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const tokenHeader = req.headers['authorization'];
    console.log(tokenHeader);
    const token = tokenHeader && tokenHeader.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, 'myPrivateKey', (err) => {
        if (err) return res.sendStatus(403);
        next()
    });
}