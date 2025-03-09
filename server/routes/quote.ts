import { Hono } from "hono";

export const quoteRoute = new Hono().get("/", async (c) => {
  const API_KEY = process.env.API_NINJA_QUOTE_KEY;
  const QUOTE_API = "https://api.api-ninjas.com/v1/quotes";
  if (!API_KEY) {
    return c.json({ error: "API KEY is missing" }, 500);
  }

  try {
    const response = await fetch(QUOTE_API, {
      headers: { "X-Api-Key": API_KEY },
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    if (!data || !Array.isArray(data) || !data[0].quote) {
      throw new Error("Invalid API response");
    }
    return c.json({
      quote: data[0].quote,
      author: data[0].author || "Unknown",
    });
  } catch (error) {
    return c.json({ error: "Failed to fetch quote" }, 500);
  }
});
