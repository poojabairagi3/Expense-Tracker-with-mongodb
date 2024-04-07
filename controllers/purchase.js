const RazorPay = require("razorpay");
const Order = require("../models/order");

exports.purchasepremium = async (req, res) => {
  try {
    var rzp = new RazorPay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRECT,
    });
    let options={
      amount:5000,
      currency:"INR",
    };

    rzp.orders.create(options, async (err, order) => {
      if (err) {
        return res.status(500).json({ message: "error occur" });
      } else {
        const newOrder = await Order.create({
          orderid: order.id,
          status: "PENDING",
        }); 
        return res.status(201).json({ message: "succesful", order });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "something went wrong", error: err });
  }
};


exports.updatetransactionstatus = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne(
       { orderid: order_id } );
    const promise1 = order.updateOne({
      paymentid: payment_id,
      status: "SUCCESSFUL",
    });
    const promise2 = req.user.updateOne({ ispremiummember: true });
    await Promise.all([promise1, promise2]);
    return res
      .status(202)
      .json({ sucess: true, message: "Transaction Sucessful" });
  } catch (err) {
    res.status(403).json({ success: false });
    console.log(err);
  }
};
