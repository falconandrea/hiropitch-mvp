import { Schema, model, models } from 'mongoose';

const PostSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    ideaId: {
      type: Schema.Types.ObjectId,
      ref: 'Idea',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Post = models.Post || model('Post', PostSchema);

export default Post;
