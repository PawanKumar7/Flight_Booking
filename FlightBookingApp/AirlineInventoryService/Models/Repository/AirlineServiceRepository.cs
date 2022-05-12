using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AirlineInventoryService.Models;
using AirlineInventoryService.Models.Interface;
using Microsoft.EntityFrameworkCore;

namespace AirlineInventoryService.Models.Repository
{
    public class AirlineServiceRepository : IAirlineServiceRepository
    {

        private AirlineDataContext _airlineContext;

        public AirlineServiceRepository(AirlineDataContext airlineContext)
        {
            _airlineContext = airlineContext;
        }

        public async Task<AirlineModel> GetairlinesAsync(int id)
        {
            AirlineModel flight = await _airlineContext.Airline.FindAsync(id);
            return flight;
        }

        public async Task<IEnumerable<AirlineModel>> GetAirlinesListAsync()
        {
            IEnumerable<AirlineModel> result = await _airlineContext.Airline.ToListAsync();

            return result;
        }

        public async Task<IEnumerable<AirlineModel>> SearchFlight(string fromPlace,string toPlace)
        {
            var result = await _airlineContext.Airline.Where(x=>x.FromPlace.ToLower() == fromPlace.ToLower() 
            && x.ToPlace.ToLower() == toPlace.ToLower()).ToListAsync();

            return result;
        }

        public IEnumerable<AirlineModel> SearchFlightWithDate(string date)
        {
            
            
                
            var result = _airlineContext.Airline.Where(x => x.StartDateTime.ToString("MM/dd/yyyy") == date).ToList();
            

            return result;
        } 

        public async Task<int> AddInventory(AirlineModel model)
        {
            try
            {
                _airlineContext.Airline.Add(model);
                
                await _airlineContext.SaveChangesAsync();

                return model.Id;
            }
            catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }

        public async Task UpdateInventory(int id,AirlineModel model)
        {
            try
            {
                
                AirlineModel airline =await _airlineContext.Airline.FirstOrDefaultAsync(x=>x.Id == id);

                if (airline != null)
                {
                    airline.Name = model.Name;
                    airline.SheduledDay = model.SheduledDay;
                    airline.EndDateTime = model.EndDateTime;
                    airline.StartDateTime = model.StartDateTime;
                    airline.InstrumentType = model.InstrumentType;
                    airline.ToPlace = model.ToPlace;
                    airline.FromPlace = model.FromPlace;
                    airline.TotalBusinessClassSeats = model.TotalBusinessClassSeats;
                    airline.TotalNonBusinessClassSeats = model.TotalNonBusinessClassSeats;
                    airline.TicketCost = model.TicketCost;

                    await _airlineContext.SaveChangesAsync();
                } 

                
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public async Task RemoveInventory(int id)
        {
            try
            {

                AirlineModel airline = await _airlineContext.Airline.FirstOrDefaultAsync(x => x.Id == id);

                if(airline != null)
                {
                    _airlineContext.Airline.Remove(airline);
                    await _airlineContext.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
