const Dado = require('./Dado');
const Jugador = require('./Jugador');
const Partida = require('./Partida');
const Turno = require('./Turno');

class PartidaCuatroJugadores extends Partida{

    constructor(cantidadPersonas, personaCreadora){
        super(cantidadPersonas, personaCreadora);
    }

    AgregarPersona(nombrePersona){
    super.AgregarPersonas();
        if(this.PersonaDos == null)
            this.PersonaDos = new Jugador(nombrePersona, 'amarillo');
        else if(this.PersonaTres == null)
            this.PersonaTres = new Jugador(nombrePersona, 'azul');
        else if(this.PersonaCuatro == null)
            this.PersonaCuatro = new Jugador(nombrePersona, 'verde');
        else
            return 'La sala está llena';
        if(this.PersonaDos != null && this.PersonaTres != null && this.PersonaCuatro != null){
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
        if(this.PersonaDos != null)
            jugadores['jugadorDos'] = this.PersonaDos.Nombre;
        if(this.PersonaTres != null)
            jugadores['jugadorTres'] = this.PersonaTres.Nombre;
        if(this.PersonaCuatro != null)
            jugadores['jugadorCuatro'] = this.PersonaCuatro.Nombre;
        jugadores['cantidad'] = this.CantidadPersonas.toString();
        return jugadores;
    }

    ElegirPrimero(nombrePersona){
        const numero = Dado.TirarDado();
        if(this.Creador.Nombre == nombrePersona)
            this.Creador.NumeroInicio = numero;
        else if(this.PersonaDos.Nombre == nombrePersona)
            this.PersonaDos.NumeroInicio = numero;
        else if(this.PersonaTres.Nombre == nombrePersona)
            this.PersonaTres.NumeroInicio = numero;
        else if(this.PersonaCuatro.Nombre == nombrePersona)
            this.PersonaCuatro.NumeroInicio = numero;
        if(this.Creador.NumeroInicio != null && this.PersonaDos.NumeroInicio != null
            && this.PersonaTres.NumeroInicio != null && this.PersonaCuatro.NumeroInicio != null
        ){
            this.EtapaSeleccion = false;
            this.EtapaJuego = true;
            this.CrearTurnos();
            return {'primero': this.Turnos.ObtenerActual().Nombre, numero};
        }
        else
            return {numero};
    }

    CrearTurnos(){
        if(this.Creador.NumeroInicio > this.PersonaDos.NumeroInicio
            && this.Creador.NumeroInicio > this.PersonaTres.NumeroInicio
            && this.Creador.NumeroInicio > this.PersonaCuatro.NumeroInicio
        )
            this.Turnos = new Turno(this.Creador, this.PersonaDos, this.PersonaTres, this.PersonaCuatro, 1, 4);
        else if(this.PersonaDos.NumeroInicio > this.Creador.NumeroInicio
            && this.PersonaDos.NumeroInicio > this.PersonaTres.NumeroInicio
            && this.PersonaDos.NumeroInicio > this.PersonaCuatro.NumeroInicio
        )
            this.Turnos = new Turno(this.Creador, this.PersonaDos, this.PersonaTres, this.PersonaCuatro, 2, 4);
        else if(this.PersonaTres.NumeroInicio > this.Creador.NumeroInicio
            && this.PersonaTres.NumeroInicio > this.PersonaDos.NumeroInicio
            && this.PersonaTres.NumeroInicio > this.PersonaCuatro
        )
            this.Turnos = new Turno(this.Creador, this.PersonaDos, this.PersonaTres, this.PersonaCuatro, 3, 4);
        else
            this.Turnos = new Turno(this.Creador, this.PersonaDos, this.PersonaTres, this.PersonaCuatro, 4, 4);
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