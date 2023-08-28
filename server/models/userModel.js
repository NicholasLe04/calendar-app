const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = Schema(
    {
        username: {
            type: String,
        },
        password: {
            type: String,
        },
        token: {
            type: String,
        },
        events: {
            type: Array,
        }
    }
)

let userModel = mongoose.model("user", userSchema);

module.exports = userModel;