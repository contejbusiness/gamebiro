import RGBet from "@/schemas/rgbet";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const latestGame = await RGBet.findOne({})
      .sort({ startTime: -1 })
      .populate({ path: "bets", model: "Bet" })
      .exec();

    return new Response(JSON.stringify(latestGame));
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
};
