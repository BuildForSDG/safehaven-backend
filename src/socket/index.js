import SocketAuth from '../middlewares/SocketAuth';
import connection from './connection';

export default (io) => {
  if (io) {
    io.on('connection', async (socket) => {
      console.log('here', socket);
      let user;
      const { handshake } = socket;
      socket.on('authenticate', async (data) => {
        try {
          const header = data.token;
          user = await SocketAuth(header, socket, io);
        } catch (error) {
          console.log(error);
        }
      });
      if (handshake.headers.authorization) {
        const header = handshake.headers.authorization;
        if (header) {
          console.log(header);
          user = await SocketAuth(header, socket, io);
        }
      }
      // handle other processes here
      connection(socket, io, user);
      // Disconnect event
      socket.on('disconnect', () => {
        // handle user disconnection
      });
    });
  }
};
