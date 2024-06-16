const Casa = require('./Casa');
const Ficha = require('./Ficha');

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

    /**
     * 
     * @param {Ficha} ficha 
     */
    IngresarFicha(ficha){
        super.IngresarFicha(ficha);
        if(ficha.Numero == 1){
            ficha.PosicionActual = 103;
        }
        if(ficha.Numero == 2){
            ficha.PosicionActual = 104;
        }
        if(ficha.Numero == 3){
            ficha.PosicionActual = 105;
        }
    }
}

module.exports = CasaRoja;