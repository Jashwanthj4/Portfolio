// Typewriter Effect for Hero Tagline
const typewriterTexts = [
  "Frontend Developer | CSE @ CMR Engineering College",
  "Building Modern, Responsive Web Apps",
  "Passionate About UI/UX & Code"
];
let typewriterIndex = 0, charIndex = 0, isDeleting = false;
const typewriterElement = document.getElementById("typewriter");

function typeWriter() {
  if (!typewriterElement) return;
  const current = typewriterTexts[typewriterIndex];
  if (isDeleting) {
    typewriterElement.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      typewriterIndex = (typewriterIndex + 1) % typewriterTexts.length;
      setTimeout(typeWriter, 800);
    } else {
      setTimeout(typeWriter, 40);
    }
  } else {
    typewriterElement.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(typeWriter, 1200);
    } else {
      setTimeout(typeWriter, 80);
    }
  }
}
typeWriter();

// Theme Toggle (Dark/Light)
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
      document.documentElement.removeAttribute("data-theme");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  });
}

// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });
}

// Animate Skill Bars on Scroll
function animateSkillBars() {
  document.querySelectorAll(".skill-progress").forEach(bar => {
    const width = bar.getAttribute("data-width");
    bar.style.width = width + "%";
  });
}

// Add scroll animations
function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document.querySelectorAll('.skill-item, .project-card, .certificate-card, .timeline-item').forEach(el => {
    observer.observe(el);
  });
}

// Add hover effects
function addHoverEffects() {
  // Add hover effect to buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add hover effect to cards
  document.querySelectorAll('.project-card, .certificate-card, .experience-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

window.addEventListener("DOMContentLoaded", () => {
  animateSkillBars();
  addScrollAnimations();
  addHoverEffects();
});

// AOS Animation Init
if (window.AOS) {
  AOS.init({
    duration: 900,
    once: true,
    offset: 80
  });
}

// View More Projects Functionality
const viewMoreBtn = document.getElementById("view-more-btn");
const mainProjects = document.getElementById("main-projects");
const moreProjects = document.getElementById("more-projects");

if (viewMoreBtn && mainProjects && moreProjects) {
  viewMoreBtn.addEventListener("click", function() {
    if (moreProjects.classList.contains("hidden")) {
      // Show more projects
      moreProjects.classList.remove("hidden");
      moreProjects.classList.add("expanded");
      this.innerHTML = '<span>View Less</span><i class="fas fa-chevron-up"></i>';
    } else {
      // Hide more projects
      moreProjects.classList.add("hidden");
      moreProjects.classList.remove("expanded");
      this.innerHTML = '<span>View More</span><i class="fas fa-chevron-down"></i>';
    }
  });
}

// Contact Form AJAX Submission for Formspree
const contactForm = document.getElementById("contact-form");
const toast = document.getElementById("toast");
if (contactForm && toast) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(contactForm);
    fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          toast.querySelector('.toast-message').textContent = "Message sent successfully!";
          toast.querySelector('.toast-icon').innerHTML = '<i class="fas fa-check-circle"></i>';
          toast.classList.remove("toast-error");
          toast.classList.add("toast-success");
          toast.classList.add("show");
          setTimeout(() => toast.classList.remove("show"), 2500);
          contactForm.reset();
        } else {
          return response.json().then(data => {
            throw new Error(data.error || "Something went wrong.");
          });
        }
      })
      .catch(() => {
        toast.querySelector('.toast-message').textContent = "Failed to send message. Please try again.";
        toast.querySelector('.toast-icon').innerHTML = '<i class="fas fa-times-circle"></i>';
        toast.classList.remove("toast-success");
        toast.classList.add("toast-error");
        toast.classList.add("show");
        setTimeout(() => toast.classList.remove("show"), 2500);
      });
  });
}

// Smooth Scroll for Anchor Links (for sticky navbar offset)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 65,
        behavior: 'smooth'
      });
    }
  });
});

