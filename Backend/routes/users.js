const express = require('express');
const router = express.Router();

const { GetAllUsers, GetUserByID, InsertNewUser, UpdateUser, DeleteUser } = require('../controllers/users');

const { auth } = require('../middlewares/auth');

router.use(auth);

router.get('/users/get_all_users', GetAllUsers);
router.get('/users/get_user_by_id/:id', GetUserByID);
// router.post('/users/create_user', InsertNewUser);
router.put('/users/update_user/:id', UpdateUser);
// router.delete('/users/delete_user/:id', DeleteUser);

module.exports = router;