const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let eventSchema = Schema(
    {
        title: {
            type: String,
        },
        start: {
            type: Date
        },
        length: {
            type: Number
        },
    }
)

let eventModel = mongoose.model("event", eventSchema);

module.exports = eventModel;