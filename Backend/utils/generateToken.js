import jwt from "jsonwebtoken";


export const generateToken = (userId, res) => {


    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })

    res.cookie('token', token, {
        httpOnly: true,

        // we need secure false in local and secure true for server
        secure: process.env.NODE_ENV === 'production',

        // we need sameSite lax for local and sameSite none for server
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    return token;
}