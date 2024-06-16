const Jugador = require("./Jugador");

class Turno{
    constructor(personaUno, personaDos, personaTres, personaCuatro, inicio, cantidadPersonas){
        this.CantidadPersonas = cantidadPersonas;
        this.PosicionActual = inicio;
        this.PersonaUno = personaUno;
        this.PersonaDos = personaDos;
        this.PersonaTres = personaTres;
        this.PersonaCuatro = personaCuatro;
    }

    /**
     * 
     * @returns {Jugador}
     */
    ObtenerActual(){
        if(this.PosicionActual == 1)
            return this.PersonaUno
        if(this.PosicionActual == 2)
            return this.PersonaDos
        if(this.PosicionActual == 3)
            return this.PersonaTres
        return this.PersonaCuatro
    }

    /**
     * 
     * @returns {Jugador}
     */
    DarSiguiente(){
        if(this.CantidadPersonas == 2)
            return this.DarSiguienteDos();
        if(this.CantidadPersonas == 3)
            return this.DarSiguienteTres();
        return this.DarSiguienteCuatro();
    }

    DarSiguienteDos(){
        if(this.PosicionActual == 1){
            this.PosicionActual++;
            return this.PersonaDos;
        }
        this.PosicionActual = 1;
        return this.PersonaUno;
    }

    DarSiguienteTres(){
        if(this.PosicionActual == 1){
            this.PosicionActual++;
            return this.PersonaDos;
        }
        if(this.PosicionActual == 2){
            this.PosicionActual++;
            return this.PersonaTres;
        }
        this.PosicionActual = 1;
        return this.PersonaUno;
    }

    DarSiguienteCuatro(){
        if(this.PosicionActual == 1){
            this.PosicionActual++;
            return this.PersonaDos;
        }
        if(this.PosicionActual == 2){
            this.PosicionActual++;
            return this.PersonaTres;
        }
        if(this.PosicionActual == 3){
            this.PosicionActual++;
            return this.PersonaCuatro;
        }
        this.PosicionActual = 1;
        return this.PersonaUno;
    }
}

module.exports = Turno;