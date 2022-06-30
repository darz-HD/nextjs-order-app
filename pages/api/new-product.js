import { MongoClient } from "mongodb";

// /api/new-meetup

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
    const productCollection = db.collection("products");
    // insert data to products collection
    const result = await productCollection.insertOne(data);
    console.log(result);
    // close database connection
    client.close();
    // if status 201
    res.status(201).json({ message: "Product inserted!" });
  }
}

export default handler;
