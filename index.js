const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const {connectToMongoDB} = require('./connect');
const URL = require('./models/url');
const cookieParser = require("cookie-parser");
const {checkForAuthentication,restrictToLoggedInUserOnly, restrictTo}  = require("./middlewares/auth");

const staticRoute = require('./routes/staticRouter');
const urlRoute = require('./routes/url');
const userRoute = require('./routes/users');
require('dotenv').config()



const app = express();
const PORT = 8000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"));

// app.use('/url',restrictToLoggedInUserOnly, urlRoute);
app.use('/url',
    restrictTo(["NORMAL"]), 
    urlRoute);

app.get('/test', async function(req,res){
    const allUrls = await URL.find({});
    return res.render('home', {
        urls: allUrls,
    });
});

app.get('/url/:shortId', async function(req,res){
const shortId = req.params.shortId;
const entry = await URL.findOneAndUpdate(
    {
        shortId,
    },
    {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            },
        },
    }
);

res.redirect(entry.redirectURL);
});

connectToMongoDB(`${process.env.MONGODBURL}/short-url`)
.then(() =>
    console.log('Mongodb connected')
) 

app.use("/", staticRoute);
app.use("/user", userRoute);

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// const entry = await URL.findOneAndUpdate(
//     {
//         shortId,
//     },
//     {
//         $push: {
//             visitHistory: {
//                 timestamp: Date.now(),
//             },
//         },
//     }
// );

// res.redirect(entry.redirectURL);

app.listen(PORT, function(){
    console.log(`Server is listening on port ${PORT}`);
})

