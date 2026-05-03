const {Schema} = require("mongoose");

const OrdersSchema = new Schema ({
    name: String,
    qty: Number,
    price: Number,
    mode: String,
    date: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = {OrdersSchema};