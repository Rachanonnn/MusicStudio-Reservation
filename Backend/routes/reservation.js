const express = require('express');
const router = express.Router();

const { GetAllReservation, GetReservationByID, InsertNewReservation, UpdateReservation, DeleteReservation } = require('../controllers/reservation');

router.get('/reservation/get_all_reservation', GetAllReservation);
router.get('/reservation/get_reservation_by_id/:id', GetReservationByID);
router.post('/reservation/create_reservation', InsertNewReservation);
router.put('/reservation/update_reservation/:id', UpdateReservation);
router.delete('/reservation/delete_reservation/:id', DeleteReservation);

module.exports = router;