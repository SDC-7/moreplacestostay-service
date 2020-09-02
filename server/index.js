const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use('/', express.static('dist'))
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const url = `mongodb://localhost/airbnb`;
mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const airbnbSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageurl: String,

});

const Airbnbs = mongoose.model('Airbnbs', airbnbSchema);

app.get('/api/moreplacestostay', (req, res) => { // Make different API call urls + have them return 12 docs
  Airbnbs.find({}, (err, residences) => {
    if (err) res.status(404).send('Failed to get images');
    res.send(residences);
  });
});

app.put('/api/placestostay/:id', async (req, res) => {
  const filter = {_id: req.params.id};
  const update = {price: req.body.price, imageurl: req.body.imageurl};
  try {
    let doc = await Airbnbs.findOneAndUpdate(filter, update, {
      returnOriginal: false,
      useFindAndModify: false,
    });
    res.send(doc);
  } catch(error) {
    res.sendStatus(500)
  }
});

app.post('/api/placestostay/create', (req, res) => {
  const residence = new Airbnbs({
    name: req.body.name,
    price: req.body.price,
    imageurl: req.body.imageurl,
  });
  residence.save(function(err, residence) {
    if (err) return res.status(500).send('Failed to save.');
    res.send(residence)
  });
});

app.delete('/api/placestostay/:id', (req, res) => {
  Airbnbs.findOneAndDelete({ _id: req.params.id }, function(err, residence) {
    if (err) return res.sendStatus(500);
    return res.send(residence)
  });
});

app.listen(3030, () => {
  console.log('Server running on 3030');
});








