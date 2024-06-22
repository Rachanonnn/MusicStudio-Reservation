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

router.get('/reservations/get_all_reservations', GetAllReservation);
router.get('/reservations/get_reservation_by_id/:id', GetReservationByID);
router.post('/reservations/create_reservation', InsertNewReservation);
router.put('/reservations/update_reservation/:id', UpdateReservation);
router.delete('/reservations/delete_reservation/:id', DeleteReservation);

module.exports = router;
