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
    constructor(id, nombre, apellido, nick, password, localizacion, completados, racha, ciudad) {
        this.idJugador = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nick = nick;
        this.password = password;
        this.localizacion = localizacion;
        this.juegoscompletados = completados;
        this.racha = racha;
        this.ciudad = ciudad;
        // this.localizacion=localizacion;
    }
}