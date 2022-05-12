using AirlineInventoryService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineInventoryService.Models.Interface
{
    public interface IAirlineServiceRepository
    {
        Task<AirlineModel> GetairlinesAsync(int id);
        Task<IEnumerable<AirlineModel>> GetAirlinesListAsync();
        Task<IEnumerable<AirlineModel>> SearchFlight(string fromPlace, string toPlace);
        Task<int> AddInventory(AirlineModel model);
        Task UpdateInventory(int id,AirlineModel model);
        IEnumerable<AirlineModel> SearchFlightWithDate(string startDate);
        Task RemoveInventory(int id);

    }
}
