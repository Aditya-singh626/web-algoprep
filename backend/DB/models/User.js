// Import dependencies
const mongoose = require("mongoose");

// ------------------ USER SCHEMA RULES ------------------
const UserschemaRules = {
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true, // creates a unique index
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [6, "password should be at least 6 characters"],
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 6,
    // custom validation to check password match
    validate: [
      function () {
        return this.password === this.confirmPassword;
      },
      "password should be equal to confirm password",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["user", "admin", "feed curator", "moderator"], // only these values allowed
    default: "user",
  },
};

// ------------------ USER SCHEMA ------------------
const userSchema = new mongoose.Schema(UserschemaRules);

// Pre middleware: runs before saving
userSchema.pre("save", function (next) {
  console.log("pre save was called");
  // remove confirmPassword before saving to DB
  this.confirmPassword = undefined;
  next();
});

// Post middleware: runs after saving
userSchema.post("save", function (doc) {
  console.log("post save was called");

  // NOTE: this does not remove password from DB, only from the object in memory
});

// Create User model (collection will be "users")
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
