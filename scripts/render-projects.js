export function renderProjects(selector, url) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const container = document.querySelector(selector);
            container.innerHTML = data
                .map(
                    (project) => `
                <a href="${
                    project.link
                }" class="card glass glass-sweep" target="_blank">
                    ${
                        project.logo
                            ? `<img src="${project.logo}" alt="${project.title} logo" />`
                            : ""
                    }
                    <div class="card-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="tags">${project.tags.join(", ")}</div>
                    </div>
                </a>
            `
                )
                .join("");
        });
}
