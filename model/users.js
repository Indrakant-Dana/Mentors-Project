const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const {ObjectId} = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provied a valid email"],
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  role: {
    type: String,
    enum: ["mentor", "mentee"],
    default: "mentee",
  },
  domain: {
    type: String,
    required: [true, "Please provide your Field"],
  },
  password: {
    type: String,
    required: [true, "Please provied a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  followers: [{ type: ObjectId, ref: "User" }],
  following: [{ type: ObjectId, ref: "User" }],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePasssword,
  userPassword
) {
  return await bcrypt.compare(candidatePasssword, userPassword);
};

// const menteeSchema = new mongoose.Schema({
//   currentMentors: {
//     type: Array,
//   },
//   college: {
//     Type: String,
//     required: [true, "Please specify your college"],
//   },
//   year_of_study: {
//     Type: String,
//     required: [true, "Please specify your year of study"],
//   },
//   Branch: {
//     Type: String,
//     required: [true, "Please specify your branch"],
//   },
// });

// const mentorSchema = new mongoose.Schema({
//   currentMentees: {
//     type: Array,
//   },
//   college: {
//     Type: String,
//     required: [true, "Please specify your college"],
//   },
//   year_of_study: {
//     Type: String,
//     required: [true, "Please specify your year of study"],
//   },
//   Branch: {
//     Type: String,
//     required: [true, "Please specify your branch"],
//   },
//   rating: Number,
// });

// const User = mongoose.model("User", usersSchema, "users");
// User.Mentee = mongoose.model("Mentee", menteesSchema, "users");
// User.Mentor = mongoose.model("Mentor", mentorsSchema, "users");

const User = mongoose.model("User", userSchema);

module.exports = User;
