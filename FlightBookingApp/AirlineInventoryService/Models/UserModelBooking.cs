using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineService.DataModel
{
    [Table("UserList")]
    public class UserModelBooking
    {   
        [Key]
        public int Id { get; set; }
        public string userName { get; set; }
        public string gender { get; set; }
    }
}
