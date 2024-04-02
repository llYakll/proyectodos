const path = require('path');
const express = require('express');
// const expressHandlebars = require('express-handlebars');

const routes = require('./controllers');
const sequelize = require('./config/connection');
// const helpers = require('./utils');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});