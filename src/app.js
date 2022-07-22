const express = require ('express')
const app = express()
const session = require ('express-session')
const flash = require('express-flash')
const passport = require('passport')
const {Strategy} =require('passport-local')
const { LocalStrategy } = require('./strategies')

const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

let users = [];

  const messages = {
    general: [],
    random: [],
    jokes: [],
    javascript: []
  };



io.on('connection', socket => {
  socket.on("join server", (username) => {
    const user = {
      username,
      id:socket.id,
    };
    users.push(user);
    io.emit("new user", users);
  });

  socket.on("join room", (roomName, cb) => {
    socket.join(roomName);
    cb(messages[roomName]);
  });


  socket.on("send message", ({ content, to, sender, chatName, isChannel }) => {
    if(isChannel) {
      const payload = {
        content,
        chatName,
        sender,

      };
      socket.to(to).emit("new message", payload);
    }else {
      const payload = {
        content,
        chatName: sender,
        sender
      };
      socket.to(to).emit("new message", payload);
    }
    if (messages[chatName]) {
      messages[chatName].push({
        sender,
        content
      });
    }
  });

  socket.on("disconnect", () => {
    users = users.filter(u => u.id !== socket.id);
    io.emit("new user", users);
  });
});

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



