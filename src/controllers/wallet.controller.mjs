import Transaction from "../models/Transaction.mjs";
import paypal from "@paypal/checkout-server-sdk";
import client from "../config/paypal.mjs";
import payout from "../config/payout.mjs";
import { v4 as UUID } from "uuid";

export const walletPage = async (req, res) => {
    const transactions = await Transaction.find({ to: req.user._id }).sort({
        createdAt: -1,
    });
    let balance = 0;

    for (let transaction of transactions) {
        balance += (transaction.type == "Income" ? 1 : -1) * transaction.amount;
    }

    res.renderWithLayout("wallet", { transactions, balance });
};

export const deposit = async (req, res) => {
    const { amount } = req.body;

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: parseFloat(amount), // The price of the photo
                },
            },
        ],
    });

    try {
        const order = await client.execute(request);
        res.json({ id: order.result.id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error creating PayPal payment" });
    }
};

export const capturePayment = async (req, res) => {
    const { orderId, amount } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try {
        const capture = await client.execute(request);
        console.log("Capture result:", capture);
        const newTransaction = new Transaction({
            to: req.user._id,
            amount: amount,
            type: "Income",
            title: "Wallet Top-up",
        });
        await newTransaction.save();
        res.json({ success: true, capture });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Error capturing PayPal payment" });
    }
};

export const withdraw = async (req, res) => {
    const { amount, email } = req.body;

    const transactions = await Transaction.find({ to: req.user._id });
    let balance = 0;

    for (let transaction of transactions) {
        balance += (transaction.type == "Income" ? 1 : -1) * transaction.amount;
    }

    if (amount > balance) {
        return res.status(400).json({
            msg: "Insufficient balance for this transaction",
        });
    }

    const createPayoutJson = {
        sender_batch_header: {
            sender_batch_id: UUID(),
            email_subject: "You have a payment",
            email_message:
                "You have received a payment. Thanks for using our service!",
        },
        items: [
            {
                recipient_type: "EMAIL",
                amount: {
                    value: (amount * 80) / 100,
                    currency: "USD",
                },
                receiver: email,
                note: "Thanks for your service!",
                sender_item_id: "item_1",
            },
        ],
    };

    payout.payout.create(createPayoutJson, async (err, payout) => {
        if (err) {
            res.status(500).json({
                msg: "Payout failed",
            });
        } else {
            const transaction1 = new Transaction({
                to: req.user._id,
                amount: (amount * 80) / 100,
                type: "Outcome",
                title: "Funds Withdrawal",
            });
            const transaction2 = new Transaction({
                to: req.user._id,
                amount: (amount * 20) / 100,
                type: "Outcome",
                title: "Marketplace Fee",
            });
            await transaction1.save();
            await transaction2.save();

            res.status(200).json({
                msg: "Payout successful",
                payout,
            });
        }
    });
};
