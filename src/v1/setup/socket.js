let io;

module.exports.init = (server) => {
  io = require("socket.io")(server, {
    cors: {
      // origin: process.env.API_URL,
      origin: "*",
      methods: ["GET", "POST"],
      // allowedHeaders: ["my-custom-header"],
      // credentials: true,
    },
  });

  return io;
};

module.exports.getIO = () => {
  if (!io) {
    throw new Error("");
  }

  return io;
};
