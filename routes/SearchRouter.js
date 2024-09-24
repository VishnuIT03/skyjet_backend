import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../Utils.js';
import Airport from '../models/AirportModel.js';
import Flight from '../models/FlightsModel.js';
import Schedule from '../models/ScheduleModel.js';

const searchRouter = express.Router();

searchRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    const departureAirport = req.body.departureAirport;
    const arrivalAirport = req.body.arrivalAirport;
    const searchDate = req.body.searchDate;

    if (departureAirport !== '' && arrivalAirport !== '' && searchDate !== '') {
      const schedules = await Schedule.find({
        departureAirport: departureAirport,
        arrivalAirport: arrivalAirport,
        date: new Date(searchDate),
      });
      if (!schedules) {
        res.status(404).send({ message: 'No schedules found!' });
        return;
      }
      res.send(schedules);
      return;
    }

    if (departureAirport === '' && arrivalAirport !== '' && searchDate !== '') {
      const schedules = await Schedule.find({
        arrivalAirport: arrivalAirport,
        date: new Date(searchDate),
      });
      if (!schedules) {
        res.status(404).send({ message: 'No schedules found!' });
        return;
      }
      res.send(schedules);
      return;
    }

    if (departureAirport !== '' && arrivalAirport === '' && searchDate !== '') {
      const schedules = await Schedule.find({
        departureAirport: departureAirport,
        date: new Date(searchDate),
      });
      if (!schedules) {
        res.status(404).send({ message: 'No schedules found!' });
        return;
      }
      res.send(schedules);
      return;
    }

    if (departureAirport !== '' && arrivalAirport !== '' && searchDate === '') {
      const schedules = await Schedule.find({
        departureAirport: departureAirport,
        arrivalAirport: arrivalAirport,
      });
      if (!schedules) {
        res.status(404).send({ message: 'No schedules found!' });
        return;
      }
      res.send(schedules);
      return;
    }

    if (departureAirport !== '' && arrivalAirport === '' && searchDate === '') {
      const schedules = await Schedule.find({
        departureAirport: departureAirport,
      });
      if (!schedules) {
        res.status(404).send({ message: 'No schedules found!' });
        return;
      }
      res.send(schedules);
      return;
    }

    if (departureAirport === '' && arrivalAirport !== '' && searchDate === '') {
      const schedules = await Schedule.find({
        arrivalAirport: arrivalAirport,
      });
      if (!schedules) {
        res.status(404).send({ message: 'No schedules found!' });
        return;
      }
      res.send(schedules);
      return;
    }

    if (departureAirport === '' && arrivalAirport === '' && searchDate !== '') {
      const schedules = await Schedule.find({
        date: new Date(searchDate),
      });
      if (!schedules) {
        res.status(404).send({ message: 'No schedules found!' });
        return;
      }
      res.send(schedules);
      return;
    }

    if (departureAirport === '' && arrivalAirport === '' && searchDate === '') {
      const schedules = await Schedule.find({});
      if (!schedules) {
        res.status(404).send({ message: 'No schedules found!' });
        return;
      }
      res.send(schedules);
      return;
    }
  })
);

export default searchRouter;