// View More/Less for Certifications
const viewMoreCertsBtn = document.getElementById("view-more-certs");
const mainCerts = document.getElementById("main-certs");
const moreCerts = document.getElementById("more-certs");
if (viewMoreCertsBtn && mainCerts && moreCerts) {
  viewMoreCertsBtn.addEventListener("click", function() {
    if (moreCerts.classList.contains("hidden")) {
      moreCerts.classList.remove("hidden");
      this.innerHTML = '<span>View Less</span><i class="fas fa-chevron-up"></i>';
    } else {
      moreCerts.classList.add("hidden");
      this.innerHTML = '<span>View More</span><i class="fas fa-chevron-down"></i>';
    }
  });
}

// View More/Less for Achievements (robust grid toggle)
const viewMoreAchievementsBtn = document.getElementById("view-more-achievements");
const mainAchievements = document.getElementById("main-achievements");
const moreAchievements = document.getElementById("more-achievements");
if (viewMoreAchievementsBtn && mainAchievements && moreAchievements) {
  viewMoreAchievementsBtn.addEventListener("click", function() {
    if (moreAchievements.classList.contains("hidden")) {
      moreAchievements.classList.remove("hidden");
      moreAchievements.style.display = 'grid';
      this.innerHTML = '<span>View Less</span><i class="fas fa-chevron-up"></i>';
    } else {
      moreAchievements.classList.add("hidden");
      moreAchievements.style.display = 'none';
      this.innerHTML = '<span>View More</span><i class="fas fa-chevron-down"></i>';
    }
  });
  // Ensure initial state
  moreAchievements.classList.add("hidden");
  moreAchievements.style.display = 'none';
}

// View More/Less for Soft Skills
const viewMoreSoftSkillsBtn = document.getElementById("view-more-soft-skills");
const mainSoftSkills = document.getElementById("main-soft-skills");
const moreSoftSkills = document.getElementById("more-soft-skills");

function isMobileSoftSkills() {
  return window.innerWidth <= 700;
}

function showAllSoftSkillsMobile() {
  // Move all cards to main grid
  const allCards = [
    ...mainSoftSkills.querySelectorAll('.soft-skill-card'),
    ...moreSoftSkills.querySelectorAll('.soft-skill-card')
  ];
  mainSoftSkills.innerHTML = '';
  allCards.forEach(card => mainSoftSkills.appendChild(card));
  moreSoftSkills.classList.add('hidden');
  moreSoftSkills.style.display = 'none';
}

function showInitialSoftSkillsMobile() {
  // Show only first 4 in main, rest in more
  const allCards = [
    ...mainSoftSkills.querySelectorAll('.soft-skill-card'),
    ...moreSoftSkills.querySelectorAll('.soft-skill-card')
  ];
  mainSoftSkills.innerHTML = '';
  moreSoftSkills.innerHTML = '';
  allCards.forEach((card, i) => {
    if (i < 4) mainSoftSkills.appendChild(card);
    else moreSoftSkills.appendChild(card);
  });
  moreSoftSkills.classList.add('hidden');
  moreSoftSkills.style.display = 'none';
}

