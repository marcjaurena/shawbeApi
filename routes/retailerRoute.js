const express = require('express');
const router = express.Router();
const RetailerCtrl = require('../controllers/retailerCtrl');

router.get('/retailers/all', RetailerCtrl.getAllRetailers);
//router.get('/home/:email', UserCtrl.homePage);
//router.get('/settings/:email', UserCtrl.settingsPage);

router.post('/register/retailer', RetailerCtrl.createRetailer);
//router.post('/login/user', UserCtrl.loginUser);
router.post('/search-retailer', RetailerCtrl.searchRetailer);

router.put('/admin/retailer', RetailerCtrl.updateAdminRetailer);

router.delete('/delete/retailer/:id', RetailerCtrl.deleteRetailer);

module.exports = router;

