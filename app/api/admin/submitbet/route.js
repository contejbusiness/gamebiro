import RGBet from "@/schemas/rgbet";
import User from "@/schemas/user";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
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

    const filterBets = game?.bets?.filter(
      (bet) => bet?.betNumber == gameNumber
    );

    if (filterBets?.length > 0)
      await Promise.all(
        filterBets?.map(async (bet) => {
          const user = await User.findById(bet?.userId);
          const totalAmount = bet?.betAmount;
          const commission = totalAmount * 0.05; // calculate the 5% commission
          const payout = totalAmount - commission;
          user.balance += totalAmount + payout;
          await user.save();
        })
      );

    return new Response(JSON.stringify("Success"), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
