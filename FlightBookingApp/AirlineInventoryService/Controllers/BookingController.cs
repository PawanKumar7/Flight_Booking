using AirlineInventoryService.Models;
using AirlineInventoryService.Models.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineInventoryService.Controllers
{
    [Route("api/Booking")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private IBookingRepository _booking;

        public BookingController(IBookingRepository booking)
        {

            _booking = booking;
        }

        // GET api/v1.0/flight/Booking/{flightId}
        [HttpPost]
        [Route("SheduleBooking/{flightId}")]
        public IActionResult AirlineBooking(int flightId, [FromBody] BookingModel model)
        {
            var result = _booking.AddBooking(flightId, model);

            if (result == null)
            {
                return BadRequest();
            }

            return Ok(result);
        }

        
        [HttpGet]
        [Route("BookingByPNR/{pnr}")]
        public IActionResult Getbooking(string pnr)
        {
            var result = _booking.GetBookingbyPNR(pnr);
            if (result == null)
            {
                return BadRequest();
            }

            return Ok(result);
        }

        [HttpGet]
        [Route("BookingHistory/{name}")]
        public IActionResult GetBookingHistory(string name)
        {
            var result = _booking.GetBookingHistory(name);
            if (result == null)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpDelete]
        [Route("CancelBooking/{pnr}")]
        public IActionResult CancelBooking(string pnr)
        {
            bool res =_booking.RemoveBooking(pnr);

            return Ok(res);
        }
    }
}
