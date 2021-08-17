import { connectToDatabase } from "../../../config/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase();

  if (client) {
    switch (req.method) {
      case "GET":
        return getUsers();
      case "POST":
        return createUser();
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }

  async function getUsers() {
    const users = await User.find().sort({ date_stolen: "desc" });
    return res.status(200).json(users);
  }

  async function createUser() {
    try {
      const user = await User.create(req.body);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  return res.status(500);
};
