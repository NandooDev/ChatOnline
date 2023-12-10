const express = require('express');
const socket = require('socket.io');
const http = require('http');
const { connect } = require('http2');

const PORT = process.env.PORT || 5555;
const app = express();
app.use(express.static(__dirname + '/../public'));

const httpServer = http.createServer(app);
const io = socket(httpServer, {
    path: '/socket.io'
});

const userCon = [];
const usersTotal = [];

io.on('connection', (client) => {
    console.log(`Usuário conectado - ID = ${client.id}`);
    usersTotal.push(client);

    client.on("conectado", (user) => {
        console.log(user);
        userCon.push(user);
    })

    client.on("msg", (msg, u) => {
        for(let i = 0; i < usersTotal.length; i++) {
            usersTotal[i].emit("msgRe", msg, u);
        };
    })

    client.on('disconnect', () => {
        usersTotal.splice(usersTotal.indexOf(client), 1);
        console.log(`Usuário desconectado - ID = ${client.id}`);
    })
});

httpServer.listen(PORT, '0.0.0.0', () => {
    console.log("Conexão feita com sucesso na port 5555")
});