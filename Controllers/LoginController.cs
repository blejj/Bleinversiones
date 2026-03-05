using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Threading.Tasks;
using Bleinversiones.Data;
using Bleinversiones.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace Bleinversiones.Controllers
{   
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LoginController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult> LoguearUsuario(LoginDTO logindto)
        {
            try
            {
                var usuarioExiste = await _context.Usuarios
            .FirstOrDefaultAsync(u => u.Email == logindto.Email);
            if (usuarioExiste == null)
            {
                return Unauthorized();
            }

            if (logindto.Email == usuarioExiste.Email)
            {
                var sonIguales = BCrypt.Net.BCrypt.Verify(logindto.Password, usuarioExiste.PasswordHash);

                if (sonIguales)
                {
                    var claims = new[]
                    {
                        new Claim(ClaimTypes.NameIdentifier, usuarioExiste.IdUsuario.ToString()),
                        new Claim(ClaimTypes.Email, usuarioExiste.Email),
                        new Claim(ClaimTypes.Name, usuarioExiste.Nombre)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("PasswordSeguraInversionesWebLeonelYFranco2026$"));
                    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(
                        claims: claims,
                        expires: DateTime.UtcNow.AddHours(1),
                        signingCredentials: creds
                    );
                    
                    return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token), nombre = usuarioExiste.Nombre });
                }
                else
                {
                    return Unauthorized();
                }
            }
            else
            {
                return Unauthorized();
            }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }            
        }
    }
}