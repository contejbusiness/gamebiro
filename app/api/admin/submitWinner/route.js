import Bet from "@/schemas/bet";

import RGBet from "@/schemas/rgbet";

import User from "@/schemas/user";
import { connectToDB } from "@/utils/database";

export async function PUT(request) {
  try {
    connectToDB();

    const { gameId, gameNumber } = await request.json();

    if (!gameId)
      return new Response(JSON.stringify("Game Id Not Found"), { status: 404 });

    const game = await RGBet.findById(gameId).populate({
      path: "bets",
      model: "Bet",
    });

    if (!game)
      return new Response(JSON.stringify("Game Not Found"), { status: 404 });

    game.result = gameNumber;
    await game.save();

    const filterBets = game.bets.filter((bet) => bet.betNumber == gameNumber);

    const response = await Promise.all(
      filterBets.map(async (bet) => {
        const user = await User.findById(bet.userId);
        const totalAmount = bet.betAmount;
        user.balance += totalAmount;
        await user.save();
      })
    );

    return new Response(JSON.stringify("Success"), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
