import jwt from "jsonwebtoken";


export const generateToken = (userId, res) => {


    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '10s'
    })

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 1000 // 1 hour
    })

    return token;
}