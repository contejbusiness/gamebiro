import RGBet from "@/schemas/rgbet";
import User from "@/schemas/user";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  try {
    connectToDB();

    console.log("Calling request");

    const { gameId, gameNumber } = await request.json();


    if (!gameId)
      return new Response(JSON.stringify("Game Id Not Found", { status: 404 }));

    const game = await RGBet.findById(gameId).populate({
      path: "bets",
      model: "Bet",
    });

    if (!game)
      return new Response(JSON.stringify("Game Not Found", { status: 404 }));

    game.result = gameNumber;
    await game.save();

    const filterBets = game.bets.filter((bet) => bet.betNumber == gameNumber);
    console.log("🚀 ~ file: route.js:33 ~ POST ~ filterBets:", filterBets);

    // filterBets.forEach(async (bet) => {
    //   const user = await User.findById(bet.userId);
    //   user.balance += 2 * bet.betAmount;
    //   user.save();
    // });

    const response = await Promise.all(
      filterBets.map(async (bet) => {
        const user = await User.findById(bet.userId);
        const totalAmount = bet.betAmount;
        user.balance += totalAmount;
        await user.save();
      })
    );
    console.log("🚀 ~ file: route.js:50 ~ POST ~ response:", response)

    // Update the balance of all users who bet on the bet number
    // try {
    //   const response = await User.updateMany(
    //     { _id: { $in: filterBets.map((bet) => bet.userId) } },
    //     { $inc: { balance: totalAmount } }
    //   );
    // } catch (error) {
    //   console.log(error);
    // }

    return new Response("Result Announced", { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
};
