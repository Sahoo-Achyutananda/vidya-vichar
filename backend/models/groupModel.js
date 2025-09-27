const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["unanswered", "answered", "important"],
    default: "unanswered"
  },
  questionText: {
    type: String,
  },
  questionTimestamp: {
    type: Date,
    default: Date.now
  },
  answerText: {
    type: String,
    default: ""
  },
  answerTimestamp: {
    type: Date,
  }
});

const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
    unique: true
  },
  faculty: {
    type: String,
    required: true
  },
  accessCode: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  questions : [questionSchema]
});

module.exports = mongoose.model('Groups', groupSchema);