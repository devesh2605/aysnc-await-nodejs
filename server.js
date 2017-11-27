const express = require('express'),
bodyParser = require('body-parser'),
dbConfig = require('./config/database.config.js'),
mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

/**
* MongoDB Connection
*/
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useMongoClient: true
})
.then(() =>
    console.log('connection succesfully established'))
.catch((err) =>
    console.error(err));

/**
 * Required Routes
 */
require('./app/routes/user.route')(app);

/**
 * Listen to server
 */
app.listen(port, function() {
    console.log('Server is listening on port ', port);
});