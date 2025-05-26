import  { tokenService } from "../lib/tokenService";
import { readFile } from "../model/model";
import { UserInterface } from "../types/user.dto";
import { Id } from "../types/id.dto";
const {verifyToken} = tokenService;

export async function checkToken(token:string){
    if(!token) return {message: 'Token required', status: false}
    const tokenId = verifyToken(token) as Id;
    const users:UserInterface[] = await readFile('users');
    if(!users.some((item:UserInterface) => item.id == tokenId.id)) return {message: 'This user is not available', status: false}
    return {message: 'This user is available', status: true, id: tokenId }
}
