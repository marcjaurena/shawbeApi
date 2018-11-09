const express = require('express');
const router = express.Router();
const StoreCtrl = require('../controllers/storeCtrl');

router.get('/stores/all', StoreCtrl.getAllStores);

router.post('/store/review', StoreCtrl.addReview);
router.post('/search-store', StoreCtrl.search);

module.exports = router;