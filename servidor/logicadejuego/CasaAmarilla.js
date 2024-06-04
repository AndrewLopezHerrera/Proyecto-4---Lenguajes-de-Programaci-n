const Casa = require('./Casa');
const Ficha = require('./Ficha')

class CasaAmarilla extends Casa{
    constructor(){
        super();
        /**@type {Ficha}*/
        this.FichaUno = new Ficha('amarillo', 1, 100);
        /**@type {Ficha}*/
        this.FichaDos = new Ficha('amarillo', 2, 101);
        /**@type {Ficha}*/
        this.FichaTres = new Ficha('amarillo', 3, 102);
        /**@type {number} */
        this.CasillaSalida = 5;
    }
}

module.exports = CasaAmarilla;