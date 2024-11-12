const mongoose = require("mongoose");

main().then((res) => {
    console.log("Connected Successfully!");
}).catch((err) => {
    console.log("Error caught", err);
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

const msgSchema = new mongoose.Schema({
    to: {
        type: String,
        required: true
    },
    msg : {
        type: String,
        required: true,
    },
    msgType: {
        type: String,
        enum: ["sent", "recieved"],
        required: true
    },
    created_at: {
        type: Date,
        required: true
    }
})

const Message = mongoose.model("Messages", msgSchema);
module.exports = Message;