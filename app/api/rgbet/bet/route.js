import mongoose from "mongoose";
import moment from "moment";
import RGBet from "@/schemas/rgbet";
import Bet from "@/schemas/bet";
import User from "@/schemas/user";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  try {
    // Get the user ID and bet information from the request

    console.log("GET ALL BET ROUTE")

    const { userId, gameId, betNumber, betAmount } = await request.json();
    console.log(
      "🚀 ~ file: route.js:13 ~ POST ~ userId, gameId, betNumber, betAmount:",
      userId,
      gameId,
      betNumber,
      betAmount
    );

    await connectToDB();

    // Get the game information from the database
    const game = await RGBet.findById(gameId)
      .populate({ path: "bets", model: "Bet" })
      .exec();

    if (!game) {
      return new Response("Game not found", { status: 404 });
    }

    // Check if betting is still open
    const now = moment();
    const startTime = moment(game.startTime);
    const endTime = moment(game.endTime);
    if (now.isBefore(startTime) || now.isAfter(endTime)) {
      console.log("TIMEOUT");
      return new Response(JSON.stringify({ message: "Betting closed" }), {
        status: 403,
      });
    }

    // Check if the bet number is valid
    if (betNumber < 0 || betNumber > 9) {
      return new Response("Invalid bet number", { status: 400 });
    }

    const user = await User.findById(userId);
    if (user.balance < betAmount) {
      return new Response(JSON.stringify("Insuffecient Balance"), {
        status: 403,
      });
    }

    // Check if the user has already placed a bet on the same game with the same number
    const existingBet = game.bets.find((bet) => {
      return bet.userId.toString() === userId && bet.betNumber === betNumber;
    });
    if (existingBet) {
      return new Response(
        "You have already placed a bet on this number for this game",
        { status: 400 }
      );
    }

    // Calculate the commission to deduct
    const commission = (betAmount * 5) / 100;

    // Calculate the payout amount
    // const payout = (betAmount - commission) * game.odds[betNumber];

    // Create a new user bet in the database
    const userBet = new Bet({
      userId,
      gameId,
      betNumber,
      betAmount,
      payout: 0,
    });
    await userBet.save();

    // Update the user's balance
    user.balance -= betAmount;
    user.record.push(userBet._id);

    await user.save();

    await game.bets.push(userBet._id);
    await game.save();

    // Return the user bet information to the client
    return new Response(JSON.stringify(userBet));
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
