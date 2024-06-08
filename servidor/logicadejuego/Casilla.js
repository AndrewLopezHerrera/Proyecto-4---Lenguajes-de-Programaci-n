const Ficha = require('./Ficha');

class Casilla{
    constructor(numeroCasilla, esSeguro){
        /**@type {number} */
        this.NumeroCasilla = numeroCasilla;
        /**@type {boolean} */
        this.EsSeguro = esSeguro;
        /**@type {Ficha[]} */
        this.Espacios = Array(2);
    }

    InsertarFicha(ficha){
        if(this.Espacios.length == 4)
            return this.InsertarCasillaMeta(ficha);
        else
            return this.InsertarCasillaNormal(ficha);
    }

    /**
     * 
     * @param {Ficha} ficha 
     * @returns 
     */
    InsertarCasillaNormal(ficha){
        if(this.Espacios[0] != null && this.Espacios[1] != null)
            return null;
        if(this.Espacios[0] == null && this.Espacios[1] == null){
            this.Espacios[0] = ficha;
            return ficha;
        }
        const fichaEnCasilla = this.Espacios[0];
        if((fichaEnCasilla.Color == 'rojo' && ficha.Color == 'rojo')
            || (fichaEnCasilla.Color == 'azul' && ficha.Color == 'azul')
            || (fichaEnCasilla.Color == 'verde' && ficha.Color == 'verde')
            || (fichaEnCasilla.Color == 'amarillo' && ficha.Color == 'amarillo')){
            this.Espacios[1] = ficha;
            return ficha;
        }
        this.Espacios[0] = ficha;
        return fichaEnCasilla;
    }

    /**
     * 
     * @param {Ficha} ficha 
     */
    InsertarCasillaMeta(ficha){
        for(var indado = 0; indado < 4; indado++){
            if(this.Espacios[indado] != null){
                this.Espacios[indado] = ficha;
            }
        }
        return ficha;
    }

    EliminarFicha(ficha){
        if(this.Espacios[0] == ficha){
            this.Espacios[0] = this.Espacios[1];
            this.Espacios[1] = null;
            return true;
        }
        if(this.Espacios[1] == ficha){
            this.Espacios[1] = null;
            return true;
        }
        return false;
    }
};

module.exports = Casilla;