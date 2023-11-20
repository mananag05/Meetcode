const JWT_SECRET = "secret";
var jwt = require('jsonwebtoken');


module.exports = {
    auth: (req, res, next) => {
        const authHeader = req.headers["authorisation"];
        if (authHeader === "null") {
            return res.status(403).json({msg: "Missing auth header"});
        }
        const decoded = jwt.verify(authHeader, JWT_SECRET);
        if (decoded && decoded.id) {
            req.userId = decoded.id;
            next()
        } else {
            return res.status(403).json({msg: "Incorrect token"});
        }
    },

    checkcreate : (req, res, next) => {
        console.log("initalised");
        const authHeader = req.headers["createauth"]; 
        if (authHeader === "null"){
            console.log("missing")
          return res.status(403).json({ msg: "missing createauth" });
        }
       
        next();
      }


}