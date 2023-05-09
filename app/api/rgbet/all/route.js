import RGBet from "@/schemas/rgbet";
import { connectToDB } from "@/utils/database";
import { useSearchParams } from "next/navigation";

export const GET = async (request) => {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);

    const page = searchParams.get("page");
    const limit = searchParams.get("limit");

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const games = await RGBet.find()
      .sort({ gameCount: -1 })
      .skip(skip)
      .limit(limitNumber);

    if (!games)
      return new Response(JSON.stringify("No Games Found"), { status: 200 });

    return new Response(JSON.stringify(games), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
