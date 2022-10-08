require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const db = require('./model/db');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const store = require('./helpers/session');

//routers
const authRouter = require('./routes/auth');

app.use(express.static('../client/build'));

//express session
app.use(session({
    store: store,
    secret: process.env.SESSIONSECRET,
    cookie: {
        maxAge: 172000000,
        httpOnly: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: 'lax'
    },
    saveUninitialized: true,
    resave: false,
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'production' ? true : false
}))

app.use(passport.initialize());
app.use(passport.session());

require('./controllers/auth');

app.use('/auth', express.json(), authRouter);

//general path for getting static pages
app.get("/*", (req, res) => {
    if(process.env.NODE_ENV === 'production') {
        res.sendFile(path.join(__dirname, "../client/build", "index.html"), (err) => {
            if(err) {
                console.log('Incorrect path');
                res.status(500).send()
            }
        });
    } else {
        res.redirect('https://localhost:3000/');
    }
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})