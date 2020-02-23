const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const Reservation = require("./model/reservationSchema");
const User = require("./model/userSchema");
const db = process.env.MONGODB_URL;

// mongodb://localhost/Hotel
mongoose
  .connect(
    db ||
      "mongodb+srv://hotel:dbhotel@hotel-management-glyaf.mongodb.net/test?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(res => {
    console.log("connected");
  })
  .catch(err => {
    console.log({ err });
  });

// require('./utils/utils')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Successful Deployment");
  User.find({}, (err, users) => {
    if (users) {
      console.log(users);
    }
  });
});

app.post("/login", async (req, res) => {
  console.log({ username, password });
  User.findOne({ username, password }, (err, users) => {
    if (users) {
      res.send(users);
    } else {
      console.error("User not found");
    }
  });
});

app.get("/reservations", (req, res) => {
  Reservation.find({}, (err, reservations) => {
    if (err) {
      return err;
    } else {
      res.send(reservations);
      return reservations;
    }
  });
});

app.post("/add_reservation", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    age,
    address,
    reasonForStay,
    duration
  } = req.body;
  const newReservation = await new Reservation({
    firstName,
    lastName,
    email,
    phone,
    age,
    address,
    reasonForStay,
    duration
  });
  newReservation
    .save()
    .then(newRes => {
      console.log("Saved");
      res.send(newRes);
    })
    .catch(err => {
      console.log("Error", err);
    });
});

app.delete("/deleteAll", (req, res) => {
  Reservation.deleteMany({}, (err, removed) => {
    if (err) {
      return err;
    } else {
      res.send(removed);
    }
  });
});

app.delete("/deleteOne/:id", (req, res) => {
  console.log(req.params);
  Reservation.findByIdAndRemove(req.params.id, (err, removed) => {
    if (err) {
      return err;
    } else {
      res.send(removed);
    }
  });
});

app.put("/update-reservation/:id", (req, res) => {
  console.log(req.params);
  Reservation.findByIdAndUpdate(req.params.id, req.body, (err, updated) => {
    if (err) {
      return err;
    } else {
      console.log(updated);
      res.send(updated);
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
