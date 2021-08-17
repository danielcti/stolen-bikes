import { connectToDatabase } from "../../../config/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import Bike from "../../../models/Bike";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await connectToDatabase();

    if (client) {
        switch (req.method) {
            case "GET":
                return getBikes();
            case "POST":
                return createBike();
            default:
                return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }

    async function getBikes() {
        const bikes = await Bike.find().sort({ date_stolen: 'desc' });
        return res.status(200).json(bikes);
    }

    async function createBike() {
        try {
            const user = await Bike.create(req.body);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }

    return res.status(500);
};
