import { Schema, model, models } from "mongoose";
import mongoose from "mongoose";

const BetSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "RGBet",
  },
  betNumber: {
    type: Number,
    required: true,
  },
  betAmount: {
    type: Number,
    required: true,
  },
});

const Bet = models.Bet || model("Bet", BetSchema);

export default Bet;
