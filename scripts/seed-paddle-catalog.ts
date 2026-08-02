// scripts/seed-paddle-catalog.ts
import { Environment, Paddle } from "@paddle/paddle-node-sdk";

// Initialize Paddle using the API Key provided in the environment
const apiKey = process.env.PADDLE_API_KEY;
if (!apiKey) {
  console.error("Missing PADDLE_API_KEY environment variable. Please export it and run again.");
  process.exit(1);
}

const paddle = new Paddle(apiKey, {
  environment: Environment.sandbox,
});

async function seed() {
  console.log("Generating Pulse Coins and Premium Catalog in Sandbox...");
  
  // 1. Create Pulse Coins Product
  const coinsProduct = await paddle.products.create({
    name: "Pulse Coins",
    taxCategory: "standard",
    description: "Virtual currency for tipping and features in Pulse Dating.",
  });
  
  // Starter Pack Price (100 coins)
  const starterPackPrice = await paddle.prices.create({
    productId: coinsProduct.id,
    description: "Starter Pack (100 Coins)",
    unitPrice: { amount: "499", currencyCode: "USD" }, // 499 cents = $4.99
  });
  
  // Pro Pack Price (500 coins)
  const proPackPrice = await paddle.prices.create({
    productId: coinsProduct.id,
    description: "Pro Pack (500 Coins)",
    unitPrice: { amount: "1999", currencyCode: "USD" }, // 1999 cents = $19.99
  });
  
  // 2. Create Premium Subscription Product
  const premiumProduct = await paddle.products.create({
    name: "Pulse Premium",
    taxCategory: "standard",
    description: "Unlock exclusive features including the Adult 18+ section.",
  });
  
  // Monthly Premium Price
  const monthlyPremiumPrice = await paddle.prices.create({
    productId: premiumProduct.id,
    description: "Premium Monthly",
    unitPrice: { amount: "699", currencyCode: "USD" }, // 699 cents = $6.99
    billingCycle: { interval: "month", frequency: 1 },
  });
  
  // Yearly Premium Price
  const yearlyPremiumPrice = await paddle.prices.create({
    productId: premiumProduct.id,
    description: "Premium Yearly",
    unitPrice: { amount: "4999", currencyCode: "USD" }, // 4999 cents = $49.99
    billingCycle: { interval: "year", frequency: 1 },
  });
  
  console.log("\n✅ Catalog generated successfully! Here are your new Price IDs:\n");
  console.log(
    JSON.stringify(
      { 
        starterPackId: starterPackPrice.id, 
        proPackId: proPackPrice.id, 
        premiumMonthlyId: monthlyPremiumPrice.id,
        premiumYearlyId: yearlyPremiumPrice.id
      },
      null,
      2,
    ),
  );
  console.log("\nCopy and paste these IDs into your src/app/checkout/page.tsx file.");
}

seed().catch((e) => {
  console.error("Error creating catalog:", e);
  process.exit(1);
});
