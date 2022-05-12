using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineInventoryService.Models.Interface
{
    public interface IBookingRepository
    {
        
        //void CancelBooking(string pnr);
        
        string AddBooking(int flightId, BookingModel model);
        BookingModel GetBookingbyPNR(string pnr);
        IEnumerable<BookingModel> GetBookingHistory(string name);
        bool RemoveBooking(string pnr);
    }
}
