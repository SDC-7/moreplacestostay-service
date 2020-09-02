const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'airbnb_nearby_residences';

MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  findDocuments(db, () => {
    client.close();
  });
});

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('residences');

  var query =
    { location :
      { $near :
        { $geometry:
          { type: "Point",
            coordinates: [ -73.9667, 40.78 ] },
            $maxDistance: 100000
        }
      }
    }
  // Find some documents
  collection
  .find query
  .limit 12
  .toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
}


