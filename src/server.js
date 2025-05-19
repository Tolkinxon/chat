const { createServer } = require('http');
const app = require('express')();
const { Server } = require('socket.io');
const serverConfig = require('./config');


const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

const allUser = {};

io.on('connection', (socket)=>{
    // console.log(socket.handshake);  
    socket.on('connected', ({username})=>{
        allUser[username] = socket.id;
        console.log(allUser);
        
        io.emit('joined',{joinedUsername: username, allUser});
    })  

    socket.on('send', ({from, to, message })=>{
        const socketId = allUser[to];
        socket.to(socketId).emit('resive', { from, message })
    })
    
})


const { PORT } = serverConfig;
server.listen(PORT, ()=>console.log(`Server is running on port${PORT}`))    