import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    flightId: { type: String, required: true },
    scheduleId: { type: String, require: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    class: { type: String, required: true },
    seatNumber: { type: String, required: true },
    price: {type:Number,required: true},
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
