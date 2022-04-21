const mongoose = require('mongoose')

async function connect() {
  try {
    await mongoose.connect(
      'mongodb+srv://ayo:Iamisaac12@cluster0.xaitz.mongodb.net/test',
      { useNewUrlParser: true }
    )
  } catch (err) {
    console.err('Error connecting to mongodb')
    console.error(err)
  }
}

module.exports = { connect }

//mongodb+srv://<username>:<password>@cluster0.xaitz.mongodb.net/test
//https://downloads.mongodb.com/compass/mongodb-compass-1.31.0-darwin-x64.dmg
