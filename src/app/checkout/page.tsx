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
  
  // Sandbox Price IDs for Subscription plans (No Free Trial)
  const products = [
    { name: "Starter Monthly", price: "$10.00/mo", type: "premium" as const, value: 1, priceId: 'pri_01kz0m7zvv6acm8q4qaynhm1mj' },
    { name: "Starter Yearly", price: "$100.00/yr", type: "premium" as const, value: 12, priceId: 'pri_01kz0m8044srg70npddc5ndzyc' },
    { name: "Pro Monthly", price: "$40.00/mo", type: "premium" as const, value: 1, priceId: 'pri_01kz0m80p6aw3esp2favvphfnj' },
    { name: "Pro Yearly", price: "$400.00/yr", type: "premium" as const, value: 12, priceId: 'pri_01kz0m80y529j54p5mz503a9tf' },
    { name: "Advanced Monthly", price: "$120.00/mo", type: "premium" as const, value: 1, priceId: 'pri_01kz0m81fwtpnjgytmv70ww5ed' },
    { name: "Advanced Yearly", price: "$1200.00/yr", type: "premium" as const, value: 12, priceId: 'pri_01kz0m81r8hkcs0d5bwtas17k3' },
  ];

  useEffect(() => {
    // NOTE: Replace with your actual Sandbox Client-side Token
    initializePaddle({ 
      environment: 'sandbox', 
      token: 'test_508966dfc5b930e6a85955b498c',
      eventCallback: function(event) {
        if (event.name === 'checkout.completed') {
          // Paddle checkout was successful!
          const purchasedItem = event.data?.items?.[0]?.price?.id;
          const product = products.find(p => p.priceId === purchasedItem);
          
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

  const handlePurchase = (product: typeof products[0]) => {
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
      // Optional settings you can configure
      settings: {
        theme: 'dark',
      }
    });
  };

  return (
    <main className="app-container" style={{ position: 'relative' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="h2" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button onClick={() => router.back()} style={{ background: 'transparent', border: 'none', color: 'var(--accent)', fontSize: '24px', cursor: 'pointer' }}>←</button> 
          <Logo size={28} /> <span style={{ marginLeft: '8px' }}>Store</span>
        </h1>
      </header>

      <div style={{ marginTop: '40px', maxWidth: '800px', margin: '40px auto 0' }}>
        <h2 className="h1" style={{ textAlign: 'center', marginBottom: '16px' }}>Choose your plan</h2>
        <p className="text-muted" style={{ textAlign: 'center', marginBottom: '40px' }}>
          Top up your Pulse Coins or unlock exclusive features with Premium. Secured by Paddle.
        </p>

        {!paddle && (
          <div style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--accent)' }}>
            Loading Paddle Checkout...
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {products.map(product => (
            <div key={product.name} className="bento-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>{product.name}</h3>
                <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--accent)' }}>{product.price}</div>
              </div>
              <button 
                className="btn-primary" 
                onClick={() => handlePurchase(product)}
                style={{ width: '100%', opacity: paddle ? 1 : 0.5, cursor: paddle ? 'pointer' : 'not-allowed' }}
                disabled={!paddle}
              >
                Buy Now
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
