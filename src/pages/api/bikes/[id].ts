import { connectToDatabase } from "../../../config/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import Bike from "../../../models/Bike";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const client = await connectToDatabase();

    if (client) {
        switch (req.method) {
            case "GET":
                return getBikeById();
            case "PUT":
                return updateBike();
            case "DELETE":
                return deleteBike();
            default:
                return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    }

    async function getBikeById() {
        const bike = await Bike.findById(req.query.id);
        if (!bike) {
            return res.status(404);
        }
        return res.status(200).json(bike);
    }

    async function updateBike() {
        try {
            const bike = await Bike.findByIdAndUpdate(req.query.id, req.body, {
                useFindAndModify: false,
            });
            if (!bike) {
                return res.status(404).json({ message: "Bike not found" });
            }
            return res.status(204).json(bike);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }

    async function deleteBike() {
        try {
            const bike = await Bike.findByIdAndDelete(req.query.id);
            return res.status(200).json(bike);
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }

    return res.status(500);
};
