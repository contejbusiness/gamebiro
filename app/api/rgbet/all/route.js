import RGBet from "@/schemas/rgbet";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const games = await RGBet.find().sort({ gameCount: -1 });
    if (!games)
      return new Response(JSON.stringify("No Games Found"), { status: 200 });

    return new Response(JSON.stringify(games), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
