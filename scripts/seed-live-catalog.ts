// scripts/seed-live-catalog.ts
import { Environment, Paddle } from "@paddle/paddle-node-sdk";

const paddle = new Paddle(process.env.PADDLE_LIVE_API_KEY!, {
  environment: Environment.sandbox,
});

async function seed() {
  console.log("Creating Starter plan...");
  const starter = await paddle.products.create({
    name: "Starter",
    taxCategory: "standard",
    description: "Starter plan",
  });

  const starterMonthly = await paddle.prices.create({
    productId: starter.id,
    description: "Starter Monthly",
    unitPrice: { amount: "1000", currencyCode: "USD" },
    billingCycle: { interval: "month", frequency: 1 },

    unitPriceOverrides: [
      { countryCodes: ["GB"], unitPrice: { amount: "800", currencyCode: "GBP" } },
      { countryCodes: ["IE"], unitPrice: { amount: "1000", currencyCode: "EUR" } },
      { countryCodes: ["AU"], unitPrice: { amount: "1500", currencyCode: "AUD" } },
    ],
  });

  const starterYearly = await paddle.prices.create({
    productId: starter.id,
    description: "Starter Yearly",
    unitPrice: { amount: "10000", currencyCode: "USD" },
    billingCycle: { interval: "year", frequency: 1 },

    unitPriceOverrides: [
      { countryCodes: ["GB"], unitPrice: { amount: "8000", currencyCode: "GBP" } },
      { countryCodes: ["IE"], unitPrice: { amount: "10000", currencyCode: "EUR" } },
      { countryCodes: ["AU"], unitPrice: { amount: "15000", currencyCode: "AUD" } },
    ],
  });

  console.log("Creating Pro plan...");
  const pro = await paddle.products.create({
    name: "Pro",
    taxCategory: "standard",
    description: "Pro plan",
  });

  const proMonthly = await paddle.prices.create({
    productId: pro.id,
    description: "Pro Monthly",
    unitPrice: { amount: "4000", currencyCode: "USD" },
    billingCycle: { interval: "month", frequency: 1 },

    unitPriceOverrides: [
      { countryCodes: ["GB"], unitPrice: { amount: "3200", currencyCode: "GBP" } },
      { countryCodes: ["IE"], unitPrice: { amount: "4000", currencyCode: "EUR" } },
      { countryCodes: ["AU"], unitPrice: { amount: "6000", currencyCode: "AUD" } },
    ],
  });

  const proYearly = await paddle.prices.create({
    productId: pro.id,
    description: "Pro Yearly",
    unitPrice: { amount: "40000", currencyCode: "USD" },
    billingCycle: { interval: "year", frequency: 1 },

    unitPriceOverrides: [
      { countryCodes: ["GB"], unitPrice: { amount: "32000", currencyCode: "GBP" } },
      { countryCodes: ["IE"], unitPrice: { amount: "40000", currencyCode: "EUR" } },
      { countryCodes: ["AU"], unitPrice: { amount: "60000", currencyCode: "AUD" } },
    ],
  });

  console.log("Creating Advanced plan...");
  const advanced = await paddle.products.create({
    name: "Advanced",
    taxCategory: "standard",
    description: "Advanced plan",
  });

  const advancedMonthly = await paddle.prices.create({
    productId: advanced.id,
    description: "Advanced Monthly",
    unitPrice: { amount: "12000", currencyCode: "USD" },
    billingCycle: { interval: "month", frequency: 1 },

    unitPriceOverrides: [
      { countryCodes: ["GB"], unitPrice: { amount: "9600", currencyCode: "GBP" } },
      { countryCodes: ["IE"], unitPrice: { amount: "12000", currencyCode: "EUR" } },
      { countryCodes: ["AU"], unitPrice: { amount: "18000", currencyCode: "AUD" } },
    ],
  });

  const advancedYearly = await paddle.prices.create({
    productId: advanced.id,
    description: "Advanced Yearly",
    unitPrice: { amount: "120000", currencyCode: "USD" },
    billingCycle: { interval: "year", frequency: 1 },

    unitPriceOverrides: [
      { countryCodes: ["GB"], unitPrice: { amount: "96000", currencyCode: "GBP" } },
      { countryCodes: ["IE"], unitPrice: { amount: "120000", currencyCode: "EUR" } },
      { countryCodes: ["AU"], unitPrice: { amount: "180000", currencyCode: "AUD" } },
    ],
  });

  console.log("\n✅ Catalog successfully created in live environment!");
  console.log(JSON.stringify({
    starter: {
      productId: starter.id,
      monthlyId: starterMonthly.id,
      yearlyId: starterYearly.id,
    },
    pro: {
      productId: pro.id,
      monthlyId: proMonthly.id,
      yearlyId: proYearly.id,
    },
    advanced: {
      productId: advanced.id,
      monthlyId: advancedMonthly.id,
      yearlyId: advancedYearly.id,
    }
  }, null, 2));
}

seed().catch((e) => {
  console.error("Error seeding catalog:", e.message || e);
  process.exit(1);
});
