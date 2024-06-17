const Casa = require('./Casa');
const Ficha = require('./Ficha');

/**
 * @class CasaAmarilla
 * @brief Clase que representa la casa de un jugador con fichas amarillas.
 * @extends Casa
 * @author Mynell Myers y Andrew López
 */
class CasaAmarilla extends Casa {
    /**
     * @brief Constructor de la clase CasaAmarilla.
     */
    constructor() {
        super();
        /**
         * @brief Ficha uno en la casa, de color amarillo.
         * @type {Ficha}
         */
        this.FichaUno = new Ficha('amarillo', 1, 100);

        /**
         * @brief Ficha dos en la casa, de color amarillo.
         * @type {Ficha}
         */
        this.FichaDos = new Ficha('amarillo', 2, 101);

        /**
         * @brief Ficha tres en la casa, de color amarillo.
         * @type {Ficha}
         */
        this.FichaTres = new Ficha('amarillo', 3, 102);

        /**
         * @brief Número de casilla de salida para las fichas de la casa amarilla.
         * @type {number}
         */
        this.CasillaSalida = 5;
    }

    /**
     * @brief Ingresa una ficha a la casa amarilla.
     * @param {Ficha} ficha - La ficha a ingresar.
     */
    IngresarFicha(ficha) {
        super.IngresarFicha(ficha);
        if (ficha.Numero == 1) {
            ficha.PosicionActual = 100;
        }
        if (ficha.Numero == 2) {
            ficha.PosicionActual = 101;
        }
        if (ficha.Numero == 3) {
            ficha.PosicionActual = 102;
        }
    }
}

module.exports = CasaAmarilla;
