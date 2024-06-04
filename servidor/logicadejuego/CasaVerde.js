const Casa = require('./Casa');

class CasaVerde extends Casa{
    constructor(){
        super();
        /**@type {Ficha}*/
        this.FichaUno = new Ficha('verde', 1, 109);
        /**@type {Ficha}*/
        this.FichaDos = new Ficha('verde', 2, 110);
        /**@type {Ficha}*/
        this.FichaTres = new Ficha('verde', 3, 111);
        /**@type {number} */
        this.CasillaSalida = 56;
    }
}

module.exports = CasaVerde;