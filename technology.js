const container = document.getElementById("tech-news");
container.innerHTML = "<p class='text-gray-600'>Loading news...</p>";

const GNEWS_API_KEY = "a11403d654213e8015504a809f0db750";

async function fetchTechNews() {
  try {
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?topic=technology&lang=en&country=in&token=${GNEWS_API_KEY}&max=18`
    );
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      container.innerHTML = "<p class='text-gray-600'>No news found.</p>";
      return;
    }

    container.innerHTML = ""; // clear loading text

    data.articles.forEach(article => {
      const card = document.createElement("div");
      card.className = "bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition mb-6";
      card.innerHTML = `
        ${article.image ? `<img src="${article.image}" alt="news image" class="rounded w-full h-48 object-cover mb-4">` : ""}
        <h2 class="text-lg font-bold text-teal-800">${article.title}</h2>
        <p class="text-gray-600 text-sm mb-2">${article.source.name || "GNews"}</p>
        <p class="text-sm text-gray-700 mb-3">${article.description || ""}</p>
        <a href="${article.url}" target="_blank" class="text-cyan-500 hover:text-cyan-700 font-semibold">Read More →</a>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML = `<p class="text-red-600">Failed to load news. Please try again later.</p>`;
    console.error("Error fetching GNews:", error);
  }
}

fetchTechNews();
