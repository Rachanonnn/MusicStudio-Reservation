const Reservation = require('../models/reservation');

exports.GetAllReservation = async (req, res) => {
    try {

        const reservation = await Reservation.find({}).exec();

        if (!reservation) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({success: true, data: reservation});

    } catch (error) {
        res.status(500).json({success: false, message: err.message});
    }
}

exports.GetReservationByID = async (req, res) => {
    try {
        const id = req.params.id;
        const reservation = await Reservation.findOne({ UID: id }).exec();

        if (!reservation) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({success: true, data: reservation});
    } catch (error) {
        res.status(500).json({success: false, message: err.message});
    }
}

exports.InsertNewReservation = async (req, res) => {
    try {
        const newReservation = await Reservation(req.body).save();
        
        if (!newReservation) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({success: true, data: newReservation});

    } catch (error) {
        res.status(500).json({success: false, message: err.message});
    }
}

exports.UpdateReservation = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedReservation = await Reservation.findOneAndUpdate({ UID: id }, req.body, { new: true }).exec();
        
        if (!updatedReservation) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({success: true, data: updatedReservation});
    } catch (error) {
        res.status(500).json({success: false, message: err.message});
    }
}

exports.DeleteReservation = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedReservation = await Reservation.findOneAndDelete({ UID: id }).exec();
        
        if (!deletedReservation) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({success: true});
    } catch (error) {
        res.status(500).json({success: false, message: err.message});
    }
}