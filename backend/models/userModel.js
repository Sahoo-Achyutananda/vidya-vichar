const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_classes: [
    {
      type: String,
    }
  ],
  joined_classes: [
    {
      type: String,
    }
  ]
},
  {
    timestamps: true
  });


// Middleware to Hash the password before saving a new user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    // Only hash if the password field is being modified (i.e., new user or password change)
    next();
  }

  // Generate salt and hash
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with the hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('User', userSchema); 