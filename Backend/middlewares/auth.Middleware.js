import jwt from 'jsonwebtoken'


export const authMiddleware = (req, res, next) => {

    const token = req.cookies.token; // Assuming token is sent in cookies and I need to install cookie-parser and use it in index.js app.use(cookieParser());


    if(!token) {
        return res.status(401).json({success : false, message : 'Unauthorized, Token missing'});
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // If it fails, it will go to catch block


        req.user = decoded;

        next();
        
    } catch (error) {
        return res.status(401).json({success : false, message : 'Unauthorized, Invalid Token'});
    }

}