//Import the mongoose module
var mongoose = require('mongoose');

console.log('Connecting to database...')

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

console.log('Connected to Database.')
module.exports = (mongoose);
