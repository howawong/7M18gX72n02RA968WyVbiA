var config = require('./config');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.model('Currency', new Schema({from: String, to: String, created_at: {type:Date, default:Date.now}, rate: String}))

db = mongoose.createConnection(config.dbconnection);
var save = function(from, to, rate) {
    var Currency = db.model('Currency');
    var record = new Currency({from: from, to: to, rate: rate})
    record.save(
        function(err) {
            if (err) { console.log(err); throw err};
            console.log("Saved");
        }
    );
}

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
      console.log('Mongoose disconnected on app termination');
          process.exit(0);
    });
});

module.exports.save = save;
