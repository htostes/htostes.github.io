import { renderProjects } from "./render-projects.js";
import { renderArticles } from "./render-articles.js";
import { renderSocials } from "./render-socials.js";
import { renderSkills } from "./render-skills.js";

renderProjects("#projects-grid", "data/projects.json");
renderArticles(
    "#articles-grid",
    "https://gist.githubusercontent.com/htostes/944f78563f246353ff7bef1d67900fb1/raw/medium.json",
);
renderArticles(
    "#articles-grid",
    "https://gist.githubusercontent.com/htostes/7cfbdd30ede38b8da919c65780fe5b7c/raw/paper.json",
);
renderSocials("#social-links", "data/socials.json");
renderSkills("#skills-grid", "data/skills.json");

const toggleProjects = document.getElementById("toggle-projects");
const toggleArticles = document.getElementById("toggle-articles");
const toggleSkills = document.getElementById("toggle-skills");
const projectsGrid = document.getElementById("projects-grid");
const articlesGrid = document.getElementById("articles-grid");
const skillsGrid = document.getElementById("skills-grid");

function switchTo(view) {
    if (view === "projects") {
        projectsGrid.style.display = "grid";
        articlesGrid.style.display = "none";
        skillsGrid.style.display = "none";
        toggleProjects.classList.add("active");
        toggleArticles.classList.remove("active");
        toggleSkills.classList.remove("active");
    } else if (view === "articles") {
        projectsGrid.style.display = "none";
        articlesGrid.style.display = "block";
        skillsGrid.style.display = "none";
        toggleProjects.classList.remove("active");
        toggleArticles.classList.add("active");
        toggleSkills.classList.remove("active");
    } else if (view === "skills") {
        projectsGrid.style.display = "none";
        articlesGrid.style.display = "none";
        skillsGrid.style.display = "grid";
        toggleProjects.classList.remove("active");
        toggleArticles.classList.remove("active");
        toggleSkills.classList.add("active");
    }
}

toggleProjects.addEventListener("click", (e) => {
    e.preventDefault();
    switchTo("projects");
});
toggleArticles.addEventListener("click", (e) => {
    e.preventDefault();
    switchTo("articles");
});
toggleSkills.addEventListener("click", (e) => {
    e.preventDefault();
    switchTo("skills");
});
