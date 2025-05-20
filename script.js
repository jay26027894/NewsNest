document.addEventListener("DOMContentLoaded", () => {
  const heroImg      = document.getElementById("hero-img");
  const heroTitle    = document.getElementById("hero-title");
  const heroByline   = document.getElementById("hero-byline");
  const heroExcerpt  = document.getElementById("hero-excerpt");
  const heroLink     = document.getElementById("hero-link");
  const latestList   = document.getElementById("latest-news");
  const moreDiv      = document.getElementById("more-news");
  const relatedList  = document.querySelector("#related-articles ul");
  const liveUpdates  = document.querySelector("#live-updates .space-y-2");

  const API_KEY = "408a0df39d0c4cf4a0f4a0f7e905d784"; // your API key
  const proxy = "https://cors-anywhere.herokuapp.com/"; // free proxy for CORS

  function fetchCategory(cat, size) {
    return fetch(
      proxy + `https://newsapi.org/v2/top-headlines?category=${cat}&language=en&pageSize=${size}&apiKey=${API_KEY}`
    )
      .then(r => r.json())
      .then(j => {
        if(j.status !== "ok") {
          console.error("API Error:", j);
          return [];
        }
        return (j.articles || []).map(a => ({
          title: a.title,
          url: a.url,
          image: a.urlToImage,
          publishedAt: a.publishedAt,
          description: a.description || "",
          author: a.author || a.source.name
        }));
      }).catch(err => {
        console.error("Fetch error:", err);
        return [];
      });
  }

  Promise.all([
    fetchCategory("sports", 10),
    fetchCategory("business",10),
    fetchCategory("technology",10),
    fetchCategory("general",12)
  ]).then(([sports, business, tech, general]) => {
    const all = [...sports, ...business, ...tech, ...general]
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    console.log('Fetched all news articles count:', all.length);
    console.log('Top article:', all[0]);

    // Hero
    if (all[0]) {
      const top = all[0];
      heroImg.src = top.image || "https://via.placeholder.com/800x450";
      heroTitle.textContent = top.title;
      heroByline.textContent = `By ${top.author} | ${new Date(top.publishedAt).toLocaleDateString()}`;
      heroExcerpt.textContent = top.description;
      heroLink.href = top.url;
    }

    // Latest News
    latestList.innerHTML = "";
    all.slice(1, 4).forEach(a => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${a.url}" target="_blank" class="font-semibold hover:text-cyan-500">${a.title}</a><div class="text-xs text-gray-500">${new Date(a.publishedAt).toLocaleTimeString()}</div>`;
      latestList.appendChild(li);
    });

    // Related Articles (tech+business)
    relatedList.innerHTML = "";
    [...tech.slice(0, 3), ...business.slice(0, 3)].forEach(a => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="${a.url}" target="_blank" class="hover:underline">${a.title}</a>`;
      relatedList.appendChild(li);
    });

    // Live Updates (sports)
    liveUpdates.innerHTML = "";
    sports.slice(0, 5).forEach(a => {
      const div = document.createElement("div");
      div.className = "border-l-4 border-cyan-400 p-3 mb-2 bg-cyan-50";
      div.innerHTML = `<span class="font-semibold">${new Date(a.publishedAt).toLocaleTimeString()}:</span> <a href="${a.url}" target="_blank" class="hover:text-cyan-700">${a.title}</a>`;
      liveUpdates.appendChild(div);
    });

    // More News
    moreDiv.innerHTML = "";
    all.slice(4, 10).forEach(a => {
      const art = document.createElement("article");
      art.className = "flex-1 bg-white rounded-xl shadow-lg p-5 hover:-translate-y-1 hover:scale-105 hover:shadow-2xl transition";
      art.innerHTML = `<img src="${a.image || 'https://via.placeholder.com/400'}" alt="" class="w-full rounded-lg mb-3"/><h3 class="text-lg font-bold mb-2 text-teal-800">${a.title}</h3><p class="text-gray-600 text-sm mb-2">${new Date(a.publishedAt).toLocaleString()}</p><p class="text-gray-800 mb-2">${a.description.slice(0, 100)}…</p><a href="${a.url}" target="_blank" class="text-cyan-500 font-semibold underline hover:text-cyan-700">Read More</a>`;
      moreDiv.appendChild(art);
    });
  }).catch(err => {
    console.error(err);
  });

  // Back to top
  const btn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 200 ? 'block' : 'none';
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
