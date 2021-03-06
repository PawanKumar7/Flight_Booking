using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace AirlineService.DataModel
{
    public class DataContext :DbContext
    {

        
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
                
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("server = JRDOTNETFSECO-2; initial catalog = AirlineDb; User ID=sa;Password=pass@word1");
                    //@"Data Source = JRDOTNETFSECO-2; Initial Catalog = Airline;User ID = sa; Password = pass@word1");
            }

        }

        public DbSet<FlightSheduleModel> Shedule { get; set; }
        public DbSet<UserBookingModel> UserBooking { get; set; }
        public DbSet<UserModel> User {get; set;}
        public DbSet<DiscountModel> Discount { get; set; }
        public DbSet<AirlineModel> Airline {get; set;}
        public DbSet<Passenger> Passengers { get; set; }
    }
}
