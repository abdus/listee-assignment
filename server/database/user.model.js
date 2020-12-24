import mongoose from "mongoose";
import crypto from "crypto";

const schema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  salt: { type: String },
});

schema.pre("save", function (next) {
  const that = this;
  const ITER = 1000;

  if (that.isModified("password")) {
    that.salt = crypto.randomBytes(16).toString("hex");
    that.password = crypto
      .pbkdf2Sync(that.password, that.salt, ITER, 64, "sha512")
      .toString("hex");
  }
  next();
});

schema.methods.verifyPassword = function (password) {
  const that = this;
  const ITER = 1000;

  const hash = crypto
    .pbkdf2Sync(password, that.salt, ITER, 64, "sha512")
    .toString("hex");

  return hash === that.hash;
};

const model = mongoose.model("User", schema);
export default model;
