const API_KEY = 'a11403d654213e8015504a809f0db750'; // Your GNews API key
const newsContainer = document.getElementById('world-news');

async function fetchWorldNews() {
  newsContainer.innerHTML = '<p class="text-gray-600">Loading world news...</p>';

  try {
    const response = await fetch(`https://gnews.io/api/v4/top-headlines?topic=world&lang=en&max=12&token=${API_KEY}`);
    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = '<p class="text-red-600">No world news found.</p>';
      return;
    }

    newsContainer.innerHTML = data.articles.map(article => `
      <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition flex flex-col">
        <img src="${article.image || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="${article.title}" class="w-full h-48 object-cover" />
        <div class="p-4 flex flex-col flex-grow">
          <h2 class="font-bold text-lg text-teal-800">${article.title}</h2>
          <p class="text-sm text-gray-600 my-2">${article.source.name} | ${new Date(article.publishedAt).toLocaleDateString()}</p>
          <p class="text-gray-700 text-sm flex-grow">${article.description || ''}</p>
          <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="text-cyan-500 mt-2 inline-block font-semibold hover:underline">Read more →</a>
        </div>
      </article>
    `).join('');

  } catch (error) {
    newsContainer.innerHTML = '<p class="text-red-600">Failed to load news. Please try again later.</p>';
    console.error('Error fetching world news:', error);
  }
}

fetchWorldNews();
