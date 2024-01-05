const { TransactionSchema} = require('../models/transactionModel');
const { AccountSchema} = require('../models/accountModel');
const { UserSchema} = require('../models/userModel');

var mongoose = require('mongoose'),
    Transaction = mongoose.model('Transactions', TransactionSchema),
    Account = mongoose.model('Accounts', AccountSchema),
    User = mongoose.model('Users', UserSchema);

exports.users = function (req, res) {
    User.find({})
    .then((users) => {  res.status(200).json(users)})
    .catch((err) => { res.status(400).json(err)});
}

exports.accounts = function (req, res) {
    Account.find({})
    .then((accounts) => {  res.status(200).json(accounts)})
    .catch((err) => { res.status(400).json(err)});
}

exports.transactions = function (req, res) {

    const {
        accountId
    } = req.params;

    if (!accountId) {
        res.status(400).json('Please provide an accountId');
    }
    Transaction.find({
        "accountId": accountId
    })
    .then((transactions) => {  res.status(200).json(transactions)})
    .catch((err) => { res.status(400).json(err)}); 
}

exports.accountBalance = function (req, res) {
    const { userId } = req.params;

    if (!userId) {
        res.status(400).json('Please provide a userId');
    }

    Account.find({
        "userId": userId
    })
    .then((accounts) => {  res.status(200).json(accounts)})
    .catch((err) => { res.status(400).json(err)});
}

exports.depositFunds = function (req, res) {
    const { amount, accountId } = req.body;

    if (!amount || !accountId) {
        res.status(400).send('Please provide amount and accountId');
    }

    if(amount <= 0) {
        res.status(400).send('Please provide a positive amount');
    }

    Account.findOne({ _id: accountId })
    .then((account) => { 
        const newBalance =  account.balance + amount;
        Account.updateOne({ _id: accountId }, { $set: { balance: newBalance } })
        .then(() => { 
            const transaction = new Transaction({
                accountId: accountId,
                amount: amount,
                type: 'deposit'
            });
            transaction.save();
            res.status(204).json('deposit is completed')
        });
    })
    .catch(err => res.status(400).json(err)); 
}

exports.withdrawFunds = function (req, res) {

    const { amount, accountId } = req.body;

    if (!amount || !accountId) {
        res.status(400).send('Please provide amount and accountId');
    }

    Account.findOne({ _id: accountId })
    .then((account) => { 

        if(amount > account.balance) {
            res.status(400).send('Insufficient funds');
        }

        const newBalance =  account.balance - amount;
        Account.updateOne({ _id: accountId }, { $set: { balance: newBalance } })
        .then(() => { 
            const transaction = new Transaction({
                accountId: accountId,
                amount: amount,
                type: 'withdraw'
            });
            transaction.save();
            res.status(204).json('withdraw is completed')
        });
    })
    .catch(err => res.status(400).json(err));
}