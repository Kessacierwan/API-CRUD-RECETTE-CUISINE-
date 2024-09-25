const jwt = require("jsonwebtoken");

const JWT_SECRET = "secure_key"

function authenticateToken(req,res,next){
    try {
    
        const token = req.headers["authorization"].split(" ")[1];

        console.log(token);

        if(!token) return res.status(403).json({message : "token manquant"}) ;
    
        const decodedToken = jwt.verify(token,JWT_SECRET)
    
        req.userid = decodedToken = decodedToken.userId
        next()

    } catch (error) {
        res.json({message: "token invalide"})
    }

    

}

module.exports = authenticateToken