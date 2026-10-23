import React, { useEffect, useState, useRef } from 'react';

const projects = [
  {/*{
    slug: 'building-a-brand-asset',
    title: 'Building a Brand Asset',
    category: 'Brand Identity',
    secondaryCategory: 'Scalable Content',
    image: `${import.meta.env.BASE_URL}images/plus.jpg`,
    imageAlt: 'PLUS brand identity collage with colorful illustrations, mockups, and typography',
  },
  {
    slug: 'room-to-bloom',
    title: 'Room to Bloom',
    category: 'App Design',
    secondaryCategory: 'User Research',
    image: `${import.meta.env.BASE_URL}images/room-to-bloom.jpg`,
    imageAlt: 'Room to Bloom mobile app mockup shown against a muted green background',
  },
  {
    slug: 'figmamake',
    title: 'FigmaMake',
    category: 'AI Collaboration',
    secondaryCategory: 'Website Design',
    image: `${import.meta.env.BASE_URL}images/figmamake.jpg`,
    imageAlt: 'FigmaMake multi-step website interface with a customized floral gift form',
  }, */}
];

function Navigation({ active }) {
  return (
    <header className="site-header">
      <a className="wordmark" href="#/" aria-label="Hannah Seo home">
      <span className="wordmark-sparkle" aria-hidden="true">₊ ⊹</span>HannahSeo</a>
      <nav className="navigation" aria-label="Main navigation">
        <a className={active === 'work' ? 'active' : ''} href="#/work">work</a>
        <a className={active === 'about' ? 'active' : ''} href="#/about">about</a>
      </nav>
    </header>
  );
}

function SparklePair({ className = '' }) {
  return (
    <div className={`sparkle-pair ${className}`} aria-hidden="true">
      <span className="sparkle-pair__large" />
      <span className="sparkle-pair__small" />
      <span className="sparkle-pair__pixel">⁺</span>
    </div>
  );
}


function Intro() {
  return (
    <section className="intro" aria-labelledby="welcome-heading">
      <SparklePair className="sparkle-pair--top" />

      <div className="intro-content">
        <h1 id="welcome-heading">Welcome! ₊</h1>

        <SparklePair className="sparkle-pair--heading" />

        <p className="intro-bio">
          I'm Hannah Seo ◝(ᵔᗜᵔ)◜, an interdisciplinary designer @ Carnegie Mellon University
          <br className="desktop-break" />
          studying{" "}
          <a
            href="https://hcii.cmu.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Human-Computer Interaction
          </a>{" "}
          and Cognitive Science.
        </p>

        <p className="intro-tagline">
          Through design, I give imagination somewhere to live.
        </p>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <a className="project-thumbnail" href={`#/projects/${project.slug}`} aria-label={`View ${project.title} project`}>
        <img src={project.image} alt={project.imageAlt} />
      </a>
      <div className="project-meta">
        <h2><a href={`#/projects/${project.slug}`}>{project.title}</a></h2>
        <p>{project.category} <span aria-hidden="true">▪</span> {project.secondaryCategory}</p>
      </div>
    </article>
  );
}

