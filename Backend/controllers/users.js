const Users = require('../models/users');

exports.GetAllUsers = async (req, res) => {
    try {
        const users = await Users.find({}).exec();

        if (!users) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({success: true, data: users});

    } catch (error) {
        res.status(500).json({success: false, message: err.message});
    }
}

exports.GetUserByID = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findOne({ id: id }).exec();

        if (!user) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({success: true, data: user});
    } catch (error) {
        res.status(500).json({success: false, message: err.message});
    }
}

exports.UpdateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = await Users.findOneAndUpdate({ id: id }, req.body, { new: true }).exec();
        
        if (!updatedUser) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({success: true, data: updatedUser});
    } catch (error) {
        res.status(500).json({success: false, message: err.message});
    }
}