import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../Utils.js';
import Airlines from '../models/AirlinesModel.js';

const airlinesRouter = express.Router();

airlinesRouter.get(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const airlines = await Airlines.find({});
    if (!airlines) {
      res.status(404).send({ message: 'No airlines found!' });
      return;
    }
    res.send(airlines);
    return;
  })
);

airlinesRouter.put(
  '/add',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const airline = new Airlines({
      name: req.body.airlinesName,
    });
    await airline.save();

    const airlines = await Airlines.find({});
    if (!airlines) {
      res.status(404).send({ message: 'No airlines found!' });
      return;
    }
    res.send(airlines);
    return;
  })
);

airlinesRouter.get(
  '/delete/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    await Airlines.findOneAndDelete({ _id: req.params.id });
    const airlines = await Airlines.find({});
    if (!airlines) {
      res.status(404).send({ message: 'No airlines found!' });
      return;
    }
    res.send(airlines);
    return;
  })
);

airlinesRouter.put(
  '/admin/delete/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    await Airlines.updateOne(
      { _id: req.params.id },
      { $pull: { flights: req.body.flightCode } }
    );
    const airlines = await Airlines.find({});
    if (!airlines) {
      res.status(404).send({ message: 'No airlines found!' });
      return;
    }
    res.send(airlines);
    return;
  })
);

airlinesRouter.get(
  '/admin/delete/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    await Airlines.findOneAndDelete({ _id: req.params.id });
    const airlines = await Airlines.find({});
    if (!airlines) {
      res.status(404).send({ message: 'No airlines found!' });
      return;
    }
    res.send(airlines);
    return;
  })
);

// airlinesRouter.put(
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

export default airlinesRouter;
