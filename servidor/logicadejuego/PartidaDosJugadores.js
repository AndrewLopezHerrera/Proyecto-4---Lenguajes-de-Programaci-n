const Dado = require('./Dado');
const Partida = require('./Partida')

class PartidaDosJugadores extends Partida{

    constructor(cantidadPersonas, personaCreadora){
        super(cantidadPersonas, personaCreadora);
    }

    AgregarPersona(nombrePersona){
        if(this.PersonaDos == null)
            this.PersonaDos = new Jugador(nombrePersona, 'amarillo');
        else
            return 'La sala está llena';
        if(this.PersonaDos != null && this.PersonaTres != null)
            return 'OK';
        else
            return 'NO';
    }

    /**
     * 
     * @param {string} nombrePersona 
     * @returns 
     */
    ElegirPrimero(nombrePersona){
        if(this.Creador.Nombre == nombrePersona)
            this.Creador.NumeroInicio = Dado.TirarDado();
        else if(this.PersonaDos.Nombre == nombrePersona)
            this.PersonaDos.NumeroInicio = Dado.TirarDado();
        if(this.Creador.NumeroInicio != null && this.PersonaDos.NumeroInicio != null){
            this.EtapaSeleccion = false;
            this.EtapaJuego = true;
            this.CrearTurnos();
            return 'OK'
        }
        else
            return 'NO'
    }

    CrearTurnos(){
        if(this.Creador.NumeroInicio > this.PersonaDos.NumeroInicio)
            this.Turnos = new Turno(this.Creador, this.PersonaDos, null, null, 1);
        else
            this.Turnos = new Turno(this.Creador, this.PersonaDos, null, null, 2);
        this.Gestor.ReiniciarUltimoNumero(this.Turnos.ObtenerActual().Nombre)
    }

    MostrarGanador(){
        if(this.TableroPartida.Casillas['Casilla42Rojo'].length == 4)
            return this.Creador.Nombre;
        if(this.TableroPartida.Casillas['Casilla76Amarillo'].length == 4)
            return this.PersonaDos;
        return null;
    }
}

module.exports = PartidaDosJugadores;