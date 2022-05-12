using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirlineInventoryService.Models;
using AirlineInventoryService.Models.Interface;
using AirlineService.DataModel;

namespace AirlineInventoryService.Models.Repository
{
    public class BookingRepository : IBookingRepository
    {
        private AirlineDataContext _bookingContext;

        public BookingRepository(AirlineDataContext bookingContext)
        {
            _bookingContext = bookingContext;
        }
        public string AddBooking(int flightId, BookingModel model)
        {

            try
            {
                string pnr = null;

                if (_bookingContext.Airline.Any(x => x.Id == flightId))
                {
                    AirlineModel airline = _bookingContext.Airline.FirstOrDefault(x => x.Id == flightId);
                    model.flightId = airline.Id.ToString();
                    model.flightName = airline.Name;
                    model.fromPlace = airline.FromPlace;
                    model.toPlace = airline.ToPlace;

                    foreach (var user in model.users)
                    {
                        var usr = new UserModelBooking();
                        usr.userName = user.userName;
                        usr.gender = user.gender;
                        _bookingContext.userList.Add(usr);
                    }
                    pnr = new Random().Next().ToString();

                    bool res = _bookingContext.Booking.Any(x => x.pnr == pnr);

                    while(res)
                    {
                        res = _bookingContext.Booking.Any(x => x.pnr == pnr);
                        pnr = new Random().Next().ToString();
                    }

                    model.pnr = pnr;
                    _bookingContext.Booking.Add(model);

                    _bookingContext.SaveChanges();

                }
                return pnr;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public IEnumerable<BookingModel> GetBookingHistory(string name)
        {
            return _bookingContext.Booking.Where(x=>x.userName == name).ToList();
        }

        public BookingModel GetBookingbyPNR(string pnr)
        {
            return _bookingContext.Booking.FirstOrDefault(x => x.pnr == pnr);
        }

        public BookingModel GetBookingByEmail(string email)
        {


            var result = _bookingContext.Booking.FirstOrDefault(x => x.emailId.ToLower() == email.ToLower());

            return result;
        }

        public bool RemoveBooking(string pnr)
        {
            try
            {

                BookingModel booking = _bookingContext.Booking.FirstOrDefault(x => x.pnr == pnr);

                if (booking != null)
                {
                    _bookingContext.Booking.Remove(booking);
                    _bookingContext.SaveChangesAsync();
                }

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
    }
}
