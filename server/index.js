const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');

const session = require('express-session');
const passport = require('passport');


require("./models/trades");
require("./models/users");
require("./models/threads");
require("./models/posts");
require("./models/categories");
require("./models/brands");
require("./models/prices");

require("./services/passport");

const tradesRoutes = require('./routes/trades'),
      usersRoutes = require('./routes/users'),
      threadsRoutes = require('./routes/threads'),
      postsRoutes = require('./routes/posts'),
      categoriesRoutes = require('./routes/categories'),
      brandsRoutes = require('./routes/brands'),
      pricesRoutes = require('./routes/prices'),
      apiRoutes = require('./routes/api');

mongoose.connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => console.log('DB Connected!'))
  .catch(err => console.log(err));

const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server, {pingTimeout: 60000})

require('./socket')(io)

app.use(bodyParser.json());


app.use('/api/v1', apiRoutes)
app.use('/api/v1/trades', tradesRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/posts', postsRoutes);
app.use('/api/v1/threads', threadsRoutes);
app.use('/api/v1/categories', categoriesRoutes);
app.use('/api/v1/brands', brandsRoutes);
app.use('/api/v1/prices', pricesRoutes);

const PORT = process.env.PORT || 3001;

server.listen(PORT , function() {
  console.log('App is running on port: ' + PORT);
});