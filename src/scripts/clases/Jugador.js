export default class Jugador {
    nombre;
    apellido;
    nick;
    password;
    constructor(nombre, apellido, nick, password) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.nick = nick;
        this.password = password;
        /*this.localizacion=localizacion;
        this.juegosCompletados=juegosCompletados;
        this.racha=racha;*/
    }
}