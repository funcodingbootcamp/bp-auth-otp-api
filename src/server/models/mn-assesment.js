import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

const { Schema } = mongoose;
const mnAssesmentSchema = new Schema({
  name: { type: String }
});
const MnAssesment = mongoose.model('MnAssesment', mnAssesmentSchema);

export default MnAssesment;
