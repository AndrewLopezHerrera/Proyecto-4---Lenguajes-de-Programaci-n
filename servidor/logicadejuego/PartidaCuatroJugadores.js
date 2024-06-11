const Dado = require('./Dado');
const Jugador = require('./Jugador');
const Partida = require('./Partida')

class PartidaCuatroJugadores extends Partida{

    constructor(cantidadPersonas, personaCreadora){
        super(cantidadPersonas, personaCreadora);
    }

    AgregarPersona(nombrePersona){
        if(this.PersonaDos == null)
            this.PersonaDos = new Jugador(nombrePersona, 'amarillo');
        else if(this.PersonaTres == null)
            this.PersonaTres = new Jugador(nombrePersona, 'azul');
        else if(this.PersonaCuatro == null)
            this.PersonaCuatro == new Jugador(nombrePersona, 'verde');
        else
            return 'La sala está llena';
        if(this.PersonaDos != null && this.PersonaTres != null)
            return 'OK';
        else
            return 'NO';
    }

    ElegirPrimero(nombrePersona){
        if(this.Creador.Nombre == nombrePersona)
            this.Creador.NumeroInicio = Dado.TirarDado();
        else if(this.PersonaDos.Nombre == nombrePersona)
            this.PersonaDos.NumeroInicio = Dado.TirarDado();
        else if(this.PersonaTres.Nombre == nombrePersona)
            this.PersonaTres.NumeroInicio = Dado.TirarDado();
        else if(this.PersonaCuatro.Nombre == nombrePersona)
            this.PersonaCuatro.NumeroInicio = Dado.TirarDado();
        if(this.Creador.NumeroInicio != null && this.PersonaDos.NumeroInicio != null
            && this.PersonaTres.NumeroInicio != null && this.PersonaCuatro.NumeroInicio != null
        ){
            this.EtapaSeleccion = false;
            this.EtapaJuego = true;
            return 'OK'
        }
        else
            return 'NO'
    }

    CrearTurnos(){
        if(this.Creador.NumeroInicio > this.PersonaDos.NumeroInicio
            && this.Creador.NumeroInicio > this.PersonaTres.NumeroInicio
            && this.Creador.NumeroInicio > this.PersonaCuatro.NumeroInicio
        )
            this.Turnos = new Turno(this.Creador, this.PersonaDos, this.PersonaTres, this.PersonaCuatro, 1);
        else if(this.PersonaDos.NumeroInicio > this.Creador.NumeroInicio
            && this.PersonaDos.NumeroInicio > this.PersonaTres.NumeroInicio
            && this.PersonaDos.NumeroInicio > this.PersonaCuatro.NumeroInicio
        )
            this.Turnos = new Turno(this.Creador, this.PersonaDos, this.PersonaTres, this.PersonaCuatro, 2);
        else if(this.PersonaTres.NumeroInicio > this.Creador.NumeroInicio
            && this.PersonaTres.NumeroInicio > this.PersonaDos.NumeroInicio
            && this.PersonaTres.NumeroInicio > this.PersonaCuatro
        )
            this.Turnos = new Turno(this.Creador, this.PersonaDos, this.PersonaTres, this.PersonaCuatro, 3);
        else
            this.Turnos = new Turno(this.Creador, this.PersonaDos, this.PersonaTres, this.PersonaCuatro, 4);
        this.Gestor.ReiniciarUltimoNumero(this.Turnos.ObtenerActual().Nombre)
    }

    MostrarGanador(){
        if(this.TableroPartida.Casillas['Casilla42Rojo'].length == 4)
            return this.Creador.Nombre;
        if(this.TableroPartida.Casillas['Casilla76Amarillo'].length == 4)
            return this.PersonaDos;
        if(this.TableroPartida.Casillas['Casilla25Azul'].length == 4)
            return this.PersonaTres;
        if(this.TableroPartida.Casillas['Casilla60Verde'].length == 4)
            return this.PersonaCuatro;
        return null;
    }
}

module.exports = PartidaCuatroJugadores;