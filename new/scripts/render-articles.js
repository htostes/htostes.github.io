export function renderArticles(selector, url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector(selector);
            container.innerHTML = data.map(article => `
                <div class="card">
                    <h3>${article.title}</h3>
                    <p>${article.summary}</p>
                    <a href="${article.link}" target="_blank">Ler mais</a>
                </div>
            `).join('');
        });
}