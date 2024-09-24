import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../Utils.js';
import Booking from '../models/BookingModel.js';

const bookingRouter = express.Router();

bookingRouter.get(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const bookings = await Booking.find({});
    if (!bookings) {
      res.status(404).send({ message: 'No bookings found!' });
      return;
    }
    res.send(bookings);
    return;
  })
);

bookingRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const bookings = await Booking.find({ userId: req.params.id });
    if (!bookings) {
      res.status(404).send({ message: 'No bookings found!' });
      return;
    }
    res.send(bookings);
    return;
  })
);

bookingRouter.put(
  '/delete/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    await Booking.findOneAndDelete({ _id: req.params.id });
    const bookings = await Booking.find({ userId: req.params.id });
    if (!bookings) {
      res.status(404).send({ message: 'No bookings found!' });
      return;
    }
    res.send(bookings);
    return;
  })
);

bookingRouter.get(
  '/admin/delete/:id',
  expressAsyncHandler(async (req, res) => {
    const bookings = await Booking.deleteMany({ scheduleId: req.params.id });
    res.send(bookings);
    return;
  })
);

bookingRouter.put(
  '/admin/delete',
  expressAsyncHandler(async (req, res) => {
    const bookings = await Booking.deleteMany({
      scheduleId: { $in: req.body.scheduleIds },
    });
    res.send(bookings);
    return;
  })
);

bookingRouter.get(
  '/flight/search/:id',
  expressAsyncHandler(async (req, res) => {
    const bookings = await Booking.find({
      flightId: req.params.id,
    });
    if (!bookings) {
      res.status(404).send({ message: 'No bookings found!' });
      return;
    }
    res.send(bookings);
    return;
  })
);

bookingRouter.post(
  '/flight/search/date',
  expressAsyncHandler(async (req, res) => {
    const bookings = await Booking.find({
      scheduleId: { $in: req.body.data },
    });
    if (!bookings) {
      res.status(404).send({ message: 'No bookings found!' });
      return;
    }
    res.send(bookings);
    return;
  })
);

bookingRouter.put(
  '/add/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    var seatNumber;
    if (req.body.classType === 'Economy') {
      seatNumber = 'E' + req.body.seatno;
    } else {
      seatNumber = 'B' + req.body.seatno;
    }
    const booking = new Booking({
      userId: req.params.id,
      flightId: req.body.flightId,
      scheduleId: req.body.scheduleId,
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      name: req.body.flightName,
      phone: req.body.phone,
      age: req.body.age,
      gender: req.body.gender,
      nationality: req.body.nationality,
      class: req.body.classType,
      seatNumber: seatNumber,
      date: req.body.date,
      price:req.body.price,
    });
    await booking.save();
    
    const bookings = await Booking.find({});
    res.send(bookings);
    return;
  })
);

export default bookingRouter;
