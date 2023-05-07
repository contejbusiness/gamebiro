import mongoose, { Schema, model, models } from "mongoose";
import Bet from "./bet";

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
  },
  password: String,
  balance: {
    type: Number,
    default: 0,
  },
  record: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bet",
    },
  ],
});

const User = models.User || model("User", UserSchema);

export default User;
