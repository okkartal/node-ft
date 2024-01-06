const {  
    users, 
    accounts, 
    transactions, 
    accountBalance, 
    depositFunds, 
    withdrawFunds 
     } = require("../controllers/apiController");
     
const router = require("express").Router();

router.get('/api', users);
router.get('/api/users', users);
router.get('/api/accounts', accounts);
router.get('/api/transactions/:accountId', transactions);
router.get('/api/accountBalance/:userId', accountBalance);
router.post('/api/depositFunds', depositFunds);
router.post('/api/withdrawFunds', withdrawFunds);

module.exports = router;