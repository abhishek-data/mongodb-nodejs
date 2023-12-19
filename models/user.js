// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   name: Sequelize.STRING,
//   email: Sequelize.STRING
// });


const mongodb = require('mongodb')
const { getDb } = require('../util//database')

class User {
  constructor(name, email) {
    this.name = name
    this.email = email

  }


  save() {
    const db = getDb()
    return db.collection('users').insertOne(this)
    .then(result => {
      console.log(result)
      return result
    })
    .catch(err => console.log(err))
  }

  static findById(id){
    const db = getDb()
    return db.collection('users')
    .findOne({_id: new mongodb.ObjectId(id)})
    .then(user => {
      console.log(user)
      return user
    })
    .catch(err => console.log(err))
  }
}

module.exports = User;
