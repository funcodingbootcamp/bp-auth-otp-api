import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);
const clientSchema = mongoose.Schema({
  id: Number,
  firstName: String,
  lastName: String,
  email: String,
  phone: Number
});
clientSchema.set('timestamps', true);
const Client = mongoose.model('Client', clientSchema);

export default Client;
