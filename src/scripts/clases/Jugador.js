export default class Jugador {
    nombre;
    apellido;
    nick;
    password;
    juegoscompletados;
    racha;
    ciudad;
    constructor( nombre, apellido, nick, password, completados, racha, ciudad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nick = nick;
        this.password = password;
        this.juegoscompletados = completados;
        this.racha = racha;
        this.ciudad = ciudad;
    }
}