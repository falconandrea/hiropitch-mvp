import { Schema, model, models } from 'mongoose';

const IdeaSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  contractType: {
    type: String,
    required: true,
  },
  authors: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    required: true,
  },
  referenceLinks: {
    type: [String],
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  fileStructure: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

const Idea = models?.Idea || model('Idea', IdeaSchema);

export default Idea;
