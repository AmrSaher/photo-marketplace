const express = require("express");
const { ensureAuthenticated } = require("../config");
const Photo = require("../models/Photo");
const router = express.Router();
const client = require("../config/paypal");
const paypal = require("@paypal/checkout-server-sdk");

// Setup Multer for file uploads
const upload = require("../config/multer");

// Upload photo
router.get("/upload", ensureAuthenticated, (req, res) => res.render("upload"));

router.post(
    "/upload",
    ensureAuthenticated,
    upload.single("photo"),
    async (req, res) => {
        const { title, description, price } = req.body;
        const newPhoto = new Photo({
            title,
            description,
            price,
            user: req.user.id,
            imagePath: req.file.path,
        });
        await newPhoto.save();
        res.redirect("/photos");
    }
);

// View photos
router.get("/", ensureAuthenticated, async (req, res) => {
    const photos = await Photo.find();
    res.render("photos", { photos });
});

// Route to render the buy photo page
router.get("/buy-photo/:photoId", ensureAuthenticated, async (req, res) => {
    const photoId = req.params.photoId; // Get the photo ID from the URL
    const photo = await Photo.findById(photoId);

    res.render("buy-photo", { photo }); // Render the EJS view with photoId and photoPrice
});

// POST route to create a payment
router.post("/buy-photo", ensureAuthenticated, express.json(), async (req, res) => {
    const { photoId } = req.body; // Expecting photoId and amount from the client

    const photo = await Photo.findById(photoId);

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: photo.price, // The price of the photo
                },
            },
        ],
    });

    try {
        const order = await client.execute(request);
        res.json({ id: order.result.id });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating PayPal payment");
    }
});

// POST route to capture a payment
router.post("/capture-photo-payment", ensureAuthenticated, express.json(), async (req, res) => {
    const { orderId } = req.body;

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try {
        const capture = await client.execute(request);
        console.log("Capture result:", capture);
        res.json({ success: true, capture });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error capturing PayPal payment");
    }
});

module.exports = router;
