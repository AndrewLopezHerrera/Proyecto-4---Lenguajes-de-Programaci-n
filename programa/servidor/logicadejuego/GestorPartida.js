const Partida = require("./Partida");
const PartidaCuatroJugadores = require("./PartidaCuatroJugadores");
const PartidaDosJugadores = require("./PartidaDosJugadores");
const PartidaTresJugadores = require("./PartidaTresJugadores");
const Ranking = require("./Ranking");
const Jugador = require("./Jugador");

/**
 * Esta clase administra todas las partidas del juego.
 * @author Mynell Myers y Andrew López
 */
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

    /**
     * Envia las partidas creadas que no han sido iniciadas.
     * @returns La lista de partidas que existen.
     */
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

    /**
     * Crea una partida nueva.
     * @param {string} nombreJugador El nombre del jugador de la partida.
     * @param {string} cantidadPersonas La cantidad de jugadores de la partida.
     * @returns {Object[]} La lista de las partidas disponibles.
     */
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
     * Crea la información de la partida.
     * @param {Partida} partida La partida a la que se le desea extraer la infomación.
     * @returns {Object<string, string}
     */
    CrearInformacion(partida) {
        const informacionPartida = {};
        informacionPartida['id'] = partida.ID;
        informacionPartida['creador'] = partida.Creador.Nombre;
        informacionPartida['tamanoJugadores'] = partida.CantidadPersonas;
        informacionPartida['jugadoresUnidos'] = partida.PersonasUnidas;
        return informacionPartida;
    }

    /**
     * Saca de la partida a un jugador de una partida en particular.
     * @param {string} idPartida El id de la partida de la que se desea sacar la persona.
     * @param {string} nombreJugador El nombre del jugador que se desea salir.
     * @returns {null} Devuelve null si la partida no existe.
     */
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

    /**
     * Une a un jugador a una partida con el identificador indicado.
     * @param {string} idPartida El id de la partida.
     * @param {*} nombreJugador El nombre del jugador que desea unirse.
     * @returns {Object} La información de la partida a la que se unió.
     */
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

    /**
     * Este método envía a tirar el dado en la partida indicada.
     * @param {string} idPartida El identificador de la partida.
     * @param {string} nombreJugador El nombre del jugador que tira la partida.
     * @returns {undefined} Nada.
     */
    TirarDado(idPartida, nombreJugador) {
        const partida = this.Partidas[idPartida];
        if (partida == undefined)
            return;
        partida.TirarDado(nombreJugador, this.io);
    }

    /**
     * Mueve la ficha que ha indicado el jugador.
     * @param {string} idPartida El id de la partida
     * @param {string} nombreJugador El nombre del jugador que mueve la ficha.
     * @param {string} color El color de la ficha a mover.
     * @param {number} numero El número de la ficha a mover.
     * @param {string} casillaActual La casilla actual en la que se encuentra la ficha.
     * @returns {undefined} Nada.
     */
    MoverFicha(idPartida, nombreJugador, color, numero, casillaActual) {
        const partida = this.Partidas[idPartida];
        if (partida == undefined)
            return;
        partida.MoverFicha(nombreJugador, color, numero, casillaActual, this.io);
    }

    /**
     * Este método envía al ganador de la partida.
     * @param {string} idPartida El id de la partida.
     * @returns El ganador de la partida.
     */
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

    /**
     * Envia las estadísticas del juego.
     * @param {string} idPartida El id de la partida.
     * @returns {Object} Información de la estadística.
     */
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
     * Guarda la partida que ha sido finalizada.
     * @param {Partida} partida El id de la partida.
     * @param {string} ganador El ganador de la partida.
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

    /**
     * Muestra los datos del ranking.
     * @returns Los datos del ranking
     */
    MostrarRanking() {
        return this.RankingPartidas.MostrarRanking();
    }
}

module.exports = GestorPartida;
