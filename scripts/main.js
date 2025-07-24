document.addEventListener('DOMContentLoaded', () => {
  const loadComponent = async (url, elementId) => {
    const response = await fetch(url);
    const text = await response.text();
    document.getElementById(elementId).innerHTML = text;
  };

  const loadTimeline = async () => {
    if (document.getElementById('timeline-container')) {
      const { jobs } = await import('/scripts/jobs.js');
      const timelineContainer = document.getElementById('timeline-container');
      const timelineHTML = jobs.map(job => `
        <div class="timeline-item">
          <div class="timeline-content">
            <h3>${job.title}</h3>
            <p><strong>${job.company}</strong> | ${job.period}</p>
            <p>${job.description}</p>
          </div>
        </div>
      `).join('');
      timelineContainer.innerHTML = timelineHTML;

      const timelineItems = document.querySelectorAll('.timeline-item');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.5 });
      timelineItems.forEach(item => observer.observe(item));
    }
  };

  const setActiveLink = () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }
    });
  };

  Promise.all([
    loadComponent('/_includes/header.html', 'header-placeholder'),
    loadComponent('/_includes/footer.html', 'footer-placeholder')
  ]).then(() => {
    setActiveLink();
  });

  loadTimeline();
});