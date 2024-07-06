'use server';

import Transaction from '../models/transaction.model';
import { connect } from '../db';

export async function createTransaction(transaction: any) {
  try {
    await connect();

    const newTransaction = await Transaction.create(transaction);
    return JSON.parse(JSON.stringify(newTransaction));
  } catch (error) {
    console.log(error);
  }
}

export async function getTransactions(
  filters: any,
  sortOptions: any,
  limit: number
) {
  try {
    await connect();

    const transactions = await Transaction.find(filters)
      .sort(sortOptions)
      .limit(limit);
    return JSON.parse(JSON.stringify(transactions));
  } catch (error) {
    console.log(error);
  }
}
