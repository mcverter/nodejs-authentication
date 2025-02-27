import config from "config";
import jwt from "jsonwebtoken";
import Joi from "joi";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255
  }
});

UserSchema.methods.generateAuthToken = () =>
{
  const token = jwt.sign(
    {_id: this._id}, config.get("AVENAGRATIS_SECRET_KEY"));
  return token;
};

const User = mongoose.model("User", UserSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  };

  return Joi.validate(user, schema);
}

export {User, validateUser as validate};
