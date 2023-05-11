import Redeem from "@/schemas/redeem";
import User from "@/schemas/user";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  try {
    console.log("HELLOOOOO");
    const { email, name, amount, bank } = await request.json();

    const user = await User.findOne({ email: email });
    if (!user)
      return new Response(
        JSON.stringify("User with this email not found", { status: "404" })
      );

    if (user.balance <= amount)
      return new Response(
        JSON.stringify("Insuffecient Balance", { status: "403" })
      );

    user.balance -= amount;

    const redeem = await Redeem.create({
      email,
      name,
      amount,
      status: "PENDING",
      bank,
    });

    if (!redeem) {
      return new Response(JSON.stringify("Invalid Input", { status: 403 }));
    }

    await user.save();

    return new Response(JSON.stringify("Redeem Request Sent", { status: 200 }));
  } catch (error) {
    return new Response(
      JSON.stringify("Internal Server Error", { status: 500 })
    );
  }
};

export const PUT = async (request) => {
  try {
    const { email } = await request.json();
    console.log("🚀 ~ file: route.js:48 ~ PUT ~ email:", email);

    connectToDB();

    const result = await Redeem.find().where({ email });

    if (!result)
      return new Response(JSON.stringify("No Result Found", { status: 202 }));

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response("Server Error, Please try again later", {
      status: 500,
    });
  }
};
