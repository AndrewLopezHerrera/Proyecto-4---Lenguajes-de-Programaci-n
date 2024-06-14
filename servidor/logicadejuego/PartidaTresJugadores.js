const Dado = require('./Dado');
const Jugador = require('./Jugador');
const Partida = require('./Partida')

class PartidaTresJugadores extends Partida{
    constructor(cantidadPersonas, personaCreadora){
        super(cantidadPersonas, personaCreadora);
    }

    AgregarPersona(nombrePersona){
        super.AgregarPersonas();
        if(this.PersonaDos == null)
            this.PersonaDos = new Jugador(nombrePersona, 'amarillo');
        else if(this.PersonaTres == null)
            this.PersonaTres = new Jugador(nombrePersona, 'azul');
        else
            return 'La sala está llena';
        if(this.PersonaDos != null && this.PersonaTres != null){
            this.Iniciado = true;
            this.EtapaSeleccion = true;
            return this.DevolverPersonas('OK');
        }
        else
            return this.DevolverPersonas('NO');
    }

    ElegirPrimero(nombrePersona){
        if(this.Creador.Nombre == nombrePersona)
            this.Creador.NumeroInicio = Dado.TirarDado();
        else if(this.PersonaDos.Nombre == nombrePersona)
            this.PersonaDos.NumeroInicio = Dado.TirarDado();
        else if(this.PersonaTres.Nombre == nombrePersona)
            this.PersonaTres.NumeroInicio = Dado.TirarDado();
        if(this.Creador.NumeroInicio != null && this.PersonaDos.NumeroInicio != null
            && this.PersonaTres.NumeroInicio != null
        ){
            this.EtapaSeleccion = false;
            this.EtapaJuego = true;
            this.CrearTurnos();
            return DevolverPersonas('OK');
        }
        else
            return DevolverPersonas('NO');
    }

    DevolverPersonas(estado){
        const jugadores = {};
        jugadores['estado'] = estado;
        jugadores['jugadorUno'] = this.Creador.Nombre;
        if (this.PersonaDos != null)
            jugadores['jugadorDos'] = this.PersonaDos.Nombre;
        if(this.PersonaTres != null)
            jugadores['jugadorTres'] = this.PersonaTres.Nombre;
        return jugadores;
    }

    CrearTurnos(){
        if(this.Creador.NumeroInicio > this.PersonaDos.NumeroInicio
            && this.Creador.NumeroInicio > this.PersonaTres.NumeroInicio
        )
            this.Turnos = new Turno(this.Creador, this.PersonaDos, this.PersonaTres, null, 1);
        else if(this.PersonaDos.NumeroInicio > this.Creador.NumeroInicio
            && this.PersonaDos.NumeroInicio > this.PersonaTres.NumeroInicio
        )
            this.Turnos = new Turno(this.Creador, this.PersonaDos, this.PersonaTres, null, 2);
        else
            this.Turnos = new Turno(this.Creador, this.PersonaDos, this.PersonaTres, null, 3);
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
        if(this.TableroPartida.Casillas['Casilla25Azul'].length == 4)
            return this.PersonaTres.Nombre;
        return null;
    }
}

module.exports = PartidaTresJugadores