// api/fetchNews.js

export default async function handler(req, res) {
  const API_KEY = process.env.NEWS_API_KEY;

  const category = req.query.category || "general";
  const size = req.query.size || 10;

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=${size}&apiKey=${API_KEY}`
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news." });
  }
}
