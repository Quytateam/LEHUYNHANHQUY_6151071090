import mongoose from "mongoose";
import modelOptions from "./model.options.js";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isManagers: String,
  },
  modelOptions
);

userSchema.methods.validPassword = function (password) {
  return this.password === password;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
