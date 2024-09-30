import StockCard from "./card";
import TopGainer from "./TopGainers";
import LiveMarket from "./Live_Market";
import Header from "./header";
import DashboardLayout from "./sidebar";
import Sidebar from "./sidebar";

// Example usage of StockCard component


export default function App() {
  return (
    <div>
      {/* <LiveMarket /> */}
      {/* Pass the company name to filter and display the data */}

      <Header />
      <Sidebar />

      {/* You can also use the stock symbol */}
    </div>

  );
}
