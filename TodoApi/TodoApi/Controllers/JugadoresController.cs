using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Data.Repositories;
using TodoApi.Model;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    /// <summary>
    /// Controlador para Cars
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class JugadoresController : ControllerBase
    {
       private readonly JugadoresRepository  jugadoresRepository;
        public JugadoresController(JugadoresRepository jugadoresRepository) {

            this.jugadoresRepository = jugadoresRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllJugadores()
        {
            return Ok(await jugadoresRepository.GetAllJugadores());
        }

        [HttpGet("{nick}")]
        public async Task<IActionResult> GetJugadorDetails(string nick)
        {
            return Ok(await jugadoresRepository.GetJugadorDetails(nick));
        }

        [HttpPost]
        public async Task<IActionResult> CreateJugador( [FromBody] Jugadores jugadores)
        {
            if (jugadores == null)
            {
                return BadRequest();


            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var created =  await jugadoresRepository.InsertJugador(jugadores);
            return Created("Creado!" ,created);
        }


        [HttpPut]
        public async Task<IActionResult> UpdateJugador([FromBody] Jugadores jugadores)
        {
            if (jugadores == null)
            {
                return BadRequest();


            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updated = await jugadoresRepository.UpdateJugador(jugadores);
            return Created("Actualizado!", updated);
        }


        [HttpDelete("{idjugador}")]
        public async Task<IActionResult> DeleteJugador(int id)
        {
           

            var deleted = await jugadoresRepository.DeleteJugador(new Jugadores { idjugador = id});
            return Created("Eliminado!", deleted);
        }
    }
}
