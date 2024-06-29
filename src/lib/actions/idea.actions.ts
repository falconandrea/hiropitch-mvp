'use server';

import Idea from '../models/idea.model';
import { connect } from '../db';

export async function createIdea(idea: any) {
  try {
    await connect();

    const newIdea = await Idea.create(idea);
    return JSON.parse(JSON.stringify(newIdea));
  } catch (error) {
    console.log(error);
  }
}
