import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: req.body.items,
    success_url: `${process.env.FRONTEND_URL}/success.html`,
    cancel_url: `${process.env.FRONTEND_URL}/cancel.html`
  });

  res.json({ id: session.id });
});

app.listen(4242);
