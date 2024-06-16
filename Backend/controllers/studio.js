const Studio = require("../models/studio");
const StudioRoom = require("../models/studioroom");

exports.GetAllStudios = async (req, res) => {
  try {
    const studios = await Studio.find();

    if (!studios) {
      return res.status(400).json({ success: false, message: "No studios found" });
    }

    res.status(200).json({ success: true, data: studios });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.GetStudioByID = async (req, res) => {
  try {
    const id = req.params.studioID;
    const studio = await Studio.findOne({ StudioID: id });

    if (!studio) {
      return res.status(400).json({ success: false, message: "Studio not found" });
    }

    res.status(200).json({ success: true, data: studio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.InsertNewStudio = async (req, res) => {
  try {
    const newStudio = new Studio(req.body);
    const studio = await Studio.findOne({ StudioID: newStudio.StudioID });

    if (studio) {
      return res.status(400).json({ success: false, message: "Studio already exists" });
    }
    await newStudio.save();

    const newStudioRoom = new StudioRoom({
      StudioID: newStudio.StudioID,
      RoomList: []
    });
    await newStudioRoom.save();

    res.status(200).json({ success: true, data: newStudio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.UpdateStudio = async (req, res) => {
  try {
    const id = req.body.StudioID;
    const updatedStudio = await Studio.findOneAndUpdate({ StudioID: id }, req.body, { new: true });

    if (!updatedStudio) {
      return res.status(400).json({ success: false, message: "Studio not found" });
    }

    res.status(200).json({ success: true, data: updatedStudio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.DeleteStudio = async (req, res) => {
  try {
    const id = req.params.studioID;
    const deletedStudio = await Studio.findOneAndDelete({ StudioID: id });

    if (!deletedStudio) {
      return res.status(400).json({ success: false, message: "Studio not found" });
    }

    await StudioRoom.findOneAndDelete({ studioID: id });

    res.status(200).json({ success: true, data: deletedStudio });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
