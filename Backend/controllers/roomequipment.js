const RoomEquipment = require("../models/roomEquipment");

exports.GetAllEquipment = async (req, res) => {
  try {
    const studioID = req.params.studioID;
    const roomID = req.params.roomID;

    const roomEquipment = await RoomEquipment.findOne({ StudioID: studioID, RoomID: roomID });

    if (!roomEquipment) {
      return res.status(404).json({ success: false, message: "Room or equipment not found" });
    }

    res.status(200).json({ success: true, data: roomEquipment.EquipmentList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.GetEquipmentByID = async (req, res) => {
  try {
    const studioID = req.params.studioID;
    const roomID = req.params.roomID;
    const equipmentID = req.params.equipmentID;

    const roomEquipment = await RoomEquipment.findOne({ StudioID: studioID, RoomID: roomID });

    if (!roomEquipment) {
      return res.status(404).json({ success: false, message: "Room or equipment not found" });
    }

    const equipment = roomEquipment.EquipmentList.find(eq => eq.EquipmentID === equipmentID);

    if (!equipment) {
      return res.status(404).json({ success: false, message: "Equipment not found" });
    }

    res.status(200).json({ success: true, data: equipment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.InsertNewEquipment = async (req, res) => {
  try {
    const studioID = req.body.StudioID;
    const roomID = req.body.RoomID;
    const newEquipment = req.body.newEquipment;

    const roomEquipment = await RoomEquipment.findOne({ StudioID: studioID, RoomID: roomID });

    if (!roomEquipment) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    const equipmentIndex = roomEquipment.EquipmentList.findIndex(eq => eq.EquipmentID === newEquipment.EquipmentID);

    if (equipmentIndex !== -1) {
      return res.status(409).json({ success: false, message: "EquipmentID already exists" });
    }

    const updatedRoomEquipment = await RoomEquipment.findOneAndUpdate(
      { StudioID: studioID, RoomID: roomID },
      { $push: { EquipmentList: newEquipment } },
      { new: true }
    );

    if (!updatedRoomEquipment) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    res.status(200).json({ success: true, data: updatedRoomEquipment.EquipmentList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.UpdateEquipment = async (req, res) => {
  try {
    const studioID = req.body.StudioID;
    const roomID = req.body.RoomID;
    const equipmentData = req.body.equipmentData;
    const equipmentID = req.body.equipmentData.EquipmentID;

    const roomEquipment = await RoomEquipment.findOne({ StudioID: studioID, RoomID: roomID });

    if (!roomEquipment) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    const equipmentIndex = roomEquipment.EquipmentList.findIndex(eq => eq.EquipmentID === equipmentID);

    if (equipmentIndex === -1) {
      return res.status(404).json({ success: false, message: "Equipment not found" });
    }

    roomEquipment.EquipmentList[equipmentIndex] = { ...roomEquipment.EquipmentList[equipmentIndex], ...equipmentData };
    await roomEquipment.save();

    res.status(200).json({ success: true, data: roomEquipment.EquipmentList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.DeleteEquipment = async (req, res) => {
  try {
    const studioID = req.params.studioID;
    const roomID = req.params.roomID;
    const equipmentID = req.params.equipmentID;

    const updatedRoomEquipment = await RoomEquipment.findOneAndUpdate(
      { StudioID: studioID, RoomID: roomID },
      { $pull: { EquipmentList: { EquipmentID: equipmentID } } },
      { new: true }
    );

    if (!updatedRoomEquipment) {
      return res.status(404).json({ success: false, message: "Room or equipment not found" });
    }

    res.status(200).json({ success: true, data: updatedRoomEquipment.EquipmentList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
