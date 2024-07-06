import { Schema, model, models } from 'mongoose';

const TransactionSchema = new Schema(
  {
    smartContractId: {
      type: Schema.Types.ObjectId,
      ref: 'SmartContract',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction =
  models.Transaction || model('Transaction', TransactionSchema);

export default Transaction;
