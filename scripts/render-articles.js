export function renderArticles(selector, url) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const container = document.querySelector(selector);
            // Access the "items" array from the JSON data
            const articles = data.items;
            container.innerHTML = articles
                .map((article) => {
                    // Create a temporary DOM element to parse the HTML content
                    const tempDiv = document.createElement("div");
                    tempDiv.innerHTML = article.content;

                    // Extract the first two <p> elements for the summary
                    const paragraphs = tempDiv.querySelectorAll("p");
                    let summary = "";
                    if (paragraphs.length > 0) {
                        summary += paragraphs[0].textContent;
                    }
                    if (paragraphs.length > 1) {
                        summary += " " + paragraphs[1].textContent;
                    }

                    return `
                <div class="article-card glass glass-sweep">
                    <h3>${article.title}</h3>
                    <p>${summary} ...</p>
                    <a href="${article.link}" target="_blank">Ler mais</a>
                </div>
            `;
                })
                .join("");
        })
        .catch((error) => {
            console.error("Error fetching or rendering articles:", error);
        });
}
