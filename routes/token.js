import jwt from "jwt-simple";

module.exports = app => {
    const cfg = app.libs.config;
    const Users = app.db.models.users;


    app.post("/token", (req, res)=>{
        if(req.body.email && req.body.password){
            const email = req.body.email;
            const password = req.body.password;

            Users.findOne({where: {email: email}})
                .then(user => {
                    console.log(`password is ${user.password}`);
                    if(Users.isPassword(user.password, password)){
                        const payload = {id: user.id};
                        res.json({
                            toker: jwt.encode(payload,cfg.jwtSecret)
                        });
                    }else{
                        console.log("password doesn't match");
                        res.sendStatus(401);
                    }
                })
                .catch(error=>{
                    res.status(401).json({msg: error.message});
                })
        }else{
            res.sendStatus(401);
        }
    });
};