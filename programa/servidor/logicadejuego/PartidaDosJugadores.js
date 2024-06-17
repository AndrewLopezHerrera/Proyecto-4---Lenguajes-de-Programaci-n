const Dado = require('./Dado');
const Jugador = require('./Jugador');
const Partida = require('./Partida');
const Turno = require('./Turno');

/**
 * Esta clase maneja partidas de dos jugadores.
 * @author Mynell Myers y Andrew López
 */
class PartidaDosJugadores extends Partida{

    /**
     * El método constructor.
     * @param {string} cantidadPersonas La cantidad de personas que deben jugar.
     * @param {number} personaCreadora La persona que creó la partida.
     */
    constructor(cantidadPersonas, personaCreadora){
        super(cantidadPersonas, personaCreadora);
    }

    /**
     * Agrega personas a la partida.
     * @param {string} nombrePersona El nombre de la persona que desea incluirse.
     * @returns {Object} La información de las personas unidas.
     */
    AgregarPersona(nombrePersona){
        super.AgregarPersonas();
        if(this.PersonaDos == null)
            this.PersonaDos = new Jugador(nombrePersona, 'amarillo');
        else
            return 'La sala está llena';
        if(this.PersonaDos != null){
            this.Iniciado = true;
            this.EtapaSeleccion = true;
            return this.DevolverPersonas('OK');
        }
        else
            return this.DevolverPersonas('NO');
    }

    /**
     * Indica la infomración de las persona que se han unido.
     * @param {string} estado Indica si el juego ya puede ser iniciado.
     * @returns {Object} La información de las personas unidas.
     */
    DevolverPersonas(estado){
        const jugadores = {};
        jugadores['estado'] = estado;
        jugadores['jugadorUno'] = this.Creador.Nombre;
        if (this.PersonaDos != null)
            jugadores['jugadorDos'] = this.PersonaDos.Nombre;
        jugadores['cantidad'] = this.CantidadPersonas.toString();
        return jugadores;
    }

    /**
     * Este método elige el jugador que debe iniciar según el número que haya sacado.
     * @param {string} nombrePersona El nombre de la persona que tira el dado.
     * @returns {Object} Devuelve el número que sacó la persona, además puede ir incluido la persona que inicia la partida.
     */
    ElegirPrimero(nombrePersona){
        const numero = Dado.TirarDado()
        if(this.Creador.Nombre == nombrePersona)
            this.Creador.NumeroInicio = numero;
        else if(this.PersonaDos.Nombre == nombrePersona)
            this.PersonaDos.NumeroInicio = numero;
        if(this.Creador.NumeroInicio != null && this.PersonaDos.NumeroInicio != null){
            this.EtapaSeleccion = false;
            this.EtapaJuego = true;
            this.CrearTurnos();
            return {'primero': this.Turnos.ObtenerActual().Nombre, numero};
        }
        else
            return {numero};
    }

    /**
     * Crea el turno de los jugadores según el número que haya sacado.
     */
    CrearTurnos(){
        if(this.Creador.NumeroInicio > this.PersonaDos.NumeroInicio)
            this.Turnos = new Turno(this.Creador, this.PersonaDos, null, null, 1, 2);
        else
            this.Turnos = new Turno(this.Creador, this.PersonaDos, null, null, 2, 2);
        this.Gestor.ReiniciarUltimoNumero(this.Turnos.ObtenerActual().Nombre)
    }

    /**
     * Muestra el ganador de la partida.
     * @returns {string} El ganador de la partida.
     */
    MostrarGanador(){
        if(this.TableroPartida.Casillas['Casilla42Rojo'].length == 4)
            return this.Creador.Nombre;
        if(this.TableroPartida.Casillas['Casilla76Amarillo'].length == 4)
            return this.PersonaDos.Nombre;
        return null;
    }
}

module.exports = PartidaDosJugadores;