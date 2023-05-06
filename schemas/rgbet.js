import { Schema, model, models } from "mongoose";

const RGBetSchema = new Schema({
  prizePercentage: {
    type: Number,
    required: true,
  },
  result: Number,
  gameCount: Number,
  timer: Number,
  bets: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      amount: {
        type: Number,
        required: true,
      },
      number: {
        type: Number,
        required: true,
      },
    },
  ],
});

const RGBet = models.RGBet || model("RGBet", RGBetSchema);

export default RGBet;
