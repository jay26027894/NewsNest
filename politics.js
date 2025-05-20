const apiKey = 'T1XdPyRLh0MivzqabJ0rjl31qdIGoppCBewQW4VTTsbhfAbj';
const newsContainer = document.getElementById('news-container');

async function fetchPoliticalNews() {
  try {
    const res = await fetch(`https://api.currentsapi.services/v1/latest-news?category=politics&country=in&language=en`, {
      headers: {
        'Authorization': apiKey
      }
    });
    const data = await res.json();

    if (!data.news || data.news.length === 0) {
      newsContainer.innerHTML = '<p style="color:red;">No political news found.</p>';
      return;
    }

    newsContainer.innerHTML = data.news.slice(0, 12).map(article => `
      <article style="background:#fff; padding:16px; margin-bottom:12px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1); display:flex; flex-direction:column;">
        <img src="${article.image || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="News Image" style="width:100%; height:200px; object-fit:cover; border-radius:6px; margin-bottom:12px;" />
        <h2 style="color:#0c7187; font-weight:bold; font-size:1.25rem; margin-bottom:8px;">${article.title}</h2>
        <time style="color:#555; font-size:0.85rem; margin-bottom:12px;">${new Date(article.published).toLocaleString()}</time>
        <p style="flex-grow:1; color:#333;">${article.description || ''}</p>
        <a href="${article.url}" target="_blank" rel="noopener noreferrer" style="margin-top:12px; color:#0694a2; font-weight:600; text-decoration:none;">Read more</a>
      </article>
    `).join('');
  } catch (error) {
    newsContainer.innerHTML = `<p style="color:red;">Error loading news: ${error.message}</p>`;
  }
}

window.addEventListener('DOMContentLoaded', fetchPoliticalNews);
