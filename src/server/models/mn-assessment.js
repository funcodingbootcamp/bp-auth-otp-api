import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);

const { Schema } = mongoose;
const mnAssessmentSchema = new Schema({
  id: {},
  name: {},
  description: {},
  grades: {},
  subject: {},
  course: {},
  standards: {},
  collection1: {},
  questionTypes: {},
  depthOfKnowledge: {},
  difficulty: {},
  author: {},
  coAuthor: {},
  sharedLevel: {},
  sharedLevelId: {},
  sharedWithIds: {},
  isInstance: {},
  instanceUserId: {},
  isFavorite: {},
  tags: {},
  userFolders: {}
});
const MnAssessment = mongoose.model('MnAssessment', mnAssessmentSchema);

export default MnAssessment;
