import mongoose, { Schema, model, models } from "mongoose";

const RedeemSchema = new Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "PENDING",
    },

    bank: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Redeem = models.Redeem || model("Redeem", RedeemSchema);

export default Redeem;
