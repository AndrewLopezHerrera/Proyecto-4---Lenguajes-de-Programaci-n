/**
 * @class Ficha
 * @brief Clase que representa una ficha de un jugador en el juego.
 * @author Mynell Myers y Andrew López
 */
class Ficha {
    /**
     * @brief Constructor de la clase Ficha.
     * @param {string} color - Color de la ficha.
     * @param {number} numero - Número de la ficha.
     * @param {number} posicionActual - Posición actual de la ficha en el tablero.
     */
    constructor(color, numero, posicionActual) {
        /**
         * @brief Color de la ficha.
         * @type {string}
         */
        this.Color = color;

        /**
         * @brief Número de la ficha.
         * @type {number}
         */
        this.Numero = numero;

        /**
         * @brief Posición actual de la ficha en el tablero.
         * @type {number}
         */
        this.PosicionActual = posicionActual;
    }
}

module.exports = Ficha;
