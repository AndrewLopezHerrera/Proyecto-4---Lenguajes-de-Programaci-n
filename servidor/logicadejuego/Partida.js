const Jugador = require('./Jugador')
const { nanoid } = require('nanoid')

class Partida{
    constructor(cantidadPersonas, personaCreadora){
        this.ID = nanoid(15);
        /**@type {Jugador} */
        this.Creador = new Jugador(personaCreadora, 'rojo')
        this.CantidadPersonas = cantidadPersonas;
        this.PersonasUnidas = 1;
        /**@type {Jugador} */
        this.PersonaDos = null;
        /**@type {Jugador} */
        this.PersonaTres = null;
        /**@type {Jugador} */
        this.PersonaCuatro = null;
        this.Iniciado = false;
        this.EtapaSeleccion = false;
        this.EtapaJuego = false;
    }

    /**
     * 
     * @param {string} persona 
     * @returns 
     */
    AgregarPersona(persona){
        if(this.CantidadPersonas == this.PersonasUnidas)
            return 'La sala está llena';
        if(this.PersonaDos != null)
            this.PersonaDos = new Jugador(persona, 'amarillo');
        else if(this.PersonaTres != null)
            this.PersonaTres = new Jugador(persona, 'verde');
        else
            this.PersonaCuatro = new Jugador(persona, 'azul');
        this.PersonasUnidas++;
        if(this.PersonasUnidas == this.CantidadPersonas){
            this.Iniciado = true;
            return 'OK';
        }
        else
            return 'NO';
    }

    /**
     * 
     * @param {string} nombrePersona 
     */
    EliminarPersona(nombrePersona){
        if(this.PersonaDos.Nombre == nombrePersona){
            this.PersonaDos = null;
            this.PersonasUnidas--;
        }
        else if(this.PersonaTres.Nombre == nombrePersona){
            this.PersonaCuatro = null;
            this.PersonasUnidas--;
        }
        else if(this.PersonaCuatro.Nombre == nombrePersona){
            this.PersonaCuatro = null;
            this.PersonasUnidas--;
        }
    }

    TirarDado()
}

module.exports = Partida;