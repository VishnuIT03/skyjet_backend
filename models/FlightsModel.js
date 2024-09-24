import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  airlineId: { type: String, required: true },
  number: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
});

const Flight = mongoose.model('Flight', flightSchema);

export default Flight;
