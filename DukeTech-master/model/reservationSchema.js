const mongoose = require("mongoose");

const reservationData = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  age: Number,
  address: String,
  reasonForStay: String,
  duration: Number,
  date: { type: Date, default: Date.now }
});

const Reservation = mongoose.model("reservation", reservationData);

module.exports = Reservation;
