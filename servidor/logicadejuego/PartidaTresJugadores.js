const Dado = require('./Dado');
const Jugador = require('./Jugador');
const Partida = require('./Partida')

class PartidaTresJugadores extends Partida{
    constructor(cantidadPersonas, personaCreadora){
        super(cantidadPersonas, personaCreadora);
    }

    AgregarPersona(nombrePersona){
        if(this.PersonaDos == null)
            this.PersonaDos = new Jugador(nombrePersona, 'amarillo');
        else if(this.PersonaTres == null)
            this.PersonaTres = new Jugador(nombrePersona, 'azul');
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
        if(this.Creador.NumeroInicio != null && this.PersonaDos.NumeroInicio != null
            && this.PersonaTres.NumeroInicio != null
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
        )
            this.Turnos = new Turno(this.Creador, this.PersonaDos, this.PersonaTres, 1);
        else if(this.PersonaDos.NumeroInicio > this.Creador.NumeroInicio
            && this.PersonaDos.NumeroInicio > this.PersonaTres.NumeroInicio
        )
            this.Turnos = new Turno(this.Creador, this.PersonaDos, this.PersonaTres, 2);
        else
            this.Turnos = new Turno(this.Creador, this.PersonaDos, this.PersonaTres, 3);
        this.Gestor.ReiniciarUltimoNumero(this.Turnos.ObtenerActual().Nombre)
    }
}

module.exports = PartidaTresJugadores