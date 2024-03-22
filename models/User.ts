import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Input your fullname"],
    },
    email: {
      type: String,
      required: [true, "Input an email address"],
    },
    password: {
      type: String,
      required: [true, "Input you password"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
