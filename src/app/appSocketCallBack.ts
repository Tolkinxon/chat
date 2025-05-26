import fs  from 'fs/promises';
import { checkToken } from '../utils/checktoken';
import { Namespace, Socket } from 'socket.io';
import { Messages } from '../types/messages.dto';

const allUser:any = {};
const messages:Messages[] = [];

const appSocketCallBack = async function(socket:Socket, io:Namespace){
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

export default appSocketCallBack;
