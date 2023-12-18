const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(process.env.MONGO_URI)
  .then((client) => {
    console.log('connected')
    _db = client.db()
    callback()
  })
  .catch((err) => {
    console.log(err)
    throw err
  })
}

const getDb = ()=>{
  if(_db){
    return _db
  }
  throw "No database found."
}

module.exports = {mongoConnect, getDb}