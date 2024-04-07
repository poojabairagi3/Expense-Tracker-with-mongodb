const mongoose = require("mongoose");
const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    allowNull: false,
  },
  description: {
    type: String,
    allowNull: false,
  },
  category: {
    type: String,
    allowNull: false,
  },
  userId: {
    type: String,
  },
});
const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;

// const Sequelize = require("sequelize");

// const sequelize = require("../util/database");

// const Expense = sequelize.define("expense", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   amount: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
//   description: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   category: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });
// module.exports = Expense;
