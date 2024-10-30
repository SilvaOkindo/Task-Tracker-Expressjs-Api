import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    
    let token

    const authHeaders = req.headers.authorization || req.Authorization

    if(authHeaders && authHeaders.startsWith('Bearer')) {
        token = authHeaders.split(' ')[1]
    }

    if(!token) {
        return res.status(403).json({message: "No token provided. Authorization needed"})
    }
    
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}