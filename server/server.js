const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const expressUploader = require("express-fileupload");


const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express file uploader middleware
app.use(expressUploader());


// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());


const conditionRouter = require("./routes/condition.router")
/* Routes */
app.use('/api/user', userRouter);
app.use('/condition', conditionRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
