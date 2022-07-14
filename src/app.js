const express = require ('express')
const session = require ('express-session')
const flash = require('express-flash')
const passport = require('passport')
const {Strategy} =require('passport-local')
const { LocalStrategy } = require('./strategies')
const app = express()

//
//middlewares
app.use(session({
    secret:'jajaja',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

passport.use(LocalStrategy);
passport.serializeUser((user, done) => {
    done(null, JSON.stringify(user));
  });
  
  passport.deserializeUser((user, done) => {
    done(null, JSON.parse(user));
  });

  app.use(passport.initialize())
    app.use(passport.session());
//router

app.use( require('./routes/index.routes'))

app.listen(5000, ()=>{
    console.log('Servidor a la espera de conexiones')
})



