import mongoose from "mongoose";

const registration = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  hobbies: [
    {
      type: String,
    },
  ],
  state: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
});

export default mongoose.model("formdata", registration);
