export function initializeSocket(io) {
  io.on('connection', (socket) => {
    socket.on('join-room', (room) => {
      socket.join(room);
    });

    socket.on('send-message', ({ room, message }) => {
      io.to(room).emit('message-received', message);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  });
}
