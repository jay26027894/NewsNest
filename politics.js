

    const apiKey = 'ed4fa8c44fd74e01a3f145f35cf24b89'; // Your NewsAPI key
    const newsContainer = document.getElementById('news-container');

    async function fetchPoliticalNews() {
      try {
        const res = await fetch(`https://newsapi.org/v2/top-headlines?language=en&q=political&pageSize=12&apiKey=${apiKey}`);
        const data = await res.json();

        if (data.status !== 'ok' || !data.articles.length) {
          newsContainer.innerHTML = '<p class="text-red-600">No political news found.</p>';
          return;
        }

        newsContainer.innerHTML = data.articles.map(article => `
          <article class="bg-white rounded-lg shadow p-4 flex flex-col">
            <img src="${article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="News Image" class="w-full h-48 object-cover rounded mb-3"/>
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
