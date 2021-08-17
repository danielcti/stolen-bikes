import { connectToDatabase } from "../../../config/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectToDatabase();

  if (client) {
    switch (req.method) {
      case "GET":
        return getUserById();
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }

  async function getUserById() {
    const user = await User.findOne({ id: req.query.id });
    if (!user) {
      return res.status(404);
    }
    return res.status(200).json(user);
  }
};
