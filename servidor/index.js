/** https://servidorparchistecgame.loca.lt */

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const GestorPartida = require('./logicadejuego/GestorPartida');

const port = 4000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://parchistecgame.loca.lt'],
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: true
    }
});

const corsOptions = {
    origin: ['http://localhost:3000', 'https://parchistecgame.loca.lt'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

const gestorPartida = new GestorPartida(io);

io.on('connection', (socket) => {
    console.log('Un jugador se ha conectado');

    socket.on('joinRoom', ({idPartida, nombreJugador}) => {
        socket.join(idPartida);
        console.log(`Jugador ${nombreJugador} se unió a la partida ${idPartida}`);
    });

    socket.on('disconnect', () => {
        console.log('Un jugador se ha desconectado');
    });
});

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
    const resultado = gestorPartida.TirarDado(idPartida, nombreJugador);
    res.json({ resultado });
});

app.post('/partida/moverFicha', (req, res) => {
    const { idPartida, color, numero, casillaActual } = req.body;
    const resultado = gestorPartida.MoverFicha(idPartida, color, numero, casillaActual);
    res.json({ resultado });
});

app.get('/ranking', async (req, res) => {
    try {
      const resultados = await gestorPartida.MostrarRanking();
      res.json(resultados);
    } catch (err) {
      console.log('Error al mostrar el ranking:', err);
      res.status(500).send('Error al mostrar el ranking');
    }
  });

app.post('/partida/estadistica', (req, res) => {
    const { idPartida } = req.body;
    const resultado = gestorPartida.MostrarEstadisticas(idPartida);
    res.json({ resultado });
});

server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
