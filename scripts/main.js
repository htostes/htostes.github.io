import { renderProjects } from './render-projects.js';
import { renderArticles } from './render-articles.js';
import { renderSocials } from './render-socials.js';

renderProjects('#projects-grid', 'data/projects.json');
renderArticles('#articles-grid', 'data/articles.json');
renderSocials('#social-links', 'data/socials.json');

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
    articlesGrid.style.display = 'block';
    toggleProjects.classList.remove('active');
    toggleArticles.classList.add('active');
  }
}

toggleProjects.addEventListener('click', e => { e.preventDefault(); switchTo('projects'); });
toggleArticles.addEventListener('click', e => { e.preventDefault(); switchTo('articles'); });
