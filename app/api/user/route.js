import mongoose from "mongoose";
import User from "@/schemas/user";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  try {
    await connectToDB();
    const { name, email, password } = request.body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response("User with that email already exists", {
        status: 409,
      });
    }

    // Create a new user and save to the database
    const user = new User({
      name,
      email,
      password,
      balance: 0,
    });
    await user.save();

    // Return the user information to the client
    return new Response(
      JSON.stringify({ userId: user._id, name, email, balance: user.balance })
    );
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500, error });
  }
};
