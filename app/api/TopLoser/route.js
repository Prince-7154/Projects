import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get("http://localhost:8000/TopLosers"); // Update to your Flask endpoint
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching data from Flask API:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch data from Flask API" },
      { status: 500 }
    );
  }
}
