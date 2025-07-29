export function renderProjects(selector, url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector(selector);
            container.innerHTML = data.map(project => `
                <div class="card">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                </div>
            `).join('');
        });
}