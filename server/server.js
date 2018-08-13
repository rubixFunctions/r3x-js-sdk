'use strict';

const express = require('express');
const r3x = require('../r3x.js');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.get('/', (req, res) => {
  res.send(r3x.execute(req));
});


app.post('/', (req, res) => {
    res.send(r3x.execute(req));
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
