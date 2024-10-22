const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true, // Enforce unique constraint
    },
    name: {
        type: String,
        required: true,
        unique: true, // Enforce unique constraint
    },
    password: {
        type: String,
        required: true,
    },
    displayname: {
        type: String,
        required: true,
    },
    usertype: {
        type: String,
        required: true,
    },
});

// Method to generate JWT token based on name , user type and id
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { id: this.id, name: this.name, usertype: this.usertype },
    process.env.JWTPRIVATEKEY,
    { expiresIn: "40day" }
  );
  return token;
}

const User = mongoose.model("User", userSchema);

// Updated validation function to accept passwords of 3 digits or more
const validate = (data) => {
    const schema = joi.object({
      id: joi.string()
             .required().label("ID is required"), // Add ID validation
      name: joi.string()
            .required().label("أسم المستخدم"),
      password: joi.string()
            .pattern(/^\d{3,}$/) // Regex for 3 or more digits
            .required()
            .label("كلمة المرور"), // Error message for password validation
      displayname: joi.string()
            .required().label("اسم العرض"), // Make sure displayname is included
      usertype: joi.string().required().label("أسم العرض"),
    });
    return schema.validate(data);
}

module.exports = { User, validate };
