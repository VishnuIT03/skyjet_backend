import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../Utils.js';
import Airport from '../models/AirportModel.js';

const airportRouter = express.Router();

airportRouter.get(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const airports = await Airport.find({});
    if (!airports) {
      res.status(404).send({ message: 'No airports found!' });
    }
    res.send(airports);
    return;
  })
);

airportRouter.get(
  '/fetch',
  expressAsyncHandler(async (req, res) => {
    const airports = await Airport.find({});
    if (!airports) {
      res.status(404).send({ message: 'No airports found!' });
    }
    res.send(airports);
    return;
  })
);

airportRouter.put(
  '/add',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const airport = new Airport({
      code: req.body.airportCode,
      name: req.body.airportName,
      location: req.body.airportLocation,
      locationCode: req.body.airportLocationCode,
    });
    await airport.save();

    const airports = await Airport.find({});
    res.send(airports);
    return;
  })
);

airportRouter.get(
  '/delete/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    await Airport.findOneAndDelete({ _id: req.params.id });
    const airports = await Airport.find({});
    res.send(airports);
    return;
  })
);

airportRouter.put(
  '/update/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const airport = await Airport.findOneAndUpdate(
      { _id: req.params.id },
      {
        code: req.body.airportCode,
        name: req.body.airportName,
        location: req.body.airportLocation,
        locationCode: req.body.airportLocationCode,
      },
      { new: true }
    );

    const airports = await Airport.find({});
    res.send(airports);
    return;
  })
);

export default airportRouter;
