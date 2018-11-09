const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/userCtrl');

router.get('/home/:email', UserCtrl.homePage);
router.get('/users', UserCtrl.profileUser);
router.get('/users/all', UserCtrl.getAllUsers);

router.post('/signup/user', UserCtrl.createUser);
router.post('/login/user', UserCtrl.loginUser);
router.post('/search-user', UserCtrl.searchUser);

router.put('/update/user', UserCtrl.updateUser);
router.put('/admin/user', UserCtrl.updateAdminUser);

router.delete('/delete/user/:id', UserCtrl.deleteUser);



module.exports = router;


