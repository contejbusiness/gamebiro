export const POST = async (request) => {
  try {
    const { id } = await request.json();
    console.log("🚀 ~ file: route.js:48 ~ PUT ~ email:", email);

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
