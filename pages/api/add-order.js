import { MongoClient } from "mongodb";

// /api/add-order

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    //connect to mongodb database market if doesnt exist will be created
    const client = await MongoClient.connect(
      //mongodb connection string
      process.env.CONNECTION_STRING
    );
    // get the database market
    const db = client.db();
    // get the database collection if doesnt exist will be created
    const orderCollection = db.collection("orders");
    // insert data to orders collection
    const result = await orderCollection.insertOne(data);
    console.log(result);
    // close database connection
    client.close();
    // if status 201
    res.status(201).json({ message: "Order saved!" });
  }
}

export default handler;
