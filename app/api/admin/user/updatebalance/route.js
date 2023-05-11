import User from "@/schemas/user";
import { connectToDB } from "@/utils/database";

export const PUT = async (request) => {
  try {
    await connectToDB();

    const { email, amount } = await request.json();
    console.log("🚀 ~ file: route.js:9 ~ PUT ~ email, amount:", email, amount);

    const user = await User.updateOne(
      {
        email,
      },
      { $inc: { balance: amount } }
    );

    if (user.matchedCount == 0)
      return new Response(JSON.stringify("User not found with this email"), {
        status: 404,
      });

    return new Response(JSON.stringify("Balance Updated"), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
