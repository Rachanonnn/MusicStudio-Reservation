const express = require('express');
const router = express.Router();

const {
    GetAllReservation,
    GetReservationByID,
    InsertNewReservation,
    UpdateReservation,
    DeleteReservation
} = require('../controllers/reservation');

const { auth } = require('../middlewares/auth');

router.use(auth);

router.get('/reservations', GetAllReservation);
router.get('/reservations/:id', GetReservationByID);
router.post('/reservations', InsertNewReservation);
router.put('/reservations/:id', UpdateReservation);
router.delete('/reservations/:id', DeleteReservation);

module.exports = router;
