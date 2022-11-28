const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const conection = require("./database/db")
const app = express()
var socket = require('socket.io');

//seteamos el motor de plantillas
app.set('view engine', 'ejs')

//seteamos en express la carpeta public para archivos estaticos
app.use(express.static('public'))

//para procesar datos enviados desde formularios
app.use(express.urlencoded({extended:true}))
app.use(express.json())


//seteamos las variables de entorno
dotenv.config({path: './env/.env'})

//para poder trabajar con las cookies
app.use(cookieParser())

//llamar al router
app.use('/', require('./routes/router.js'))

var server = app.listen(process.env.PORT || 8080, ()=>{
    console.log('SERVER UP running in https://ec2-52-87-253-204.compute-1.amazonaws.com/:8080')
})

const io = socket(server)
const gameRooms = []

conection.query(
    "SELECT id_board FROM boards",
    (error, results) => {
      if (error) {
       console.log(error);
      }else{
        for (let index = 0; index < results.rows.length; index++) {
            gameRooms.push(results.rows[index].id_board)
        }
      }
    }
  )

io.on('connection', (socket)=>{
    console.log('new Client')
    socket.emit('welcome', 'Hello')
    socket.on('joinRoom', (room) => {
        for (let i = 0; i < gameRooms.length; i++) {
            if(gameRooms[i] == room){
                socket.join(room)
                io.in(room)
                .emit('newUser', 'New player has joined the room: '+ room)
                return socket.emit('success', 'you have succefully joined this room')
            }
        }
            socket.disconnect()
    })

    socket.on('mouse', mouseMsg)

    function mouseMsg(vectorDeEntidades2, vectorDeLineas2, room){
        socket.in(room).emit('mouse', vectorDeEntidades2, vectorDeLineas2, room)
    }
})
