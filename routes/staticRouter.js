const express = require("express");
const router = express.Router();
const URL = require("../models/url")
const { restrictTo } = require('../middlewares/auth')


router.get("/", restrictTo(['NORMAL']), async function(req, res){
    const allurls = await URL.find();
    const shortID = req.query.id || null;
    return res.render("home",{
        id: shortID,
        urls: allurls,
    });
})

router.get("/signup", function(req,res){
    return res.render("signup");
});

router.get("/login", function(req,res){
    return res.render("login");
})
module.exports = router;