if (viewMoreSoftSkillsBtn && mainSoftSkills && moreSoftSkills) {
  function handleSoftSkillsToggle() {
    if (isMobileSoftSkills()) {
      if (moreSoftSkills.classList.contains('hidden')) {
        showAllSoftSkillsMobile();
        viewMoreSoftSkillsBtn.innerHTML = '<span>View Less</span><i class="fas fa-chevron-up"></i>';
      } else {
        showInitialSoftSkillsMobile();
        viewMoreSoftSkillsBtn.innerHTML = '<span>View More</span><i class="fas fa-chevron-down"></i>';
      }
    } else {
      // Desktop: just toggle moreSoftSkills grid
      if (moreSoftSkills.classList.contains('hidden')) {
        moreSoftSkills.classList.remove('hidden');
        moreSoftSkills.style.display = 'grid';
        viewMoreSoftSkillsBtn.innerHTML = '<span>View Less</span><i class="fas fa-chevron-up"></i>';
      } else {
        moreSoftSkills.classList.add('hidden');
        moreSoftSkills.style.display = 'none';
        viewMoreSoftSkillsBtn.innerHTML = '<span>View More</span><i class="fas fa-chevron-down"></i>';
      }
    }
  }
  viewMoreSoftSkillsBtn.addEventListener("click", handleSoftSkillsToggle);

  // Initial state on load
  function setInitialSoftSkills() {
    if (isMobileSoftSkills()) {
      showInitialSoftSkillsMobile();
    } else {
      // Desktop: restore 5+N split
      const allCards = [
        ...mainSoftSkills.querySelectorAll('.soft-skill-card'),
        ...moreSoftSkills.querySelectorAll('.soft-skill-card')
      ];
      mainSoftSkills.innerHTML = '';
      moreSoftSkills.innerHTML = '';
      allCards.forEach((card, i) => {
        if (i < 5) mainSoftSkills.appendChild(card);
        else moreSoftSkills.appendChild(card);
      });
      moreSoftSkills.classList.add('hidden');
      moreSoftSkills.style.display = 'none';
    }
    viewMoreSoftSkillsBtn.innerHTML = '<span>View More</span><i class="fas fa-chevron-down"></i>';
  }
  setInitialSoftSkills();
  window.addEventListener('resize', setInitialSoftSkills);
}

// Scrollspy for active nav-link
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(document.querySelectorAll('section[id]'));

function onScrollSpy() {
  const scrollPos = window.scrollY + 80; // Offset for sticky nav
  let currentSectionId = '';
  for (const section of sections) {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      currentSectionId = section.id;
      break;
    }
  }
  navLinks.forEach(link => {
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', onScrollSpy);
onScrollSpy(); // Initial call

// Certificate Modal Functionality
const certificateModal = document.getElementById('certificate-modal');
const closeModal = document.querySelector('.close-modal');
const viewCertificateBtns = document.querySelectorAll('.view-certificates-btn');

// Open modal when certificate button is clicked
viewCertificateBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const certificates = JSON.parse(this.getAttribute('data-certificates'));
        openCertificateModal(certificates);
    });
});

// Close modal when X is clicked
if (closeModal) {
    closeModal.addEventListener('click', closeCertificateModal);
}

// Close modal when clicking outside
if (certificateModal) {
    certificateModal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeCertificateModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && certificateModal.classList.contains('show')) {
        closeCertificateModal();
    }
});

