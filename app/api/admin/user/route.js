import User from "@/schemas/user";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  try {
    await connectToDB();

    const { email } = await request.json();
    console.log("🚀 ~ file: route.js:9 ~ POST ~ email:", email)

    if (!email)
      return new Response(JSON.stringify("No Email Found"), { status: 404 });

    const user = await User.findOne({ email });
    console.log("🚀 ~ file: route.js:14 ~ POST ~ user:", user)

    if (!user)
      return new Response(JSON.stringify("No User Found"), { status: 404 });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 });
  }
};
