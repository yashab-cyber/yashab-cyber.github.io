# 🌌 Yashab Alam — Retro-Future Personal Portfolio & Blog

Welcome to the repository for my personal portfolio and developer blog. Built with a premium, responsive retro-future (synthwave/cyberpunk) design system featuring neon glows, custom canvas visualizations, dynamic API data, and structured technical writing.

---

## 🎨 Tech Stack & Core Design
* **Frontend Architecture:** Clean, lightweight Semantic HTML5, Vanilla CSS3 Custom Properties (CSS variables), and modern ES6+ Javascript.
* **Canvas API:** High-DPI interactive canvas engine used to render the dynamic skill radar chart.
* **API Integrations:** Live integration with the GitHub REST API (fetching profile statistics and repository stargazers/forks counters) and Web3Forms (handling silent contact form delivery).
* **Typography:** Built using Google Fonts (*Inter* for content structure and *JetBrains Mono* for technical metrics).

---

## 🚀 Key Features

### 1. Retro-Future Aesthetic
* Deep space purple-navy gradient backdrops with custom neon-cyan gridlines.
* Glowing typography effects using CSS filter drop-shadows on logo marks and accent texts.
* Fully responsive glassmorphism navigation bar and hoverable card structures.

### 2. Interactive Canvas Radar Chart (Skills Showcase)
* Pentagon-shaped multi-domain competency mapping.
* Grow-out entry animation triggered by the parent container's scroll visibility.
* Dynamic hover listeners on the legend highlight specific axis lines, vertices, and values.
* High-DPI screen alignment (using devicePixelRatio) and auto-scaled coordinates to prevent mobile clipping.

### 3. Dynamic GitHub Data Integration
* Asynchronous calls to the GitHub API for profile metrics (Repos, Followers, Gists).
* Individual project cards fetch live Repository Stars and Forks in the background.
* Statically coded backup variables to handle API rate limiting seamlessly.
* Number counters animate smoothly from `0` to the fetched value.

### 4. Secure Contact Routing
* Out-of-the-box support for **Web3Forms** using a configurable access key.
* Zero server setup required — messages are delivered directly to the mailbox in the background.
* Smart fallback to local mail client redirects (`mailto:`) if the access key is missing.

---

## 📁 Directory Structure
```bash
├── blog/
│   └── opendroid.html      # Deep-dive article on OpenDroid autonomous AI agent
├── public/
│   └── empty.txt           # Public assets placeholder file
├── index.html              # Main landing page dashboard
├── style.css               # Design system token definitions & animation keyframes
├── script.js               # Logic, counter animations, API calls & canvas drawing
├── CNAME                   # Custom domain mapping
├── robots.txt              # Search engine crawling rules
└── sitemap.xml             # Search engine crawl mapping
```

---

## 🛠️ Local Development & Preview
To run a local web server and preview the portfolio locally, navigate to the project directory and run a standard Python HTTP server:

```bash
# Start python dev server
python3 -m http.server 8080

# Access via browser
http://localhost:8080/
```

---

## 📦 Deployment to GitHub Pages
Since this is a fully static website, it is configured to deploy directly to GitHub Pages:
1. Push changes to the `main` branch.
2. Ensure the custom domain mapping (`yashabalam.me`) is configured in the repository settings.
3. GitHub Pages will build the site automatically and serve it over HTTPS.
