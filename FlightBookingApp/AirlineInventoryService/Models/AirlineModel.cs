using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineInventoryService.Models
{
    [Table("Flighttbl")]
    public class AirlineModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MinLength(4, ErrorMessage = "Mininum 4 characters required")]
        public string Name { get; set; }
        [Required]
        public string FromPlace { get; set; }
        [Required]
        public string ToPlace { get; set; }
        [Required]
        public DateTime StartDateTime { get; set; }
        [Required]
        public DateTime EndDateTime { get; set; }
        public string SheduledDay { get; set; }
        public string InstrumentType { get; set; }
        public int TotalBusinessClassSeats { get; set; }
        public int TotalNonBusinessClassSeats { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal TicketCost { get; set; }
    }
}