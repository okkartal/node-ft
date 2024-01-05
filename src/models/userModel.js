var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
 userName: {
    type: String,
    required: 'Kindly enter the name of the user',
    maxLength: 20
 },
 email: {
    type: String,
    required: 'Kindly enter the email of the user',
    maxLength: 50
 }
});

module.exports = mongoose.model('Users', UserSchema);