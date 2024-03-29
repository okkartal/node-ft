require('dotenv').config();
const mongoose = require('mongoose');
const { AccountSchema} = require('../models/accountModel');
const { UserSchema } = require('../models/userModel');
const { ObjectId } = require('bson');

const Account = mongoose.model('Accounts', AccountSchema);
const User = mongoose.model('Users', UserSchema);

const connectDB = async () => {
    mongoose.connect(
            process.env['MONGO_URI'], {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        .then(() =>  {
            console.log('DB Connected');
            seed(); 
        })
        .catch(() => `An error occured while connecting to DB`);  
}

function createUsers(userIds) {

    for(let i = 0; i < userIds.length; i++) {
        const user = new User({
            _id: new ObjectId(userIds[i]),
            userName: `user_${i}`,
            email: `test_${i}@gmail.com`
       });
    user.save();
    }  
}

function createAccounts(userIds) {
    const accountIds = ["65977d1867fe0da87be0f868","65977d1867fe0da87be0f869","65977d1867fe0da87be0f86b"];

        for(let i = 0; i < userIds.length; i++) {
            const account = new Account({
                _id: new ObjectId(accountIds[i]),
                userId: userIds[i],
                balance: 1000
            });
            account.save();
        }
}

const seed =  () => {

    const userIds = ["65977a1f006a450701d43d6f","65977a1f006a450701d43d70","65977a1f006a450701d43d71"];
   
    try {

        User.countDocuments().then((count) => {
            if (count === 0) {
                createUsers(userIds);
            }
        });

        Account.countDocuments().then((count) => {
            if (count === 0) {
                createAccounts(userIds);
            }
        });

        console.log("Database seeded 🌱");
    } catch (x) {
        console.error(x);
    }
};


module.exports = connectDB;