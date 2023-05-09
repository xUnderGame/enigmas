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
    /// Controlador para Ciudad
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class CiudadController : ControllerBase
    {
        private readonly CiudadRepository ciudadRepository;
        public CiudadController(CiudadRepository ciudadRepository)
        {

            this.ciudadRepository = ciudadRepository;
        }

        // Gets all the entries in ciudad.
        [HttpGet]
        public async Task<IActionResult> GetAllCiudad()
        {
            return Ok(await ciudadRepository.GetAllCiudad());
        }


        [HttpGet("{idciudad}")]
        public async Task<IActionResult> GetCiudadDetails(int idciudad)
        {
            return Ok(await ciudadRepository.GetCiudadDetails(idciudad));
        }

        [HttpPost]
        public async Task<IActionResult> CreateCiudad([FromBody] Ciudad ciudad)
        {
            if (ciudad == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var created = await ciudadRepository.InsertCiudad(ciudad);
            return Created("Creado!", created);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCiudad([FromBody] Ciudad ciudad)
        {
            if (ciudad == null)
            {
                return BadRequest();


            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updated = await ciudadRepository.UpdateCiudad(ciudad);
            return Created("Actualizado!", updated);
        }


        [HttpDelete("{idciudad}")]
        public async Task<IActionResult> DeleteCiudad(int idciudad)
        {
            var deleted = await ciudadRepository.DeleteCiudad(new Ciudad { idciudad = idciudad});
            return Created("Eliminado!", deleted);
        }
    }
}
