/**
 * @class Jugador
 * @brief Clase que representa a un jugador en el juego.
 * @author Mynell Myers y Andrew López
 */
class Jugador {
    /**
     * @brief Constructor de la clase Jugador.
     * @param {string} nombre - Nombre del jugador.
     * @param {string} color - Color asignado al jugador.
     */
    constructor(nombre, color) {
        /**
         * @brief Nombre del jugador.
         * @type {string}
         */
        this.Nombre = nombre;

        /**
         * @brief Color asignado al jugador.
         * @type {string}
         */
        this.Color = color;

        /**
         * @brief Número inicial del jugador para determinar el orden de juego.
         * @type {number|null}
         */
        this.NumeroInicio = null;
    }
}

module.exports = Jugador;
