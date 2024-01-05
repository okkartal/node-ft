var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({ 
 userId: {
    type: String,
 },
 balance: {
    type: Number,
 },

});

module.exports = mongoose.model('Accounts', AccountSchema);