import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);
const courseSchema = mongoose.Schema({
  name: String,
  code: String,
  comment: String,
  feedback: String
});
courseSchema.set('timestamps', true);
const Course = mongoose.model('Course', courseSchema);

export default Course;
