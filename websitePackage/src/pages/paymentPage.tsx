// src/pages/Payments.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaLock, FaCheck } from "react-icons/fa";
import "../paymentPage.css"; // Adjust the path as necessary

interface PaymentData {
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
}

const paymentPage: React.FC = () => {
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<Partial<PaymentData>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<PaymentData> = {};

    if (!paymentData.cardNumber.replace(/\s/g, "").match(/^\d{16}$/)) {
      newErrors.cardNumber = "Valid card number required";
    }

    if (!paymentData.cardName.trim()) {
      newErrors.cardName = "Name on card required";
    }

    if (!paymentData.expiryDate.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
      newErrors.expiryDate = "MM/YY format required";
    }

    if (!paymentData.cvv.match(/^\d{3,4}$/)) {
      newErrors.cvv = "3 or 4 digit code required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      // Redirect after success
      setTimeout(() => navigate("/bookings"), 2000);
    }, 1500);
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim()
      .slice(0, 19);
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2 className="payment-title">
          <FaCreditCard /> Payment Details
        </h2>
        <p className="payment-subtitle">
          Complete your booking with secure payment
        </p>

        {isSuccess ? (
          <div className="payment-success">
            <div className="success-icon">
              <FaCheck />
            </div>
            <h3>Payment Successful!</h3>
            <p>Your booking is confirmed. Redirecting...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className={`form-group ${errors.cardNumber ? "error" : ""}`}>
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formatCardNumber(paymentData.cardNumber)}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
              {errors.cardNumber && (
                <span className="field-error">{errors.cardNumber}</span>
              )}
            </div>

            <div className={`form-group ${errors.cardName ? "error" : ""}`}>
              <label>Name on Card</label>
              <input
                type="text"
                name="cardName"
                value={paymentData.cardName}
                onChange={handleChange}
                placeholder="John Smith"
              />
              {errors.cardName && (
                <span className="field-error">{errors.cardName}</span>
              )}
            </div>

            <div className="form-row">
              <div className={`form-group ${errors.expiryDate ? "error" : ""}`}>
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  maxLength={5}
                />
                {errors.expiryDate && (
                  <span className="field-error">{errors.expiryDate}</span>
                )}
              </div>

              <div className={`form-group ${errors.cvv ? "error" : ""}`}>
                <label>CVV</label>
                <div className="cvv-input">
                  <input
                    type="text"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    maxLength={4}
                  />
                  <FaLock className="lock-icon" />
                </div>
                {errors.cvv && (
                  <span className="field-error">{errors.cvv}</span>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="payment-button"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : `Pay $${"120.00"}`}
            </button>

            <div className="payment-security">
              <FaLock /> Your payment is securely encrypted
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default paymentPage;
