// Replace with your actual API key
const apiKey = "408a0df39d0c4cf4a0f4a0f7e905d784";

// API endpoint URLs
const BASE_URL = "https://newsapi.org/v2";

// Utility function to fetch news data
async function fetchNews(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

// 1. Load Hero Section with Top Headline
async function loadHeroSection() {
  const articles = await fetchNews(`${BASE_URL}/top-headlines?country=us&pageSize=1&apiKey=${apiKey}`);
  if (articles.length > 0) {
    const article = articles[0];
    document.getElementById("hero-img").src = article.urlToImage || "https://via.placeholder.com/800x450";
    document.getElementById("hero-title").textContent = article.title;
    document.getElementById("hero-byline").textContent = `By ${article.author || "Unknown"}`;
    document.getElementById("hero-excerpt").textContent = article.description || "No description available.";
    document.getElementById("hero-link").href = article.url;
  }
}

// 2. Load Latest News List
async function loadLatestNews() {
  const articles = await fetchNews(`${BASE_URL}/top-headlines?country=us&pageSize=5&apiKey=${apiKey}`);
  const list = document.getElementById("latest-news");
  list.innerHTML = "";
  articles.forEach(article => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${article.url}" target="_blank" class="text-blue-500 hover:underline">${article.title}</a>`;
    list.appendChild(li);
  });
}

// 3. Load Related Articles (can use 'technology' for now)
async function loadRelatedArticles() {
  const articles = await fetchNews(`${BASE_URL}/top-headlines?category=technology&pageSize=5&country=us&apiKey=${apiKey}`);
  const section = document.querySelector("#related-articles ul");
  section.innerHTML = "";
  articles.forEach(article => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="${article.url}" target="_blank" class="text-blue-500 hover:underline">${article.title}</a>`;
    section.appendChild(li);
  });
}

// 4. Load Live Updates (can use 'breaking news' or keyword like 'breaking')
async function loadLiveUpdates() {
  const articles = await fetchNews(`${BASE_URL}/everything?q=breaking&sortBy=publishedAt&pageSize=5&apiKey=${apiKey}`);
  const container = document.querySelector("#live-updates .space-y-2");
  container.innerHTML = "";
  articles.forEach(article => {
    const div = document.createElement("div");
    div.innerHTML = `<a href="${article.url}" target="_blank" class="text-blue-500 hover:underline">${article.title}</a>`;
    container.appendChild(div);
  });
}

// 5. Load More News (business headlines)
async function loadMoreNews() {
  const articles = await fetchNews(`${BASE_URL}/top-headlines?category=business&pageSize=3&country=us&apiKey=${apiKey}`);
  const container = document.getElementById("more-news");
  container.innerHTML = "";
  articles.forEach(article => {
    const div = document.createElement("div");
    div.className = "bg-white rounded-lg shadow p-4 flex-1";
    div.innerHTML = `
      <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" class="rounded mb-3 w-full h-48 object-cover" alt="${article.title}">
      <h3 class="text-lg font-bold mb-1">${article.title}</h3>
      <p class="text-sm text-gray-600 mb-2">${article.description || ''}</p>
      <a href="${article.url}" target="_blank" class="text-cyan-600 hover:underline font-medium">Read More</a>
    `;
    container.appendChild(div);
  });
}

// Scroll-to-top button
const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Initial loader
document.addEventListener("DOMContentLoaded", () => {
  loadHeroSection();
  loadLatestNews();
  loadRelatedArticles();
  loadLiveUpdates();
  loadMoreNews();
});
