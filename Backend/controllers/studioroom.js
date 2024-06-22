const StudioRoom = require("../models/studioroom");
const RoomEquipment = require("../models/roomEquipment");

exports.GetAllStudioRooms = async (req, res) => {
  try {
    const studioID = req.params.studioID;
    const studioRooms = await StudioRoom.findOne({ StudioID: studioID });

    if (!studioRooms) {
      return res.status(404).json({ success: false, message: "Studio Rooms not found" });
    }

    res.status(200).json({ success: true, data: studioRooms.RoomList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.GetStudioRoomByID = async (req, res) => {
  try {
    const studioID = req.params.studioID;
    const roomID = req.params.roomID;
    const studio = await StudioRoom.findOne({ StudioID: studioID });

    if (!studio) {
      return res.status(404).json({ success: false, message: "Studio not found" });
    }

    const studioRoom = studio.RoomList.find((room) => room.RoomID === roomID);

    if (!studioRoom) {
      return res.status(404).json({ success: false, message: "Room not found in the studio" });
    }

    res.status(200).json({ success: true, data: studioRoom });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.InsertNewStudioRoom = async (req, res) => {
  try {

    if (req.user.Role != "admin") {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    const studioID = req.body.StudioID;
    const newRoom = req.body.newRoom;

    const studio = await StudioRoom.findOne({ StudioID: studioID });

    if (!studio) {
      return res.status(404).json({ success: false, message: "Studio not found" });
    }

    if (studio.RoomList.some((room) => room.RoomID === newRoom.RoomID)) {
      return res.status(400).json({ success: false, message: "Room already exists in the studio" });
    }

    const updatedStudioRoom = await StudioRoom.findOneAndUpdate(
      { StudioID: studioID },
      { $push: { RoomList: newRoom } },
      { new: true }
    );

    if (!updatedStudioRoom) {
      return res.status(404).json({ success: false, message: "Studio not found" });
    }

    const newRoomEquipment = new RoomEquipment({
      StudioID: studioID,
      RoomID: newRoom.RoomID,
      EquipmentList: []
    });

    await newRoomEquipment.save();

    res.status(200).json({ success: true, data: updatedStudioRoom.RoomList.slice(-1)[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.UpdateStudioRoom = async (req, res) => {
  try {

    if (req.user.Role != "admin") {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    const studioID = req.body.StudioID;
    const roomData = req.body.roomData;
    const roomID = req.body.roomData.RoomID;

    const studio = await StudioRoom.findOne({ StudioID: studioID })

    if (!studio) {
      return res.status(404).json({ success: false, message: "Studio not found" });
    }

    const roomIndex = studio.RoomList.findIndex((room) => room.RoomID === roomID);

    if (roomIndex === -1) {
      return res.status(404).json({ success: false, message: "Room not found in the studio" });
    }

    studio.RoomList[roomIndex] = roomData;

    await studio.save();

    res.status(200).json({ success: true, data: studio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.DeleteStudioRoom = async (req, res) => {
  try {

    if (req.user.Role != "admin") {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }
    
    const studioID = req.params.studioID;
    const roomID = req.params.roomID;

    const studio = await StudioRoom.findOne({ studioID });

    if (!studio) {
      return res.status(404).json({ success: false, message: "Studio not found" });
    }

    const updatedStudioRoom = await StudioRoom.findOneAndUpdate(
      { StudioID: studioID },
      { $pull: { RoomList: { RoomID: roomID } } },
      { new: true }
    );

    if (!updatedStudioRoom) {
      return res.status(404).json({ success: false, message: "Room not found in the studio" });
    }

    await RoomEquipment.findOneAndDelete({ StudioID: studioID, RoomID: roomID });

    res.status(200).json({ success: true, message: "successful deletion" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
