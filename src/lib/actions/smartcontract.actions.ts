'use server';

import SmartContract from '../models/smartcontract.model';
import { connect } from '../db';

export async function createSmartContract(smartContract: any) {
  try {
    await connect();

    const newSmartContract = await SmartContract.create(smartContract);
    return JSON.parse(JSON.stringify(newSmartContract));
  } catch (error) {
    console.log(error);
  }
}

export async function getSmartContracts(
  filters: any,
  sortOptions: any,
  limit: number
) {
  try {
    await connect();

    const smartContracts = await SmartContract.find(filters)
      .sort(sortOptions)
      .limit(limit);
    return JSON.parse(JSON.stringify(smartContracts));
  } catch (error) {
    console.log(error);
  }
}
