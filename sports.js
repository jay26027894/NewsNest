const container = document.getElementById("sports-news");
container.innerHTML = "";

const sources = [
  {
    name: "NewsAPI",
    url: `https://newsapi.org/v2/top-headlines?category=sports&language=en&pageSize=10&apiKey=ed4fa8c44fd74e01a3f145f35cf24b89`,
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
    url: `https://gnews.io/api/v4/top-headlines?topic=sports&lang=en&country=in&max=10&token=dbd78e60def354e578e0942b7bc483fb`,
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
    url: `http://api.mediastack.com/v1/news?access_key=2ca49c04bdd30aa9086b1a384d08dd06&categories=sports&languages=en&limit=10`,
    process: res => res.data.map(a => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: null,
      source: a.source
    }))
  }
];

Promise.all(
  sources.map(source =>
    fetch(source.url)
      .then(res => res.json())
      .then(data => source.process(data))
      .catch(() => [])
  )
).then(results => {
  const allNews = results.flat().slice(0, 18); // Limit max 18 articles
  container.innerHTML = "";

  if (allNews.length === 0) {
    container.innerHTML = "<p class='text-gray-600'>No news found.</p>";
    return;
  }

  allNews.forEach(article => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition";
    card.innerHTML = `
      ${article.image ? `<img src="${article.image}" alt="news image" class="rounded w-full h-48 object-cover mb-4">` : `<div class="rounded w-full h-48 bg-gray-200 flex items-center justify-center mb-4 text-gray-500">No Image</div>`}
      <h2 class="text-lg font-bold text-teal-800">${article.title}</h2>
      <p class="text-gray-600 text-sm mb-2">${article.source}</p>
      <p class="text-sm text-gray-700 mb-3">${article.description || ""}</p>
      <a href="${article.url}" target="_blank" class="text-cyan-500 hover:text-cyan-700 font-semibold">Read More →</a>
    `;
    container.appendChild(card);
  });
});
