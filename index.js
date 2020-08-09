const server = require('net').createServer();
let counter = 0;
let sockets = {};

server.on('connection', socket => {
    socket.id = counter++;
    console.log('Client connected');
    socket.write('Please type your name: ');

    socket.on('data', data => {
            if (!sockets[socket.id]) {
                socket.name = data.toString().trim();
                socket.write(`Welcome ${socket.name}! \n`);
                sockets[socket.id] = socket;
                return;
            }

            Object.entires(sockets).forEach(([key, cs] => {
                    if (socket.id == key) return;
                    cs.write(`${socket.name}: `);
                    cs.write(data);
                });
            }); socket.on('end', () => {
            delete sockets[socket.id];
            console.log('Client disconnected');
        });
    });
});

const port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);