const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { Schema } = mongoose;

// Define Mongoose schema
const forgotpasswordSchema = new mongoose.Schema({
  
  active: {
    type: Boolean,
    default: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
});

const Forgotpassword = mongoose.model("Forgotpassword", forgotpasswordSchema);
 module.exports = Forgotpassword;

// const mongoose = require("mongoose");
// const forgotpasswordSchema = new mongoose.Schema({
//   active: {
//     type: Boolean,
//     default:true
//   },
//   expiresby: {
//     type: Date,

//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required:true
//   },
// });

// const Forgotpassword = mongoose.model("Forgotpassword", forgotpasswordSchema);
// module.exports = Forgotpassword;

// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// //id, name, password, phone number, role

// const Forgotpassword = sequelize.define('forgotpassword', {
//     id: {
//         type: Sequelize.UUID,
//         allowNull: false,
//         primaryKey: true
//     },
//     active: Sequelize.BOOLEAN,
//     expiresby: Sequelize.DATE,
//     userId:Sequelize.INTEGER
// })

// module.exports = Forgotpassword;
