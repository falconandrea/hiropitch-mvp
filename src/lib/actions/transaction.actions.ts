'use server';

import Transaction from '../models/transaction.model';
import SmartContract from '../models/smartcontract.model';
import mongoose from 'mongoose';
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

    // Forza la registrazione dei modelli
    const models: { [key: string]: any } = { SmartContract, Transaction };

    Object.keys(models).forEach((key: string) => {
      if (!mongoose.modelNames().includes(key)) {
        mongoose.model(key, models[key].schema);
      }
    });

    const transactions = await Transaction.find(filters)
      .populate({
        path: 'smartContractId',
        select: '_id ideaId contractAddress',
        populate: {
          path: 'ideaId',
          select: '_id title',
        },
      })
      .sort(sortOptions)
      .limit(limit > 0 ? limit : 999999);
    return JSON.parse(JSON.stringify(transactions));
  } catch (error) {
    console.log(error);
  }
}
