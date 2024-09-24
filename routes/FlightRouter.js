import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../Utils.js';
import Flight from '../models/FlightsModel.js';
import Airlines from '../models/AirlinesModel.js';

const flightRouter = express.Router();

flightRouter.get(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const flights = await Flight.find({});
    if (!flights) {
      res.status(404).send({ message: 'No flights found!' });
    }
    res.send(flights);
    return;
  })
);

flightRouter.get(
  '/fetch',
  expressAsyncHandler(async (req, res) => {
    const flights = await Flight.find({});
    if (!flights) {
      res.status(404).send({ message: 'No flights found!' });
    }
    res.send(flights);
    return;
  })
);

flightRouter.put(
  '/add/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    await Airlines.findOneAndUpdate(
      { _id: req.params.id },
      {
        flights: req.body.flights,
      },
      { new: true }
    );

    const flight = new Flight({
      airlineId: req.params.id,
      number: req.body.flightNumber,
      name: req.body.flightName,
      category: req.body.flightCategory,
    });
    await flight.save();

    const flights = await Flight.find({});
    if (!flights) {
      res.status(404).send({ message: 'No flights found!' });
      return;
    }
    res.send(flights);
    return;
  })
);

flightRouter.get(
  '/delete/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    await Flight.findOneAndDelete({ _id: req.params.id });
    const flights = await Flight.find({});
    if (!flights) {
      res.status(404).send({ message: 'No flights found!' });
      return;
    }
    res.send(flights);
    return;
  })
);

flightRouter.get(
  '/admin/delete/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    await Flight.findOneAndDelete({ _id: req.params.id });
    const flights = await Flight.find({});
    if (!flights) {
      res.status(404).send({ message: 'No flights found!' });
      return;
    }
    res.send(flights);
    return;
  })
);

flightRouter.get(
  '/admin/airline/delete/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const removed = await Flight.find({ airlineId: req.params.id });
    await Flight.deleteMany({ airlineId: req.params.id });
    const flights = await Flight.find({});
    if (!flights) {
      res.status(404).send({ message: 'No flights found!' });
      return;
    }
    res.send({ removedFlights: removed, flights: flights });
    return;
  })
);

// flightRouter.get(
//   '/admin/delete/:id',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     await Flight.findOneAndDelete({ _id: req.params.id });
//     const airlines = await Flight.find({});
//     res.send(airlines);
//     return;
//   })
// );

// flightRouter.put(
//   '/update/:id',
//   expressAsyncHandler(async (req, res) => {
//     const airport = await Airport.findOneAndUpdate(
//       { _id: req.params.id },
//       {
//         code: req.body.airportCode,
//         name: req.body.airportName,
//         location: req.body.airportLocation,
//       },
//       { new: true }
//     );

//     const airports = await Airport.find({});
//     res.send(airports);
//     return;
//   })
// );

export default flightRouter;
