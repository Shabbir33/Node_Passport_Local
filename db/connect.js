const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectDB = (url) => {
  return con = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(console.log("Connected to DB..."))
}

module.exports = connectDB