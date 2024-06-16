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

    /**
     * 
     * @param {Ficha} ficha 
     */
    IngresarFicha(ficha){
        super.IngresarFicha(ficha);
        if(ficha.Numero == 1){
            ficha.PosicionActual = 100;
        }
        if(ficha.Numero == 2){
            ficha.PosicionActual = 101;
        }
        if(ficha.Numero == 3){
            ficha.PosicionActual = 102;
        }
    }
}

module.exports = CasaAmarilla;