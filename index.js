const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;

app.use( bodyParser.json() );
app.use( cors() );

const usersURL = '/api/v1/users';

const Routes = require('./routes/Routes');

app.get('/', (request, response) => {
    response.send({ message: `Express server activity` });
})

app.use( usersURL, Routes );


app.listen( PORT, () => {
    console.log(`Server running on port ${PORT}`)
})