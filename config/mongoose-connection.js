const mongoose = require('mongoose');
const config = require('config');

mongoose
.connect(`${config.get("MONGODB_URI")}`)
.then(() => {
    console.log('connected');
})
.catch((err) => {
    console.error(err);
});

module.exports = mongoose.connection;