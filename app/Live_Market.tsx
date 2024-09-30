"use client";
import { useState, useEffect } from "react";
import axios from "axios";

// Table Header component
const TableHeader = ({ label, sortKey, sortOrder, onSort }) => {
  const handleSort = () => {
    onSort(sortKey);
  };

  return (
    <th className="px-4 py-2 cursor-pointer" onClick={handleSort}>
      {label}{" "}
      {sortOrder &&
        sortOrder.key === sortKey &&
        (sortOrder.direction === "asc" ? "↑" : "↓")}
    </th>
  );
};

// LiveMarket Table Component - displays all stock data in a table
export default function LiveMarket() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState({ key: "", direction: "" });

  useEffect(() => {
    // Fetch the live stock data from the API
    axios
      .get("/api/live") // Replace with your actual API endpoint
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching live stock data:", error);
        setError("Failed to fetch live stock data");
        setLoading(false);
      });
  }, []);

  // Sorting logic
  const handleSort = (sortKey) => {
    const direction =
      sortOrder.key === sortKey && sortOrder.direction === "asc"
        ? "desc"
        : "asc";
    setSortOrder({ key: sortKey, direction });

    const sortedData = [...data].sort((a, b) => {
      if (direction === "asc") {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      } else {
        return a[sortKey] < b[sortKey] ? 1 : -1;
      }
    });

    setData(sortedData);
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="min-h-screen py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
          Live Market Data
        </h1>

        <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <TableHeader
                label="Security Name"
                sortKey="securityName"
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <TableHeader
                label="Symbol"
                sortKey="symbol"
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <TableHeader
                label="Last Traded Price"
                sortKey="lastTradedPrice"
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <TableHeader
                label="Volume"
                sortKey="lastTradedVolume"
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <TableHeader
                label="Percentage Change"
                sortKey="percentageChange"
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <TableHeader
                label="High Price"
                sortKey="highPrice"
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <TableHeader
                label="Low Price"
                sortKey="lowPrice"
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <TableHeader
                label="Open Price"
                sortKey="openPrice"
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <TableHeader
                label="Previous Close"
                sortKey="previousClose"
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <TableHeader
                label="Total Trade Value"
                sortKey="totalTradeValue"
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <TableHeader
                label="Total Trade Quantity"
                sortKey="totalTradeQuantity"
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <TableHeader
                label="Last Updated"
                sortKey="lastUpdatedDateTime"
                sortOrder={sortOrder}
                onSort={handleSort}
              />
            </tr>
          </thead>
          <tbody>
            {data.map((stock) => (
              <tr
                key={stock.securityId}
                className={`border-b ${
                  stock.percentageChange > 0
                    ? "bg-green-900 text-white"
                    : "bg-red-900 text-white"
                }`}
              >
                <td className="px-4 py-2">{stock.securityName}</td>
                <td className="px-4 py-2">{stock.symbol}</td>
                <td className="px-4 py-2">{stock.lastTradedPrice}</td>
                <td className="px-4 py-2">{stock.lastTradedVolume}</td>
                <td className="px-4 py-2">
                  {stock.percentageChange > 0
                    ? `+${stock.percentageChange}%`
                    : `${stock.percentageChange}%`}
                </td>
                <td className="px-4 py-2">{stock.highPrice}</td>
                <td className="px-4 py-2">{stock.lowPrice}</td>
                <td className="px-4 py-2">{stock.openPrice}</td>
                <td className="px-4 py-2">{stock.previousClose}</td>
                <td className="px-4 py-2">{stock.totalTradeValue}</td>
                <td className="px-4 py-2">{stock.totalTradeQuantity}</td>
                <td className="px-4 py-2">
                  {new Date(stock.lastUpdatedDateTime).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
