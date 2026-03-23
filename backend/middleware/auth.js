import jwt from 'jsonwebtoken';

//auth middleware to verify the token sent by the client in the request header
const authMiddleware = async (req, res, next) => {
    const {token} = req.headers;
    if(!token){
        return res.status(401).json({success:false, message: 'Unauthorized.Login in again'});
    }
    try {
      const token_decode = jwt.verify(token, process.env.JWT_SECRET);  
        req.body = req.body || {};
        req.body.userId = token_decode.id;
        next();
    }catch (error) {
        console.error("Error in authMiddleware:", error); 
        next(error);
    }
}

export default authMiddleware;