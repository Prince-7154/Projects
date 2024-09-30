"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Text, Metric } from "@tremor/react";

export default function StockCard({ companyName }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all stock data from the Flask API
    axios
      .get("/api/flask") // Replace with your actual API endpoint
      .then((response) => {
        const stockDataArray = response.data;

        // Find the specific company by securityName or symbol
        const companyData = stockDataArray.find(
          (company) =>
            company.securityName === companyName ||
            company.symbol === companyName
        );

        if (companyData) {
          setData(companyData);
        } else {
          setError(`No data found for ${companyName}`);
        }

        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data from Flask API:", error.message);
        setError("Failed to fetch stock data");
        setLoading(false);
      });
  }, [companyName]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-sm mx-auto p-4">
      <Card className="mb-4 shadow-lg rounded-lg border border-gray-200 bg-white transition-transform transform hover:scale-105 hover:shadow-2xl">
        {/* Prominent Symbol Section */}
        <div className="flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500 text-white p-8 rounded-t-lg">
          <h1 className="text-5xl font-extrabold tracking-wider uppercase drop-shadow-lg">
            {data.symbol}
          </h1>
          <p className="text-lg opacity-90 mt-2 tracking-widest">
            Security Symbol
          </p>
        </div>

        {/* Stock Data */}
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-center text-gray-800">
            {data.securityName}
          </h2>

          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-medium">Last Traded Price</p>
            <p className="text-lg font-semibold text-green-600">
              Rs. {data.lastTradedPrice}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-medium">Previous Close</p>
            <p className="text-lg font-semibold">Rs. {data.previousClose}</p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-medium">Percentage Change</p>
            <p
              className={`text-lg font-semibold ${
                data.percentageChange >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {data.percentageChange.toFixed(2)}%
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-gray-600 font-medium">Total Trade Quantity</p>
            <p className="text-lg font-semibold text-blue-600">
              {data.totalTradeQuantity}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md transition-colors">
              View Details
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-3 rounded-md transition-colors">
              Add to Watchlist
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
