"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import Logo from "../components/Logo";
import { initializePaddle, Paddle } from '@paddle/paddle-js';

export default function CheckoutPage() {
  const router = useRouter();
  const { setTokens, setPremium } = useAppContext();
  const [paddle, setPaddle] = useState<Paddle | undefined>(undefined);
  
  const [region, setRegion] = useState<"GLOBAL" | "INDIA">("INDIA");

  // Global USD Products
  const globalProducts = [
    { name: "Starter Monthly", price: "$10.00/mo", type: "premium" as const, value: 1, priceId: 'pri_01kz0m7zvv6acm8q4qaynhm1mj' },
    { name: "Pro Monthly", price: "$40.00/mo", type: "premium" as const, value: 1, priceId: 'pri_01kz0m80p6aw3esp2favvphfnj' },
    { name: "Advanced Monthly", price: "$120.00/mo", type: "premium" as const, value: 1, priceId: 'pri_01kz0m81fwtpnjgytmv70ww5ed' },
  ];

  // India PPP Special Products (Affordable Local Pricing)
  const indiaProducts = [
    { name: "Daily Pass", price: "₹9/day", type: "premium" as const, value: 1, priceId: 'pri_01kz0m7zvv6acm8q4qaynhm1mj', note: "⚡ 24-Hour Unlimited Access (~$0.11/day)" },
    { name: "Weekly Pulse Pass", price: "₹59/week", type: "premium" as const, value: 1, priceId: 'pri_01kz0m7zvv6acm8q4qaynhm1mj', note: "🔥 Most Popular in India! (~$0.70/wk)" },
    { name: "Monthly Pro Pass", price: "₹199/mo", type: "premium" as const, value: 1, priceId: 'pri_01kz0m80p6aw3esp2favvphfnj', note: "Save 20% over weekly" },
    { name: "100 Pulse Coins Pack", price: "₹49", type: "coins" as const, value: 100, priceId: 'pri_01kz0m81fwtpnjgytmv70ww5ed', note: "Instant Coin Top-up" },
  ];

  const currentProducts = region === "INDIA" ? indiaProducts : globalProducts;

  useEffect(() => {
    // NOTE: Replace with your actual Sandbox Client-side Token
    initializePaddle({ 
      environment: 'sandbox', 
      token: 'test_508966dfc5b930e6a85955b498c',
      eventCallback: function(event) {
        if (event.name === 'checkout.completed') {
          // Paddle checkout was successful!
          const purchasedItem = event.data?.items?.[0]?.price?.id;
          const product = [...globalProducts, ...indiaProducts].find(p => p.priceId === purchasedItem);
          
          if (product) {
            if (product.type === "coins") {
              setTokens(prev => prev + product.value);
            } else if (product.type === "premium") {
              setPremium(true);
            }
          }
          
          alert("Payment Successful! Your account has been credited.");
          router.push('/');
        }
      }
    }).then(
      (paddleInstance: Paddle | undefined) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      }
    );
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePurchase = (product: typeof globalProducts[0] | typeof indiaProducts[0]) => {
    if (!paddle) {
      alert("Paddle is initializing, please wait a moment.");
      return;
    }
    
    // Open the official Paddle Checkout Modal
    paddle.Checkout.open({
      items: [
        {
          priceId: product.priceId,
          quantity: 1
        }
      ],
      settings: {
        theme: 'dark',
      }
    });
  };

  return (
    <main className="app-container" style={{ position: 'relative' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="h2" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => router.back()} style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', fontSize: '24px', cursor: 'pointer' }}>←</button> 
          <Logo size={28} /> <span style={{ marginLeft: '8px' }}>Store</span>
        </h1>
      </header>

      <div style={{ marginTop: '40px', maxWidth: '800px', margin: '40px auto 0' }}>
        <h2 className="h1" style={{ textAlign: 'center', marginBottom: '8px' }}>Choose Your Plan</h2>
        <p className="text-muted" style={{ textAlign: 'center', marginBottom: '24px' }}>
          Affordable localized pricing secured via Paddle.
        </p>

        {/* Currency / Region Toggle */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '32px' }}>
          <button 
            onClick={() => setRegion("INDIA")}
            className={region === "INDIA" ? "btn-primary" : "btn-outline"}
            style={{ padding: '8px 20px', fontSize: '14px' }}
          >
            🇮🇳 India Pricing (₹ INR)
          </button>
          <button 
            onClick={() => setRegion("GLOBAL")}
            className={region === "GLOBAL" ? "btn-primary" : "btn-outline"}
            style={{ padding: '8px 20px', fontSize: '14px' }}
          >
            🌐 International ($ USD)
          </button>
        </div>

        {!paddle && (
          <div style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--accent-primary)' }}>
            Loading Checkout...
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {currentProducts.map(product => (
            <div key={product.name} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>{product.name}</h3>
                <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--accent-primary)' }}>{product.price}</div>
                {'note' in product && (
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px', marginBottom: 0 }}>{product.note}</p>
                )}
              </div>
              <button 
                className="btn-primary" 
                onClick={() => handlePurchase(product)}
                style={{ width: '100%', opacity: paddle ? 1 : 0.5, cursor: paddle ? 'pointer' : 'not-allowed' }}
                disabled={!paddle}
              >
                Subscribe Now
              </button>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '48px', color: 'var(--text-secondary)', fontSize: '14px' }}>
          🔒 Payments are securely processed via Paddle. Payouts settled via Mercury.
        </div>
      </div>
    </main>
  );
}
