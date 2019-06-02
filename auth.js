import passport from "passport";
const Strategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

module.exports = app => {
    const Users = app.db.models.Users;
    const cfg = app.libs.config;
    const params = {
        secretOrKey: cfg.jwtSecret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("jwt")
    };
    const stratege = new Strategy(params, (payload, done)=>{
        Users.findByPk(payload.id)
            .then(user=>{
                if(user){
                    return done(null,{id:user.id, email:user.email});
                }
                return done(null, false);
            })
            .catch(error=>done(false, null));
            
    });

    passport.use(stratege);
    return{
        initialize: ()=>{
            return passport.initialize();
        },
        authenticate: ()=>{
            return passport.authenticate("jwt", cfg.jwtSession);
        }
    };
}