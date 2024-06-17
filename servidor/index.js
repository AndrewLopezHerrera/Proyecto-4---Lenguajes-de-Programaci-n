/** 
 * Configuración del servidor para el juego Parchís
 * https://servidorparchistec.loca.lt
 */
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const GestorPartida = require('./logicadejuego/GestorPartida');

const port = 4000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    // Configuración CORS para permitir conexiones desde diferentes orígenes
    cors: {
        path: '/socket.io', // Ruta del socket.io
        origin: ['http://localhost:3000', 'https://parchistec.loca.lt', 'wss://parchistec.loca.lt:3000/ws'],
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
        credentials: false
    }
});

// Opciones CORS para las rutas del servidor
const corsOptions = {
    origin: ['http://localhost:3000', 'https://parchistec.loca.lt', 'wss://parchistec.loca.lt:3000/ws'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: false,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); // Middleware para configurar CORS
app.use(express.json()); // Middleware para manejar JSON en las solicitudes

const gestorPartida = new GestorPartida(io); // Instancia del gestor de partidas

// Manejador de eventos cuando un cliente se conecta al servidor
io.on('connection', (socket) => {
    console.log('Un jugador se ha conectado');

    // Evento para unirse a una sala de juego
    socket.on('joinRoom', ({idPartida, nombreJugador}) => {
        socket.join(idPartida);
        console.log(`Jugador ${nombreJugador} se unió a la partida ${idPartida}`);
    });

    // Evento para tirar el dado
    socket.on('tirarDado', (idPartida, nombreJugador) => {
        gestorPartida.TirarDado(idPartida, nombreJugador);
    });

    // Evento para mover una ficha en el servidor
    socket.on('moverFichaServidor', (idPartida, nombreJugador, color, numero, posicionActual) => {
        gestorPartida.MoverFicha(idPartida, nombreJugador, color, numero, posicionActual);
    });

    // Evento cuando un jugador se desconecta
    socket.on('disconnect', () => {
        console.log('Un jugador se ha desconectado');
    });
});

// Ruta para obtener todas las partidas
app.get('/partidas', (req, res) => {
    const partidas = gestorPartida.MostrarPartidas();
    res.json(partidas);
});

// Ruta para crear una nueva partida
app.post('/partida', (req, res) => {
    const { nombreJugador, cantidadPersonas } = req.body;
    const nuevaPartida = gestorPartida.CrearPartida(nombreJugador, cantidadPersonas);
    res.json(nuevaPartida);
});

// Ruta para que un jugador salga de una partida
app.post('/partida/salir', (req, res) => {
    const { idPartida, nombreJugador } = req.body;
    const resultado = gestorPartida.SalirPartida(idPartida, nombreJugador);
    res.json({ resultado });
});

// Ruta para que un jugador se una a una partida existente
app.post('/partida/unirse', (req, res) => {
    const { idPartida, nombreJugador } = req.body;
    const resultado = gestorPartida.UnirsePartida(idPartida, nombreJugador);
    res.json({ resultado });
});

// Ruta para obtener el ranking de los jugadores
app.get('/ranking', async (req, res) => {
    try {
      const resultados = await gestorPartida.MostrarRanking();
      res.json(resultados);
    } catch (err) {
      console.log('Error al mostrar el ranking:', err);
      res.status(500).send('Error al mostrar el ranking');
    }
  });

// Ruta para obtener las estadísticas de una partida
app.post('/partida/estadistica', (req, res) => {
    const { idPartida } = req.body;
    const resultado = gestorPartida.MostrarEstadisticas(idPartida);
    res.json({ resultado });
});

// Iniciar el servidor en el puerto especificado
server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
