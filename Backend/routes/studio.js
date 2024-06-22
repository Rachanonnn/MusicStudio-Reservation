const express = require('express');
const router = express.Router();

const roomController = require('../controllers/studioroom');
const equipmentController = require('../controllers/roomEquipment');
const studioController = require('../controllers/studio');

const { auth } = require('../middlewares/auth');

router.use(auth);

router.get('/studio/get_all_studios', studioController.GetAllStudios);
router.get('/studio/get_studio_by_id/:studioID', studioController.GetStudioByID);
router.post('/studio/create_studio', studioController.InsertNewStudio);
router.put('/studio/update_studio', studioController.UpdateStudio);
router.delete('/studio/delete_studio/:studioID', studioController.DeleteStudio);

router.get('/studio/get_all_studio_rooms/:studioID', roomController.GetAllStudioRooms);
router.get('/studio/get_studio_room_by_id/:studioID/rooms/:roomID', roomController.GetStudioRoomByID);
router.post('/studio/create_studio_room', roomController.InsertNewStudioRoom);
router.put('/studio/update_studio_room', roomController.UpdateStudioRoom);
router.delete('/studio/delete_studio_room/:studioID/rooms/:roomID', roomController.DeleteStudioRoom);

router.get('/studio/get_all_equipments/:studioID/rooms/:roomID', equipmentController.GetAllEquipment);
router.get('/studio/get_equipment_by_id/:studioID/rooms/:roomID/equipment/:equipmentID', equipmentController.GetEquipmentByID);
router.post('/studio/create_equipment', equipmentController.InsertNewEquipment);
router.put('/studio/update_equipment', equipmentController.UpdateEquipment);
router.delete('/studio/delete_equipment/:studioID/rooms/:roomID/equipment/:equipmentID', equipmentController.DeleteEquipment);

module.exports = router;