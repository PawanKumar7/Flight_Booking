using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AirlineInventoryService.Rabbitmq
{
    public interface IConsumer
    {
        string ConsumeMessage(string queueName);
    }
}
