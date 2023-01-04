require('dotenv').config();
const amqplib = require('amqplib');
const nodemailer = require('nodemailer');
const amqpUrl = 'amqp://rabbit:ribbit@rabbitmq:5672';

async function processMessage(msg) {
  const content = msg.content.toString();
  console.log('message: ', content);
  const { email } = JSON.parse(content);
  console.log('email env: ', process.env.EMAIL_USERNAME);
  console.log('pw env: ', process.env.EMAIL_PASSWORD);
  
  console.log('email to be sent to: ', email);
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    }
  });
  console.log('sending email', new Date());
  await transporter.sendMail({
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: 'Test Email dari MQ',
    text: 'isi test email ini adalah kosong'
  });
  console.log('email sent', new Date());
}

(
  async () => {
    let connection, channel;
    try {
      connection = await amqplib.connect(amqpUrl, "heartbeat=60");
      channel = await connection.createChannel();
      channel.prefetch(10);
      const queue = 'broker.email';
      process.once('SIGINT', async () => {
        console.log('got sigint, closing connection');
        await channel.close();
        await connection.close();
        process.exit(0);
      });
      await channel.assertQueue(queue, { durable: true });
      await channel.consume(queue, async (msg) => {
        console.log('processing messages');
        await processMessage(msg);
        await channel.ack(msg);
      },
        {
          noAck: false,
          consumerTag: 'email_consumer'
        });
    } catch (e) {
      await channel.close();
      await connection.close();
      process.exit(0);
    }
  }
)();