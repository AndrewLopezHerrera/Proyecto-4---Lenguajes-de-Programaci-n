const Dado = require('./Dado');
const Jugador = require('./Jugador');
const Partida = require('./Partida');
const Turno = require('./Turno');

/**
 * @class PartidaCuatroJugadores
 * @extends Partida
 * @brief Clase para gestionar una partida de cuatro jugadores.
 * @author Mynell Myers y Andrew López
 */
class PartidaCuatroJugadores extends Partida {
    /**
     * @brief Constructor de la clase PartidaCuatroJugadores.
     * @param {number} cantidadPersonas - Cantidad de personas en la partida.
     * @param {string} personaCreadora - Nombre de la persona que crea la partida.
     */
    constructor(cantidadPersonas, personaCreadora) {
        super(cantidadPersonas, personaCreadora);
    }

    /**
     * @brief Método para agregar una nueva persona a la partida.
     * @param {string} nombrePersona - Nombre de la persona a agregar.
     * @return {Object} Estado actual de los jugadores y la cantidad de personas en la partida.
     */
    AgregarPersona(nombrePersona) {
        super.AgregarPersonas();
        if (this.PersonaDos == null)
            this.PersonaDos = new Jugador(nombrePersona, 'amarillo');
        else if (this.PersonaTres == null)
            this.PersonaTres = new Jugador(nombrePersona, 'azul');
        else if (this.PersonaCuatro == null)
            this.PersonaCuatro = new Jugador(nombrePersona, 'verde');
        else
            return 'La sala está llena';

        if (this.PersonaDos != null && this.PersonaTres != null && this.PersonaCuatro != null) {
            this.Iniciado = true;
            this.EtapaSeleccion = true;
            return this.DevolverPersonas('OK');
        } else {
            return this.DevolverPersonas('NO');
        }
    }

    /**
     * @brief Método para devolver la información de los jugadores.
     * @param {string} estado - Estado actual de la partida.
     * @return {Object} Información de los jugadores y la cantidad de personas en la partida.
     */
    DevolverPersonas(estado) {
        const jugadores = {};
        jugadores['estado'] = estado;
        jugadores['jugadorUno'] = this.Creador.Nombre;
        if (this.PersonaDos != null)
            jugadores['jugadorDos'] = this.PersonaDos.Nombre;
        if (this.PersonaTres != null)
            jugadores['jugadorTres'] = this.PersonaTres.Nombre;
        if (this.PersonaCuatro != null)
            jugadores['jugadorCuatro'] = this.PersonaCuatro.Nombre;
        jugadores['cantidad'] = this.CantidadPersonas.toString();
        return jugadores;
    }

    /**
     * @brief Método para elegir el primer jugador en la partida.
     * @param {string} nombrePersona - Nombre de la persona que elige el primer turno.
     * @return {Object} Información del primer jugador y el número obtenido en el dado.
     */
    ElegirPrimero(nombrePersona) {
        const numero = Dado.TirarDado();
        if (this.Creador.Nombre == nombrePersona)
            this.Creador.NumeroInicio = numero;
        else if (this.PersonaDos.Nombre == nombrePersona)
            this.PersonaDos.NumeroInicio = numero;
        else if (this.PersonaTres.Nombre == nombrePersona)
            this.PersonaTres.NumeroInicio = numero;
        else if (this.PersonaCuatro.Nombre == nombrePersona)
            this.PersonaCuatro.NumeroInicio = numero;

        if (this.Creador.NumeroInicio != null && this.PersonaDos.NumeroInicio != null
            && this.PersonaTres.NumeroInicio != null && this.PersonaCuatro.NumeroInicio != null) {
            this.EtapaSeleccion = false;
            this.EtapaJuego = true;
            this.CrearTurnos();
            return { 'primero': this.Turnos.ObtenerActual().Nombre, numero };
        } else {
            return { numero };
        }
    }

    /**
     * @brief Método para crear los turnos de la partida.
     */
    CrearTurnos() {
        if (this.Creador.NumeroInicio > this.PersonaDos.NumeroInicio
            && this.Creador.NumeroInicio > this.PersonaTres.NumeroInicio
            && this.Creador.NumeroInicio > this.PersonaCuatro.NumeroInicio)
            this.Turnos = new Turno(this.Creador, this.PersonaDos, this.PersonaTres, this.PersonaCuatro, 1, 4);
        else if (this.PersonaDos.NumeroInicio > this.Creador.NumeroInicio
            && this.PersonaDos.NumeroInicio > this.PersonaTres.NumeroInicio
            && this.PersonaDos.NumeroInicio > this.PersonaCuatro.NumeroInicio)
            this.Turnos = new Turno(this.Creador, this.PersonaDos, this.PersonaTres, this.PersonaCuatro, 2, 4);
        else if (this.PersonaTres.NumeroInicio > this.Creador.NumeroInicio
            && this.PersonaTres.NumeroInicio > this.PersonaDos.NumeroInicio
            && this.PersonaTres.NumeroInicio > this.PersonaCuatro.NumeroInicio)
            this.Turnos = new Turno(this.Creador, this.PersonaDos, this.PersonaTres, this.PersonaCuatro, 3, 4);
        else
            this.Turnos = new Turno(this.Creador, this.PersonaDos, this.PersonaTres, this.PersonaCuatro, 4, 4);

        this.Gestor.ReiniciarUltimoNumero(this.Turnos.ObtenerActual().Nombre);
    }

    /**
     * @brief Método para mostrar el ganador de la partida.
     * @return {string|null} Nombre del ganador o null si no hay ganador.
     */
    MostrarGanador() {
        if (this.TableroPartida.Casillas['Casilla42Rojo'].length == 4)
            return this.Creador.Nombre;
        if (this.TableroPartida.Casillas['Casilla76Amarillo'].length == 4)
            return this.PersonaDos.Nombre;
        if (this.TableroPartida.Casillas['Casilla25Azul'].length == 4)
            return this.PersonaTres.Nombre;
        if (this.TableroPartida.Casillas['Casilla60Verde'].length == 4)
            return this.PersonaCuatro.Nombre;
        return null;
    }
}

module.exports = PartidaCuatroJugadores;
