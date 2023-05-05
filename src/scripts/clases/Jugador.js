class Jugador{
    idJugador;
	nombre;
	apellido;
	nick;
	password;
	localizacion;
	juegosCompletados;
	racha;
    constructor(idJugador,nombre,apellido,nick,password,localizacion,juegosCompletados,racha){
        this.idJugador= idJugador;
        this.nombre = nombre;
        this.apellido= apellido;
        this.nick=nick;
        this.password=password;
        this.localizacion=localizacion;
        this.juegosCompletados=juegosCompletados;
        this.racha=racha;
    }
}