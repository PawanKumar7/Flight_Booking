using AirlineInventoryService.Models;
using AirlineInventoryService.Models.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace AirlineInventoryService.Controllers
{
    //[Authorize]
    [Route("api/v1.0/flight")]
    [ApiController]
    public class AirlinesController : ControllerBase
    {

        private IAirlineServiceRepository _airline;

        public AirlinesController(IAirlineServiceRepository airline)
        {
            this._airline = airline;
        }


        // GET api/v1.0/flight/search/
        [HttpGet]
        [Route("Search")]
        public async Task<IEnumerable<AirlineModel>> GetAirline()
        {
            return await _airline.GetAirlinesListAsync();
        }

        // GET api/v1.0/flight/search/{id}
        [HttpGet]
        [Route("search/{id:int}")]
        public async Task<IActionResult> Getairlines(int id)
        {
            var result = await _airline.GetairlinesAsync(id);

            return Ok(result);
        }

        // GET api/v1.0/flight/search/{fromPlace}/{toPlace}
        [HttpGet]
        [Route("Search/{fromPlace}/{toPlace}")]
        //IEnumerable<Flight>
        public async Task<IActionResult> GetAirline(string fromPlace, string toPlace)
        {
            var result = await _airline.SearchFlight(fromPlace, toPlace);

            return result == null ? NoContent() : (IActionResult)Ok(result);
        }

        [HttpGet]
        [Route("Searchbydate/{date}")]
        public IActionResult GetAirlineOnDate(string date)
        {
           
            var result = _airline.SearchFlightWithDate(date);
            
            return result == null ? NoContent() : (IActionResult)Ok(result);

        }

        //api/v1.0/flight/register
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> SheduleAirline([FromBody] AirlineModel model)
        {
            int id = await _airline.AddInventory(model);

            return CreatedAtAction(nameof(Getairlines),new { id = id ,Controller = "Airlines"},id);
            
        }

        //api/v1.0/flight/register
        [HttpPut]
        [Route("UpdateAirline/{id}")]
        public async Task<IActionResult> UpdateAirline(int id, [FromBody] AirlineModel model)
        {
           await _airline.UpdateInventory(id, model);

            return Ok();
        }

        [HttpDelete]
        [Route("RemoveAirline/{id}")]
        public async Task<IActionResult> RemoveAirline(int id)
        {
            await _airline.RemoveInventory(id);

            return Ok();
        }
    }

}
