export default class Jugador {
    idJugador;
    nombre;
    apellido;
    nick;
    password;
    juegoscompletados;
    racha;
    ciudad;
    constructor(id, nombre, apellido, nick, password, completados, racha, ciudad) {
        this.idJugador = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.nick = nick;
        this.password = password;
        this.juegoscompletados = completados;
        this.racha = racha;
        this.ciudad = ciudad;
    }
}