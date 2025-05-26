const fs = require('fs/promises');
const { readFile, writeFile } = require("../model/model");
const checkToken = require('../utils/checktoken');

const allUser = {};

appSocketCallBack = async function(socket, io){
    const token = socket.handshake.auth.token;
    const checking = await checkToken(token);
    if(!checking.status) return socket.emit('tokenError', {message: checking.message});

    socket.on('connected', ({username})=>{
        allUser[username] = socket.id;
        io.emit('joined',{joinedUsername: username, allUser});
    })  

    socket.on('send', ({from, to, message })=>{
        const socketId = allUser[to];
        socket.to(socketId).emit('resive', { from, message })
    })
}

module.exports = appSocketCallBack;
