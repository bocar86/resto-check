const express = require('express');
const cors = require('cors');
const pg = require('pg');
const dotenv = require('dotenv').config()
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.send('Serveur ok !');
});
console.log(`bonjour ${process.env.PASSWORD} `)

app.listen(3000, () => {
  console.log('Serveur lancé sur http://localhost:3000');
});