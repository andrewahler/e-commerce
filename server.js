const express = require('express');
const routes = require('./routes');
const { Sequelize } = require('sequelize');
// import sequelize connection
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'andrewahler@gmail.com',
  password : 'Vandy2021!'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
sequelize.close()
// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: true })

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
