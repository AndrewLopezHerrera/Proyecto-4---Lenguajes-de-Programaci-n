const Jugador = require("./Jugador");

/**
 * @class Turno
 * @brief Clase para gestionar los turnos de los jugadores en una partida.
 * @author Mynell Myers y Andrew López
 */
class Turno {
    /**
     * @brief Constructor de la clase Turno.
     * @param {Jugador} personaUno - Primer jugador.
     * @param {Jugador} personaDos - Segundo jugador.
     * @param {Jugador} personaTres - Tercer jugador.
     * @param {Jugador} personaCuatro - Cuarto jugador.
     * @param {number} inicio - Posición inicial del turno.
     * @param {number} cantidadPersonas - Cantidad de personas en la partida.
     */
    constructor(personaUno, personaDos, personaTres, personaCuatro, inicio, cantidadPersonas) {
        this.CantidadPersonas = cantidadPersonas;
        this.PosicionActual = inicio;
        this.PersonaUno = personaUno;
        this.PersonaDos = personaDos;
        this.PersonaTres = personaTres;
        this.PersonaCuatro = personaCuatro;
    }

    /**
     * @brief Obtiene el jugador actual.
     * @returns {Jugador} El jugador que tiene el turno actual.
     */
    ObtenerActual() {
        if (this.PosicionActual == 1)
            return this.PersonaUno;
        if (this.PosicionActual == 2)
            return this.PersonaDos;
        if (this.PosicionActual == 3)
            return this.PersonaTres;
        return this.PersonaCuatro;
    }

    /**
     * @brief Asigna el turno al siguiente jugador.
     * @returns {Jugador} El jugador que tiene el siguiente turno.
     */
    DarSiguiente() {
        if (this.CantidadPersonas == 2)
            return this.DarSiguienteDos();
        if (this.CantidadPersonas == 3)
            return this.DarSiguienteTres();
        return this.DarSiguienteCuatro();
    }

    /**
     * @brief Asigna el turno al siguiente jugador en una partida de dos jugadores.
     * @returns {Jugador} El siguiente jugador en una partida de dos jugadores.
     */
    DarSiguienteDos() {
        if (this.PosicionActual == 1) {
            this.PosicionActual++;
            return this.PersonaDos;
        }
        this.PosicionActual = 1;
        return this.PersonaUno;
    }

    /**
     * @brief Asigna el turno al siguiente jugador en una partida de tres jugadores.
     * @returns {Jugador} El siguiente jugador en una partida de tres jugadores.
     */
    DarSiguienteTres() {
        if (this.PosicionActual == 1) {
            this.PosicionActual++;
            return this.PersonaDos;
        }
        if (this.PosicionActual == 2) {
            this.PosicionActual++;
            return this.PersonaTres;
        }
        this.PosicionActual = 1;
        return this.PersonaUno;
    }

    /**
     * @brief Asigna el turno al siguiente jugador en una partida de cuatro jugadores.
     * @returns {Jugador} El siguiente jugador en una partida de cuatro jugadores.
     */
    DarSiguienteCuatro() {
        if (this.PosicionActual == 1) {
            this.PosicionActual++;
            return this.PersonaDos;
        }
        if (this.PosicionActual == 2) {
            this.PosicionActual++;
            return this.PersonaTres;
        }
        if (this.PosicionActual == 3) {
            this.PosicionActual++;
            return this.PersonaCuatro;
        }
        this.PosicionActual = 1;
        return this.PersonaUno;
    }
}

module.exports = Turno;
