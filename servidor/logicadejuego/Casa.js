const Ficha = require("./Ficha");

class Casa {
    constructor(){
        /**@type {Ficha}*/
        this.FichaUno;
        /**@type {Ficha}*/
        this.FichaDos;
        /**@type {Ficha}*/
        this.FichaTres;
        /**@type {number} */
        this.CasillaSalida;
    }

    SacarFicha(numero){
        if(numero == 1){
            const fichaUno = this.FichaUno;
            this.FichaUno = null;
            fichaUno.PosicionActual = this.CasillaSalida;
            return fichaUno;
        }
        if(numero == 2){
            const fichaDos = this.FichaDos;
            fichaDos.PosicionActual = this.CasillaSalida;
            this.FichaDos = null;
            return fichaDos;
        }
        if(numero == 3){
            const fichaTres = this.FichaUno;
            fichaTres.PosicionActual = this.CasillaSalida;
            this.FichaTres = null;
            return fichaTres;
        }
    }

    /**
     * 
     * @param {Ficha} ficha 
     */
    IngresarFicha(ficha){
        if(ficha.Numero == 1){
            this.FichaUno = ficha;
        }
        if(ficha.Numero == 2){
            this.FichaDos = ficha;
        }
        if(ficha.Numero == 3){
            this.FichaTres = ficha;
        }
    }
}

module.exports = Casa;