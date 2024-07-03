'use server';

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

    const posts = await Post.find(filters)
      .sort(sortOptions)
      .limit(limit)
      .populate('ideaId', 'title')
      .populate('userId', 'firstName lastName')
      .populate({
        path: 'createdAt',
        select: 'createdAt',
      });

    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.log(error);
  }
}
