const fs = require('fs/promises');
const { readFile, writeFile } = require("../model/model");
const checkToken = require('../utils/checktoken');

const allUser = {};
const messages = [];

appSocketCallBack = async function(socket, io){
    const token = socket.handshake.auth.token;
    const checking = await checkToken(token);
    if(!checking.status) return socket.emit('tokenError', {message: checking.message});

    socket.on('connected', ({username})=>{
        allUser[username] = socket.id;
        io.emit('joined',{joinedUsername: username, allUser});
        io.emit('resive', messages);
    })  

    socket.on('send', ({from, to, message })=>{
        messages.push({from, to, message});
        io.emit('resive', messages);
    })

    socket.on('changePartner',()=>{
       io.emit('resive', messages);
    })
    
}

module.exports = appSocketCallBack;
