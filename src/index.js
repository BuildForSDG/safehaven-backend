import http from 'http';
import socket from 'socket.io';
import app from './app';
import sockets from './socket';


const port = process.env.PORT || 9000;
const server = http.createServer(app);
const io = socket(server);
sockets(io);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default server;
