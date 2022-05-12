using AirlineService.DataModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineInventoryService.Models
{
    
        [Table("FlightBooking")]
        public class BookingModel 
        {
            [Key]
            public int Id { get; set; }
            public string pnr { get; set; }
            public string flightName { get; set; }
            public string flightId { get; set; }
            public string userName { get; set; }
            public string emailId { get; set; }
            public string fromPlace { get; set; }
            public string toPlace { get; set; }
            public int noOfSeats { get; set; }
            public string mealType { get; set; }
            public int seatNos { get; set; }
            [NotMapped]
            public List<UserModelBooking> users { get; set; }
        }
    }
