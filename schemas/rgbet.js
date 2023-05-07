import { Schema, model, models } from "mongoose";

const RGBetSchema = new Schema({
  prizePercentage: {
    type: Number,
    required: true,
  },
  result: Number,
  gameCount: Number,
  timer: Number,
  bets: [],
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

const RGBet = models.RGBet || model("RGBet", RGBetSchema);

export default RGBet;
