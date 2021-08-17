import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  id: String,
});

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;
