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
            const bike = await Bike.findById(req.query.id);

            if (!bike) {
                return res.status(404).json({ message: "Bike not found" });
            }

            bike.frame_colors = req.body.frame_colors;
            bike.frame_size = req.body.frame_size;
            bike.latitude = req.body.latitude;
            bike.longitude = req.body.longitude;
            bike.stolen = true
            bike.stolen_location = req.body.stolen_location;
            bike.thief_description = req.body.thief_description;
            bike.title = req.body.title;

            await bike.save();
            return res.status(200).json({ sucess: "sucess" });
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
