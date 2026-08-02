"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "../context/AppContext";
import Logo from "../components/Logo";

export default function CheckoutPage() {
  const router = useRouter();
  const { setTokens, setPremium } = useAppContext();
  const [checkoutState, setCheckoutState] = useState<"idle" | "loading" | "success">("idle");
  const [selectedProduct, setSelectedProduct] = useState<{name: string, price: string, type: "coins" | "premium", value: number} | null>(null);

  const products = [
    { name: "Starter Pack (100 🪙)", price: "$4.99", type: "coins" as const, value: 100 },
    { name: "Pro Pack (500 🪙)", price: "$19.99", type: "coins" as const, value: 500 },
    { name: "Premium Monthly", price: "$6.99/mo", type: "premium" as const, value: 1 },
    { name: "Premium Yearly", price: "$49.99/yr", type: "premium" as const, value: 12 },
  ];

  const handlePurchase = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setCheckoutState("loading");
    
    // Simulate Paddle processing time
    setTimeout(() => {
      if (product.type === "coins") {
        setTokens(prev => prev + product.value);
      } else if (product.type === "premium") {
        setPremium(true);
      }
      setCheckoutState("success");
    }, 2000);
  };

  const closeCheckout = () => {
    setCheckoutState("idle");
    setSelectedProduct(null);
  };

  return (
    <main className="app-container" style={{ position: 'relative' }}>
      
      {/* Simulated Paddle Overlay */}
      {checkoutState !== "idle" && selectedProduct && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.8)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ 
            width: '100%', maxWidth: '420px', background: '#fff', color: '#000', 
            borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column'
          }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #eaeaea', display: 'flex', justifyContent: 'space-between' }}>
               <div style={{ fontWeight: 600, fontSize: '18px' }}>Paddle Checkout</div>
               {checkoutState === "success" && (
                  <button onClick={closeCheckout} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '18px' }}>✕</button>
               )}
            </div>
            
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
              {checkoutState === "loading" ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '48px', animation: 'pulse 1.5s infinite' }}>💳</div>
                  <h3 style={{ marginTop: '16px' }}>Processing Payment securely...</h3>
                  <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>Please do not close this window.</p>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '48px', color: '#10B981' }}>✅</div>
                  <h3 style={{ marginTop: '16px' }}>Payment Successful!</h3>
                  <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
                    {selectedProduct.type === "coins" 
                      ? `Successfully added ${selectedProduct.value} Pulse Coins to your wallet.` 
                      : `Successfully activated ${selectedProduct.name}.`}
                  </p>
                  <p style={{ color: '#999', fontSize: '12px', marginTop: '24px' }}>Payout routed to Mercury Bank</p>
                  
                  <button 
                    onClick={() => router.push('/')}
                    style={{ 
                      background: '#000', color: '#fff', padding: '12px 24px', 
                      borderRadius: '8px', border: 'none', width: '100%', 
                      fontWeight: 600, cursor: 'pointer', marginTop: '24px'
                    }}
                  >
                    Return to Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
                style={{ width: '100%' }}
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
