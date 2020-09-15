const winston = require("winston");
const express = require("express");
const cors = require("cors");
const config = require("config");
const stripe = require("stripe")(config.get("stripeKey"));

const app = express();

require("./logger")();
require("./prod")(app);

app.use(cors({ origin: "https://clone-d90d6.web.app" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to my amazon clone backend!");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total),
      currency: "usd",
    });

    res.status(201).send({ clientSecret: paymentIntent.client_secret });
  }
});

const port = process.env.PORT || 3900;

app.listen(port, () => {
  winston.info(`Listening on port ${port}...`);
});
