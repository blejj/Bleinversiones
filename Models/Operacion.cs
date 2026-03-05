using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Bleinversiones.Models
{
    public class Operacion
    {
        [Key]
        public int IdOperacion { get; set; }
        [Required]
        public int TipoOperacion { get; set; }
        [Required]
        public string Moneda { get; set; } = "ARS";
        [Required]
        public string Ticker { get; set; }
        [Required]
        public int Cantidad { get; set; }
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Precio { get; set; }
        [Required]
        public DateTime FechaOperacion { get; set; }
        public int IdUsuario { get; set; }
        public Usuario? usuario { get; set; }
    }
}