import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../Utils.js';
import Schedule from '../models/ScheduleModel.js';

const scheduleRouter = express.Router();

scheduleRouter.get(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const schedules = await Schedule.find({});
    if (!schedules) {
      res.status(404).send({ message: 'No schedules found!' });
      return;
    }
    res.send(schedules);
    return;
  })
);

scheduleRouter.get(
  '/fetch',
  expressAsyncHandler(async (req, res) => {
    const schedules = await Schedule.find({});
    if (!schedules) {
      res.status(404).send({ message: 'No schedules found!' });
      return;
    }
    res.send(schedules);
    return;
  })
);

scheduleRouter.put(
  '/add/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const schedule = new Schedule({
      flightId: req.params.id,
      departureAirport: req.body.departureAirport,
      departureTime: req.body.departureTime,
      arrivalAirport: req.body.arrivalAirport,
      arrivalTime: req.body.arrivalTime,
      seats: req.body.seats,
      status: req.body.flightStatus,
      date: new Date(req.body.departureDate),
    });
    await schedule.save();

    const schedules = await Schedule.find({});
    res.send(schedules);
    return;
  })
);

scheduleRouter.put(
  '/seat/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    await Schedule.findByIdAndUpdate(
      { _id: req.params.id },
      {
        seats: req.body.seats,
      }
    );
    const schedules = await Schedule.find({});
    if (!schedules) {
      res.status(404).send({ message: 'No schedules found!' });
      return;
    }
    res.send(schedules);
    return;
  })
);

scheduleRouter.put(
  '/delete/:id',
  expressAsyncHandler(async (req, res) => {
    await Schedule.findOneAndDelete({ _id: req.params.id });
    const schedules = await Schedule.find({});
    if (!schedules) {
      res.status(404).send({ message: 'No schedules found!' });
      return;
    }
    res.send(schedules);
    return;
  })
);

scheduleRouter.put(
  '/admin/delete/:id',
  expressAsyncHandler(async (req, res) => {
    const removed = await Schedule.find({ flightId: req.params.id });
    await Schedule.deleteMany({
      flightId: req.params.id,
    });
    const schedule = await Schedule.find({});
    res.send({ removedSchedules: removed, schedules: schedule });
    return;
  })
);

scheduleRouter.put(
  '/admin/airline/delete',
  expressAsyncHandler(async (req, res) => {
    const removed = await Schedule.find({
      flightId: { $in: req.body.flightIds },
    });
    await Schedule.deleteMany({
      flightId: { $in: req.body.flightIds },
    });
    const schedule = await Schedule.find({});
    res.send({ removedSchedules: removed, schedules: schedule });
    return;
  })
);

scheduleRouter.get(
  '/flight/search/:date',
  expressAsyncHandler(async (req, res) => {
    const schedules = await Schedule.find(
      { date: req.params.date },
      { _id: 1 }
    );
    res.send(schedules);
    return;
  })
);

export default scheduleRouter;
