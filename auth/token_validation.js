const {
    verify
} = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        console.log(token);
        if (token) {
            token = token.slice(7);
            verify(token, process.env.ENCRYPT_KEY, (err, decoded) => {
                if (err) {
                    // return res.status(400).send( "Invalid token");
                    // return res.json({
                    //     success: 0,
                    //     message: "Invalid token"
                    // });
                    return res.status(400).send("Invalid token")
                } else {
                    next();
                }
            })
        } else {
            // return res.status(400).send( "Access denied! unauthorised access");
            // return res.json({
            //     success: 0,
            //     message: "Access denied! unauthorised access"
            // });

            return res.status(403).send("Access denied! unauthorised access");

        }
    }
}