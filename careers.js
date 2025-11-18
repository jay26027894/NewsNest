document.addEventListener("DOMContentLoaded", () => {
  const careerNewsDiv = document.getElementById("career-news");
  const jobInsightsDiv = document.getElementById("job-insights");

  const API_KEY = "a11403d654213e8015504a809f0db750"; // GNews API key

  // Fetch career and business-related news
  async function fetchCareerNews() {
    try {
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=careers OR jobs OR hiring OR employment OR recruitment&lang=en&max=9&token=${API_KEY}`
      );
      const data = await response.json();

      if (!data.articles || data.articles.length === 0) {
        careerNewsDiv.innerHTML = '<p class="text-gray-500">No career news available at the moment.</p>';
        return;
      }

      careerNewsDiv.innerHTML = "";
      data.articles.forEach(article => {
        const articleCard = document.createElement("article");
        articleCard.className = "bg-white rounded-xl shadow-lg p-5 hover:-translate-y-1 hover:shadow-2xl transition";
        articleCard.innerHTML = `
          <img src="${article.image || 'https://via.placeholder.com/400'}" alt="${article.title}" 
               class="w-full h-48 object-cover rounded-lg mb-3" />
          <h3 class="text-lg font-bold mb-2 text-teal-800 line-clamp-2">${article.title}</h3>
          <p class="text-gray-600 text-sm mb-2">${new Date(article.publishedAt).toLocaleDateString()}</p>
          <p class="text-gray-700 text-sm mb-3 line-clamp-3">${article.description || ''}</p>
          <a href="${article.url}" target="_blank" 
             class="inline-block text-cyan-500 font-semibold hover:text-cyan-700 transition">
            Read More →
          </a>
        `;
        careerNewsDiv.appendChild(articleCard);
      });
    } catch (error) {
      console.error("Error fetching career news:", error);
      careerNewsDiv.innerHTML = '<p class="text-red-500">Failed to load career news. Please try again later.</p>';
    }
  }

  // Fetch business news for job market insights
  async function fetchJobInsights() {
    try {
      const response = await fetch(
        `https://gnews.io/api/v4/search?q=job market OR labor market OR unemployment OR workforce&lang=en&max=5&token=${API_KEY}`
      );
      const data = await response.json();

      if (!data.articles || data.articles.length === 0) {
        jobInsightsDiv.innerHTML = '<p class="text-gray-500">No job market insights available at the moment.</p>';
        return;
      }

      jobInsightsDiv.innerHTML = "";
      data.articles.forEach(article => {
        const insightItem = document.createElement("div");
        insightItem.className = "border-l-4 border-teal-400 pl-4 py-2";
        insightItem.innerHTML = `
          <h3 class="font-bold text-gray-800 mb-1">
            <a href="${article.url}" target="_blank" class="hover:text-cyan-600 transition">
              ${article.title}
            </a>
          </h3>
          <p class="text-sm text-gray-600">${article.source.name} • ${new Date(article.publishedAt).toLocaleDateString()}</p>
        `;
        jobInsightsDiv.appendChild(insightItem);
      });
    } catch (error) {
      console.error("Error fetching job insights:", error);
      jobInsightsDiv.innerHTML = '<p class="text-red-500">Failed to load job market insights. Please try again later.</p>';
    }
  }

  // Load all content
  fetchCareerNews();
  fetchJobInsights();
});
