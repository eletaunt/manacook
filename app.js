var MongoClient = require('mongodb').MongoClient,
assert = require('assert');

// connection url
var url = 'mongodb://localhost:27017/myproject';

var insertDocs = function(db, callback) {
  // get docs collection
  var collection = db.collection('documents');

  var newDocs = [
    {a: 1},
    {a: 2},
    {a: 3}
  ];
  // insert docs
  collection.insertMany(newDocs, function(err, result) {
    // result contains result, ops, and connection
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 docs into collection");
    callback(result);
  });
}

var findAllDocs = function(db, callback) {
  // get doc collection
  var collection = db.collection('documents');
  // find docs
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found following records:");
    console.log(docs);
    callback(docs);
  })
}

var findDocs = function(db, callback) {
  // get doc collection
  var collection = db.collection('documents');
  // find specific docs
  collection.find({'a': 3}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found following records:");
    console.log(docs);
    callback(docs);
  })
}

var updateDoc = function(db, callback) {
  // get doc collection
  var collection = db.collection('documents');
  // update first doc where a is 3, set b to 1
  collection.updateOne({a: 3}, {$set: {b: 1}}, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated doc where a == 3 to b = 1");
    callback(result);
  })
}

var removeDoc = function(db, callback) {
  // get doc collection
  var collection = db.collection('documents');
  // delete first doc where a == 3
  collection.deleteOne({a: 3}, (err, result) => {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed doc with field a == 3");
    callback(result);
  })
}

var createIndex = function(db, callback) {
  // create index on "a" field in "documents" collection to improve performance
  db.collection('documents').createIndex(
    {"a": 1}, null, function(err, result) {
      console.log("created new index: " + result);
      callback();
    }
  )
}

// use connect method to connect to server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server!");

  createIndex(db, () => {
    findAllDocs(db, () => {
      db.close();
    });
  });
})
