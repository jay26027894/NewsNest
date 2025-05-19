
    const API_KEY = 'ed4fa8c44fd74e01a3f145f35cf24b89'; // Your NewsAPI key
    const newsContainer = document.getElementById('world-news');

    async function fetchWorldNews() {
      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?category=general&language=en&pageSize=12&apiKey=${API_KEY}`);
        const data = await response.json();

        newsContainer.innerHTML = '';

        data.articles.forEach(article => {
          const card = document.createElement('div');
          card.className = 'bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition';

          card.innerHTML = `
            <img src="${article.urlToImage || 'https://via.placeholder.com/400x200'}" class="w-full h-48 object-cover" alt="${article.title}">
            <div class="p-4">
              <h2 class="font-bold text-lg text-teal-800">${article.title}</h2>
              <p class="text-sm text-gray-600 my-2">${article.source.name} | ${new Date(article.publishedAt).toLocaleDateString()}</p>
              <p class="text-gray-700 text-sm">${article.description || ''}</p>
              <a href="${article.url}" target="_blank" class="text-cyan-500 mt-2 inline-block font-semibold hover:underline">Read more</a>
            </div>
          `;

          newsContainer.appendChild(card);
        });
      } catch (error) {
        newsContainer.innerHTML = '<p class="text-red-600">Failed to load news. Please try again later.</p>';
        console.error('Error fetching world news:', error);
      }
    }

    fetchWorldNews();
  