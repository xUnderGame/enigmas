export default class Ciudad{
    id_ciudad;
    ciudad;
    coordsx;
    coordsy;
    n_poblacion;
    constructor(id_ciudad, ciudad,coordsx,coords, n_poblacion){
        this.id_ciudad=id_ciudad;
        this.ciudad=ciudad;
        this.coordsx=coordsx;
        this.coordsy=coordsy;
        this.n_poblacion=n_poblacion;
    }
}