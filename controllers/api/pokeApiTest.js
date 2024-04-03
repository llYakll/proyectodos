//import route handler
const pokemonRoutes = require('./pokeApiRoutes');
//create express instance
const express = require('express');
const app = express();

//mount route handler
app.use('/api', pokemonRoutes);
//start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});
