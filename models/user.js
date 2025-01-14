const mongoose=require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
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
  ispremiummember: {
    type: Boolean,
    default: false,
  },
  totalExpenses: {
    type: Number,
    default: 0,
  },
  token:{
        type:String,
        default:'',
  },
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
  forgotpasswords: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Forgotpassword",
    },
  ],
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;

// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: {
//         type: Sequelize.STRING
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false

//     },
//     ispremiummember:Sequelize.BOOLEAN,
//     totalExpenses:{
//         type:Sequelize.INTEGER,
//         defaultValue:0,
// }
// })
// module.exports = User;