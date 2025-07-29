export function renderSocials(selector, url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector(selector);
            // Note: The selector #social-links does not exist yet in the HTML.
            if (container) {
                container.innerHTML = data.map(social => `
                    <a href="${social.url}" target="_blank">${social.name}</a>
                `).join('');
            }
        });
}