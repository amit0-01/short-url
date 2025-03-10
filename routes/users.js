const express = require("express");
const {handleUserSignup} = require("../controllers/users");
const {handleUserLogin} = require("../controllers/users");
const router = express.Router();

router.post('/',handleUserSignup);
router.post('/login',handleUserLogin);

module.exports = router