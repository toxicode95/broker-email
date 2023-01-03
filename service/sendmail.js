const amqplib = require('amqplib');
const amqpUrl = 'amqp://rabbit:ribbit@rabbitmq:5672';

module.exports = {
  async publish(email) {
    let channel, connection;
    try {
      console.log('url', amqpUrl);
      connection = await amqplib.connect(amqpUrl, 'heartbeat=60');
      channel = await connection.createChannel();
      console.log('Publishing');
      const exchange = 'broker';
      const queue = 'broker.email';
      const routingKey = 'email';

      await channel.assertExchange(exchange, 'direct', { durable: true });
      await channel.assertQueue(queue, { durable: true });
      await channel.bindQueue(queue, exchange, routingKey);

      const msg = {
        email,
      };
      await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(msg)));
      console.log('Message published');
    } catch (e) {
      console.error('Error in publishing message', e);
    } finally {
      console.info('Closing channel and connection if available');
      await channel.close();
      await connection.close();
      console.info('Channel and connection closed');
    }
  }
}