import Redeem from "@/schemas/redeem";
import { connectToDB } from "@/utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const requests = await Redeem.find().sort({ createdAt: -1 });

    if (!requests)
      return new Response(JSON.stringify("No Requests Found"), { status: 401 });

    return new Response(JSON.stringify(requests), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message));
  }
};

export const PUT = async (request) => {
  try {
    const { id } = await request.json();
    console.log("🚀 ~ file: route.js:22 ~ PUT ~ id:", id)

    await connectToDB();

    const req = await Redeem.findById(id);
    console.log("🚀 ~ file: route.js:27 ~ PUT ~ req:", req)

    if (!req)
      return new Response(JSON.stringify("No Request Found"), { status: 404 });

    req.status = "DONE";

    req.save();

    return new Response(JSON.stringify("Redeem Done"), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error.message));
  }
};
