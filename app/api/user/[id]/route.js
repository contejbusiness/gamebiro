import User from "@/schemas/user";

export const GET = async (request) => {
  try {
    const { id } = await request.json();

    const user = await User.findById(id);

    if (!user) return new Response(JSON.stringify("No User"), { status: 201 });

    return Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
