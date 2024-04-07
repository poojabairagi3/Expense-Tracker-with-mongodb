// const sequelize = require('../util/database');
const Expense = require("../models/expense");
const User = require("../models/user");
// const AWS=require('aws-sdk');
const S3Service = require("../services/S3services");
const UserServices = require("../services/userservices");
const FileUploaded = require("../models/fileuploaded");

exports.getallfiles = async (req, res) => {
  try {
    // const expense = await Expense.findAll({where:{userId:req.user.id}});
    // const expense = await req.user.getExpenses();
    const urls =  await FileUploaded.find({ userId: req.user._id });
    console.log(urls);
    res.status(201).json({ urls: urls });
  } catch (err) {
    console.log(err); 
  }
};

exports.getdownloadfile = async (req, res) => {
  try {
    const expenses = await UserServices.getExpenses(req);
    const stringifiedExpenses = JSON.stringify(expenses);
    //it should dependid upon the userId

    const userId = req.user._id;
    const filename = `myexpense${userId}/${new Date()}.txt`;
    const fileURl = await S3Service.uploadToS3(stringifiedExpenses, filename);
    console.log(fileURl);
    await FileUploaded.create({ URL: fileURl, userId });
    res.status(200).json({ fileURl, success: true });
  } catch (err) {
    console.log(err);
  }
};

exports.postExpense = async (req, res, next) => {
  try {
    // const user=req.user;
    const { amount, description, category } = req.body;
    // console.log(req.user.id);
    const expense = await new Expense({
      amount: amount,
      description: description,
      category: category,
      userId: req.user._id,
    }).save();
    console.log(expense);
    const totalExpense = parseInt(req.user.totalExpenses) + parseInt(amount);
    const curUser = await User.findById(req.user._id);
    console.log("A");
    curUser.totalExpenses = totalExpense;
    await curUser.save();
    console.log(totalExpense);
    // await t.commit();
    res.status(200).json({ expense });
  } catch (err) {
    // await t.rollback();
    console.log(err);
  }
};

// exports.getExpense = async (req, res, next) => {
//     try {
//         // const expense = await Expense.findAll({where:{userId:req.user.id}});
//         const expense = await req.user.getExpenses();
//         // const expense = await Expense.findAll({
//         //     where: { userId: req.user.id }
//         // })
//         // console.log(expense)
//         res.status(201).json({ expense: expense });
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

exports.getExpenses = async (req, res, next) => {
  try {
    const userId = req.user.userId; // Assuming userId is passed in the request params
    let ITEMS_PER_PAGE = Number(req.query.ITEMS_PER_PAGE);
    let page = Number(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default to limit of 10 if not provided

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Query expenses for the specific user with pagination
    const expenses = await Expense.find({ userId: req.user._id })
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 }); // Assuming you want to sort by date in descending order
    const totalItems = await Expense.find({ userId: req.user._id }).count();
    res.status(200).json({
      success: true,
      expenses: expenses,
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      nextPage: page + 1,
      hasPreviousPage: page > 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

// exports.getExpenses = async (req, res, next) => {
//     try {
//       let ITEMS_PER_PAGE =Number(req.query.ITEMS_PER_PAGE);
//       let page = Number(req.query.page) || 1;
//       let totalItems;

//       await Expense.updateOne( { userId: req.user._id  })
//         .then((total) => {
//           totalItems = total;
//           return Expense.find({
//             offset: (page - 1)*ITEMS_PER_PAGE,
//             limit: ITEMS_PER_PAGE,
//               userId: req.user._id }
//           );
//         })
//         .then((expense) => {
//           res.json({
//             expenses: expense,
//             currentPage: page,
//             hasNextPage: ITEMS_PER_PAGE * page < totalItems,
//             nextPage: page + 1,
//             hasPreviousPage: page > 1,
//             previousPage: page - 1,
//             lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
//           });
//         });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ error: err });
//     }
//   };

// exports.getExpenses = async (req, res, next) => {
//     try {
//         let ITEMS_PER_PAGE =3;
//         let page =req.query.page || 1;
//         let totalItems;

//         await Expense.count()
//             .then((total) => {
//                 totalItems = total;
//                 return Expense.findAll({
//                     offset: (page - 1) * ITEMS_PER_PAGE,
//                     limit: ITEMS_PER_PAGE,
//                     // where: { userId: req.user.id }
//                 })
//             })
//             .then((expense) => {
//                 res.json({
//                     expenses: expense,
//                     currentPage: page,
//                     hasNextPage: ITEMS_PER_PAGE * page < totalItems,
//                     nextPage: page + 1,
//                     hasPreviousPage: page > 1,
//                     lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
//                 });
//             });
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({ error: err });
//     }
// }

exports.deleteExpense = async (req, res, next) => {
  // const t = await sequelize.transaction();
  try {
    const eId = req.params.id;
    console.log(eId);
    if (req.params.id == "undefined") {
      console.log("ID is missing");
      return res.status(400).json({ err: "Id is missing" });
    }

    const amount = await Expense.findById(eId);
    await Expense.findByIdAndDelete(eId);
    const totalExpense =
      parseInt(req.user.totalExpenses) - parseInt(amount.amount);
    let curUser = await User.findById(req.user._id);
    curUser.totalExpenses = totalExpense;
    await curUser.save();
    // await t.commit();

    return res
      .status(200)
      .json({ success: true, message: "Expense is deleted successfully!!" });
  } catch (err) {
    // await t.rollback();
    console.log(err);
    res.status(500).json(err);
  }
};
