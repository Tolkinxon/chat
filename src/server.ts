import { createServer } from 'node:http';
import path from 'node:path';
import express, { RequestHandler } from 'express';
const app = express();
import { Server } from 'socket.io';
import viewsRouter  from './routes/views.routes';
import authSocketCallBalck from './app/authSocketCallBalck';
import appSocketCallBack from './app/appSocketCallBack';
import { globalError } from './middlewares/globalError';

app.use(express.static(path.join(process.cwd(), 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(globalError as express.ErrorRequestHandler);
app.use(viewsRouter);


const server = createServer(app);
const io = new Server(server);

const authSocket = io.of('/auth');
const appSocket  = io.of('/app');

authSocket.on('connection', authSocketCallBalck);
appSocket.on('connection', (socket) => appSocketCallBack(socket, appSocket));


import serverConfig from './config';
const {PORT} =serverConfig
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

















