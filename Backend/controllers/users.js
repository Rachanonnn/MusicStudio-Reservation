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
        const user = await Users.findOne({ uid: id }).exec();

        if (!user) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({success: true, data: user});
    } catch (error) {
        res.status(500).json({success: false, message: err.message});
    }
}

exports.InsertNewUser = async (req, res) => {
    try {
        const newUser = await Users(req.body).save();
        
        if (!newUser) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({success: true, data: newUser});

    } catch (error) {
        res.status(500).json({success: false, message: err.message});
    }
}

exports.UpdateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = await Users.findOneAndUpdate({ uid: id }, req.body, { new: true }).exec();
        
        if (!updatedUser) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({success: true, data: updatedUser});
    } catch (error) {
        res.status(500).json({success: false, message: err.message});
    }
}

exports.DeleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await Users.findOneAndDelete({ uid: id }).exec();
        
        if (!deletedUser) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({success: true});
    } catch (error) {
        res.status(500).json({success: false, message: err.message});
    }
}