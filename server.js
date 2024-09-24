import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import core from 'cors';
import userRouter from './routes/UserRouter.js';
import airportRouter from './routes/AirportRouter.js';
import airlinesRouter from './routes/AirlinesRouter.js';
import flightRouter from './routes/FlightRouter.js';
import searchRouter from './routes/SearchRouter.js';
import scheduleRouter from './routes/ScheduleRouter.js';
import bookingRouter from './routes/BookingRouter.js';
import Razorpay from 'razorpay';
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to db');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(core());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/users', userRouter);
app.use('/api/airport', airportRouter);
app.use('/api/airlines', airlinesRouter);
app.use('/api/flights', flightRouter);
app.use('/api/schedules', scheduleRouter);
app.use('/api/search', searchRouter);
app.use('/api/booking', bookingRouter);

app.post("/custom_pay", async (req, res) => {
  try {
      const instance = new Razorpay({
          key_id: 'rzp_test_zpcvSUNJXUqrLv',
          key_secret:'uGZApKWjnDBHcfaMiQQctHxQ',
      });

      console.log(Math.round(req.body.amount))

      const options = {
          amount: Math.round(req.body.amount)*100, // amount in smallest currency unit
          currency: "INR",
          receipt: "receipt_order_74394",
      };

      const order = await instance.orders.create(options);

      if (!order) return res.status(500).send("Some error occured");
      res.json(order);
  } catch (error) {
      console.log(error)
      res.status(500).send(error);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '../front_end/build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../front_end/build/index.html'));
});

const port = 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
