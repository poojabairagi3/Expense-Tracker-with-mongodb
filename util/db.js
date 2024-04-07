// const mongoose = require("mongoose");
// const uri = process.env.ATLAS_URI;

// const mongodb = async function main() {
//   await mongoose.connect(
//     
// };
// module.exports = mongodb;

const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let _db;
const MongoConnect = async () => {
  try {
    const Client = await client.connect();
    _db = Client.db("Expensetracker");
    console.log("successfully connected to MongoDB!");
  } catch (error) {
    console.error(error);
  }
};
const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw "No Database Connection";
  }
};

exports.MongoConnect = MongoConnect;
exports.getDb = getDb;
