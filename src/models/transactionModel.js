var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({ 
 accountId: {
    type: String,
 },
 type: {
      type: String,
},
 amount: {
    type: Number,
 },
 timeStamp: {
    type: Date,
 }
});

module.exports = mongoose.model('Transactions', TransactionSchema);