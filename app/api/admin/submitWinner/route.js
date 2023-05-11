import RGBet from "@/schemas/rgbet";
import User from "@/schemas/user";

export const POST = async (request) => {
  try {
    const { gameId, betNumber } = await request.json();

    if (!gameId)
      return new Response(JSON.stringify("Game Id Not Found", { status: 404 }));

    const game = await RGBet.findById(gameId)
      .populate({ path: "bets", model: "Bet" })
      .exec();

    if (!game)
      return new Response(JSON.stringify("Game Not Found", { status: 404 }));

    game.result = betNumber;
    await game.save();

    const filterBets = game.bets.filter((bet) => bet.betNumber == betNumber);

    // filterBets.forEach(async (bet) => {
    //   const user = await User.findById(bet.userId);
    //   user.balance += 2 * bet.betAmount;
    //   user.save();
    // });

    // Update the balance of all users who bet on the bet number
    const response = await User.updateMany(
      { _id: { $in: filterBets.map((bet) => bet.userId) } },
      { $inc: { balance: totalAmount } }
    );

    return new Response("Result Announced", { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
};
