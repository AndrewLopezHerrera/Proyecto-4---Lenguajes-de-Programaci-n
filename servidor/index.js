const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const GestorPartida = require('./logicadejuego/GestorPartida');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;
const gestorPartida = new GestorPartida();

app.use(express.json());

io.on('connection', (socket) => {
    console.log('Un jugador se ha conectado');

    socket.on('joinRoom', (idPartida) => {
        socket.join(idPartida);
        console.log(`Jugador se unió a la partida ${idPartida}`);
    });

    socket.on('disconnect', () => {
        console.log('Un jugador se ha desconectado');
    });
});

// Rutas del servidor
app.get('/partidas', (req, res) => {
    const partidas = gestorPartida.MostrarPartidas();
    res.json(partidas);
});

app.post('/partida', (req, res) => {
    const { nombreJugador, cantidadPersonas } = req.body;
    const nuevaPartida = gestorPartida.CrearPartida(nombreJugador, cantidadPersonas);
    res.json(nuevaPartida);
});

app.post('/partida/salir', (req, res) => {
    const { idPartida, nombreJugador } = req.body;
    const resultado = gestorPartida.SalirPartida(idPartida, nombreJugador);
    res.json({ resultado });
});

app.post('/partida/unirse', (req, res) => {
    const { idPartida, nombreJugador } = req.body;
    const resultado = gestorPartida.UnirsePartida(idPartida, nombreJugador);
    res.json({ resultado });
});

app.post('/partida/tirarDado', (req, res) => {
    const { idPartida, nombreJugador } = req.body;
    const resultado = gestorPartida.TirarDado(idPartida, nombreJugador, io);
    res.json({ resultado });
});

app.post('/partida/moverFicha', (req, res) => {
    const { idPartida, color, numero, casillaActual } = req.body;
    const resultado = gestorPartida.MoverFicha(idPartida, color, numero, casillaActual, io);
    res.json({ resultado });
});

server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