function openCertificateModal(certificates) {
    const tabButtons = document.getElementById('tab-buttons');
    const tabContent = document.getElementById('tab-content');
    
    // Clear previous content
    tabButtons.innerHTML = '';
    tabContent.innerHTML = '';
    
    // Create tab buttons
    certificates.forEach((cert, index) => {
        const tabButton = document.createElement('button');
        tabButton.className = `tab-button ${index === 0 ? 'active' : ''}`;
        tabButton.textContent = `Certificate ${index + 1}`;
        tabButton.addEventListener('click', () => switchTab(index));
        tabButtons.appendChild(tabButton);
        
        // Create tab content
        const tabPane = document.createElement('div');
        tabPane.className = `tab-pane ${index === 0 ? 'active' : ''}`;
        
        const certificateViewer = document.createElement('div');
        certificateViewer.className = 'certificate-viewer';
        
        // Check if it's a PDF or image
        if (cert.toLowerCase().endsWith('.pdf')) {
            const iframe = document.createElement('iframe');
            iframe.src = cert;
            iframe.title = `Certificate ${index + 1}`;
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            iframe.style.display = 'block';
            certificateViewer.appendChild(iframe);
        } else {
            const img = document.createElement('img');
            img.src = cert;
            img.alt = `Certificate ${index + 1}`;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
            img.style.display = 'block';
            certificateViewer.appendChild(img);
        }
        
        tabPane.appendChild(certificateViewer);
        tabContent.appendChild(tabPane);
    });
    
    // Show modal
    certificateModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function switchTab(tabIndex) {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Remove active class from all tabs
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    // Add active class to selected tab
    tabButtons[tabIndex].classList.add('active');
    tabPanes[tabIndex].classList.add('active');
    
    // Force resize of iframe/image in the newly active tab
    const activePane = tabPanes[tabIndex];
    const viewer = activePane.querySelector('.certificate-viewer');
    if (viewer) {
        const iframe = viewer.querySelector('iframe');
        const img = viewer.querySelector('img');
        
        if (iframe) {
            // Force iframe to reload and resize
            const currentSrc = iframe.src;
            iframe.src = '';
            setTimeout(() => {
                iframe.src = currentSrc;
            }, 10);
        }
        
        if (img) {
            // Force image to resize
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
        }
    }
}

function closeCertificateModal() {
    certificateModal.classList.remove('show');
    document.body.style.overflow = '';
}

// Custom Cursor Highlight Effect
function createCursorHighlight() {
    const cursorHighlight = document.createElement('div');
    cursorHighlight.className = 'cursor-highlight';
    document.body.appendChild(cursorHighlight);
    
    let isHovering = false;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Smooth cursor following with requestAnimationFrame
    function updateCursor() {
        // Faster, more responsive movement
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursorHighlight.style.left = cursorX - 12.5 + 'px';
        cursorHighlight.style.top = cursorY - 12.5 + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    // Track mouse movement with higher precision
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Start the smooth cursor animation
    updateCursor();
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link, .theme-toggle, .nav-toggle, .project-card, .certificate-card, .achievement-card, .soft-skill-card, .experience-card, .contact-item, .social-link, .coding-profile, .view-certificates-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorHighlight.classList.add('hover');
            isHovering = true;
        });
        
        element.addEventListener('mouseleave', () => {
            cursorHighlight.classList.remove('hover');
            isHovering = false;
        });
        
        // Add click effect
        element.addEventListener('mousedown', () => {
            cursorHighlight.classList.add('click');
        });
        
        element.addEventListener('mouseup', () => {
            cursorHighlight.classList.remove('click');
        });
    });
    
    // Hide cursor highlight when mouse leaves window
    document.addEventListener('mouseleave', () => {
        cursorHighlight.style.display = 'none';
    });
    
    // Show cursor highlight when mouse enters window
    document.addEventListener('mouseenter', () => {
        cursorHighlight.style.display = 'block';
    });
}

// Initialize cursor highlight when DOM is loaded
document.addEventListener('DOMContentLoaded', createCursorHighlight);

// Project Info Modal Functionality
const projectInfoModal = document.getElementById('project-info-modal');
const viewProjectInfoBtns = document.querySelectorAll('.view-project-info');

