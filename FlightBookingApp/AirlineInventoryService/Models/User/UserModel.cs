using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineInventoryService.Models.User
{
    public class UserModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string password { get; set; }
        [Required]
        public string Email { get; set; }
        public string Gender { get; set; }
        public bool isAdmin { get; set; }
    }
}
