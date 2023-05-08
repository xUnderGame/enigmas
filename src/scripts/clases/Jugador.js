export default class Jugador {
    idJugador;
    nombre;
    apellido;
    nick;
    password;
    constructor(idJugador, nombre, apellido, nick, password) {
        this.idJugador = idJugador;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nick = nick;
        this.password = password;
        /*this.localizacion=localizacion;
        this.juegosCompletados=juegosCompletados;
        this.racha=racha;*/
    }
}