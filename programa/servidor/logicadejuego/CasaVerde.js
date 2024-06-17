const Casa = require('./Casa');
const Ficha = require('./Ficha');

/**
 * @class CasaVerde
 * @brief Clase que representa la casa de un jugador con fichas verdes.
 * @extends Casa
 * @author Mynell Myers y Andrew López
 */
class CasaVerde extends Casa {
    /**
     * @brief Constructor de la clase CasaVerde.
     */
    constructor() {
        super();
        /**
         * @brief Ficha uno en la casa, de color verde.
         * @type {Ficha}
         */
        this.FichaUno = new Ficha('verde', 1, 109);

        /**
         * @brief Ficha dos en la casa, de color verde.
         * @type {Ficha}
         */
        this.FichaDos = new Ficha('verde', 2, 110);

        /**
         * @brief Ficha tres en la casa, de color verde.
         * @type {Ficha}
         */
        this.FichaTres = new Ficha('verde', 3, 111);

        /**
         * @brief Número de casilla de salida para las fichas de la casa verde.
         * @type {number}
         */
        this.CasillaSalida = 56;
    }

    /**
     * @brief Ingresa una ficha a la casa verde.
     * @param {Ficha} ficha - La ficha a ingresar.
     */
    IngresarFicha(ficha) {
        super.IngresarFicha(ficha);
        if (ficha.Numero == 1) {
            ficha.PosicionActual = 109;
        }
        if (ficha.Numero == 2) {
            ficha.PosicionActual = 110;
        }
        if (ficha.Numero == 3) {
            ficha.PosicionActual = 111;
        }
    }
}

module.exports = CasaVerde;
