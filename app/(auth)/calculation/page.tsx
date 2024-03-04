"use client";

import React, { useState } from "react";

const Calculation: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>("");

  const calculate = (amount: number, discount: number): number | null => {
    if (discount >= 100) {
      setError("Discount must be less than 100%");
      return null;
    }
    setError("");
    return (amount * 100) / (100 - discount);
  };

  const handleCalculate = () => {
    const calculatedResult = calculate(amount, discount);
    setResult(calculatedResult);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        marginTop: "50px",
      }}
    >
      <div>
        <h1 className="text-5xl font-bold my-4">Discount Calculator</h1>

        <div>
          <div>
            <label htmlFor="amount" className="text-lg font-bold my-2">
              Amount
            </label>
          </div>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="border-2 border-gray-800 rounded-sm  my-2"
          />
        </div>
        <div>
          <div>
            <label htmlFor="discount" className="text-lg font-bold my-2">
              Discount (%)
            </label>
          </div>
          <input
            type="number"
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(parseFloat(e.target.value))}
            className="border-2 border-gray-800 rounded-sm  my-2"
          />
        </div>
        <button
          onClick={handleCalculate}
          className="mt-5 flex justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
        >
          Calculate
        </button>
        {result !== null && (
          <p className="text-lg font-bold my-2">
            Original Amount: {result.toFixed(0)}
          </p>
        )}
        {error && <p className="text-red-600 my-2">{error}</p>}
        {/* Display error message if present */}
      </div>
    </div>
  );
};

export default Calculation;
