require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const db = require('./model/db');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const store = require('./helpers/session');
const cors = require('cors');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

if(process.env.NODE_ENV != 'production') {
    const morgan = require('morgan');
    app.use(morgan('dev'))
}

//routers
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const widgetRouter = require('./routes/widgets');
const billingRouter = require('./routes/billing');
const publicWidgetRouter = require('./routes/publicWidget');
const proposalRouter = require('./routes/proposal');

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

app.use('/auth', cors({ credentials: true, origin: 'http://localhost:3000' }), express.json(), authRouter);
app.use('/user', cors({ credentials: true, origin: 'http://localhost:3000' }), express.json(), userRouter);
app.use('/widget', cors({ credentials: true, origin: 'http://localhost:3000' }), express.json(), widgetRouter)
app.use('/billing',cors ({ credentials: true, origin: 'http://localhost:3000' }), billingRouter);
app.use('/public-widget', cors(), express.json(), publicWidgetRouter);
app.use('/proposal', cors(), express.json(), proposalRouter);

//general path for getting static pages
app.get("/*", cors({ credentials: true, origin: 'http://localhost:3000' }), (req, res) => {
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