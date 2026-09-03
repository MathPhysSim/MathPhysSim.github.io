import re

def build_publications_page():
    try:
        print("Building SOTA publications.html...")
        with open('publications_content.html', 'r', encoding='utf-8') as f:
            content = f.read()

        html_template = f'''<!doctype html>
<html lang="en">

<head>
  <title>Publications - Simon Hirländer</title>
  <link rel="icon" type="image/svg+xml" href="img/favicon.svg">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0">
  <meta name="description"
    content="Publications by Simon Hirländer: peer-reviewed journals, conference papers, and invited talks on Reinforcement Learning, accelerator physics, and AI-driven control.">
  <meta name="keywords"
    content="Simon Hirländer publications, Reinforcement Learning, CERN, Accelerator Physics, Hamiltonian Neural Networks, Koopman Operator">

  <!-- Preconnect -->
  <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preconnect" href="https://use.fontawesome.com">

  <!-- Fonts: Inter -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- SOTA CSS Design System -->
  <link href="css/sota.css" media="screen" rel="stylesheet" type="text/css" />
  <link href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" rel="stylesheet" type="text/css" />

  <!-- SOTA Vanilla JS -->
  <script src="js/nav.js" defer></script>
</head>

<body>
  <div class="menu-container"></div>

  <main id="maincontent" class="page-container">
    <section style="padding: 3rem 0 1.5rem;">
      <div class="status-pill">
        <span class="status-indicator"></span>
        <span>100+ Publications &middot; Peer-Reviewed &middot; Preprints</span>
      </div>
      <h1 style="font-size: 2.8rem; margin-bottom: 0.5rem;">Publications &amp; Dissemination</h1>
      <p class="text" style="font-size: 1.1rem; max-width: 820px;">
        Peer-reviewed journal articles, conference proceedings, and invited talks spanning Theoretical Physics, Reinforcement Learning, Autonomous Particle Accelerators, and Industrial AI.
      </p>

      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 1.25rem;">
        <a href="https://scholar.google.com/citations?hl=en&user=sE8Q0TIAAAAJ" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="font-size: 0.88rem; padding: 8px 16px;">
          <i class="fas fa-graduation-cap"></i> Google Scholar Profile
        </a>
        <a href="https://orcid.org/0000-0002-1284-3338" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="font-size: 0.88rem; padding: 8px 16px;">
          <i class="fas fa-id-badge"></i> ORCID: 0002-1284-3338
        </a>
        <a href="https://arxiv.org/search/?query=Hirlaender%2C+Simon&searchtype=author" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="font-size: 0.88rem; padding: 8px 16px;">
          <i class="fas fa-archive"></i> arXiv Author Index
        </a>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- INTERACTIVE SEARCH & FILTER TOOLBAR         -->
    <!-- ═══════════════════════════════════════════ -->
    <div class="filter-container">
      <div class="search-input-wrapper">
        <i class="fas fa-search search-icon"></i>
        <input type="text" id="pub-search-input" class="search-input" placeholder="Search publications by title, author, venue, or keyword..." aria-label="Search publications">
      </div>
      <div class="filter-pills">
        <button class="filter-pill active" data-filter="all">All Disciplines</button>
        <button class="filter-pill" data-filter="rl">Reinforcement Learning &amp; Control</button>
        <button class="filter-pill" data-filter="accelerators">Particle Accelerators &amp; CERN</button>
        <button class="filter-pill" data-filter="industrial">Industrial AI &amp; Systems</button>
        <button class="filter-pill" data-filter="medical">Medical &amp; Healthcare</button>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════ -->
    <!-- PUBLICATIONS CONTENT LIST                   -->
    <!-- ═══════════════════════════════════════════ -->
    {content}

  </main>

  <div class="footer-container"></div>
</body>

</html>
'''
        with open('publications.html', 'w', encoding='utf-8') as f:
            f.write(html_template)

        print("SUCCESS: publications.html rebuilt with SOTA design system")

    except Exception as e:
        print(f"Error rebuilding publications.html: {e}")

if __name__ == "__main__":
    build_publications_page()
