const express = require('express');
const mongoose = require('mongoose');

const app = express();

const url = `mongodb+srv://Henry:henry@cluster0.8a9be.mongodb.net/airbnb?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use(express.json());

const airbnbSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageurl: String,
});

const Airbnbs = mongoose.model('Airbnbs', airbnbSchema);

app.get('/api/moreplacestostay', (req, res) => {
  Airbnbs.find({}, (err, data) => {
    if (err) res.status(404).send(err);
    res.send(data);
  })
});

app.listen(3030, () => {
  console.log('Server running on 3030');
});








