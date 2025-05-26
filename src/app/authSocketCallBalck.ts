import { Socket } from "socket.io";
import { tokenService } from "../lib/tokenService";
import { readFile, writeFile } from "../model/model";
import { UserInterface } from "../types/user.dto";
const {createToken} = tokenService;

 const authSocketCallBack = function(socket:Socket){
  socket.on('registered', async (data:UserInterface)=>{
    const users: [UserInterface] = await readFile('users');
    if(users.some((item:UserInterface) => item.email == data.email)) return socket.emit('authError', {message: 'this user already excist'})
    const newUser = { id: users.length?(users.at(-1) as UserInterface).id!+1:1, ...data, createdAt: new Date().toLocaleDateString(), updatedAt:null }
    users.push(newUser);
    await writeFile('users', users);
    return socket.emit('authSuccess', {messge: 'User successfully added!', username: newUser.username ,accessToken: createToken({id: newUser.id})});
  })
    socket.on('login', async (data:UserInterface)=>{
    const users: [UserInterface] = await readFile('users');
    const foundUser = users.find((item:UserInterface) => item.email == data.email);
    if(foundUser == undefined) return socket.emit('authError', {message: 'this user is not available'})
    if(foundUser?.password != data?.password) return socket.emit('authError', {message: 'this user is not available'})
    return socket.emit('authSuccess', {messge: 'User successfully logged!', username: foundUser.username, accessToken: createToken({id: foundUser.id})});
  })
}
export default authSocketCallBack;