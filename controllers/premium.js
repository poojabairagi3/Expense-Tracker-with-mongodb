const User =require('../models/user');
// const Expense = require('../models/expense');
// const sequelize = require('../util/database');

exports.getPremium = async (req, res) => {
    try {
const aggrigated_expenses = await User.find().populate("name totalExpenses");
aggrigated_expenses.sort((a, b) => {
  return b.totalExpenses - a.totalExpenses;
});
// console.log('====',aggrigated_expenses)

res.status(200).json(aggrigated_expenses);

    //     const leaderboardofusers = await User.find({
    //         // attributes: ['id', 'name', [sequelize.fn('sum', sequelize.col('expenses.amount')), 'total_cost']],
    //         // include: [                //byDefault:left joint
    //         //     {
    //         //         model: Expense,
    //         //         attributes: []
    //         //     }
    //         // ],
    //         // group: ['user.id'],

            
    //         order: [['totalExpenses', 'DESC']]
    //     });
    //     res.status(200).json(leaderboardofusers);
    }
    catch (err) {
        console.log(err);
    }
}