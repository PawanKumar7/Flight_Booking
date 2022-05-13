using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.Text;

namespace RabbitMQ.Consumer
{
    public static class QueueConsumer
    {
        public static void Consume(IModel channel)
        {
            Console.WriteLine("Ashish : Consumer");
            channel.QueueDeclare("input-queue",
                      durable: true,
                      exclusive: false,
                      autoDelete: false,
                      arguments: null);
            var consumer = new EventingBasicConsumer(channel);

            consumer.Received += (sender, e) =>
            {

                var body = e.Body.ToArray();

                var message = Encoding.UTF8.GetString(body);

                Console.WriteLine(message);
                
            };
            channel.BasicConsume("input-queue", true, consumer);
            Console.WriteLine("Ashish : Consumer Ready");
            Console.ReadLine();

        }

    }

}