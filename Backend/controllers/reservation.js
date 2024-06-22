const Reservation = require('../models/reservation');
const Studio = require('../models/studio');

exports.GetAllReservation = async (req, res) => {
    try {

        if (req.user.Role != "admin") {
            return res.status(401).json({success: false, message: "Unauthorized access"});
        }

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
        const { StudioID, RoomID, ReservationDate, StartTime, EndTime, TotalCost } = req.body;

        const studio = await Studio.findOne({ StudioID });
        if (!studio) {
            return res.status(400).json({ success: false, message: 'Studio not found' });
        }

        const studioRoom = studio.RoomList.find((room) => room.RoomID === RoomID);

        if (!studioRoom) {
          return res.status(404).json({ success: false, message: "Room not found in the studio" });
        }

        if (studioRoom.Status != "Available") {
            return res.status(400).json({ success: false, message: 'Room is not available' });
        }

        if (StartTime >= EndTime) {
            return res.status(400).json({ success: false, message: 'Start time must be before end time' });
        }

        const existingReservation = await Reservation.findOne({
            StudioID,
            ReservationDate,
            $or: [
                { StartTime: { $lt: EndTime, $gte: StartTime } },
                { EndTime: { $gt: StartTime, $lte: EndTime } }
            ]
        });

        if (existingReservation) {
            return res.status(400).json({ success: false, message: 'Already reserved for this time' });
        }

        const lastReservation = await Reservation.findOne().sort({ _id: -1 }).limit(1);
        let newReservationID;
        if (lastReservation) {
            const lastID = parseInt(lastReservation.ReservationID.substring(1));
            newReservationID = `R${lastID + 1}`;
        } else {
            newReservationID = `R100000`;
        }

        const newReservation = new Reservation({
            ReservationID: newReservationID,
            StudioID,
            UID: req.user.UID,
            ReservationDate,
            StartTime,
            EndTime,
            TotalCost,
        });

        await newReservation.save();

        studioRoom.Status = "Unavailable";
        await studio.save();

        res.status(200).json({ success: true, data: newReservation });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.UpdateReservation = async (req, res) => {
    try {
        const ReservationID = req.params.id;
        const { StudioID, ReservationDate, StartTime, EndTime, TotalCost } = req.body;

         let reservation = await Reservation.findOne({ ReservationID });
         if (!reservation) {
             return res.status(404).json({ success: false, message: 'Reservation not found' });
         }
 
         const studio = await Studio.findOne({ StudioID });
         if (!studio) {
             return res.status(400).json({ success: false, message: 'Studio not found' });
         }
 
         const existingReservation = await Reservation.findOne({
             StudioID,
             ReservationDate,
             $and: [
                 { ReservationID: { $ne: reservation.ReservationID } },
                 {
                     $or: [
                         { StartTime: { $lt: EndTime, $gte: StartTime } },
                         { EndTime: { $gt: StartTime, $lte: EndTime } }
                     ]
                 }
             ]
         });
 
         if (existingReservation) {
             return res.status(400).json({ success: false, message: 'Overlap with existing reservation' });
         }
 
         reservation.StudioID = StudioID;
         reservation.ReservationDate = ReservationDate;
         reservation.StartTime = StartTime;
         reservation.EndTime = EndTime;
         reservation.TotalCost = TotalCost;
 
         await reservation.save();
 
         res.status(200).json({ success: true, data: reservation });
 
     } catch (error) {
         res.status(500).json({ success: false, message: error.message });
     }
 }

 exports.DeleteReservation = async (req, res) => {
    try {
        const { ReservationID } = req.params;

        const reservation = await Reservation.findOneAndDelete({ ReservationID });

        if (!reservation) {
            return res.status(404).json({ success: false, message: 'Reservation not found' });
        }

        const { StudioID, RoomID } = reservation;

        const studio = await Studio.findOne({ StudioID });

        if (!studio) {
            return res.status(400).json({ success: false, message: 'Studio not found' });
        }

        const studioRoom = studio.RoomList.find((room) => room.RoomID === RoomID);

        if (!studioRoom) {
            return res.status(404).json({ success: false, message: 'Room not found in the studio' });
        }

        studioRoom.Status = "Available";
        await studio.save();

        res.status(200).json({ success: true, data: reservation });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
