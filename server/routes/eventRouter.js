const express = require("express");
const User = require("../models/userModel");
const Event = require("../models/eventModel");
const mongoose = require("mongoose");

require('dotenv').config({ path: '../config.env' });

const eventRouter = express.Router();

eventRouter.post("/add-event", async (req, res) => {
    const { user_id, event } = req.body;
  
    // Validate user input
    if (!(user_id && event)) {
        return res.status(400).json({
            status: 400,
            message: "Missing parameters"
        });
    }
    
    await User.updateOne( 
        { 
            _id: mongoose.Types.ObjectId(user_id) 
        },
        {
            $push: 
            { 
                events: new Event(event)
            }
        }
    );

    return res.status(200).json(event._id);
});

eventRouter.post("/delete-event", async (req, res) => {
    const { user_id, event_id } = req.body;

    // Validate user input
    if (!(user_id && event_id)) {
        return res.status(400).json({
            status: 400,
            message: "Missing parameters"
        });
    }

    await User.updateOne( 
        { 
            _id: mongoose.Types.ObjectId(user_id) 
        },
        { 
            $pull: 
            { 
                events: { _id: mongoose.Types.ObjectId(event_id) } 
            } 
        }
    );

    return res.status(200).json(event_id);
});

module.exports = eventRouter;