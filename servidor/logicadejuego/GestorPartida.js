const Partida = require("./Partida");
const PartidaCuatroJugadores = require("./PartidaCuatroJugadores");
const PartidaDosJugadores = require("./PartidaDosJugadores");
const PartidaTresJugadores = require("./PartidaTresJugadores");
const Ranking = require("./Ranking");
const Jugador = require("./Jugador");

class GestorPartida {
    /**
     * Constructor de la clase GestorPartida
     * @param {Object} io - Instancia de Socket.IO para emitir eventos en tiempo real
     */
    constructor(io) {
        /** @type {Object.<string, Partida>} */
        this.Partidas = {};
        this.RankingPartidas = new Ranking();
        this.io = io;
    }

    MostrarPartidas() {
        const partidasEncontradas = [];
        const partidas = Object.values(this.Partidas);
        partidas.forEach(partida => {
            if (!partida.Iniciado) {
                const informacionPartida = {};
                informacionPartida['id'] = partida.ID;
                informacionPartida['creador'] = partida.Creador.Nombre;
                if (partida.PersonaDos != null)
                    informacionPartida['jugadorDos'] = partida.PersonaDos.Nombre;
                if (partida.CantidadPersonas >= 3 && partida.PersonaTres != null)
                    informacionPartida['jugadorTres'] = partida.PersonaTres.Nombre;
                if (partida.CantidadPersonas == 4 && partida.PersonaCuatro != null)
                    informacionPartida['jugadorCuatro'] = partida.PersonaCuatro.Nombre;
                informacionPartida['tamanoJugadores'] = partida.CantidadPersonas;
                informacionPartida['jugadoresUnidos'] = partida.PersonasUnidas;
                partidasEncontradas.push(informacionPartida);
            }
        });
        return partidasEncontradas;
    }

    CrearPartida(nombreJugador, cantidadPersonas) {
        let partida = null;
        if (cantidadPersonas == 2)
            partida = new PartidaDosJugadores(cantidadPersonas, nombreJugador);
        else if (cantidadPersonas == 3)
            partida = new PartidaTresJugadores(cantidadPersonas, nombreJugador);
        else
            partida = new PartidaCuatroJugadores(cantidadPersonas, nombreJugador);
        
        const informacionPartida = this.CrearInformacion(partida);
        this.Partidas[partida.ID] = partida;
        return informacionPartida;
    }

    /**
     * 
     * @param {Partida} partida 
     * @returns 
     */
    CrearInformacion(partida) {
        const informacionPartida = {};
        informacionPartida['id'] = partida.ID;
        informacionPartida['creador'] = partida.Creador.Nombre;
        informacionPartida['tamanoJugadores'] = partida.CantidadPersonas;
        informacionPartida['jugadoresUnidos'] = partida.PersonasUnidas;
        return informacionPartida;
    }

    SalirPartida(idPartida, nombreJugador) {
        const partida = this.Partidas[idPartida];
        if (partida == undefined)
            return null;
        if (partida.Creador.Nombre == nombreJugador) {
            delete this.Partidas[idPartida];
            this.io.to(idPartida).emit('partidaEliminada', idPartida);
        } else {
            partida.EliminarPersona(nombreJugador);
            this.io.to(idPartida).emit('jugadorEliminado', nombreJugador);
        }
    }

    UnirsePartida(idPartida, nombreJugador) {
        const partida = this.Partidas[idPartida];
        if (partida == undefined)
            return null;
        
        const resultado = partida.AgregarPersona(nombreJugador);
        if (resultado) {
            this.io.to(idPartida).emit('jugadorUnido', { resultado });
        }
        return resultado;
    }

    TirarDado(idPartida, nombreJugador) {
        const partida = this.Partidas[idPartida];
        if (partida == undefined)
            return;
        partida.TirarDado(nombreJugador, this.io);
    }

    MoverFicha(idPartida, nombreJugador, color, numero, casillaActual) {
        const partida = this.Partidas[idPartida];
        if (partida == undefined)
            return;
        partida.MoverFicha(nombreJugador, color, numero, casillaActual, this.io);
    }

    MostrarGane(idPartida) {
        const partida = this.Partidas[idPartida];
        if (partida == undefined)
            return null;
        
        const ganador = partida.MostrarGanador();
        if (ganador != null) {
            this.GuardarPartida(partida, ganador);
            this.io.to(idPartida).emit('partidaGanada', ganador);
        }
        return ganador;
    }

    MostrarEstadisticas(idPartida) {
        const partida = this.Partidas[idPartida];
        if (partida == undefined)
            return null;
        
        const ganador = partida.MostrarGanador();
        const estadistica = {
            id: idPartida,
            jugadorUno: partida.Creador.Nombre,
            jugadorDos: partida.PersonaDos.Nombre,
            ganadorJuego: ganador
        };
        if (partida.PersonaTres != null)
            estadistica['jugadorTres'] = partida.PersonaTres.Nombre;
        if (partida.PersonaCuatro != null)
            estadistica['jugadorCuatro'] = partida.PersonaCuatro.Nombre;
        
        this.io.to(idPartida).emit('estadisticas', estadistica);
        return estadistica;
    }

    /**
     * 
     * @param {Partida} partida 
     * @param {string} ganador
     */
    GuardarPartida(partida, ganador) {
        partida.EtapaJuego = false;
        partida.Finalizado = true;
        try {
            this.RankingPartidas.AgregarPartida(partida.ID, partida.Creador, ganador);
        } catch (err) {
            console.error('Error al agregar partida:', err);
        }
    }

    MostrarRanking() {
        return this.RankingPartidas.MostrarRanking();
    }
}

module.exports = GestorPartida;
