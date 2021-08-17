import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "";

export async function connectToDatabase() {
  const client = await mongoose.connect(uri, {
    useFindAndModify: false,
  });
  return client;
}
