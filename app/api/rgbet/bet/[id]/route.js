import Bet from "@/schemas/bet";
import User from "@/schemas/user";
import { connectToDB } from "@/utils/database";
import RGBet from "@/schemas/rgbet";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    console.log("GET BET BY ID ROUTE")

    const { id } = params;

    const user = await User.findById(id);
    if (!user)
      return new Response(JSON.stringify("User not found, Please relogin"), {
        status: 403,
      });

    const records = await Bet.find({ userId: id })
      .populate({ path: "gameId", model: "RGBet" })
      .exec();

    if (!records)
      return new Response(JSON.stringify("No records found"), { status: 200 });

    return new Response(JSON.stringify(records), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
