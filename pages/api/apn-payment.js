// import Cors from "cors";

// // Initializing the cors middleware
// const cors = Cors({
//   methods: ["POST", "HEAD"],
// });

// // Helper method to wait for a middleware to execute before continuing
// // And to throw an error when an error happens in a middleware
// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) {
//         return reject(result);
//       }

//       return resolve(result);
//     });
//   });
// }

async function handler(req, res) {
  // Run the middleware
  // await runMiddleware(req, res, cors);

  const result = await fetch(
    "https://stagingjbsi.com/triple-a/payment-request",
    {
      method: req.method,
      body: req.body,
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": "723d50455d76b31ccc0027c3d1747d91624bb92d3bfd4",
      },
    }
  );

  const responseData = await result.json();
  res.status(201).json({ response: responseData });
}

export default handler;
