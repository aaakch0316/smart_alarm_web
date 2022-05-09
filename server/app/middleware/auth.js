const {User} = require("../models/user.js");
import db from '../models/index.js'


let auth = (req,res,next)=>{

    //Checking if the token is valid
    // let token = req.cookies.ths_auth;
    let token = req.body.token
    User.findByToken(token,(err,user)=>{
        if(err) throw err;
        if(!user) return res.json({
            isAuth : false,
            error : true
        });
        req.token = token;
        req.user = user;
        next();
    })
}
module.exports = {auth};