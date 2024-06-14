const Dado = require('./Dado');
const Jugador = require('./Jugador');
const Partida = require('./Partida');
const Turno = require('./Turno');

class PartidaDosJugadores extends Partida{

    constructor(cantidadPersonas, personaCreadora){
        super(cantidadPersonas, personaCreadora);
    }

    AgregarPersona(nombrePersona){
        super.AgregarPersonas();
        if(this.PersonaDos == null)
            this.PersonaDos = new Jugador(nombrePersona, 'amarillo');
        else
            return 'La sala está llena';
        if(this.PersonaDos != null){
            this.Iniciado = true;
            this.EtapaSeleccion = true;
            return this.DevolverPersonas('OK');
        }
        else
            return this.DevolverPersonas('NO');
    }

    DevolverPersonas(estado){
        const jugadores = {};
        jugadores['estado'] = estado;
        jugadores['jugadorUno'] = this.Creador.Nombre;
        if (this.PersonaDos != null)
            jugadores['jugadorDos'] = this.PersonaDos.Nombre;
        jugadores['cantidad'] = this.CantidadPersonas.toString();
        return jugadores;
    }

    /**
     * 
     * @param {string} nombrePersona 
     * @returns 
     */
    ElegirPrimero(nombrePersona){
        const numero = Dado.TirarDado()
        if(this.Creador.Nombre == nombrePersona)
            this.Creador.NumeroInicio = numero;
        else if(this.PersonaDos.Nombre == nombrePersona)
            this.PersonaDos.NumeroInicio = numero;
        if(this.Creador.NumeroInicio != null && this.PersonaDos.NumeroInicio != null){
            this.EtapaSeleccion = false;
            this.EtapaJuego = true;
            this.CrearTurnos();
            return {'primero': this.Turnos.ObtenerActual().Nombre, numero};
        }
        else
            return {numero};
    }

    CrearTurnos(){
        if(this.Creador.NumeroInicio > this.PersonaDos.NumeroInicio)
            this.Turnos = new Turno(this.Creador, this.PersonaDos, null, null, 1);
        else
            this.Turnos = new Turno(this.Creador, this.PersonaDos, null, null, 2);
        this.Gestor.ReiniciarUltimoNumero(this.Turnos.ObtenerActual().Nombre)
    }

    /**
     * 
     * @returns {string}
     */
    MostrarGanador(){
        if(this.TableroPartida.Casillas['Casilla42Rojo'].length == 4)
            return this.Creador.Nombre;
        if(this.TableroPartida.Casillas['Casilla76Amarillo'].length == 4)
            return this.PersonaDos.Nombre;
        return null;
    }
}

module.exports = PartidaDosJugadores;