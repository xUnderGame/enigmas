export default class Jugador {
    idJugador;
    nombre;
    apellido;
    nick;
    password;
    localizacion;
    juegoscompletados;
    racha;
    ciudad;
    constructor(idJugador, nombre, apellido, nick, password, localizacion, juegoscompletados, racha, ciudad) {
        this.idJugador = idJugador;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nick = nick;
        this.password = password;
        this.localizacion = localizacion;
        this.juegoscompletados = juegoscompletados;
        this.racha = racha;
        this.ciudad = ciudad;
        /*this.localizacion=localizacion;
        this.juegosCompletados=juegosCompletados;
        this.racha=racha;*/
    }
}