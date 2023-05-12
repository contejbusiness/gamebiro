import moment from "moment";
import RGBet from "@/schemas/rgbet";
import { connectToDB } from "@/utils/database";

let intervalId;

export const POST = async (request) => {
  try {
    createNewGame();

    // Set up a loop to create new games every minute
    intervalId = setInterval(() => {
      createNewGame();
    }, 60 * 5000);
  } catch (error) {
    return new Response(JSON.stringify("Failed to create game"), {
      status: 500,
    });
  }
};

export const PUT = async (request) => {
  clearInterval(intervalId);
};

const createNewGame = async () => {
  
  try {
    await connectToDB();
    // Get the current game number
    const lastGame = await RGBet.findOne().sort({ gameCount: -1 });
    const gameNumber = lastGame ? lastGame.gameCount + 1 : 1;

    // Calculate the start and end times for the game
    const startTime = moment();
    const endTime = moment().add(5, "minutes");

    // Create a new game in the database
    const game = new RGBet({
      prizePercentage: 90,
      gameCount: gameNumber,
      startTime: startTime.toDate(),
      endTime: endTime.toDate(),
      result: "waiting",
    });

    await game.save();
    console.log("CREATED NEW GAME......");

    return new Response(JSON.stringify(game));
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500, error: error });
  }
};

// Stop the game loop
const stopGameLoop = () => {
  clearInterval(intervalId);
};

// export const POST = async (request) => {
//   try {
//     await connectToDB();
//     // Get the current game number
//     const lastGame = await RGBet.findOne().sort({ gameCount: -1 });
//     const gameNumber = lastGame ? lastGame.gameCount + 1 : 1;

//     // Calculate the start and end times for the game
//     const startTime = moment();
//     const endTime = moment().add(1, "minutes");

//     // Create a new game in the database
//     const game = new RGBet({
//       prizePercentage: 90,
//       gameCount: gameNumber,
//       startTime: startTime.toDate(),
//       endTime: endTime.toDate(),
//       result: "waiting",
//     });

//     await game.save();
//     console.log("CREATED NEW GAME......");

//     const timeout = endTime.diff(startTime);

//     setTimeout(() => {
//       POST(request);
//     }, timeout);

//     return new Response(JSON.stringify(game));
//   } catch (error) {
//     console.error(error);
//     return new Response("Internal Server Error", { status: 500, error: error });
//   }
// };

// export const POST = async (request) => {
//   try {
//     await connectToDB();
//     // Get the current game number
//     const lastGame = await RGBet.findOne().sort({ gameCount: -1 });
//     const gameNumber = lastGame ? lastGame.gameCount + 1 : 1;

//     // Calculate the start and end times for the game
//     const startTime = moment();
//     const endTime = moment().add(1, "minutes");

//     // Create a new game in the database
//     const game = new RGBet({
//       prizePercentage: 90,
//       gameCount: gameNumber,
//       startTime: startTime.toDate(),
//       endTime: endTime.toDate(),
//       result: "waiting",
//     });

//     await game.save();
//     console.log("CREATED NEW GAME......");

//     // Set a timeout to calculate the result of the game
//     const timeout = endTime.diff(startTime);
//     setTimeout(async () => {
//       try {
//         // Find the game in the database
//         const updatedGame = await RGBet.findOne({ gameCount: gameNumber });
//         console.log(
//           "🚀 ~ file: route.js:33 ~ setTimeout ~ updatedGame:",
//           updatedGame
//         );

//         // Calculate the result of the game
//         const now = moment();
//         let result;
//         if (now.isBefore(updatedGame.endTime)) {
//           result = -1;
//         } else {
//           const outcome = Math.floor(Math.random() * 3);
//           if (outcome === 0) {
//             result = 0;
//           } else if (outcome === 1) {
//             result = 2;
//           } else {
//             result = 5;
//           }
//           updatedGame.result = result.toString();
//           await updatedGame.save();
//           console.log("ANNOUNCED RESULT - ", updatedGame.result);

//           setTimeout(() => {
//             POST(request);
//           }, 5000);
//         }

//         console.log(`Game ${gameNumber} result: ${result}`);
//         return new Response(JSON.stringify(updatedGame));
//       } catch (err) {
//         console.error(err);
//         return new Response("Internal Server Error", { status: 500, error: err });
//       }
//     }, timeout);

//     // Return the game information to the client
//     return new Response(JSON.stringify(game));
//     // res.json({ gameNumber, startTime, endTime });
//   } catch (error) {
//     console.error(error);
//     return new Response("Internal Server Error", { status: 500, error: error });
//     // res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const POST = async (request) => {
//   try {
//     await connectToDB();
//     // Get the current game number
//     const lastGame = await RGBet.findOne().sort({ gameCount: -1 });
//     const gameNumber = lastGame ? lastGame.gameCount + 1 : 1;

//     // Calculate the start and end times for the game
//     const startTime = moment();
//     const endTime = moment().add(1, "minutes");

//     // Create a new game in the database
//     const game = new RGBet({
//       prizePercentage: 90,
//       gameCount: gameNumber,
//       startTime: startTime.toDate(),
//       endTime: endTime.toDate(),
//       result: "waiting",
//     });

//     await game.save();
//     console.log("CREATED NEW GAME......");

//     // Set a timeout to calculate the result of the game
//     const timeout = endTime.diff(startTime);
//     setTimeout(async () => {
//       try {
//         // Find the game in the database
//         const updatedGame = await RGBet.findOne().sort({ gameCount: -1 });
//         console.log(
//           "🚀 ~ file: route.js:33 ~ setTimeout ~ updatedGame:",
//           updatedGame
//         );

//         // Calculate the result of the game
//         const now = moment();
//         let result;
//         if (now.isBefore(updatedGame.endTime)) {
//           result = -1;
//         } else {
//           const outcome = Math.floor(Math.random() * 3);
//           if (outcome === 0) {
//             result = 0;
//           } else if (outcome === 1) {
//             result = 2;
//           } else {
//             result = 5;
//           }
//           updatedGame.result = result.toString();
//           await updatedGame.save();
//           console.log("ANNOUNCED RESULT - ", updatedGame.result);

//           setTimeout(() => {
//             POST(request);
//           }, 5000);
//         }

//         console.log(`Game ${gameNumber} result: ${result}`);
//       } catch (err) {
//         console.error(err);
//       }
//     }, timeout).unref();

//     // Return the game information to the client
//     return new Response(JSON.stringify(game));
//     // res.json({ gameNumber, startTime, endTime });
//   } catch (error) {
//     console.error(error);
//     return new Response("Internal Server Error", { status: 500, error: error });
//     // res.status(500).json({ message: "Internal server error" });
//   }
// };

export const GET = async (request) => {
  try {
    await connectToDB();

    const latestGame = await RGBet.findOne({})
      .sort({ startTime: -1 })
      .populate({ path: "bets", model: "Bet" })
      .exec();

    return new Response(JSON.stringify(latestGame));
  } catch (error) {
    return new Response("Internal Server Error", { status: 500, error: error });
  }
};
