using AirlineInventoryService.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineInventoryService.Models.Auth
{
    public interface IAuthenticationService
    {
        UserDTO Authenticate(string userName, string password);
    }
}
