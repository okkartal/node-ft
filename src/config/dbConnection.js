require('dotenv').config();
const mongoose = require('mongoose');
const { AccountSchema} = require('../models/accountModel');
const { UserSchema } = require('../models/userModel');

const Account = mongoose.model('Accounts', AccountSchema);
const User = mongoose.model('Users', UserSchema);

const connectDB = async () => {
    mongoose.connect(
            process.env['MONGO_URI'], {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )
        .then(() => console.log('DB Connected'))
        .catch(() => `An error occured while connecting to DB`);


    function createUsers() {

        const users = [{
                userName: "user1",
                email: "someemail@gmail.com"
            },
            {
                userName: "user2",
                email: "someemail@yandex.com"
            },
            {
                userName: "user3",
                email: "someemail@hotmail.com"
            }
        ];
        User.insertMany(users);
    }

    async function createAccounts() {
        const registeredUsers = User.find({});

        for await (const user of registeredUsers) {
            const account = new Account({
                userId: user._id,
                balance: 1000
            });
            account.save();
        }
    }



    const seed = async () => {
        try {

            User.countDocuments().then((count) => {
                if (count === 0) {
                    createUsers();
                }
            });

            Account.countDocuments().then((count) => {
                if (count === 0) {
                    createAccounts();
                }
            });

            console.log("Database seeded 🌱");
        } catch (x) {
            console.error(x);
        }
    };

    await seed();

}

module.exports = connectDB;