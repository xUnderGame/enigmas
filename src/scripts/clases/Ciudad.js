export default class Ciudad {
    ciudad;
    coordsx;
    coordsy;
    n_poblacion;
    constructor(ciudad, x, y, poblacion) {
        this.ciudad = ciudad;
        this.coordsx = x;
        this.coordsy = y;
        this.n_poblacion = poblacion;
    }
}