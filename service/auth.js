// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = 'Amit$123@$';
// function setUser(id, user){
//     sessionIdToUserMap.set(id,user);
// }

function setUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        role : user.role
    };

    return jwt.sign(payload, secret);
}


// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }
function getUser(token){
    if(!token) return null;
    return jwt.verify(token, secret);
}

module.exports = {
    setUser,
    getUser
}