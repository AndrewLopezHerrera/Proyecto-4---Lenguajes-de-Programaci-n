const Ficha = require('./Ficha');

/**
 * @class Casilla
 * @brief Clase que representa una casilla del tablero de juego.
 * @author Mynell Myers y Andrew López
 */
class Casilla {
    /**
     * @brief Constructor de la clase Casilla.
     * @param {number} numeroCasilla - Número de la casilla en el tablero.
     * @param {boolean} esSeguro - Indica si la casilla es un espacio seguro.
     */
    constructor(numeroCasilla, esSeguro) {
        /**
         * @brief Número de la casilla en el tablero.
         * @type {number}
         */
        this.NumeroCasilla = numeroCasilla;

        /**
         * @brief Indica si la casilla es un espacio seguro.
         * @type {boolean}
         */
        this.EsSeguro = esSeguro;

        /**
         * @brief Espacios de la casilla para contener fichas.
         * @type {Ficha[]}
         */
        this.Espacios = Array(2);
    }

    /**
     * @brief Inserta una ficha en la casilla.
     * @param {Ficha} ficha - Ficha a insertar.
     * @returns {Ficha|null} La ficha insertada o null si no se pudo insertar.
     */
    InsertarFicha(ficha) {
        if (this.Espacios.length == 4)
            return this.InsertarCasillaMeta(ficha);
        else
            return this.InsertarCasillaNormal(ficha);
    }

    /**
     * @brief Inserta una ficha en una casilla normal.
     * @param {Ficha} ficha - Ficha a insertar.
     * @returns {Ficha|null} La ficha insertada o la ficha que fue reemplazada.
     */
    InsertarCasillaNormal(ficha) {
        if (this.Espacios[0] != null && this.Espacios[1] != null)
            return null;
        if (this.Espacios[0] == null && this.Espacios[1] == null) {
            this.Espacios[0] = ficha;
            return ficha;
        }
        const fichaEnCasilla = this.Espacios[0];
        if ((fichaEnCasilla.Color == 'rojo' && ficha.Color == 'rojo')
            || (fichaEnCasilla.Color == 'azul' && ficha.Color == 'azul')
            || (fichaEnCasilla.Color == 'verde' && ficha.Color == 'verde')
            || (fichaEnCasilla.Color == 'amarillo' && ficha.Color == 'amarillo')) {
            this.Espacios[1] = ficha;
            return ficha;
        }
        this.Espacios[0] = ficha;
        return fichaEnCasilla;
    }

    /**
     * @brief Inserta una ficha en una casilla de meta.
     * @param {Ficha} ficha - Ficha a insertar.
     * @returns {Ficha} La ficha insertada.
     */
    InsertarCasillaMeta(ficha) {
        for (let i = 0; i < 4; i++) {
            if (this.Espacios[i] != null) {
                this.Espacios[i] = ficha;
                break;
            }
        }
        return ficha;
    }

    /**
     * @brief Elimina una ficha de la casilla.
     * @param {Ficha} ficha - Ficha a eliminar.
     * @returns {boolean} true si se eliminó la ficha correctamente, false si no se encontró la ficha.
     */
    EliminarFicha(ficha) {
        if (this.Espacios[0] == ficha) {
            this.Espacios[0] = this.Espacios[1];
            this.Espacios[1] = null;
            return true;
        }
        if (this.Espacios[1] == ficha) {
            this.Espacios[1] = null;
            return true;
        }
        return false;
    }
}

module.exports = Casilla;
