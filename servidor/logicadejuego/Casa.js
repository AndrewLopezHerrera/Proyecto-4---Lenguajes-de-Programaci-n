const Ficha = require("./Ficha");

/**
 * @class Casa
 * @brief Clase que representa la casa de un jugador.
 * @author Mynell Myers y Andrew López
 */
class Casa {
    /**
     * @brief Constructor de la clase Casa.
     */
    constructor() {
        /**
         * @brief Ficha uno en la casa.
         * @type {Ficha}
         */
        this.FichaUno;

        /**
         * @brief Ficha dos en la casa.
         * @type {Ficha}
         */
        this.FichaDos;

        /**
         * @brief Ficha tres en la casa.
         * @type {Ficha}
         */
        this.FichaTres;

        /**
         * @brief Número de casilla de salida para las fichas de la casa.
         * @type {number}
         */
        this.CasillaSalida;
    }

    /**
     * @brief Saca una ficha de la casa.
     * @param {number} numero - Número de la ficha a sacar.
     * @returns {Ficha} La ficha que se sacó.
     */
    SacarFicha(numero) {
        if (numero == 1) {
            const fichaUno = this.FichaUno;
            this.FichaUno = null;
            fichaUno.PosicionActual = this.CasillaSalida;
            return fichaUno;
        }
        if (numero == 2) {
            const fichaDos = this.FichaDos;
            fichaDos.PosicionActual = this.CasillaSalida;
            this.FichaDos = null;
            return fichaDos;
        }
        if (numero == 3) {
            const fichaTres = this.FichaTres;
            fichaTres.PosicionActual = this.CasillaSalida;
            this.FichaTres = null;
            return fichaTres;
        }
    }

    /**
     * @brief Ingresa una ficha a la casa.
     * @param {Ficha} ficha - La ficha a ingresar.
     */
    IngresarFicha(ficha) {
        if (ficha.Numero == 1) {
            this.FichaUno = ficha;
        }
        if (ficha.Numero == 2) {
            this.FichaDos = ficha;
        }
        if (ficha.Numero == 3) {
            this.FichaTres = ficha;
        }
    }

    /**
     * @brief Obtiene la ubicación inicial de una ficha.
     * @param {Ficha} ficha - La ficha de la que se quiere obtener la ubicación inicial.
     * @returns {number} La ubicación inicial de la ficha.
     */
    static DarUbicacionInicial(ficha) {
        if (ficha.Color == 'amarillo')
            return 99 + ficha.Numero;
        if (ficha.Color == 'rojo')
            return 102 + ficha.Numero;
        if (ficha.Color == 'azul')
            return 105 + ficha.Numero;
        return 108 + ficha.Numero;
    }
}

module.exports = Casa;
