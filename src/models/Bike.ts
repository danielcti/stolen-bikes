import mongoose from "mongoose";

const BikeSchema = new mongoose.Schema({
    title: String,
    stolen_location: String,
    latitude: Number,
    longitude: Number,
    thief_description: String,
    date_stolen: Number,
    large_img: String,
    frame_colors: String,
    frame_size: String,
});

const BikeModel = mongoose.models.Bike || mongoose.model("Bike", BikeSchema);

export default BikeModel;