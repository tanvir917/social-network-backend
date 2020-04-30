let io;

module.exports = {
    init: httpServer => {//arrow function
        io = require('socket.io')(httpServer);
        return io;
    },
    getIO: () => {
        if(!io) {
            throw new Error('Soket.io not initialized');
        }
        return io;
    }
}