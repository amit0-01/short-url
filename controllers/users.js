const {v4: uuidv4} = require('uuid');
const User = require("../models/users");
const {setUser} = require("../service/auth")
async function handleUserSignup(req,res){
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.render("login");
}

async function handleUserLogin(req,res){
    const {email, password} = req.body;
    const user = await User.findOne({ email, password});
    if(!user){
        return res.render("login", {
            error: "Invalid Username or Password",
        });
    }
        // const sessionId = uuidv4();
        // var setUser = (sessionId, user);
        const token = setUser(user);
        res.cookie("token", token);
        return res.redirect("/");
        // return res.json({token})
        // res.cookie("uid", token);
        // res.cookie("uid", sessionId);
        // return res.redirect("/");
    // }
    // return res.render("home");
}
module.exports = {
    handleUserSignup,
    handleUserLogin
}