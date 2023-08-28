const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let eventSchema = Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,  
        },
        start: {
            type: Date,
        },
        length: {
            type: Number,
        },
        repetitions: {
            type: Array,
        }
    }
)

let eventModel = mongoose.model("event", eventSchema);

module.exports = eventModel;