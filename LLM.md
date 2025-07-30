# Spec – Personal Website on GitHub Pages (Single Page, Vanilla HTML/CSS/JS)

**Goal:** Build a clean, simple, modern, *dark*-themed personal website using **only HTML, CSS, and JavaScript** (no frameworks, no build tools). It should be a **single page** showcasing a profile and a grid of projects, similar to the reference image.

---

## 0) High-level requirements

* **Single page only**: one `index.html` with all content.
* **Static only**: must run on GitHub Pages without any server-side code.
* **No frameworks**: pure HTML, CSS, JS.
* **Modular where useful**: styles and data are modular, even if HTML is in one file.
* **Data-driven**: content (projects, social links, etc.) lives in small JSON files; JS renders them.
* **Easy theming**: use CSS variables.
* **Accessible & responsive**
* **Deploy with GitHub Pages**

---

## 1) Color palette & design tokens

Defined in `styles/tokens.css`:

```css
:root {
  --color-bg: #0f111a;
  --color-surface: #161b22;
  --color-text: #e6e9f0;
  --color-subtle: #94a3b8;
  --color-accent: #22A7F0;
  --color-accent-dark: #0F4C81;
  --radius: 10px;
  --font-sans: system-ui, sans-serif;
  --space: 1rem;
  --max-width: 1200px;
}
```

---

## 2) Folder structure

```
root/
├── index.html
├── styles/
│   ├── tokens.css
│   ├── base.css
│   ├── layout.css
│   ├── card.css
│   └── sidebar.css
├── scripts/
│   ├── main.js
│   ├── render-projects.js
│   ├── render-articles.js
│   └── render-socials.js
├── data/
│   ├── projects.json
│   ├── socials.json
│   └── articles.json
├── assets/
│   └── images/
└── .nojekyll
```

---

## 3) Layout (based on screenshot + view toggle)

Use a simple grid:

```html
<div class="main">
  <aside class="sidebar">
    <!-- avatar, name, socials, buttons -->
  </aside>
  <section class="content">
    <div class="content-switch">
      <a href="#" id="toggle-projects" class="toggle-link active">Projetos</a>
      <a href="#" id="toggle-articles" class="toggle-link">Artigos</a>
    </div>
    <div class="cards" id="projects-grid"></div>
    <div class="cards one-column" id="articles-grid" style="display:none;"></div>
  </section>
</div>
```

CSS grid layout:

```css
.main {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: var(--space);
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--space);
}
@media (max-width: 960px) {
  .main { grid-template-columns: 1fr; }
}

.content-switch {
  display: flex;
  gap: var(--space);
  margin-bottom: var(--space);
}
.toggle-link {
  color: var(--color-subtle);
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}
.toggle-link.active {
  color: var(--color-accent);
}

.cards {
  display: grid;
  gap: var(--space);
}
.cards:not(.one-column) {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}
.cards.one-column {
  grid-template-columns: 1fr;
}
```

Add JS to handle toggle:

```js
const toggleProjects = document.getElementById('toggle-projects');
const toggleArticles = document.getElementById('toggle-articles');
const projectsGrid = document.getElementById('projects-grid');
const articlesGrid = document.getElementById('articles-grid');

function switchTo(view) {
  if (view === 'projects') {
    projectsGrid.style.display = 'grid';
    articlesGrid.style.display = 'none';
    toggleProjects.classList.add('active');
    toggleArticles.classList.remove('active');
  } else {
    projectsGrid.style.display = 'none';
    articlesGrid.style.display = 'grid';
    toggleProjects.classList.remove('active');
    toggleArticles.classList.add('active');
  }
}

toggleProjects.addEventListener('click', e => { e.preventDefault(); switchTo('projects'); });
toggleArticles.addEventListener('click', e => { e.preventDefault(); switchTo('articles'); });
```

---

## 4) Components

### Sidebar

* Avatar image
* Name, tagline
* Social icons (`data/socials.json`)
* CTA buttons (static)

### Social Icons

```json
[
  { "name": "GitHub", "url": "https://github.com/you", "icon": "github" },
  { "name": "LinkedIn", "url": "https://linkedin.com/in/you", "icon": "linkedin" }
]
```

### Project Card (`data/projects.json`)

```json
[
  {
    "title": "LeadYuu",
    "description": "Chatbot no WhatsApp para leads.",
    "logo": "assets/images/leadyuu.png",
    "tags": ["WhatsApp", "Node.js"],
    "links": { "demo": "https://leadyuu.com" }
  }
]
```

### Article Card (`data/articles.json`)

```json
[
  {
    "title": "Como criei meu primeiro SaaS",
    "summary": "Relato sobre como criei e lancei um produto SaaS em 3 semanas.",
    "link": "https://dev.to/exemplo"
  }
]
```

Rendered with a simple title, summary, and "Ler mais" button.

---

## 5) JavaScript (lightweight)

### `main.js`

```js
import { renderProjects } from './render-projects.js';
import { renderArticles } from './render-articles.js';
import { renderSocials } from './render-socials.js';

renderProjects('#projects-grid', 'data/projects.json');
renderArticles('#articles-grid', 'data/articles.json');
renderSocials('#social-links', 'data/socials.json');
```

