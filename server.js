const express = require('express');
const routes = require('./routes');
const { Sequelize } = require('sequelize');
// import sequelize connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'path/to/database.sqlite'
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
