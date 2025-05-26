import { sign, verify } from 'jsonwebtoken';
import c from 'config'

export const tokenService = {
    createToken: (payload:object) => sign(payload, c.get('TOKEN_KEY')),
    verifyToken: (token:string) => verify(token, c.get('TOKEN_KEY')),
}