function Footer() {
  return (
    <footer className="site-footer site-container">
      <div className="footer-inner">
        <span>© 2026 washington, dc</span>
        <span>thanks for visiting  ⊹₊ </span>
      </div>
      {/* The deployment workflow supplies VITE_REPO_URL, so the live website
          automatically links to its own public GitHub repository. */}
      {import.meta.env.VITE_REPO_URL && (
        <p className="repo-link"><a href={import.meta.env.VITE_REPO_URL} target="_blank" rel="noopener noreferrer">View website source on GitHub ↗</a></p>
      )}
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <Navigation active="work" />
      <main>
        <div className="site-container"><Intro /></div>
        <section className="site-container projects" id="work" aria-label="Selected work">
          <div className="project-grid">
            {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}


function InteractiveEnvelope() {
  const paperRef = useRef(null);

  const [paperPosition, setPaperPosition] = useState({
    x: 0,
    y: 0,
  });

  const [isDragging, setIsDragging] = useState(false);

  const dragStart = useRef(null);


  const [selected, setSelected] = useState({});

  const groups = [
    {
      id: "adjective",
      heading: "1. choose an adjective",
      options: ["playful", "versatile", "empathetic", "thoughtful"],
    },
    {
      id: "noun",
      heading: "2. add a noun",
      options: ["designer", "creator", "collaborator", "tinkerer"],
    },
    {
      id: "setting",
      heading: "3. identify the setting",
      options: [
        "with a playlist for every mood",
        "taking on too many hobbies",
        "scrolling on letterboxd reviews after a movie",
      ],
    },
    {
      id: "emotion",
      heading: "4. sprinkle an emotion",
      options: [
        "₍ᐢ.  ̫.ᐢ₎",
        "( • ₃ •)",
        "(˶>⩊<˶)",
        "(  •̀⤙•́  )",
        "( • ᴗ - )",
      ],
    },
  ];

  // Creates a subtle bounce when the envelope or an option is clicked.
  
  const bounceEnvelope = () => {
    const paper = paperRef.current;
    if (!paper) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Animate ONLY the letter, not the envelope.
    paper.getAnimations().forEach((animation) => animation.cancel());

    paper.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.045)" },
        { transform: "scale(0.98)" },
        { transform: "scale(1.015)" },
        { transform: "scale(1)" },
      ],
      {
        duration: 500,
        easing: "ease-out",
      }
    );
  };


  const chooseOption = (group, option) => {
    setSelected((previous) => ({
      ...previous,
      [group]: option,
    }));

    bounceEnvelope();
  };


  // Start dragging the letter
  const handlePointerDown = (e) => {
    // Don't drag when clicking an option button
    if (e.button !== 0 || e.target.closest("button")) return;

    dragStart.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originalX: paperPosition.x,
      originalY: paperPosition.y,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
  };

  // Move the letter with the cursor or finger
  const handlePointerMove = (e) => {
    const start = dragStart.current;
    if (!start || start.pointerId !== e.pointerId) return;

    setPaperPosition({
      x: start.originalX + e.clientX - start.startX,
      y: start.originalY + e.clientY - start.startY,
    });
  };

  // Stop dragging when released
  const handlePointerEnd = (e) => {
    if (dragStart.current?.pointerId !== e.pointerId) return;

    dragStart.current = null;
    setIsDragging(false);

    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };


  return (
    <div className="envelope-interactive">

      <img
        className="envelope-image"
        src={`${import.meta.env.BASE_URL}images/envelope-card.png`}
        alt=""
        aria-hidden="true"
      />

      {/* Interactive identity card */}
      
      <div
        className={`paper-drag-layer ${isDragging ? "is-dragging" : ""}`}
        style={{
          transform: `translate(${paperPosition.x}px, ${paperPosition.y}px)`,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <div className="identity-card" ref={paperRef}>

        <div className="identity-card-handle" aria-hidden="true">
          ≡
        </div>

        <p className="identity-card-intro">she is a(n)...</p>

        {groups.map((group) => (
          <div className="identity-card-section" key={group.id}>
            <p className="identity-card-heading">
              {group.heading}
            </p>

            <div className="identity-card-options">
              {group.options.map((option) => (
                <button
                  type="button"
                  key={option}
                  className={
                    selected[group.id] === option
                      ? "identity-option selected"
                      : "identity-option"
                  }
                  aria-pressed={selected[group.id] === option}
                  onClick={() => chooseOption(group.id, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}


function AboutPage() {
  const images = import.meta.env.BASE_URL + "images/";

  return (
    <>
      <Navigation active="about" />

      <main className="about-layout">

        {/* LEFT COLUMN: About me */}
        <section className="about-copy">
          <p className="about-opening">
            I recently pivoted from an engineering background
            to the world of UI/UX.
          </p>

          <p className="about-story">
            Because of that, my guiding philosophy (although
            quite cliche) would be that it's never too late to
            pursue what you're passionate about. My late start
            caused many doubts and fears, but I believe that my
            year of engineering trained me to break problems
            down and explore challenges through unexpected
            angles. These instincts are what led me towards
            design, where I can combine my analytic mindset
            with my passion in something more expressive and
            human-centered !
          </p>

          <div className="about-hobbies">
            <p>Outside of design work I like to ....</p>
            <ol>
              <li>cafe hop</li>
              <li>explore museums</li>
              <li>go on movie marathons</li>
            </ol>
          </div>

          <div className="about-contact">
            <p>
              I would love the opportunity to work on something
              that I can contribute to. Please reach out!
            </p>

            <span className="about-muted">resume ↗</span>
            <span>linkedin ↗</span>
            <a href="mailto:hannahse@andrew.cmu.edu">
              hannahse@andrew.cmu.edu
            </a>
          </div>
        </section>

        {/* RIGHT COLUMN: Photo collage */}
        <section className="about-gallery" aria-label="Personal photo gallery">
          <InteractiveEnvelope />

          <div className="about-photo-group">
            <p className="about-photo-number">01.</p>
            <div className="about-photos about-photos--cafes">
              <img src={`${images}cafe-1.jpg`} alt="Café drinks" />
              <img src={`${images}cafe-2.jpg`} alt="Coffee and pastries" />
            </div>
          </div>

          <div className="about-photo-group">
            <p className="about-photo-number">02.</p>
            <div className="about-photos about-photos--museums">
              <img src={`${images}museum-1.jpg`} alt="Visiting an art museum" />
              <img src={`${images}museum-2.jpg`} alt="Museum exhibition tickets" />
              <img src={`${images}museum-3.jpg`} alt="Exploring an art gallery" />
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

function ProjectPage({ project }) {
  return (
    <>
      <Navigation active="work" />
      <main className="site-container inner-page project-detail">
        <a className="back-link" href="#/work">← All work</a>
        <h1>{project.title}</h1>
        <p className="detail-category">{project.category} &nbsp;▪&nbsp; {project.secondaryCategory}</p>
        <img src={project.image} alt={project.imageAlt} />
        <p className="page-note">Case study coming next: replace this with the full text, images, and process from your Framer project page.</p>
      </main>
      <Footer />
    </>
  );
}

// GitHub Pages serves static files. Hash-based routes let About/project pages
// work on reload without server rewrite rules or 404 errors.
function readRoute() {
  return window.location.hash.replace(/^#/, '').replace(/\/+$/, '') || '/';
}

function App() {
  const [path, setPath] = useState(readRoute);

  useEffect(() => {
    function handleHashChange() {
      setPath(readRoute());
      window.scrollTo(0, 0);
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (path === '/work') {
      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [path]);

  const selectedProject = path.startsWith('/projects/')
    ? projects.find((project) => path === `/projects/${project.slug}`)
    : null;

  if (path === '/' || path === '/work') return <HomePage />;
  if (path === '/about') return <AboutPage />;
  if (selectedProject) return <ProjectPage project={selectedProject} />;
  return <><Navigation active="work" /><main className="site-container inner-page"><h1>Page not found</h1><a className="back-link" href="#/">← Home</a></main><Footer /></>;
}

export default App;
