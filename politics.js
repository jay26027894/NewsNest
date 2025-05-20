const apiKey = 'dbd78e60def354e578e0942b7bc483fb'; // Your GNews API key
const newsContainer = document.getElementById('news-container');

async function fetchPoliticalNews() {
  try {
    const res = await fetch(`https://gnews.io/api/v4/top-headlines?topic=politics&lang=en&country=in&max=12&token=${apiKey}`);
    const data = await res.json();

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = '<p class="text-red-600">No political news found.</p>';
      return;
    }

    newsContainer.innerHTML = data.articles.map(article => `
      <article class="bg-white rounded-lg shadow p-4 flex flex-col">
        <img src="${article.image || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="News Image" class="w-full h-48 object-cover rounded mb-3"/>
        <h2 class="font-bold text-lg mb-1 text-teal-700">${article.title}</h2>
        <p class="text-sm text-gray-600 mb-2">${new Date(article.publishedAt).toLocaleString()}</p>
        <p class="flex-grow text-gray-800">${article.description || ''}</p>
        <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="mt-3 text-cyan-600 hover:underline font-semibold">Read more</a>
      </article>
    `).join('');
  } catch (error) {
    newsContainer.innerHTML = `<p class="text-red-600">Error loading news: ${error.message}</p>`;
  }
}

fetchPoliticalNews();
