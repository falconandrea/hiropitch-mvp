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
    likes: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
    },
    replies: [
      {
        author: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Post = models.Post || model('Post', PostSchema);

export default Post;
