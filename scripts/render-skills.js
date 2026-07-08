function groupByCategory(data) {
    const groups = data.reduce((groups, skill) => {
        const category = skill.category;

        if (!groups[category]) {
            groups[category] = [];
        }

        groups[category].push(skill);
        return groups;
    }, {});

    Object.values(groups).forEach((skills) => {
        skills.sort((a, b) => {
            if (b.yoe !== a.yoe) {
                return b.yoe - a.yoe;
            }

            return a.name.localeCompare(b.name);
        });
    });

    return groups;
}

function renderPill(skill) {
    return `
        <button class="skill-pill" data-skill="${skill.name}">
            ${skill.name}
            <span class="skill-yoe">${skill.yoe}y</span>
        </button>
    `;
}

function renderGroup(category, skills) {
    const pills = skills.map((skill) => renderPill(skill)).join("");

    return `
        <div class="card glass glass-sweep skill-group">
            <div class="skill-group-inner">
                <span class="skill-group-label">${category}</span>
                <div class="skill-pills">${pills}</div>
            </div>
        </div>
    `;
}

function attachInteractions(container, skillMap) {
    const detail = container.querySelector(".skill-detail");
    const detailName = detail.querySelector(".skill-detail-name");
    const detailYoe = detail.querySelector(".skill-detail-yoe");
    const detailAt = detail.querySelector(".skill-detail-at");
    const detailDesc = detail.querySelector(".skill-detail-desc");

    let activeSkill = null;

    container.querySelectorAll(".skill-pill").forEach((pill) => {
        pill.addEventListener("click", () => {
            const name = pill.dataset.skill;
            const isSame = activeSkill === name;

            container
                .querySelectorAll(".skill-pill")
                .forEach((p) => p.classList.remove("active"));

            if (isSame) {
                activeSkill = null;
                detail.classList.remove("visible");
            } else {
                activeSkill = name;
                pill.classList.add("active");

                const skill = skillMap[name];
                detailName.textContent = skill.name;
                detailYoe.textContent = `${skill.yoe} year${skill.yoe !== 1 ? "s" : ""} of experience`;
                detailAt.textContent = `Used in • ${skill.at.join(" • ")}`;
                detailDesc.textContent = skill.description;
                detail.classList.add("visible");

                detail.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        });
    });
}

export function renderSkills(selector, url) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const container = document.querySelector(selector);

            const skillMap = data.reduce((map, skill) => {
                map[skill.name] = skill;
                return map;
            }, {});

            const grouped = groupByCategory(data);

            const groups = Object.entries(grouped)
                .map(([category, skills]) => renderGroup(category, skills))
                .join("");

            container.innerHTML = `
                ${groups}
                <div class="skill-detail glass" style="padding: calc(var(--space) * 1.5); border-radius: var(--radius);">
                    <span class="skill-detail-name"></span>
                    <span class="skill-detail-yoe"></span>
                    <span class="skill-detail-at"></span>
                    <p class="skill-detail-desc"></p>
                </div>
            `;

            attachInteractions(container, skillMap);
        });
}
