using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bleinversiones.Models;

namespace Bleinversiones.DTOs
{
    public class OperacionDTO
    {   
        public int IdOperacion { get; set; }
        public int TipoOperacion { get; set; }
        public string Moneda { get; set; } = "ARS";
        public string Ticker { get; set; }
        public int Cantidad { get; set; }
        public decimal Precio { get; set; }
        public DateTime FechaOperacion { get; set; }
        public int IdUsuario { get; set; }
    }
}