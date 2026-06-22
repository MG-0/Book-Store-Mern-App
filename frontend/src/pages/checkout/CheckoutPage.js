import React from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, Truck, AlertCircle, ShieldCheck } from "lucide-react";
import useCheckoutPage from "./useCheckoutPage";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import CheckoutOrderSummarySide from "./CheckoutOrderSummarySide";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, form, submitting, onChange, onSubmit } = useCheckoutPage();

  const cartTotal = Number(cart?.totalPrice) || 0;
  const shippingCost = cartTotal > 150 ? 0 : 10;
  const orderTotal = cartTotal + shippingCost;

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-16 mt-16 font-sans">
        <Card className="text-center max-w-md p-8 border-gray-100 shadow-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty! 🛒</h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            You must add at least one book to your cart before proceeding to checkout.
          </p>
          <Button
            onClick={() => navigate("/products")}
            className="w-full py-3"
          >
            Go Shop Books
          </Button>
        </Card>
      </div>
    );
  }

  // CLEAN CODE COMMENT:
  // Component Splitting separates the shipping/payment fields from the order calculations.
  // Tailwind layout classes are used directly inline to provide instant visual editing of form blocks.
  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 mt-16 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout Order 🛒</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Shipping & Payment */}
          <form onSubmit={onSubmit} className="lg:col-span-2 space-y-6">
            
            {/* Billing Address Card */}
            <Card className="p-6 sm:p-8 border-gray-100 space-y-6">
              <h3 className="text-xl font-bold text-gray-900 pb-2 border-b">
                Shipping Information 🚚
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Full Name</label>
                  <Input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                    placeholder="e.g. Alice Smith"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Email Address</label>
                    <Input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      required
                      placeholder="alice@example.com"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Phone Number</label>
                    <Input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      required
                      placeholder="+1 (555) 012-3456"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Delivery Address</label>
                  <Input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={onChange}
                    required
                    placeholder="Street name, apartment, unit, etc."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">City</label>
                    <Input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={onChange}
                      required
                      placeholder="e.g. San Francisco"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Zip Code</label>
                    <Input
                      type="text"
                      name="zipCode"
                      value={form.zipCode}
                      onChange={onChange}
                      placeholder="e.g. 94103"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Payment Method Card */}
            <Card className="p-6 sm:p-8 border-gray-100 space-y-6">
              <h3 className="text-xl font-bold text-gray-900 pb-2 border-b">
                Payment Method 💳
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className={`flex flex-col p-4 border rounded-xl cursor-pointer hover:bg-gray-50/50 transition ${
                  form.paymentMethod === "credit" ? "border-indigo-600 bg-indigo-50/20" : "border-gray-100"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit"
                      checked={form.paymentMethod === "credit"}
                      onChange={onChange}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-bold text-gray-900 text-sm">Credit/Debit</div>
                    <div className="text-gray-400 text-xs">Mock Card Payment</div>
                  </div>
                </label>

                <label className={`flex flex-col p-4 border rounded-xl cursor-pointer hover:bg-gray-50/50 transition ${
                  form.paymentMethod === "paypal" ? "border-indigo-600 bg-indigo-50/20" : "border-gray-100"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold italic text-indigo-600 text-sm font-sans tracking-tight">PayPal</span>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={form.paymentMethod === "paypal"}
                      onChange={onChange}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-bold text-gray-900 text-sm">PayPal Express</div>
                    <div className="text-gray-400 text-xs">Sandbox Sandbox</div>
                  </div>
                </label>

                <label className={`flex flex-col p-4 border rounded-xl cursor-pointer hover:bg-gray-50/50 transition ${
                  form.paymentMethod === "cod" ? "border-indigo-600 bg-indigo-50/20" : "border-gray-100"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <Truck className="w-5 h-5 text-gray-700" />
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={form.paymentMethod === "cod"}
                      onChange={onChange}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-bold text-gray-900 text-sm">Cash on Delivery</div>
                    <div className="text-gray-400 text-xs">Pay on arrival</div>
                  </div>
                </label>
              </div>

              {/* Secure checkout info */}
              <div className="flex items-start gap-2 bg-gray-50/50 p-4 rounded-xl text-gray-400 text-xs leading-relaxed border border-gray-100/50">
                <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <span>Your checkout data is encrypted and saved securely. Payment gateways are loaded in test mode.</span>
              </div>
            </Card>
          </form>

          {/* Right Column: Order Summary */}
          <div className="w-full">
            <CheckoutOrderSummarySide
              cart={cart}
              cartTotal={cartTotal}
              shippingCost={shippingCost}
              orderTotal={orderTotal}
              submitting={submitting}
              onSubmit={onSubmit}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