// Project data with detailed information and images
const projectData = {
    'weather-app': {
        title: 'Weather App',
        description: 'A modern, responsive weather application that provides real-time weather data with beautiful UI animations and intuitive user experience. The app fetches weather information from multiple APIs and displays it in an engaging, easy-to-understand format.',
        features: [
            'Real-time weather data from multiple APIs',
            'Beautiful animated UI with smooth transitions',
            '5-day weather forecast with detailed information',
            'Location-based weather updates',
            'Responsive design for all devices',
            'Dark/Light theme toggle',
            'Weather alerts and notifications'
        ],
        techStack: ['HTML5', 'CSS3', 'JavaScript', 'Weather API', 'Geolocation API', 'Chart.js'],
        images: [
            'https://via.placeholder.com/800x600/4facfe/ffffff?text=Weather+App+1',
            'https://via.placeholder.com/800x600/00f2fe/ffffff?text=Weather+App+2',
            'https://via.placeholder.com/800x600/667eea/ffffff?text=Weather+App+3'
        ],
        github: 'https://github.com/Jashwanthj4/Weather',
        live: 'https://weather-opal-psi.vercel.app/'
    },
    'voting-system': {
        title: 'Voting System',
        description: 'A comprehensive online voting platform designed for student elections and organizational voting. Features secure authentication, real-time results, and an intuitive interface for both voters and administrators.',
        features: [
            'Secure user authentication and authorization',
            'Real-time voting results and analytics',
            'Admin dashboard for election management',
            'Voter verification and fraud prevention',
            'Multiple voting methods (single choice, ranked choice)',
            'Email notifications and reminders',
            'Audit trail and result verification'
        ],
        techStack: ['Django', 'Python', 'SQLite', 'Bootstrap', 'JavaScript', 'Chart.js'],
        images: [
            'https://via.placeholder.com/800x600/764ba2/ffffff?text=Voting+System+1',
            'https://via.placeholder.com/800x600/f093fb/ffffff?text=Voting+System+2',
            'https://via.placeholder.com/800x600/f5576c/ffffff?text=Voting+System+3'
        ],
        github: 'https://github.com/Jashwanthj4/VotingApplication',
        live: 'https://voting-system-demo.com'
    },
    'kids-learning': {
        title: 'Kids Learning App',
        description: 'An interactive educational platform designed specifically for children, featuring engaging games, quizzes, and learning activities that make education fun and effective.',
        features: [
            'Interactive learning games and quizzes',
            'Progress tracking and achievement system',
            'Parent dashboard for monitoring progress',
            'Multiple subjects and difficulty levels',
            'Voice-guided instructions and feedback',
            'Offline mode for continued learning',
            'Reward system with badges and certificates'
        ],
        techStack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Local Storage', 'Web Audio API'],
        images: [
            'https://via.placeholder.com/800x600/f093fb/ffffff?text=Kids+Learning+1',
            'https://via.placeholder.com/800x600/f5576c/ffffff?text=Kids+Learning+2',
            'https://via.placeholder.com/800x600/4facfe/ffffff?text=Kids+Learning+3'
        ],
        github: 'https://github.com/yourusername/kids-learning',
        live: 'https://kids-learning-demo.com'
    },
    'ecommerce': {
        title: 'E-Commerce Store',
        description: 'A full-featured online shopping platform with modern design, secure payment integration, and comprehensive inventory management system.',
        features: [
            'Product catalog with search and filtering',
            'Shopping cart and wishlist functionality',
            'Secure payment processing with Stripe',
            'User authentication and profile management',
            'Order tracking and history',
            'Admin panel for inventory management',
            'Responsive design for mobile shopping'
        ],
        techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Express.js', 'Redux'],
        images: [
            'https://via.placeholder.com/800x600/667eea/ffffff?text=E-Commerce+1',
            'https://via.placeholder.com/800x600/764ba2/ffffff?text=E-Commerce+2',
            'https://via.placeholder.com/800x600/f093fb/ffffff?text=E-Commerce+3'
        ],
        github: 'https://github.com/yourusername/ecommerce',
        live: 'https://ecommerce-demo.com'
    },
    'task-manager': {
        title: 'Task Manager',
        description: 'A comprehensive project management tool with team collaboration features, real-time updates, and intuitive task organization.',
        features: [
            'Task creation, assignment, and tracking',
            'Team collaboration and real-time updates',
            'Project timeline and milestone tracking',
            'File sharing and document management',
            'Progress reporting and analytics',
            'Mobile app for on-the-go management',
            'Integration with popular tools'
        ],
        techStack: ['Vue.js', 'Firebase', 'CSS3', 'PWA', 'Vuex', 'Vue Router'],
        images: [
            'https://via.placeholder.com/800x600/4facfe/ffffff?text=Task+Manager+1',
            'https://via.placeholder.com/800x600/00f2fe/ffffff?text=Task+Manager+2',
            'https://via.placeholder.com/800x600/667eea/ffffff?text=Task+Manager+3'
        ],
        github: 'https://github.com/yourusername/task-manager',
        live: 'https://task-manager-demo.com'
    },
    'data-dashboard': {
        title: 'Data Dashboard',
        description: 'An advanced analytics dashboard providing real-time data visualization and insights for business intelligence and decision making.',
        features: [
            'Real-time data visualization with charts',
            'Customizable dashboard layouts',
            'Data filtering and drill-down capabilities',
            'Export functionality for reports',
            'User role-based access control',
            'Mobile-responsive design',
            'Integration with multiple data sources'
        ],
        techStack: ['Angular', 'D3.js', 'TypeScript', 'Chart.js', 'RxJS', 'Angular Material'],
        images: [
            'https://via.placeholder.com/800x600/764ba2/ffffff?text=Data+Dashboard+1',
            'https://via.placeholder.com/800x600/f093fb/ffffff?text=Data+Dashboard+2',
            'https://via.placeholder.com/800x600/f5576c/ffffff?text=Data+Dashboard+3'
        ],
        github: 'https://github.com/yourusername/data-dashboard',
        live: 'https://data-dashboard-demo.com'
    }
};

