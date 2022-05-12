using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AirlineInventoryService.Rabbitmq
{
    public class Consumer : IConsumer
    {
        string res = "";
        public string ConsumeMessage(string queueName)
        {
            
            var factory = new ConnectionFactory
            {

                Uri = new Uri("amqp://guest:guest@127.0.0.1:5672")

            };

            var connection = factory.CreateConnection();
            var channel = connection.CreateModel();

            channel.QueueDeclare(queueName,
                durable: true,
                exclusive: false,
                autoDelete: false,
                arguments: null);

            //var messgae = new { Name = "producer", Messgae = "hello" };

            //var body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(messgae));

            //channel.BasicPublish("", queueName, null, body);

            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += (sender, e) =>
             {
                 var body = e.Body.ToArray();
                 var message = Encoding.UTF8.GetString(body.ToArray());
                 result(message);
             };

            

            channel.BasicConsume("Test-queue", true, consumer);

            return res;

        }

        public void result(string message)
        {
            res = message;
        }
    }
}
