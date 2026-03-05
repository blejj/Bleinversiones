using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bleinversiones.Data;
using Bleinversiones.DTOs;
using Bleinversiones.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bleinversiones.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OperacionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OperacionController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> AgregarOperacion(CrearOperacionDTO operaciondto)
        {
            var operacion = new Operacion
            {
                TipoOperacion = operaciondto.TipoOperacion,
                Moneda = operaciondto.Moneda,
                Ticker = operaciondto.Ticker,
                Cantidad = operaciondto.Cantidad,
                Precio = operaciondto.Precio,
                FechaOperacion = operaciondto.FechaOperacion,
                IdUsuario = operaciondto.IdUsuario
            };

            _context.Operaciones.Add(operacion);
            await _context.SaveChangesAsync();

            return Ok(operacion);
        }

        [HttpGet("{idOperacion}")]
        public async Task<ActionResult> BuscarOperacion(int idOperacion)
        {
            var operacion = await _context.Operaciones
            .Where(o => o.IdOperacion == idOperacion)
            .Select(o => new OperacionDTO
            {
                TipoOperacion = o.TipoOperacion, 
                Moneda = o.Moneda,
                Ticker = o.Ticker,
                Cantidad = o.Cantidad,
                Precio = o.Precio,
                FechaOperacion = o.FechaOperacion,
                IdUsuario = o.IdUsuario
            })
            .FirstOrDefaultAsync();
            if (operacion == null)
            {
                return NotFound();
            }
            return Ok(operacion);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditarOperacion(int id, OperacionDTO operaciondto)
        {
            if (id != operaciondto.IdOperacion)
            {
                return BadRequest();
            }

            var op = await _context.Operaciones
            .FirstOrDefaultAsync(o => o.IdOperacion == id); //obtener el primer elemento de una consulta o secuencia que cumpla con una condición

            if (op == null)
            {
                return NotFound();
            }
        
            op.TipoOperacion = operaciondto.TipoOperacion;
            op.Moneda = operaciondto.Moneda;
            op.Ticker = operaciondto.Ticker;
            op.Cantidad = operaciondto.Cantidad;
            op.Precio = operaciondto.Precio;
            op.FechaOperacion = operaciondto.FechaOperacion;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete]
        public async Task<ActionResult> EliminarOperaciones([FromQuery] List<int> ids)
        {
            if (ids == null || !ids.Any())
            {
                return BadRequest("No se proporcionaron IDs");
            }

            var idsAEliminar = await _context.Operaciones
            .Where(o => ids.Contains(o.IdOperacion))
            .ToListAsync();
            
            if (!idsAEliminar.Any())
            {
                return NotFound();
            }

            _context.Operaciones.RemoveRange(idsAEliminar);
            await _context.SaveChangesAsync();

            return NoContent(); // 204 No Content es la respuesta estándar para eliminaciones exitosas
        }

        [HttpGet]
        public async Task<ActionResult<List<OperacionDTO>>> ListaOperaciones()
        {
            var query = await _context.Operaciones
            .Select(lo => new OperacionDTO
            {
                IdOperacion = lo.IdOperacion,
                TipoOperacion = lo.TipoOperacion,
                Moneda = lo.Moneda,
                Ticker = lo.Ticker,
                Cantidad = lo.Cantidad,
                Precio = lo.Precio,
                FechaOperacion = lo.FechaOperacion
            })
            .ToListAsync(); //ejecuta una consulta de base de datos de forma asíncrona, convirtiendo los resultados en una lista
            
            return Ok(query);
        }

        // [HttpGet("por-fecha")]
        // public async Task<ActionResult<List<OperacionDTO>>> OperacionPorFecha(string tipo = "asc")
        // { 
        //     var query = _context.Operaciones.AsQueryable();
        //     query = tipo.ToLower() == "desc" //condición
        //     ? query.OrderByDescending(o => o.FechaOperacion) //si es verdadero.
        //     : query.OrderBy(o => o.FechaOperacion); //si es falso.
        //     var lista = query.Select(q => new OperacionDTO{
        //         IdOperacion = q.IdOperacion,
        //         TipoOperacion = q.TipoOperacion,
        //         Moneda = q.Moneda,
        //         Ticker = q.Ticker,
        //         Cantidad = q.Cantidad,
        //         Precio = q.Precio,
        //         FechaOperacion = q.FechaOperacion});
        //     var resultado = await lista.ToListAsync();

        //     return Ok(resultado);
        // }

        [HttpGet("usuario/{idUsuario}")]
        public async Task<ActionResult> ListaOperacionesPorUsuario(int idUsuario)
        {
            var operaciones = await _context.Operaciones
            .Where(o => o.IdUsuario == idUsuario)
            .Select(o => new OperacionDTO{
                IdOperacion = o.IdOperacion,
                TipoOperacion = o.TipoOperacion,
                Moneda = o.Moneda,
                Ticker = o.Ticker,
                Cantidad = o.Cantidad,
                Precio = o.Precio,
                FechaOperacion = o.FechaOperacion})
            .ToListAsync();

            return Ok(operaciones);
        }

        [HttpGet("precio/{ticker}")]
        public async Task<ActionResult> ObtenerPrecioTicker(string ticker)
        {
            var apiKey = "MSWYLL0P6IZG38X5";

            using var client = new HttpClient();

            var url = $"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={ticker}&apikey={apiKey}";

            var response = await client.GetStringAsync(url);

            return Content(response, "application/json");
        }
    }
}