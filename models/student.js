const mongoose = require("mongoose")

// Define the schema for the Student entity
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["placed", "not_placed"],
    required: true,
  },
  courseScores: {
    dsaFinalScore: {
      type: Number,
      required: true,
    },
    webDFinalScore: {
      type: Number,
      required: true,
    },
    reactFinalScore: {
      type: Number,
      required: true,
    },
  },
  interviews: {
    company: {
      type: String,
    },
    date: {
      type: Date,
    },
    result: {
      type: String,
      enum: ["PASS", "FAIL", "On Hold", "Didn’t Attempt"],
    },
  },
})

// Create the models for the Student
const Student = mongoose.model("Student", studentSchema)

module.exports = { Student }
