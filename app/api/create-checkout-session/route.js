// const stripe = require("stripe")(
//   "sk_test_51N5o10SAKxpLk0Tvc8nxNndmtgFhD0ueJ31B7eQsxPFZCHFHxahKbOFYOKRVussNPna3XVN2ryH8YTwDs3FmRC1q005hSVLiUW"
// );

// export const POST = async (request) => {
//   try {
//     // const { product } = req.body;
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: "product.name",
//             },
//             // unit_amount: product.price * 100,
//             unit_amount: 1 * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: "http://localhost:3000/success",
//       cancel_url: "http://localhost:3000/cancel",
//     });
//     res.json({ id: session.id });
//   } catch (error) {
//     return new Response(JSON.stringify(error), { status: 500 });
//   }
// };
