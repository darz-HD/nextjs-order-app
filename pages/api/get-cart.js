import { MongoClient } from "mongodb";

// /api/get-cart

async function handler(req, res) {
  const data = req.body;
  //connect to mongodb database market if doesnt exist will be created
  const client = await MongoClient.connect(
    //mongodb connection string
    process.env.CONNECTION_STRING
  );
  // get the database market
  const db = client.db();
  // get the database collection if doesnt exist will be created
  const cartCollection = db.collection("cart");
  // insert data to products collection
  const result = await cartCollection.find().toArray();
  console.log(result);
  // close database connection
  client.close();
  // if status 201
  res.status(201).json(result);
}

export default handler;
