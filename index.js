require('dotenv').config();
const express = require("express");

const app = express();
const router = require('./router');
const { httpStatus } = require('./config/constants');
const { formatter } = require('./middleware');

app.use(express.json());
app.use(formatter());
app.use('/', router);

app.use((req, res) => res.response(httpStatus.notFound, ({ message: 'API not found' })));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