// Carousel functionality
let currentSlide = 0;
let totalSlides = 0;
let carouselInterval = null;
const AUTO_SLIDE_INTERVAL = 3000; // 3 seconds

// Open project info modal
viewProjectInfoBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project');
        openProjectInfoModal(projectId);
    });
});

function openProjectInfoModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    // Update modal content
    document.getElementById('project-modal-title').textContent = project.title;
    document.getElementById('project-description').textContent = project.description;
    
    // Update features
    const featuresList = document.getElementById('project-features');
    featuresList.innerHTML = '';
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Update tech stack
    const techStack = document.getElementById('project-tech-stack');
    techStack.innerHTML = '';
    project.techStack.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'tech-tag';
        span.textContent = tech;
        techStack.appendChild(span);
    });
    
    // Update links
    document.getElementById('project-github-link').href = project.github;
    document.getElementById('project-live-link').href = project.live;
    
    // Setup carousel
    setupCarousel(project.images);
    
    // Show modal
    projectInfoModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Start auto-sliding
    startAutoSlide();
}

function setupCarousel(images) {
    const carouselTrack = document.getElementById('carousel-track');
    const carouselDots = document.getElementById('carousel-dots');
    
    // Clear previous content
    carouselTrack.innerHTML = '';
    carouselDots.innerHTML = '';
    
    totalSlides = images.length;
    currentSlide = 0;
    
    // Create slides
    images.forEach((image, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        
        const img = document.createElement('img');
        img.src = image;
        img.alt = `Project Image ${index + 1}`;
        
        slide.appendChild(img);
        carouselTrack.appendChild(slide);
        
        // Create dots
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(index));
        carouselDots.appendChild(dot);
    });
    
    updateCarousel();
}

function updateCarousel() {
    const carouselTrack = document.getElementById('carousel-track');
    const dots = document.querySelectorAll('.carousel-dot');
    
    // Update track position
    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Always show navigation buttons for circular navigation
    document.getElementById('carousel-prev').style.display = 'flex';
    document.getElementById('carousel-next').style.display = 'flex';
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    // Reset auto-slide timer when manually navigating
    resetAutoSlide();
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
    } else {
        // Loop back to first slide
        currentSlide = 0;
    }
    updateCarousel();
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
    } else {
        // Loop to last slide
        currentSlide = totalSlides - 1;
    }
    updateCarousel();
}

// Auto-slide functionality
function startAutoSlide() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
    }
    carouselInterval = setInterval(() => {
        nextSlide();
    }, AUTO_SLIDE_INTERVAL);
}

function stopAutoSlide() {
    if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
    }
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

// Carousel navigation with auto-slide pause/resume
document.getElementById('carousel-next').addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

document.getElementById('carousel-prev').addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

// Pause auto-slide on hover
const carouselContainer = document.getElementById('carousel-track');
if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);
}

// Close project info modal
const projectCloseBtns = projectInfoModal.querySelectorAll('.close-modal');
projectCloseBtns.forEach(btn => {
    btn.addEventListener('click', closeProjectInfoModal);
});

projectInfoModal.addEventListener('click', function(e) {
    if (e.target === this) {
        closeProjectInfoModal();
    }
});

function closeProjectInfoModal() {
    projectInfoModal.classList.remove('show');
    document.body.style.overflow = '';
    // Stop auto-sliding when modal closes
    stopAutoSlide();
}
