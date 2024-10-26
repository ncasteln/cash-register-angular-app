const mongoose = require('mongoose');

const dbConnection = mongoose.connect(process.env.MONGODB_URI)
  .then(() => { console.log("* Connected to database") })
  .catch((e) => { console.error(e); })

module.exports = dbConnection;
