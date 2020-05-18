import helperMethods from '../utils/helpers';

export default async function (socket, io, user) {
  // a user joins a room onces
  socket.on('make-connection', async (data) => {
    try {
      const { otherUuid } = data;
      let consultantUuid;
      let userUuid;
      if (user.role === 'patient') {
        userUuid = user.uuid;
        consultantUuid = otherUuid;
      }

      if (user.role === 'consultant') {
        userUuid = otherUuid;
        consultantUuid = user.uuid;
      }
      // check if the user has connection with the other user or create a new one
      const connection = await helperMethods.createConnection(userUuid, consultantUuid);
      await socket.join(connection.uuid, () => {
        io.to(socket.id).emit('conversation', { connection });
        socket.on(`${connection.uuid}-message`, async (chat) => {
          const {
            message, parentUuid, file, senderName
          } = chat;
          const chatReturned = await helperMethods.saveChats({
            message,
            parent_uuid: parentUuid,
            file,
            senderName,
            user_uuid: user.uuid,
            connection_uuid: connection.uuid
          });
          await io.to(connection.uuid).emit('conversation', { chatReturned });
        });
      });
    } catch (error) {
      console.log(error);
      io.to(socket.id).emit('error', { error });
    }
  });
}
