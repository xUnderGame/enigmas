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
    /// Controlador para Juegos
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class JuegosController : ControllerBase
    {
        private readonly JuegosRepository juegosRepository;
        public JuegosController(JuegosRepository juegosRepository)
        {

            this.juegosRepository = juegosRepository;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllJuegos()
        {
            return Ok(await juegosRepository.GetAllJuegos());
        }

        [HttpGet("{idJuego}")]
        public async Task<IActionResult> GetJuegoDetails(int idJuego)
        {
            return Ok(await juegosRepository.GetJuegoDetails(idJuego));
        }

        [HttpPost]
        public async Task<IActionResult> CreateJuego([FromBody] Juegos juego)
        {
            if (juego == null)
            {
                return BadRequest();


            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var created = await juegosRepository.InsertJuego(juego);
            return Created("Creado!", created);
        }


        [HttpPut]
        public async Task<IActionResult> UpdateJuego([FromBody] Juegos juego)
        {
            if (juego == null)
            {
                return BadRequest();


            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updated = await juegosRepository.UpdateJuego(juego);
            return Created("Actualizado!", updated);
        }


        [HttpDelete("{idJuego}")]
        public async Task<IActionResult> DeleteJuego(int idJuego)
        {


            var deleted = await juegosRepository.DeleteJuego(new Juegos { idJuego = idJuego });
            return Created("Eliminado!", deleted);
        }
    }
}

