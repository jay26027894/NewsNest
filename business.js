const container = document.getElementById("business-news");
container.innerHTML = "";

const sources = [
  {
    name: "NewsAPI",
    url: `https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=10&apiKey=ed4fa8c44fd74e01a3f145f35cf24b89`,
    process: res => (res.articles || []).map(a => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.urlToImage,
      source: a.source.name
    }))
  },
  {
    name: "GNews",
    url: `https://gnews.io/api/v4/top-headlines?topic=business&lang=en&country=in&token=a11403d654213e8015504a809f0db750`,
    process: res => (res.articles || []).map(a => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.image,
      source: a.source?.name || "GNews"
    }))
  },
  {
    name: "MediaStack",
    url: `https://api.mediastack.com/v1/news?access_key=2ca49c04bdd30aa9086b1a384d08dd06&categories=business&languages=en&limit=10`,
    process: res => (res.data || []).map(a => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: null, // no images in free plan
      source: a.source
    }))
  }
];

Promise.all(
  sources.map(source =>
    fetch(source.url)
      .then(res => res.json())
      .then(data => source.process(data))
      .catch(err => {
        console.error(`Error fetching from ${source.name}:`, err);
        return [];
      })
  )
).then(results => {
  const allNews = results.flat().slice(0, 18);
  container.innerHTML = "";

  if (allNews.length === 0) {
    container.innerHTML = "<p class='text-gray-600'>No news found.</p>";
    return;
  }

  allNews.forEach(article => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition";
    card.innerHTML = `
      ${article.image ? `<img src="${article.image}" alt="news image" class="rounded w-full h-48 object-cover mb-4">` : ""}
      <h2 class="text-lg font-bold text-teal-800">${article.title}</h2>
      <p class="text-gray-600 text-sm mb-2">${article.source}</p>
      <p class="text-sm text-gray-700 mb-3">${article.description || ""}</p>
      <a href="${article.url}" target="_blank" rel="noopener" class="text-cyan-500 hover:text-cyan-700 font-semibold">Read More →</a>
    `;
    container.appendChild(card);
  });
});
