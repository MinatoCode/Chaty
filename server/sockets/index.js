let ioRef = null;

export function initializeSocket(io) {
  ioRef = io;

  io.on('connection', (socket) => {
    socket.on('identify', (userId) => {
      if (userId) socket.join(`user:${userId}`);
    });

    socket.on('join-chat', (chatId) => {
      if (chatId) socket.join(`chat:${chatId}`);
    });

    socket.on('send-message', ({ chatId, message }) => {
      if (chatId) io.to(`chat:${chatId}`).emit('message.new', message);
    });

    socket.on('disconnect', () => {
      // graceful disconnect
    });
  });
}

export function getIo() {
  return ioRef;
}

