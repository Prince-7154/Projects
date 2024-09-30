"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Text, Metric, Badge } from "@tremor/react";

export default function TopGainer() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all stock data from the Flask API
    axios
      .get("/api/TopGainer") // Replace with your actual API endpoint
      .then((response) => {
        const topTen = response.data.slice(0, 10); // Take the first 10 elements

        if (topTen) {
          setData(topTen);
        } else {
          setError(`No data found for`);
        }

        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data from Flask API:", error.message);
        setError("Failed to fetch stock data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-blue-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen py-8 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
          Top 10 Gainers
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {data &&
            data.map((stock, index) => (
              <Card
                key={stock.securityId}
                className="p-6 shadow-lg border border-gray-200 rounded-lg hover:shadow-xl transition-shadow duration-300 bg-white"
              >
                <Text className="font-bold text-2xl text-gray-900 mb-4 text-center">
                  {stock.securityName}
                </Text>
                <Metric className="text-xl font-bold text-gray-700 text-center">
                  {stock.symbol}
                </Metric>

                <div className="flex justify-between items-center mt-6">
                  <Text className="text-gray-600 font-medium">LTP:</Text>
                  <Metric className="text-gray-900 font-bold">
                    {stock.ltp}
                  </Metric>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <Text className="text-gray-600 font-medium">
                    Point Change:
                  </Text>
                  <Metric className="text-gray-900 font-bold">
                    {stock.pointChange}
                  </Metric>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <Text className="text-gray-600 font-medium">
                    Percentage Change:
                  </Text>
                  <Badge
                    color={stock.percentageChange > 0 ? "emerald" : "red"}
                    className={`font-bold px-3 py-1 rounded-full ${
                      stock.percentageChange > 0
                        ? "bg-green-400 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {stock.percentageChange > 0
                      ? `+${stock.percentageChange.toFixed(2)}%`
                      : `${stock.percentageChange.toFixed(2)}%`}
                  </Badge>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
