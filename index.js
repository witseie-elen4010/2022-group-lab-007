'use strict'

// ///////////////////////////////////////////////////
// imports and configuration files
// ///////////////////////////////////////////////////
// Express framework for routing
const express = require('express')
const path = require('path')
// http for local server connection
const http = require('http')
// defining a port
const PORT = process.env.PORT || 3000
// socket instance creation
const socketio = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
// session for user token
const session = require('express-session');
const FileStore = require('session-file-store')(session)
// server configuration
const db = require('./serverConfig.js')

// ///////////////////////////////////////////////////
// user token session
// ///////////////////////////////////////////////////
app.use(session({
  store: new FileStore(),
  secret: 'lacrazywordgamesqwertyasdfa',
  resave: false,
  saveUninitialized: false
})
)

// ///////////////////////////////////////////////////
// Socket setup
// ///////////////////////////////////////////////////

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
// Handle a socket connection request from web client
const connections = [null, null] //edit here for allowing an addition player

let NumClient=0
let roomNo
let roomsize

io.on('connection', socket => {

  NumClient++;
  //Sets 2 clients to a single room
    roomNo = Math.round(NumClient / 2);
    socket.join(roomNo);
    console.log(`New client no.: ${NumClient}, room no.: ${roomNo}`);
    socket.emit('serverMsg',roomNo)

    //Returns the number of clients in the room
    socket.on('Checkroomsize',data=>{
      roomsize=io.sockets.adapter.rooms.get(data).size
      io.to(data).emit('Roomsize',roomsize)
    })

    //If matchmaking fails then client number is reduced so room can be used later
    socket.on('Failed to matchmake',()=>{
      NumClient--;
    })
})

   


// ///////////////////////////////////////////////////
// settings for route use
// ///////////////////////////////////////////////////
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')
app.use(logger)

// ///////////////////////////////////////////////////
// set route paths
// ///////////////////////////////////////////////////
const createRouter = require('./routes/create')
const loginRouter = require('./routes/users')
const homeRouter = require('./routes/home')
const InstructionsRouter = require('./routes/Instruction')
const SingleGameRouter = require('./routes/SinglePlayer')
const aboutRouter = require('./routes/about')
const queueRouter=require('./routes/queue')
const Multiplayer1Router = require('./routes/MultiplayerMode1')
const Multiplayer2Router = require('./routes/MultiplayerMode2')
const LeaderboardRouter=require('./routes/leaderboard')
// ///////////////////////////////////////////////////
// Define routes
// ///////////////////////////////////////////////////
app.use('/create', createRouter)
app.use('/users', loginRouter)
app.use('/home', homeRouter)
app.use('/instructions', InstructionsRouter)
app.use('/singleplayer',SingleGameRouter)
app.use('/about',aboutRouter)
app.use('/queue',queueRouter)
app.use('/MultiplayerMode1',Multiplayer1Router)
app.use('/MultiplayerMode2',Multiplayer2Router)
app.use('/leaderboard',LeaderboardRouter)

// ///////////////////////////////////////////////////
// define function
// ///////////////////////////////////////////////////
function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

module.exports = app
