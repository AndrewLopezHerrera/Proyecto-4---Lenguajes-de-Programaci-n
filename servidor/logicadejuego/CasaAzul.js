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

    /**
     * 
     * @param {Ficha} ficha 
     */
    IngresarFicha(ficha){
        super.IngresarFicha(ficha);
        if(ficha.Numero == 1){
            ficha.PosicionActual(106);
        }
        if(ficha.Numero == 2){
            ficha.PosicionActual(107);
        }
        if(ficha.Numero == 3){
            ficha.PosicionActual(108);
        }
    }
}

module.exports = CasaAzul;