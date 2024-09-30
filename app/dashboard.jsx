"use client";
import { useState } from "react";
import { Card, List, ListItem, Text, Badge } from "@tremor/react";
import TopGainer from "./TopGainers";
import LiveMarket from "./Live_Market";
// Dummy components for each section
const PriceVolume = () => <div>Price Volume Content</div>;
const Summary = () => <div>Summary Content</div>;
const SupplyDemand = () => <div>Supply Demand Content</div>;
// const TopGainers = () => <div>Top Gainers Content</div>;
const TopLosers = () => <div>Top Losers Content</div>;
const TopTenTradeScrips = () => <div>Top Ten Trade Scrips Content</div>;
const TopTenTurnoverScrips = () => <div>Top Ten Turnover Scrips Content</div>;
const TopTenTransactionScrips = () => (
  <div>Top Ten Transaction Scrips Content</div>
);
const IsNepseOpen = () => <div>Is Nepse Open Content</div>;
const NepseIndex = () => <div>Nepse Index Content</div>;
const NepseSubIndices = () => <div>Nepse Sub-Indices Content</div>;
const DailyNepseIndexGraph = () => <div>Daily Nepse Index Graph Content</div>;
const DailyScripPriceGraph = () => <div>Daily Scrip Price Graph Content</div>;
const CompanyList = () => <div>Company List Content</div>;
const SecurityList = () => <div>Security List Content</div>;
const TradeTurnoverTransactionSubindices = () => (
  <div>Trade Turnover Transaction Subindices Content</div>
);
// const LiveMarket = () => <div>Live Market Content</div>;

export default function DashboardLayout() {
  // State to keep track of the selected section
  const [selectedSection, setSelectedSection] = useState("PriceVolume");

  // Sidebar items and their respective components
  const sidebarItems = [
    { name: "PriceVolume", component: <PriceVolume /> },
    { name: "Summary", component: <Summary /> },
    { name: "SupplyDemand", component: <SupplyDemand /> },
    { name: "TopGainers", component: <TopGainer /> },
    { name: "TopLosers", component: <TopLosers /> },
    { name: "TopTenTradeScrips", component: <TopTenTradeScrips /> },
    { name: "TopTenTurnoverScrips", component: <TopTenTurnoverScrips /> },
    { name: "TopTenTransactionScrips", component: <TopTenTransactionScrips /> },
    { name: "IsNepseOpen", component: <IsNepseOpen /> },
    { name: "NepseIndex", component: <NepseIndex /> },
    { name: "NepseSubIndices", component: <NepseSubIndices /> },
    { name: "DailyNepseIndexGraph", component: <DailyNepseIndexGraph /> },
    { name: "DailyScripPriceGraph", component: <DailyScripPriceGraph /> },
    { name: "CompanyList", component: <CompanyList /> },
    { name: "SecurityList", component: <SecurityList /> },
    {
      name: "TradeTurnoverTransactionSubindices",
      component: <TradeTurnoverTransactionSubindices />,
    },
    { name: "LiveMarket", component: <LiveMarket /> },
  ];

  // Dynamically render the selected section's component
  const renderContent = () => {
    const foundItem = sidebarItems.find(
      (item) => item.name === selectedSection
    );
    return foundItem ? foundItem.component : <div>Content Not Found</div>;
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <Card className="w-64 h-screen shadow-lg bg-white">
        {/* Sidebar Navigation */}
        <nav className="mt-6">
          <List>
            {sidebarItems.map((item) => (
              <ListItem
                key={item.name}
                className={`px-4 py-3 hover:bg-blue-100 transition-colors cursor-pointer ${
                  selectedSection === item.name ? "bg-blue-200" : ""
                }`}
                onClick={() => setSelectedSection(item.name)}
              >
                <Text>{item.name.replace(/([A-Z])/g, " $1").trim()}</Text>{" "}
                {/* Format camelCase to readable */}
              </ListItem>
            ))}
          </List>
        </nav>
      </Card>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Dashboard - {selectedSection}
        </h1>
        {/* Render the selected content dynamically */}
        <div>{renderContent()}</div>
      </div>
    </div>
  );
}
