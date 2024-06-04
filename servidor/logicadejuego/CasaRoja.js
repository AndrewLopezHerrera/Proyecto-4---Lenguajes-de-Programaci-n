const Casa = require('./Casa');

class CasaRoja extends Casa{
    constructor(){
        super();
        /**@type {Ficha}*/
        this.FichaUno = new Ficha('rojo', 1, 103);
        /**@type {Ficha}*/
        this.FichaDos = new Ficha('rojo', 2, 104);
        /**@type {Ficha}*/
        this.FichaTres = new Ficha('rojo', 3, 105);
        /**@type {number} */
        this.CasillaSalida = 39;
    }
}

module.exports = CasaRoja;