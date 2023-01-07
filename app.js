require("dotenv").config()

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./db/connect");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const app = express();

//Passport config
require('./config/passport')(passport);

//EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

//BodyParser
app.use(express.urlencoded({extended:false}));

//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Passport middleware (Important between Express Session and Flash)
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Routes 
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        //connect DB
        await connectDB(process.env.MONGODB_URL)
        app.listen(PORT, ()=>{
            console.log(`Server is listening at port ${PORT}...`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()