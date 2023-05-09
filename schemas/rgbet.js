import { Schema, model, models } from "mongoose";

const RGBetSchema = new Schema({
  prizePercentage: {
    type: Number,
    required: true,
  },
  result: {
    type: String,
    default: "",
    required: true,
  },
  gameCount: {
    type: Number,
    default: 0,
    required: true,
  },
  timer: Number,
  bets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Bet",
    },
  ],
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

const RGBet = models.RGBet || model("RGBet", RGBetSchema);

export default RGBet;
