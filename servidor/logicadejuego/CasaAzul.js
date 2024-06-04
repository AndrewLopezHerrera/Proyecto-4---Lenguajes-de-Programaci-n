const Casa = require('./Casa');

class CasaAzul extends Casa{
    constructor(){
        super();
        /**@type {Ficha}*/
        this.FichaUno = new Ficha('azul', 1, 106);
        /**@type {Ficha}*/
        this.FichaDos = new Ficha('azul', 2, 107);
        /**@type {Ficha}*/
        this.FichaTres = new Ficha('azul', 3, 108);
        /**@type {number} */
        this.CasillaSalida = 22;
    }
}

module.exports = CasaAzul;