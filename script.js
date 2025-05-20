const apiKey = "408a0df39d0c4cf4a0f4a0f7e905d784";
const BASE_URL = "https://newsapi.org/v2";

// Helper fetch function with error handling
async function fetchNews(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    if (data.status !== "ok") throw new Error("API error: " + data.message);
    return data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

// Update a container with news list
function updateNewsList(containerId, articles) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  if (articles.length === 0) {
    container.innerHTML = "<li>No news available</li>";
    return;
  }
  articles.forEach(article => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${article.url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${article.title}</a>`;
    container.appendChild(li);
  });
}

// Load top headline hero section
async function loadHero() {
  const articles = await fetchNews(`${BASE_URL}/top-headlines?country=us&pageSize=1&apiKey=${apiKey}`);
  if (articles.length > 0) {
    const hero = articles[0];
    document.getElementById("hero-img").src = hero.urlToImage || "https://via.placeholder.com/800x450";
    document.getElementById("hero-title").textContent = hero.title;
    document.getElementById("hero-byline").textContent = `By ${hero.author || "Unknown"}`;
    document.getElementById("hero-excerpt").textContent = hero.description || "No description available.";
    document.getElementById("hero-link").href = hero.url;
  }
}

// Load all news sections
async function loadAllNews() {
  loadHero();

  const latestNews = await fetchNews(`${BASE_URL}/top-headlines?country=us&pageSize=5&apiKey=${apiKey}`);
  updateNewsList("latest-news", latestNews);

  const relatedArticles = await fetchNews(`${BASE_URL}/top-headlines?category=technology&country=us&pageSize=5&apiKey=${apiKey}`);
  updateNewsList("related-articles-ul", relatedArticles);

  const liveUpdates = await fetchNews(`${BASE_URL}/everything?q=breaking&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`);
  updateNewsList("live-updates-container", liveUpdates);

  const moreNews = await fetchNews(`${BASE_URL}/top-headlines?category=business&country=us&pageSize=3&apiKey=${apiKey}`);
  const moreNewsContainer = document.getElementById("more-news");
  moreNewsContainer.innerHTML = "";
  moreNews.forEach(article => {
    const div = document.createElement("div");
    div.className = "bg-white rounded-lg shadow p-4 flex-1";
    div.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" alt="${article.title}" class="rounded mb-3 w-full h-48 object-cover" />
      <h3 class="text-lg font-bold mb-1">${article.title}</h3>
      <p class="text-sm text-gray-600 mb-2">${article.description || ''}</p>
      <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="text-cyan-600 hover:underline font-medium">Read More</a>
    `;
    moreNewsContainer.appendChild(div);
  });
}

// On DOM load
document.addEventListener("DOMContentLoaded", () => {
  loadAllNews();
});

// Back to top button functionality
const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
