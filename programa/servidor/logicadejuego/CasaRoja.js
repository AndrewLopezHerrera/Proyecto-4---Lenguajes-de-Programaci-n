const Casa = require('./Casa');
const Ficha = require('./Ficha');

/**
 * @class CasaRoja
 * @brief Clase que representa la casa de un jugador con fichas rojas.
 * @extends Casa
 * @author Mynell Myers y Andrew López
 */
class CasaRoja extends Casa {
    /**
     * @brief Constructor de la clase CasaRoja.
     */
    constructor() {
        super();
        /**
         * @brief Ficha uno en la casa, de color rojo.
         * @type {Ficha}
         */
        this.FichaUno = new Ficha('rojo', 1, 103);

        /**
         * @brief Ficha dos en la casa, de color rojo.
         * @type {Ficha}
         */
        this.FichaDos = new Ficha('rojo', 2, 104);

        /**
         * @brief Ficha tres en la casa, de color rojo.
         * @type {Ficha}
         */
        this.FichaTres = new Ficha('rojo', 3, 105);

        /**
         * @brief Número de casilla de salida para las fichas de la casa roja.
         * @type {number}
         */
        this.CasillaSalida = 39;
    }

    /**
     * @brief Ingresa una ficha a la casa roja.
     * @param {Ficha} ficha - La ficha a ingresar.
     */
    IngresarFicha(ficha) {
        super.IngresarFicha(ficha);
        if (ficha.Numero == 1) {
            ficha.PosicionActual = 103;
        }
        if (ficha.Numero == 2) {
            ficha.PosicionActual = 104;
        }
        if (ficha.Numero == 3) {
            ficha.PosicionActual = 105;
        }
    }
}

module.exports = CasaRoja;
