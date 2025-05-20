const newsContainer = document.getElementById("tech-news");

const sources = [
  {
    name: "NewsAPI",
    url: `https://newsapi.org/v2/top-headlines?category=technology&language=en&pageSize=10&apiKey=ed4fa8c44fd74e01a3f145f35cf24b89`,
    process: res => res.articles.map(a => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.urlToImage,
      source: a.source.name
    }))
  },
  {
    name: "GNews",
    url: `https://gnews.io/api/v4/top-headlines?topic=technology&lang=en&country=in&token=dbd78e60def354e578e0942b7bc483fb`,
    process: res => res.articles.map(a => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.image,
      source: a.source.name || "GNews"
    }))
  },
  {
    name: "MediaStack",
    url: `http://api.mediastack.com/v1/news?access_key=2ca49c04bdd30aa9086b1a384d08dd06&categories=technology&languages=en&limit=10`,
    process: res => res.data.map(a => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: null,
      source: a.source
    }))
  }
];

async function fetchTechNews() {
  newsContainer.innerHTML = "<p class='text-gray-600'>Loading technology news...</p>";
  try {
    const results = await Promise.all(
      sources.map(async source => {
        const res = await fetch(source.url);
        const data = await res.json();
        return source.process(data);
      })
    );

    const allNews = results.flat().slice(0, 18);

    if (allNews.length === 0) {
      newsContainer.innerHTML = "<p class='text-red-600'>No technology news found.</p>";
      return;
    }

    newsContainer.innerHTML = allNews.map(article => `
      <article class="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition flex flex-col">
        <img src="${article.image || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="News Image" class="rounded w-full h-48 object-cover mb-4" />
        <h2 class="text-lg font-bold text-teal-800">${article.title}</h2>
        <p class="text-gray-600 text-sm mb-2">${article.source}</p>
        <p class="text-sm text-gray-700 flex-grow">${article.description || ''}</p>
        <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="mt-3 text-cyan-600 hover:underline font-semibold">Read More →</a>
      </article>
    `).join("");

  } catch (error) {
    newsContainer.innerHTML = `<p class="text-red-600">Error loading news: ${error.message}</p>`;
  }
}

fetchTechNews();
