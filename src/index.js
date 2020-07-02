import http from 'http';
import socket from 'socket.io';
import app from './app';
import sockets from './socket';


const port = process.env.PORT || 9000;
const server = http.createServer(app);
const io = socket(server, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Origin': req.headers.origin, // or the specific origin you want to give access to,
      'Access-Control-Allow-Credentials': true
    };
    res.writeHead(200, headers);
    res.end();
  }
});
sockets(io);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default server;
