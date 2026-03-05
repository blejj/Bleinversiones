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
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuarioController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> CrearUsuario(CrearUsuarioDTO usuarioDTO)
        {
            var usuario = new Usuario
            {
                Nombre = usuarioDTO.Nombre,
                Email = usuarioDTO.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(usuarioDTO.PasswordHash)
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync(); //guarda el usuario en la base de datos.

            var usuarioRespuesta = new UsuarioDTO
            {
                IdUsuario = usuario.IdUsuario,
                Nombre = usuario.Nombre,
                Email = usuario.Email
            };
            //“Se creó el recurso y acá tenés la URL para consultarlo”
            return CreatedAtAction(
            nameof(ObtenerUsuario), //donde consultar.
            new { id = usuario.IdUsuario}, //parámetros de la ruta.
            usuarioRespuesta // lo que devolvemos en el body.
            );
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioDTO>> ObtenerUsuario(int idUsuario)
        {
            var usuario = await _context.Usuarios
            .Where(u => u.IdUsuario == idUsuario)
            .Select(u => new UsuarioDTO
            {
                IdUsuario = u.IdUsuario,
                Nombre = u.Nombre,
                Email = u.Email
            })
            .FirstOrDefaultAsync();
            return Ok(usuario);
        }

        [HttpGet]
        public async Task<ActionResult<List<UsuarioDTO>>> ListaUsuarios()
        {
            var usuario = await _context.Usuarios
            .Select(u => new UsuarioDTO
            {
                IdUsuario = u.IdUsuario,
                Nombre = u.Nombre,
                Email = u.Email
            })
            .ToListAsync();
            return Ok(usuario);
        }
    }
}