
const express = require('express');
const app = express();
const port = 3000;

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const collection = 'airbnb_nearby_residences';
var db;

MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  db = client.db(collection)


  app.get('/residences/:id', (req, res) => {
    var id = Number(req.params.id);
    findLatitudeAndLongitude(db, id, (data) => {
      if (data === 'Error') return res.sendStatus(500);
      res.send(data)
    })
  })

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
});

const findLatitudeAndLongitude = function(db, id, callback) {
  var collection = db.collection('residences');
  collection.findOne({'_id': id})
  .then((data) => {
    findDocuments(db, data.long, data.lat, callback)
  })
  .catch((err) => {
    callback('Error')
  })
}


var findDocuments = function(db, long, lat, callback) {
  var collection = db.collection('residences');
  // Find some documents
  collection.find(
	{ location :
	  { $nearSphere :
	    { $geometry:
        { type: "Point",
          coordinates: [ long, lat ] },
          $minDistance: 1,
          $maxDistance: 60000
	    }
	  }
	}
  ).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
}