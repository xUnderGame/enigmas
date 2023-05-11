export default class Jugar
{
    idjugador;
    idjuego;
    vecescompletado;
    ranking;
    constructor(idjugador,idjuego,vecescompletado,ranking){
        this.idjugador=idjugador;
        this.idjuego=idjuego;
        this.vecescompletado= vecescompletado;
        this.ranking=ranking;
    }
}