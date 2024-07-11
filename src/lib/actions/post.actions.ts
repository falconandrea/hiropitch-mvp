'use server';

import mongoose from 'mongoose';
import Idea from '../models/idea.model';
import User from '../models/user.model';
import Post from '../models/post.model';
import { connect } from '../db';

export async function createPost(post: any) {
  try {
    await connect();

    const newPost = await Post.create(post);
    return JSON.parse(JSON.stringify(newPost));
  } catch (error) {
    console.log(error);
  }
}

export async function getPosts(filters: any, sortOptions: any, limit: number) {
  try {
    await connect();

    // Forza la registrazione dei modelli
    const models: { [key: string]: any } = { Idea, Post, User };

    Object.keys(models).forEach((key: string) => {
      if (!mongoose.modelNames().includes(key)) {
        mongoose.model(key, models[key].schema);
      }
    });

    const posts = await Post.find(filters)
      .sort(sortOptions)
      .limit(limit > 0 ? limit : 999999)
      .populate('ideaId', '_id title')
      .populate('userId', '_id firstName lastName')
      .populate({
        path: 'createdAt',
        select: 'createdAt',
      })
      .populate('replies.author', '_id firstName lastName');

    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.log(error);
  }
}

export async function addReply(postId: string, reply: any) {
  try {
    await connect();

    const post = await Post.findById(postId);
    post.replies.push(reply);

    await post.save();

    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    console.log(error);
  }
}
