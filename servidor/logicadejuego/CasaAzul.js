const Casa = require('./Casa');
const Ficha = require('./Ficha');

/**
 * @class CasaAzul
 * @brief Clase que representa la casa de un jugador con fichas azules.
 * @extends Casa
 * @author Mynell Myers y Andrew López
 */
class CasaAzul extends Casa {
    /**
     * @brief Constructor de la clase CasaAzul.
     */
    constructor() {
        super();
        /**
         * @brief Ficha uno en la casa, de color azul.
         * @type {Ficha}
         */
        this.FichaUno = new Ficha('azul', 1, 106);

        /**
         * @brief Ficha dos en la casa, de color azul.
         * @type {Ficha}
         */
        this.FichaDos = new Ficha('azul', 2, 107);

        /**
         * @brief Ficha tres en la casa, de color azul.
         * @type {Ficha}
         */
        this.FichaTres = new Ficha('azul', 3, 108);

        /**
         * @brief Número de casilla de salida para las fichas de la casa azul.
         * @type {number}
         */
        this.CasillaSalida = 22;
    }

    /**
     * @brief Ingresa una ficha a la casa azul.
     * @param {Ficha} ficha - La ficha a ingresar.
     */
    IngresarFicha(ficha) {
        super.IngresarFicha(ficha);
        if (ficha.Numero == 1) {
            ficha.PosicionActual = 106;
        }
        if (ficha.Numero == 2) {
            ficha.PosicionActual = 107;
        }
        if (ficha.Numero == 3) {
            ficha.PosicionActual = 108;
        }
    }
}

module.exports = CasaAzul;
