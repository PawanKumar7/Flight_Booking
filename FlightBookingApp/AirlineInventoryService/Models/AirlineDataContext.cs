using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using AirlineService.DataModel;
using AirlineInventoryService.Models.User;

namespace AirlineInventoryService.Models
{
    public class AirlineDataContext : DbContext
    {


        public AirlineDataContext(DbContextOptions<AirlineDataContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("server = JRDOTNETFSECO-2; initial catalog = AirlineService; User ID=sa;Password=pass@word1");
               
            }

        }

        public DbSet<AirlineModel> Airline { get; set; }
        public DbSet<BookingModel> Booking { get; set; }
        public DbSet<UserModelBooking> userList { get; set; }
        public DbSet<UserModel> Users { get; set; }


    }
}
