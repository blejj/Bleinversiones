using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bleinversiones.Models;
using Microsoft.EntityFrameworkCore;

namespace Bleinversiones.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }

        public DbSet<Usuario> Usuarios {get; set;}
        public DbSet<Operacion> Operaciones {get; set;}
    }
}