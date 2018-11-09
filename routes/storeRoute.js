const express = require('express');
const router = express.Router();
const StoreCtrl = require('../controllers/storeCtrl');

router.get('/stores/all', StoreCtrl.getAllStores);

router.post('/store/review', StoreCtrl.addReview);
router.post('/search-store', StoreCtrl.search);
router.post('/store/create', StoreCtrl.createStore);

router.put('/update/store', StoreCtrl.updateStore);

router.delete('/delete/store/:id', StoreCtrl.deleteStore);

module.exports = router;