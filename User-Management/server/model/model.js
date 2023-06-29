// import options from './options';
const mongoose = require('mongoose');
const crypto = require("crypto");

var schema = new mongoose.Schema(
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
      // select: false,
    },
    isManagers : String,
  },
  {
    toJSON: {
      virtuals: true,
      transform: (_, obj) => {
        delete obj._id;
        return obj;
      }
    },
    toObject: {
      virtuals: true,
      transform: (_, obj) => {
        delete obj._id;
        return obj;
      }
    },
    versionKey: false,
    timestamps: true     
  }
)

schema.methods.validPassword = function (password) {
  return this.password === password;
};

const userModel = mongoose.model('User', schema);

module.exports = userModel;