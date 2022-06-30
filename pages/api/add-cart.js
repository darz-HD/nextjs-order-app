import { MongoClient } from "mongodb";

// /api/add-cart

async function handler(req, res) {
  if (req.method === "PUT") {
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
    // insert data to cart collection
    const result = await cartCollection.updateOne(
      { userId: 1 },
      { $set: { items: data.items, totalQuantity: data.totalQuantity, totalAmount: data.totalAmount } },
      { upsert: true }
    );
    console.log(result);
    // close database connection
    client.close();
    // if status 201
    res.status(201).json({ message: "New Item inserted in cart!" });
  }
}

export default handler;
