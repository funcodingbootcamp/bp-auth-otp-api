import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

const { Schema } = mongoose;
const mnAssessmentSchema = new Schema({ assessment: {} });
const MnAssessment = mongoose.model('MnAssessment', mnAssessmentSchema);

export default MnAssessment;
