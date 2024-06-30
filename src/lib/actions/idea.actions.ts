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

export async function getIdeas(filters: any, sortOptions: any, limit: number) {
  try {
    await connect();

    const ideas = await Idea.find(filters).sort(sortOptions).limit(limit);
    return JSON.parse(JSON.stringify(ideas));
  } catch (error) {
    console.log(error);
  }
}
