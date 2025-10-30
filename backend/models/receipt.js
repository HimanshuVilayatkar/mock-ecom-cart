import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: String,
    default: new Date().toISOString(),
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});

const Receipt = mongoose.model("Receipt", receiptSchema);
export default Receipt;
