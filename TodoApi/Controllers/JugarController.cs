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
    /// Controlador para Jugar
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class JugarController : ControllerBase
    {
        private readonly JugarRepository jugarRepository;
        public JugarController(JugarRepository jugarRepository)
        {
            this.jugarRepository = jugarRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllJugar()
        {
            return Ok(await jugarRepository.GetAllJugar());
        }

        [HttpGet("{idjugador}")]
        public async Task<IActionResult> GetJugarDetails(int idJugador)
        {
            return Ok(await jugarRepository.GetJugarDetails( idJugador));
        }

        [HttpPost]
        public async Task<IActionResult> CreateJugar([FromBody] Jugar[] jugar)
        {
            var created = false;
            if (jugar == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            foreach (var juego in jugar)
            {
                await jugarRepository.InsertJugar(juego);
                created = true;
            }

            return Created("Creado!", created);
        }


        [HttpPut]
        public async Task<IActionResult> UpdateJugar([FromBody] Jugar jugar)
        {
            if (jugar == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updated = await jugarRepository.UpdateJugar(jugar);
            return Created("Actualizado!", updated);
        }


        [HttpDelete("{idjugador}")]
        public async Task<IActionResult> DeleteJugar(int idJugador,int idJuego)
        {
            var deleted = await jugarRepository.DeleteJugar(new Jugar { idjugador = idJugador, idjuego= idJuego });
            return Created("Eliminado!", deleted);
        }
    }
}
