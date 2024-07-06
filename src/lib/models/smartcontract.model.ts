import { Schema, model, models } from 'mongoose';

const SmartContractSchema = new Schema(
  {
    ideaId: {
      type: Schema.Types.ObjectId,
      ref: 'Idea',
      required: true,
    },
    contractAddress: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SmartContract =
  models.SmartContract || model('SmartContract', SmartContractSchema);

export default SmartContract;
