using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using System.Collections.Generic;
using ReservasApi.Models;

namespace ReservasApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReservasController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Crear una nueva reserva (POST)
        [HttpPost]
        public async Task<IActionResult> CrearReserva([FromBody] Reserva reserva)
        {
            _context.Reservas.Add(reserva);
            await _context.SaveChangesAsync();
            return Ok(reserva);
        }

        // Cancelar una reserva (DELETE)
        [HttpDelete("{id}")]
        public async Task<IActionResult> CancelarReserva(int id)
        {
            var reserva = await _context.Reservas.FindAsync(id);
            if (reserva == null)
                return NotFound();

            _context.Reservas.Remove(reserva);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // Modificar una reserva (PUT)
        [HttpPut("{id}")]
        public async Task<IActionResult> ModificarReserva(int id, [FromBody] Reserva reservaModificada)
        {
            var reserva = await _context.Reservas.FindAsync(id);
            if (reserva == null)
                return NotFound();

            reserva.Fecha = reservaModificada.Fecha;
            reserva.Hora = reservaModificada.Hora;
            reserva.NumeroPersonas = reservaModificada.NumeroPersonas;

            await _context.SaveChangesAsync();
            return Ok(reserva);
        }

        // Consultar todas las reservas (GET)
        [HttpGet("listar")]
        public async Task<ActionResult<IEnumerable<Reserva>>> ListarReservas()
        {
            return await _context.Reservas.ToListAsync();
        }



        [HttpGet("buscar")]
        public IActionResult GetReservas([FromQuery] string? nombreCliente = null, [FromQuery] DateTime? fecha = null)
        {
            var reservas = _context.Reservas.AsQueryable();

            if (!string.IsNullOrEmpty(nombreCliente))
            {
                reservas = reservas.Where(r => r.NombreCliente.Contains(nombreCliente));
            }

            if (fecha.HasValue)
            {
                reservas = reservas.Where(r => r.Fecha.Date == fecha.Value.Date); // Comparar solo la fecha, ignorando la hora
            }

            return Ok(reservas.ToList());
        }

        // Consultar una reservas (GET)
        [HttpGet("{id}")]
        public async Task<IActionResult> ListarReserva(int id)
        {
            var reserva = await _context.Reservas.FindAsync(id);
            if (reserva == null)
                return NotFound();
            return Ok(reserva);
        }
    }
}
