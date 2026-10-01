/**
 * Órbita Streaming — Motor de Aplicación y Experiencia de Usuario
 * 
 * - Intro espacial cinematográfica con salto fluido
 * - Navbar flotante con Glassmorphism y ScrollSpy
 * - Carruseles interactivos con contenido real, arrastre táctil y filtros
 * - Espacio visual dinámico por plataforma
 * - Asistente IA "Orbit" con recomendaciones visuales (Posters, Metadata, WhatsApp)
 * - Minijuego espacial "Void Raider 2.0" con disparo 100% manual por el usuario
 * - Conversor de divisas en tiempo real (USD, COP, MXN, EUR, PEN)
 * - Modal cinematográfico de detalles de películas/series y plataformas
 * - Integración con WhatsApp directo (+593 99 822 6756)
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. ESTADO GLOBAL DE LA APLICACIÓN
  // =========================================================================
  const state = {
    currentCurrency: 'USD',
    activeCategory: 'estrenos',
    activePlatformFilter: 'all',
    activeShowcasePlatform: 'netflix',
    selectedCustomPlatforms: new Set(['netflix', 'disneyplus']),
    activeModalItem: null,
    isMobileMenuOpen: false
  };

  // =========================================================================
  // 2. INICIALIZACIÓN AL CARGAR EL DOM
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initIntroAnimation();
    initCurrency();
    initHeaderScrollAndScrollSpy();
    initMobileDrawer();
    initAudioToggle();
    initStreamingCarousels();
    initPlatformShowcase();
    initOrbitaAiAssistant();
    initVoidRaiderGame();
    initModalEvents();
    initAdvantagesAndFaqs();
    initTestimonials();
    initFloatingWhatsApp();
    initCatalogoPlatforms();
    initCombosConfigurator();
    initScrollReveal();
  });

  // =========================================================================
  // 3. INTRO CINEMATOGRÁFICA CON SALTO FLUIDO
  // =========================================================================
  function initIntroAnimation() {
    const introOverlay = document.getElementById('cinematic-intro-overlay');
    const skipBtn = document.getElementById('btn-skip-intro');

    if (!introOverlay) return;

    let hasExited = false;

    function exitIntro() {
      if (hasExited) return;
      hasExited = true;
      introOverlay.classList.add('intro-fade-out');

      setTimeout(() => {
        introOverlay.style.display = 'none';
        introOverlay.remove();
        // Disparar onda de choque cósmica inicial
        if (window.Orbita3D && window.Orbita3D.triggerShockwave) {
          window.Orbita3D.triggerShockwave('#8b5cf6');
        }
      }, 700);
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        exitIntro();
      });
    }

    introOverlay.addEventListener('click', exitIntro);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !hasExited) {
        exitIntro();
      }
    });

    // Auto-transición fluida después de 1.8 segundos
    setTimeout(exitIntro, 1800);
  }

  // =========================================================================
  // 4. CONVERSOR DE MONEDAS Y FORMATEO
  // =========================================================================
  function formatPrice(amountUSD, currency = state.currentCurrency) {
    const currData = (window.ORBITA_CONFIG && window.ORBITA_CONFIG.currencies[currency]) 
      ? window.ORBITA_CONFIG.currencies[currency] 
      : { symbol: '$', rate: 1, formatDecimals: true };

    const converted = amountUSD * currData.rate;

    if (currData.formatDecimals === false) {
      return `${currData.symbol} ${Math.round(converted).toLocaleString('es-CO')}`;
    }
    return `${currData.symbol} ${converted.toFixed(2)}`;
  }

  function initCurrency() {
    const selectors = document.querySelectorAll('#currency-selector, #currency-select');
    selectors.forEach(sel => {
      sel.value = state.currentCurrency;
      sel.addEventListener('change', (e) => {
        state.currentCurrency = e.target.value;
        selectors.forEach(s => s.value = state.currentCurrency);
        updateAllPricesInDOM();
      });
    });
  }

  function updateAllPricesInDOM() {
    document.querySelectorAll('[data-price-usd]').forEach(el => {
      const usd = parseFloat(el.getAttribute('data-price-usd'));
      if (!isNaN(usd)) {
        el.textContent = formatPrice(usd);
      }
    });

    // Actualizar sección de plataformas dinámicas
    renderPlatformShowcase(state.activeShowcasePlatform);
  }

  // =========================================================================
  // 5. HEADER FLOTANTE, SCROLLSPY Y AUDIO
  // =========================================================================
  function initHeaderScrollAndScrollSpy() {
    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link:not(.nav-link-ai)');
    const sections = document.querySelectorAll('section[id], footer[id]');

    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      if (header) {
        if (scrollY > 50) {
          header.classList.add('header-scrolled');
        } else {
          header.classList.remove('header-scrolled');
        }
      }

      // ScrollSpy
      let currentSectionId = '';
      sections.forEach(sec => {
        const secTop = sec.offsetTop - 140;
        const secHeight = sec.offsetHeight;
        if (scrollY >= secTop && scrollY < secTop + secHeight) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      if (currentSectionId) {
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href && href.includes(currentSectionId)) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        });
      }
    }, { passive: true });
  }

  function initMobileDrawer() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const drawer = document.getElementById('mobile-drawer');
    const closeBtn = document.getElementById('mobile-drawer-close');
    const backdrop = document.getElementById('mobile-drawer-backdrop');

    function openDrawer() {
      state.isMobileMenuOpen = true;
      if (drawer) drawer.classList.add('active');
      if (backdrop) backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      state.isMobileMenuOpen = false;
      if (drawer) drawer.classList.remove('active');
      if (backdrop) backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  function initAudioToggle() {
    const audioBtn = document.getElementById('header-audio-toggle');
    if (audioBtn) {
      audioBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.Orbita3D && window.Orbita3D.toggleAudio) {
          const isMuted = window.Orbita3D.toggleAudio();
          showToast(isMuted ? 'Audio ambiental silenciado' : 'Audio ambiental activado ✦');
        }
      });
    }
  }

  // =========================================================================
  // 6. CARRUSELES DE STREAMING CON CONTENIDO REAL Y ACTUAL
  // =========================================================================
  function initStreamingCarousels() {
    const categoryTabs = document.querySelectorAll('[data-catalog-category]');
    const platformFilterChips = document.querySelectorAll('[data-platform-filter]');
    const carouselTrack = document.getElementById('catalog-carousel-track');
    const btnPrev = document.getElementById('carousel-btn-prev');
    const btnNext = document.getElementById('carousel-btn-next');

    // Manejo de tabs de categorías (Estrenos, Películas, Series, Tendencias, etc.)
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.activeCategory = tab.getAttribute('data-catalog-category');
        renderCarouselItems();
      });
    });

    // Manejo de filtros por plataforma (Netflix, Disney+, Max, etc.)
    platformFilterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        platformFilterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.activePlatformFilter = chip.getAttribute('data-platform-filter');
        renderCarouselItems();
      });
    });

    // Flechas de navegación suave
    if (btnPrev && carouselTrack) {
      btnPrev.addEventListener('click', () => {
        carouselTrack.scrollBy({ left: -340, behavior: 'smooth' });
      });
    }

    if (btnNext && carouselTrack) {
      btnNext.addEventListener('click', () => {
        carouselTrack.scrollBy({ left: 340, behavior: 'smooth' });
      });
    }

    // Drag-to-scroll en escritorio y swipe en móviles
    initDragToScroll(carouselTrack);

    // Render inicial
    renderCarouselItems();
  }

  function renderCarouselItems() {
    const track = document.getElementById('catalog-carousel-track');
    if (!track || !window.STREAMING_CATALOG) return;

    let items = window.STREAMING_CATALOG;

    // Filtrar por categoría
    if (state.activeCategory !== 'todos') {
      items = items.filter(item => item.categories && item.categories.includes(state.activeCategory));
    }

    // Filtrar por plataforma
    if (state.activePlatformFilter !== 'all') {
      items = items.filter(item => item.platforms && item.platforms.includes(state.activePlatformFilter));
    }

    track.innerHTML = '';

    if (items.length === 0) {
      track.innerHTML = `
        <div class="carousel-empty-notice">
          <div class="empty-icon">🪐</div>
          <h4>No se encontraron títulos en esta categoría</h4>
          <p>Prueba seleccionando otra plataforma o categoría de estreno.</p>
        </div>
      `;
      return;
    }

    items.forEach(movie => {
      const card = createMovieCard(movie);
      track.appendChild(card);
    });
  }

  function createMovieCard(movie) {
    const card = document.createElement('article');
    card.className = 'movie-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Ver detalles de ${movie.title}`);

    // Color de plataforma
    const platInfo = (window.STREAMING_PLATFORMS || []).find(p => movie.platforms.includes(p.id));
    const platColor = platInfo ? platInfo.color : '#8b5cf6';

    card.innerHTML = `
      <div class="movie-poster-wrap">
        <img src="${movie.posterUrl}" alt="${movie.title}" class="movie-poster-img" loading="lazy" onerror="this.src='assets/icons/og-preview.png'">
        <div class="movie-poster-glow" style="background: radial-gradient(circle at 50% 100%, ${platColor}55, transparent 70%);"></div>
        <div class="movie-top-badges">
          <span class="movie-platform-pill" style="border-color: ${platColor}; color: #ffffff; background: ${platColor}cc;">
            ${movie.platformName}
          </span>
          <span class="movie-rating-pill">
            ★ ${movie.rating}
          </span>
        </div>
        <div class="movie-quality-badge">${movie.quality}</div>
      </div>
      <div class="movie-card-info">
        <div class="movie-meta-line">
          <span class="movie-year">${movie.year}</span>
          <span class="movie-dot">•</span>
          <span class="movie-duration">${movie.duration || 'HD'}</span>
        </div>
        <h3 class="movie-title">${movie.title}</h3>
        <p class="movie-genres">${(movie.genres || []).slice(0, 2).join(' • ')}</p>
        <p class="movie-synopsis-snippet">${movie.synopsis}</p>
        <div class="movie-card-footer">
          <span class="movie-price-tag">$3.00 <small>/ mes</small></span>
          <button type="button" class="btn-movie-detail">
            <span>Ver con Órbita</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    `;

    card.addEventListener('click', () => {
      openMovieDetailModal(movie);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openMovieDetailModal(movie);
      }
    });

    return card;
  }

  function initDragToScroll(container) {
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    container.addEventListener('mousedown', (e) => {
      isDown = true;
      container.classList.add('dragging');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });

    container.addEventListener('mouseleave', () => {
      isDown = false;
      container.classList.remove('dragging');
    });

    container.addEventListener('mouseup', () => {
      isDown = false;
      container.classList.remove('dragging');
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.8;
      container.scrollLeft = scrollLeft - walk;
    });
  }

  // =========================================================================
  // 7. ESPACIO VISUAL DINÁMICO POR PLATAFORMAS (SHOWCASE)
  // =========================================================================
  function initPlatformShowcase() {
    const tabs = document.querySelectorAll('[data-showcase-platform]');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const pId = tab.getAttribute('data-showcase-platform');
        state.activeShowcasePlatform = pId;
        renderPlatformShowcase(pId);
      });
    });

    renderPlatformShowcase(state.activeShowcasePlatform);
  }

  function renderPlatformShowcase(platformId) {
    const container = document.getElementById('platform-showcase-container');
    if (!container || !window.STREAMING_PLATFORMS) return;

    const platform = window.STREAMING_PLATFORMS.find(p => p.id === platformId) || window.STREAMING_PLATFORMS[0];
    const platformTitles = (window.STREAMING_CATALOG || []).filter(item => item.platforms.includes(platform.id)).slice(0, 4);

    const waText = `Hola Órbita Streaming, deseo activar mi cuenta de ${platform.name} por ${formatPrice(platform.priceUSD)} con perfil privado y PIN.`;
    const waUrl = `https://wa.me/${window.ORBITA_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`;

    container.style.opacity = '0';
    container.style.transform = 'translateY(12px)';

    setTimeout(() => {
      container.innerHTML = `
        <div class="showcase-card-hero" style="--brand-accent: ${platform.color}; --brand-glow: ${platform.glowColor};">
          <div class="showcase-glow-backdrop"></div>
          <div class="showcase-left-info">
            <div class="showcase-logo-badge">
              <div class="showcase-logo-wrap">${platform.logoSvg}</div>
              <span class="showcase-badge-pill">${platform.badge}</span>
            </div>
            <h3 class="showcase-title">${platform.name}</h3>
            <p class="showcase-tagline">${platform.tagline}</p>

            <ul class="showcase-features-list">
              ${platform.features.map(f => `
                <li>
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>${f}</span>
                </li>
              `).join('')}
            </ul>

            <div class="showcase-pricing-cta">
              <div class="showcase-price-block">
                <span class="showcase-price-val">${formatPrice(platform.priceUSD)}</span>
                <span class="showcase-price-period">/ ${platform.pricePeriod}</span>
              </div>
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-cosmic-primary">
                <span>Activar en 5 Min</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>

          <div class="showcase-right-titles">
            <div class="showcase-titles-header">
              <span>Títulos Insignia en ${platform.shortName}</span>
              <span class="showcase-stream-ready">4K UHD Listo</span>
            </div>
            <div class="showcase-titles-grid">
              ${platformTitles.map(t => `
                <div class="showcase-mini-movie" onclick="window.OrbitaApp.openMovieById('${t.id}')">
                  <img src="${t.posterUrl}" alt="${t.title}" loading="lazy">
                  <div class="showcase-mini-info">
                    <div class="showcase-mini-title">${t.title}</div>
                    <div class="showcase-mini-rating">★ ${t.rating}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;

      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    }, 180);
  }

  // =========================================================================
  // 8. ASISTENTE IA "ORBIT" CON RECOMENDACIONES VISUALES
  // =========================================================================
  function initOrbitaAiAssistant() {
    const chatBox = document.getElementById('ai-chat-box');
    const inputForm = document.getElementById('ai-input-form');
    const textInput = document.getElementById('ai-user-query');
    const chips = document.querySelectorAll('[data-ai-preset]');

    // Botones de activación global del modal de Orbit
    document.querySelectorAll('[data-open-orbit-ai]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openOrbitAiWindow();
      });
    });

    const closeBtn = document.getElementById('orbit-ai-close-btn');
    const backdrop = document.getElementById('orbit-ai-backdrop');
    const aiWindow = document.getElementById('orbit-ai-window');

    if (closeBtn) closeBtn.addEventListener('click', closeOrbitAiWindow);
    if (backdrop) backdrop.addEventListener('click', closeOrbitAiWindow);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && aiWindow && aiWindow.classList.contains('active')) {
        closeOrbitAiWindow();
      }
    });

    // Chips de consulta rápida
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const prompt = chip.getAttribute('data-ai-preset');
        if (prompt) {
          processAiQuery(prompt);
        }
      });
    });

    if (inputForm && textInput) {
      inputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = textInput.value.trim();
        if (!query) return;
        textInput.value = '';
        processAiQuery(query);
      });
    }
  }

  function openOrbitAiWindow() {
    const aiWindow = document.getElementById('orbit-ai-window');
    if (aiWindow) {
      aiWindow.classList.add('active');
      aiWindow.setAttribute('aria-hidden', 'false');
      const textInput = document.getElementById('ai-user-query');
      if (textInput) setTimeout(() => textInput.focus(), 250);
    }
  }

  function closeOrbitAiWindow() {
    const aiWindow = document.getElementById('orbit-ai-window');
    if (aiWindow) {
      aiWindow.classList.remove('active');
      aiWindow.setAttribute('aria-hidden', 'true');
    }
  }

  function processAiQuery(userText) {
    openOrbitAiWindow();

    const chatBox = document.getElementById('ai-chat-box');
    if (!chatBox) return;

    // 1. Mensaje del usuario
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-message ai-user-message';
    userMsg.innerHTML = `<div class="ai-message-content"><p>${escapeHtml(userText)}</p></div>`;
    chatBox.appendChild(userMsg);

    // 2. Indicador de escritura
    const typing = document.createElement('div');
    typing.className = 'ai-message ai-bot-message ai-typing';
    typing.innerHTML = `
      <div class="ai-bot-avatar">
        <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="41" fill="none" stroke="#8b5cf6" stroke-width="7"/><circle cx="50" cy="50" r="23" fill="none" stroke="#d946ef" stroke-width="12"/></svg>
      </div>
      <div class="ai-message-content">
        <div class="typing-dots"><span></span><span></span><span></span></div>
      </div>
    `;
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Pulso lumínico en Three.js
    if (window.Orbita3D && window.Orbita3D.triggerShockwave) {
      window.Orbita3D.triggerShockwave('#d946ef');
    }

    // 3. Procesamiento semántico
    setTimeout(() => {
      typing.remove();
      const response = analyzeAndRecommend(userText);
      renderAiResponse(response);
    }, 700);
  }

  function analyzeAndRecommend(text) {
    const query = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    let matchedMovies = [];
    let matchedPlatforms = [];
    let isCombo = false;
    let answerText = "";
    let badgeText = "Recomendación Orbit AI";

    const allMovies = window.STREAMING_CATALOG || [];

    // Chequear presets conocidos
    const preset = (window.ORBITA_AI_KB && window.ORBITA_AI_KB.presets || []).find(p => {
      const pLabel = p.label.toLowerCase();
      const pPrompt = p.prompt.toLowerCase();
      return query.includes(pLabel) || query.includes(pPrompt);
    });

    if (preset) {
      return {
        answer: preset.reason,
        badge: preset.badge,
        tip: preset.tip,
        movies: allMovies.filter(m => (preset.recommendTitles || []).includes(m.title)),
        platformIds: preset.recommendIds || ['netflix', 'disneyplus']
      };
    }

    // Análisis de Intención
    if (/ciencia ficcion|scifi|sci fi|espacio|interestelar|interstellar|dune|silo|severance/.test(query)) {
      matchedMovies = allMovies.filter(m => m.genres.includes("Ciencia Ficción") || m.id === "dune-2" || m.id === "interstellar" || m.id === "severance-2");
      matchedPlatforms = ["hbomax", "appletv"];
      answerText = "¡Para amantes de la **ciencia ficción cinematográfica**, te recomiendo estas joyas en 4K Ultra HD y audio espacial. Puedes verlas en Max y Apple TV+ con perfil privado con PIN por solo $3.00/mes cada una o ambas por $5.00/mes en Combo Dúo.";
      badgeText = "Ciencia Ficción Épica";
    } else if (/serie corta|corta|miniserie|fin de semana/.test(query)) {
      matchedMovies = allMovies.filter(m => m.duration && (m.duration.includes("Miniserie") || m.duration.includes("1 Temporada") || m.id === "baby-reindeer"));
      matchedPlatforms = ["netflix", "disneyplus"];
      answerText = "Si buscas **series cortas y adictivas** de altísimo impacto que puedas terminar en un fin de semana:";
      badgeText = "Miniseries Aclamadas";
    } else if (/pareja|cita|novios|romance|juntos/.test(query)) {
      matchedMovies = allMovies.filter(m => m.id === "dune-2" || m.id === "the-bear-3" || m.id === "inside-out-2" || m.id === "interstellar");
      matchedPlatforms = ["netflix", "disneyplus"];
      answerText = "Para disfrutar **en pareja**, una mezcla perfecta de espectáculo visual, comedia dramática y emoción garantizada:";
      badgeText = "Recomendadas en Pareja";
    } else if (/netflix/.test(query)) {
      matchedMovies = allMovies.filter(m => m.platforms.includes("netflix"));
      matchedPlatforms = ["netflix"];
      answerText = "Aquí tienes los **estrenos más virales y aclamados de Netflix** disponibles con perfil privado 4K:";
      badgeText = "Lo Mejor de Netflix";
    } else if (/anime|otaku|japon|simulcast/.test(query)) {
      matchedMovies = allMovies.filter(m => m.genres.includes("Anime"));
      matchedPlatforms = ["crunchyroll", "netflix"];
      answerText = "El mejor **universo del anime** con estrenos directos desde Japón 1 hora después de su emisión:";
      badgeText = "Simulcast Anime";
    } else if (/deporte|futbol|champions|liga|espn|f1/.test(query)) {
      matchedPlatforms = ["disneyplus", "vix"];
      answerText = "Para **fútbol y deportes en vivo**, **Disney+ con ESPN** te da la Champions League, Premier League y F1, mientras que **ViX Premium** te da la Liga MX. ¡Llévalas en Combo Dúo por solo $5/mes!";
      badgeText = "Deportes en Vivo";
    } else if (/combo|duo|2 apps|dos aplicaciones/.test(query)) {
      matchedPlatforms = ["netflix", "disneyplus"];
      isCombo = true;
      answerText = "Con nuestro **Combo Dúo eliges cualquiera de tus 2 plataformas favoritas por solo $5.00/mes** (ahorras $1/mes) y te regalamos **1 cuenta de Spotify Premium GRATIS**. ¡Todo con perfiles privados con PIN!";
      badgeText = "Combo Dúo Especial";
    } else {
      // Búsqueda libre en catálogo por título o palabras clave
      matchedMovies = allMovies.filter(m => {
        return m.title.toLowerCase().includes(query) || 
               m.synopsis.toLowerCase().includes(query) ||
               m.genres.some(g => g.toLowerCase().includes(query));
      });

      if (matchedMovies.length === 0) {
        matchedMovies = allMovies.slice(0, 3);
      }
      matchedPlatforms = ["netflix", "hbomax"];
      answerText = `Aquí tienes las opciones más recomendadas para ti en Órbita Streaming con calidad 4K UHD y activación inmediata:`;
    }

    return {
      answer: answerText,
      badge: badgeText,
      movies: matchedMovies.slice(0, 3),
      platformIds: matchedPlatforms,
      isCombo: isCombo
    };
  }

  function renderAiResponse(res) {
    const chatBox = document.getElementById('ai-chat-box');
    if (!chatBox) return;

    const botMsg = document.createElement('div');
    botMsg.className = 'ai-message ai-bot-message';

    let cardsHtml = '';
    if (res.movies && res.movies.length > 0) {
      cardsHtml = `
        <div class="ai-recommendation-cards">
          ${res.movies.map(m => `
            <div class="ai-movie-card" onclick="window.OrbitaApp.openMovieById('${m.id}')">
              <img src="${m.posterUrl}" alt="${m.title}" loading="lazy">
              <div class="ai-movie-card-body">
                <div class="ai-card-platform">${m.platformName}</div>
                <div class="ai-card-title">${m.title}</div>
                <div class="ai-card-meta">★ ${m.rating} • ${m.year}</div>
                <p class="ai-card-synopsis">${m.synopsis}</p>
                <div class="ai-card-action">
                  <span>Ver con Órbita ($3)</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }

    const waText = `Hola Órbita Streaming, hablé con el asistente Orbit y deseo contratar ${res.isCombo ? 'un Combo de 2 por $5' : 'una pantalla privada ($3/mes)'}.`;
    const waUrl = `https://wa.me/${window.ORBITA_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`;

    botMsg.innerHTML = `
      <div class="ai-bot-avatar">
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="41" fill="none" stroke="#8b5cf6" stroke-width="7"/>
          <circle cx="50" cy="50" r="23" fill="none" stroke="#d946ef" stroke-width="12"/>
          <circle cx="50" cy="9" r="4" fill="#ffffff"/>
        </svg>
      </div>
      <div class="ai-message-content">
        <div class="ai-bot-badge">${res.badge}</div>
        <p>${res.answer}</p>
        ${cardsHtml}
        ${res.tip ? `<p class="ai-tip-note">💡 <em>${res.tip}</em></p>` : ''}
        <div class="ai-response-actions">
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="ai-btn-wa">
            <span>Pedir en WhatsApp</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    `;

    chatBox.appendChild(botMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // =========================================================================
  // 9. MINIJUEGO "VOID RAIDER 2.0" (SHOOTER ESPACIAL • DISPARO 100% MANUAL)
  // =========================================================================
  function initVoidRaiderGame() {
    const modal = document.getElementById('orbit-game-modal');
    const canvas = document.getElementById('orbit-arcade-canvas');
    if (!modal || !canvas) return;

    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('og-score');
    const levelEl = document.getElementById('og-level');
    const highscoreEl = document.getElementById('og-highscore');
    const levelNameEl = document.getElementById('og-level-name');
    const levelProgressEl = document.getElementById('og-level-progress');
    const levelPtsEl = document.getElementById('og-level-pts');

    const overlayStart = document.getElementById('og-overlay-start');
    const overlayGameOver = document.getElementById('og-overlay-gameover');
    const finalScoreEl = document.getElementById('og-final-score');
    const finalLevelEl = document.getElementById('og-final-level');
    const recordAlertEl = document.getElementById('og-record-alert');

    const btnStart = document.getElementById('og-btn-start');
    const btnRetry = document.getElementById('og-btn-retry');
    const btnExit = document.getElementById('og-btn-exit');
    const btnFire = document.getElementById('og-btn-tap-action');
    const closeBtn = document.getElementById('orbit-game-close-btn');

    const SECTORS = [
      { id: 1, name: 'Sector 1: Cinturón Órbita', sector: 'Cinturón de Asteroides', minScore: 0, targetScore: 300, speed: 2.1, color: '#8b5cf6' },
      { id: 2, name: 'Sector 2: Nebulosa Neón', sector: 'Espacio Profundo & Drones', minScore: 300, targetScore: 750, speed: 2.7, color: '#d946ef' },
      { id: 3, name: 'Sector 3: Tormenta de Plasma', sector: 'Nebulosa Electromagnética', minScore: 750, targetScore: 1400, speed: 3.3, color: '#f97316' },
      { id: 4, name: 'Sector 4: Agujero Negro', sector: 'Horizonte de Sucesos Infinito', minScore: 1400, targetScore: Infinity, speed: 3.9, color: '#00f0ff' }
    ];

    let isRunning = false;
    let animId = null;
    let score = 0;
    let combo = 1;
    let currentSector = SECTORS[0];
    let highscore = parseInt(localStorage.getItem('orbita_void_raider_highscore') || '0', 10);
    if (highscoreEl) highscoreEl.textContent = highscore;

    let canvasW = 480;
    let canvasH = 350;

    // Nave del jugador
    const ship = {
      x: 240,
      y: 295,
      targetX: 240,
      speed: 7,
      width: 28,
      height: 26,
      tilt: 0,
      shield: 1,
      tripleTimer: 0,
      slowTimer: 0
    };

    let lasers = [];
    let obstacles = [];
    let powerups = [];
    let particles = [];
    let stars = [];
    let spawnTimer = 0;
    let screenShake = 0;

    // Sonidos Procedurales Web Audio
    let audioCtx = null;
    function getAudioContext() {
      if (!audioCtx) {
        const AudioClass = window.AudioContext || window.webkitAudioContext;
        if (AudioClass) audioCtx = new AudioClass();
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume().catch(() => {});
      }
      return audioCtx;
    }

    function playTone(freq, type = 'sine', duration = 0.08, gainVal = 0.1) {
      try {
        const actx = getAudioContext();
        if (!actx) return;
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, actx.currentTime);
        gain.gain.setValueAtTime(gainVal, actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + duration);
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start();
        osc.stop(actx.currentTime + duration);
      } catch (e) {}
    }

    function playLaserSound() {
      try {
        const actx = getAudioContext();
        if (!actx) return;
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(820, actx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, actx.currentTime + 0.11);
        gain.gain.setValueAtTime(0.12, actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.11);
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start();
        osc.stop(actx.currentTime + 0.11);
      } catch (e) {}
    }

    function playExplosionSound() {
      playTone(90, 'triangle', 0.22, 0.16);
    }

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasW = Math.max(300, Math.floor(rect.width || 480));
      canvasH = Math.max(240, Math.floor(rect.height || 350));
      canvas.width = Math.floor(canvasW * dpr);
      canvas.height = Math.floor(canvasH * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ship.y = canvasH - 46;
    }

    function initStars() {
      stars = [];
      for (let i = 0; i < 40; i++) {
        stars.push({
          x: Math.random() * canvasW,
          y: Math.random() * canvasH,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 1.8 + 0.8
        });
      }
    }

    function openGame() {
      getAudioContext();
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      if (window.Orbita3D && window.Orbita3D.pause) window.Orbita3D.pause();
      setTimeout(resizeCanvas, 40);
      showOverlay(overlayStart);
    }

    function closeGame() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      stopGame();
      if (window.Orbita3D && window.Orbita3D.resume) window.Orbita3D.resume();
    }

    function showOverlay(ov) {
      [overlayStart, overlayGameOver].forEach(el => {
        if (el) {
          if (el === ov) el.classList.remove('hidden');
          else el.classList.add('hidden');
        }
      });
    }

    // =========================================================================
    // IMPORTANTE: DISPARO MANUAL CONTROLADO POR EL JUGADOR
    // =========================================================================
    function shootLasersManual() {
      if (!isRunning) return;
      playLaserSound();

      if (ship.tripleTimer > 0) {
        lasers.push({ x: ship.x, y: ship.y - 14, vx: 0, vy: -11, color: '#f97316' });
        lasers.push({ x: ship.x - 9, y: ship.y - 12, vx: -2.2, vy: -10.5, color: '#d946ef' });
        lasers.push({ x: ship.x + 9, y: ship.y - 12, vx: 2.2, vy: -10.5, color: '#d946ef' });
      } else {
        lasers.push({ x: ship.x - 7, y: ship.y - 12, vx: 0, vy: -11, color: '#8b5cf6' });
        lasers.push({ x: ship.x + 7, y: ship.y - 12, vx: 0, vy: -11, color: '#8b5cf6' });
      }

      // Destello del cañón
      particles.push({
        x: ship.x,
        y: ship.y - 14,
        vx: (Math.random() - 0.5) * 2,
        vy: -2,
        color: '#ffffff',
        size: 3,
        life: 0.2
      });
    }

    function spawnAsteroid() {
      const radius = Math.floor(Math.random() * 10 + 13);
      const isBig = radius >= 19;
      const x = Math.random() * (canvasW - radius * 2) + radius;

      obstacles.push({
        type: 'asteroid',
        x: x,
        y: -radius - 10,
        radius: radius,
        hp: isBig ? 2 : 1,
        speed: (currentSector.speed * (ship.slowTimer > 0 ? 0.5 : 1)) * (0.85 + Math.random() * 0.35),
        color: isBig ? '#f97316' : currentSector.color
      });
    }

    function startGame() {
      getAudioContext();
      resizeCanvas();
      isRunning = true;
      score = 0;
      combo = 1;
      currentSector = SECTORS[0];
      lasers = [];
      obstacles = [];
      powerups = [];
      particles = [];
      spawnTimer = 0;
      screenShake = 0;

      ship.x = canvasW / 2;
      ship.targetX = canvasW / 2;
      ship.shield = 1;
      ship.tripleTimer = 0;
      ship.slowTimer = 0;

      initStars();
      updateHUD();
      showOverlay(null);
      playTone(580, 'triangle', 0.14);

      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(gameLoop);
    }

    function stopGame() {
      isRunning = false;
      cancelAnimationFrame(animId);
    }

    function triggerGameOver() {
      stopGame();
      playExplosionSound();
      screenShake = 16;

      const isNewRecord = score > highscore;
      if (isNewRecord) {
        highscore = score;
        try {
          localStorage.setItem('orbita_void_raider_highscore', highscore.toString());
        } catch (e) {}
        if (highscoreEl) highscoreEl.textContent = highscore;
      }

      if (finalScoreEl) finalScoreEl.textContent = score;
      if (finalLevelEl) finalLevelEl.textContent = currentSector.name;
      if (recordAlertEl) {
        recordAlertEl.style.display = isNewRecord && score > 0 ? 'block' : 'none';
      }

      showOverlay(overlayGameOver);
    }

    function updateHUD() {
      for (let i = SECTORS.length - 1; i >= 0; i--) {
        if (score >= SECTORS[i].minScore) {
          currentSector = SECTORS[i];
          break;
        }
      }

      if (scoreEl) scoreEl.textContent = score;
      if (levelEl) levelEl.textContent = currentSector.name.split(':')[0];
      if (highscoreEl) highscoreEl.textContent = highscore;
      if (levelNameEl) levelNameEl.textContent = currentSector.name;

      if (levelProgressEl && currentSector.targetScore !== Infinity) {
        const pct = Math.min(1, Math.max(0, cur / span));
        levelProgressEl.style.transform = `scaleX(${pct})`;
        if (levelPtsEl) levelPtsEl.textContent = `${score} / ${currentSector.targetScore} pts`;
      }
    }

    // Controles de Entrada (WASD, Flechas, Click, Espacio)
    const keys = {};

    window.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') {
        closeGame();
        return;
      }

      keys[e.key] = true;

      // Disparo con tecla Espacio
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        if (!isRunning) startGame();
        else shootLasersManual();
      }
    });

    window.addEventListener('keyup', (e) => {
      keys[e.key] = false;
    });

    // Movimiento con el ratón sobre el canvas
    canvas.addEventListener('pointermove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      ship.targetX = Math.max(20, Math.min(canvasW - 20, relX));
    });

    // Disparo con Click del ratón sobre el canvas (NO automático)
    canvas.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (!isRunning) startGame();
      else shootLasersManual();
    });

    // Botón de disparo explícito en móvil
    if (btnFire) {
      btnFire.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        if (!isRunning) startGame();
        else shootLasersManual();
      });
    }

    if (btnStart) btnStart.addEventListener('click', startGame);
    if (btnRetry) btnRetry.addEventListener('click', startGame);
    if (btnExit) btnExit.addEventListener('click', closeGame);
    if (closeBtn) closeBtn.addEventListener('click', closeGame);

    document.querySelectorAll('[data-open-minigame], #open-minigame-btn, #hero-minigame-btn, #mobile-drawer-minigame-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openGame();
      });
    });

    // Bucle Principal 60 FPS
    function gameLoop() {
      if (!isRunning) return;

      // Teclas de movimiento A/D o Flechas
      if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
        ship.targetX -= ship.speed * 1.4;
      }
      if (keys['ArrowRight'] || keys['d'] || keys['D']) {
        ship.targetX += ship.speed * 1.4;
      }
      ship.targetX = Math.max(20, Math.min(canvasW - 20, ship.targetX));

      // Suavizado
      const dx = ship.targetX - ship.x;
      ship.x += dx * 0.22;
      ship.tilt = Math.max(-0.45, Math.min(0.45, dx * 0.04));

      // Spawn de obstáculos
      spawnTimer++;
      if (spawnTimer > 42) {
        spawnAsteroid();
        spawnTimer = 0;
      }

      // Actualizar Láseres
      for (let i = lasers.length - 1; i >= 0; i--) {
        const l = lasers[i];
        l.x += l.vx;
        l.y += l.vy;
        if (l.y < -10) lasers.splice(i, 1);
      }

      // Actualizar Obstáculos
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        obs.y += obs.speed;

        // Colisión láser vs asteroide
        for (let j = lasers.length - 1; j >= 0; j--) {
          const l = lasers[j];
          const dist = Math.hypot(l.x - obs.x, l.y - obs.y);
          if (dist < obs.radius + 6) {
            lasers.splice(j, 1);
            obs.hp--;

            if (obs.hp <= 0) {
              playExplosionSound();
              score += 20 * combo;
              updateHUD();

              // Partículas de explosión
              for (let p = 0; p < 10; p++) {
                particles.push({
                  x: obs.x,
                  y: obs.y,
                  vx: (Math.random() - 0.5) * 6,
                  vy: (Math.random() - 0.5) * 6,
                  color: obs.color,
                  size: 2.5,
                  life: 0.8
                });
              }

              obstacles.splice(i, 1);
              break;
            }
          }
        }

        // Colisión con la nave del jugador
        if (obs) {
          const shipDist = Math.hypot(ship.x - obs.x, ship.y - obs.y);
          if (shipDist < obs.radius + 14) {
            triggerGameOver();
            return;
          }

          if (obs.y > canvasH + 30) {
            obstacles.splice(i, 1);
          }
        }
      }

      // Actualizar partículas
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
        if (p.life <= 0) particles.splice(i, 1);
      }

      // DIBUJADO EN CANVAS
      ctx.clearRect(0, 0, canvasW, canvasH);

      // Fondo cósmico
      ctx.fillStyle = '#06050b';
      ctx.fillRect(0, 0, canvasW, canvasH);

      // Estrellas
      ctx.fillStyle = '#ffffff';
      stars.forEach(s => {
        s.y += s.speed;
        if (s.y > canvasH) s.y = 0;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Láseres
      lasers.forEach(l => {
        ctx.strokeStyle = l.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(l.x, l.y);
        ctx.lineTo(l.x, l.y + 12);
        ctx.stroke();
      });

      // Obstáculos (Asteroides con estética neón)
      obstacles.forEach(obs => {
        ctx.strokeStyle = obs.color;
        ctx.fillStyle = 'rgba(18, 14, 34, 0.85)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });

      // Partículas
      particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Nave Interceptora
      ctx.save();
      ctx.translate(ship.x, ship.y);
      ctx.rotate(ship.tilt);

      // Fuego de los propulsores
      ctx.fillStyle = '#f97316';
      ctx.beginPath();
      ctx.moveTo(-6, 12);
      ctx.lineTo(0, 22 + Math.random() * 6);
      ctx.lineTo(6, 12);
      ctx.fill();

      // Fuselaje
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -16);
      ctx.lineTo(14, 12);
      ctx.lineTo(0, 7);
      ctx.lineTo(-14, 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Cabina
      ctx.fillStyle = '#d946ef';
      ctx.beginPath();
      ctx.arc(0, -2, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animId = requestAnimationFrame(gameLoop);
    }
  }

  // =========================================================================
  // 10. MODAL DE DETALLE DE PELÍCULAS Y PLATAFORMAS
  // =========================================================================
  function initModalEvents() {
    const modal = document.getElementById('platform-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    if (!modal) return;
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  function openMovieDetailModal(movie) {
    const modal = document.getElementById('platform-modal');
    const content = document.getElementById('modal-body-content');
    if (!modal || !content) return;

    state.activeModalItem = movie;

    const plat = (window.STREAMING_PLATFORMS || []).find(p => movie.platforms.includes(p.id));
    const platColor = plat ? plat.color : '#8b5cf6';
    const waText = `Hola Órbita Streaming, quiero contratar una cuenta de ${movie.platformName} para ver ${movie.title}.`;
    const waUrl = `https://wa.me/${window.ORBITA_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`;

    content.innerHTML = `
      <div class="modal-movie-layout">
        <div class="modal-poster-col">
          <img src="${movie.posterUrl}" alt="${movie.title}" class="modal-poster-img" onerror="this.src='assets/icons/og-preview.png'">
        </div>
        <div class="modal-info-col">
          <div class="modal-badges-row">
            <span class="modal-platform-badge" style="background: ${platColor}; color: #ffffff;">${movie.platformName}</span>
            <span class="modal-quality-badge">${movie.quality}</span>
            <span class="modal-rating-badge">★ ${movie.rating}</span>
          </div>
          <h2 class="modal-movie-title">${movie.title}</h2>
          <div class="modal-meta-row">
            <span>${movie.year}</span>
            <span>•</span>
            <span>${movie.duration}</span>
            <span>•</span>
            <span>${(movie.genres || []).join(', ')}</span>
          </div>
          <p class="modal-synopsis">${movie.synopsis}</p>

          <div class="modal-value-box">
            <div class="modal-price-display">
              <span class="modal-price-tag">$3.00</span>
              <span class="modal-period-tag">/ mes con Perfil Privado y PIN</span>
            </div>
            <div class="modal-action-btns">
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-cosmic-primary" style="justify-content: center; width: 100%;">
                <span>Activar Cuenta para Ver Ahora</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    const modal = document.getElementById('platform-modal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  // =========================================================================
  // 11. VENTAJAS, TESTIMONIOS Y FAQS
  // =========================================================================
  function initAdvantagesAndFaqs() {
    // Ventajas
    const advGrid = document.getElementById('advantages-grid');
    if (advGrid && window.ADVANTAGES) {
      advGrid.innerHTML = window.ADVANTAGES.map(adv => `
        <div class="advantage-card">
          <div class="advantage-icon-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <h3 class="advantage-title">${adv.title}</h3>
          <p class="advantage-desc">${adv.desc}</p>
        </div>
      `).join('');
    }

    // FAQs con acordeón suave
    const faqContainer = document.getElementById('faq-accordion-wrap');
    if (faqContainer && window.FAQS) {
      faqContainer.innerHTML = window.FAQS.map((faq, idx) => `
        <div class="faq-item ${idx === 0 ? 'active' : ''}">
          <button type="button" class="faq-question-btn" aria-expanded="${idx === 0}">
            <span>${faq.question}</span>
            <span class="faq-chevron">↓</span>
          </button>
          <div class="faq-answer-body">
            <p>${faq.answer}</p>
          </div>
        </div>
      `).join('');

      faqContainer.querySelectorAll('.faq-question-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const item = btn.closest('.faq-item');
          const isActive = item.classList.contains('active');

          faqContainer.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
          });

          if (!isActive) {
            item.classList.add('active');
            btn.setAttribute('aria-expanded', 'true');
          }
        });
      });
    }
  }

  function initTestimonials() {
    const grid = document.getElementById('testimonials-grid');
    if (grid && window.TESTIMONIALS) {
      grid.innerHTML = window.TESTIMONIALS.map(t => `
        <div class="testimonial-card">
          <div class="testi-header">
            <div class="testi-stars">★★★★★</div>
            <span class="testi-date">${t.date}</span>
          </div>
          <p class="testi-comment">"${t.comment}"</p>
          <div class="testi-author-box">
            <div class="testi-avatar">${t.name.charAt(0)}</div>
            <div>
              <div class="testi-name">${t.name}</div>
              <div class="testi-city">${t.city} • <span class="testi-plan">${t.plan}</span></div>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  // =========================================================================
  // 12. BOTÓN FLOTANTE DE WHATSAPP CON POPUP
  // =========================================================================
  function initFloatingWhatsApp() {
    const waBtn = document.getElementById('floating-whatsapp');
    const popup = document.getElementById('whatsapp-quick-popup');
    const closeBtn = document.getElementById('whatsapp-popup-close');

    if (waBtn && popup) {
      waBtn.addEventListener('click', (e) => {
        e.preventDefault();
        popup.classList.toggle('active');
      });
    }

    if (closeBtn && popup) {
      closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
      });
    }
  }

  // =========================================================================
  // 13. ANIMACIONES DE ENTRADA POR SCROLL (SCROLL REVEAL)
  // =========================================================================
  function initScrollReveal() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
    } else {
      document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('revealed'));
    }
  }

  // =========================================================================
  // 14. UTILIDADES GLOBALES & TOAST
  // =========================================================================
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  function showToast(msg) {
    let toast = document.getElementById('orbita-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'orbita-toast';
      toast.className = 'orbita-toast-box';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 2800);
  }

  // =========================================================================
  // 15. SUBPÁGINA CATÁLOGO: RENDERIZADOR Y FILTROS
  // =========================================================================
  function initCatalogoPlatforms() {
    const grid = document.getElementById('platforms-grid');
    if (!grid || !window.STREAMING_PLATFORMS) return;

    function renderFiltered(category = 'all') {
      const platforms = window.STREAMING_PLATFORMS.filter(p => {
        if (category === 'all') return true;
        if (category === 'cinema') return ['netflix', 'disneyplus', 'prime', 'hbomax', 'appletv', 'paramount', 'crunchyroll', 'vix'].includes(p.id);
        if (category === 'music') return p.id === 'spotify';
        if (category === 'tools') return p.id === 'canva';
        return true;
      });

      grid.innerHTML = platforms.map(plat => {
        const isAnnual = plat.pricePeriod && plat.pricePeriod.includes('año');
        const priceLabel = isAnnual ? `${formatPrice(plat.priceUSD)} <small>/ año</small>` : `${formatPrice(plat.priceUSD)} <small>/ mes</small>`;
        const waText = `Hola Órbita Streaming, quiero contratar una cuenta de ${plat.name} (${formatPrice(plat.priceUSD)}).`;
        const waUrl = `https://wa.me/${window.ORBITA_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`;

        return `
          <div class="platform-card" data-platform-id="${plat.id}">
            <div class="platform-card-badge">${plat.badge || 'Oficial'}</div>
            <div class="platform-icon-wrap" style="background: ${plat.color}18; border-color: ${plat.color}40;">
              ${plat.logoSvg}
            </div>
            <h3 class="platform-name">${plat.name}</h3>
            <p class="platform-tagline">${plat.tagline}</p>
            <div class="platform-price-row">
              <span class="platform-price-amount" data-price-usd="${plat.priceUSD}">${priceLabel}</span>
            </div>
            <ul class="platform-features-list">
              ${(plat.features || []).map(f => `<li><span class="feature-bullet">✓</span> ${f}</li>`).join('')}
            </ul>
            <div class="platform-card-actions">
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-cosmic-primary" style="width: 100%; justify-content: center;">
                <span>Solicitar por WhatsApp</span>
              </a>
            </div>
          </div>
        `;
      }).join('');
    }

    renderFiltered('all');

    document.querySelectorAll('.platform-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.platform-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-filter') || 'all';
        renderFiltered(cat);
      });
    });
  }

  // =========================================================================
  // 16. SUBPÁGINA COMBOS: CONFIGURADOR INTERACTIVO 2x$5
  // =========================================================================
  function initCombosConfigurator() {
    const selectorGrid = document.getElementById('custom-app-selector-grid');
    if (!selectorGrid || !window.STREAMING_PLATFORMS) return;

    const selectedCountEl = document.getElementById('custom-selected-count');
    const summaryAppsEl = document.getElementById('summary-combo-apps');
    const discountTagEl = document.getElementById('summary-discount-tag');
    const totalPriceEl = document.getElementById('custom-total-price');
    const regularPriceEl = document.getElementById('custom-regular-price');
    const btnOrderEl = document.getElementById('btn-order-custom-combo');

    const availableApps = window.STREAMING_PLATFORMS.filter(p => p.id !== 'canva');

    function updateSummary() {
      const selectedList = availableApps.filter(p => state.selectedCustomPlatforms.has(p.id));
      const count = selectedList.length;

      if (selectedCountEl) selectedCountEl.textContent = count;

      let totalUSD = 0;
      let regularUSD = 0;

      if (count === 2) {
        totalUSD = 5.00;
        regularUSD = 6.00;
      } else if (count === 1) {
        totalUSD = 3.00;
        regularUSD = 3.00;
      } else if (count > 2) {
        totalUSD = 5.00 + (count - 2) * 3.00;
        regularUSD = count * 3.00;
      } else {
        totalUSD = 0;
        regularUSD = 0;
      }

      if (totalPriceEl) totalPriceEl.textContent = totalUSD.toFixed(2);
      if (regularPriceEl) {
        regularPriceEl.innerHTML = count >= 2 
          ? `Precio regular: <span style="text-decoration: line-through;">$${regularUSD.toFixed(2)}</span> (Ahorras $${(regularUSD - totalUSD).toFixed(2)})`
          : `Tarifa estándar: $${totalUSD.toFixed(2)}`;
      }

      if (summaryAppsEl) {
        summaryAppsEl.textContent = count > 0 
          ? selectedList.map(p => p.name).join(' + ') + (count >= 2 ? ' + 🎁 Spotify Gratis' : '')
          : 'Selecciona al menos 1 plataforma';
      }

      if (discountTagEl) {
        if (count >= 2) {
          discountTagEl.style.display = 'inline-block';
          discountTagEl.textContent = '¡Descuento 2x$5 + Spotify GRATIS Aplicado!';
        } else {
          discountTagEl.style.display = 'none';
        }
      }

      if (btnOrderEl) {
        const appsText = selectedList.map(p => p.name).join(' + ');
        const waText = count >= 2
          ? `Hola Órbita Streaming, quiero pedir mi Combo Especial de [${appsText}] por $${totalUSD.toFixed(2)}/mes + mi beneficio de Spotify.`
          : `Hola Órbita Streaming, quiero contratar [${appsText}] por $${totalUSD.toFixed(2)}/mes.`;
        btnOrderEl.href = `https://wa.me/${window.ORBITA_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`;
      }

      selectorGrid.querySelectorAll('.custom-app-item').forEach(card => {
        const appId = card.getAttribute('data-app-id');
        if (state.selectedCustomPlatforms.has(appId)) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      });
    }

    selectorGrid.innerHTML = availableApps.map(plat => `
      <button type="button" class="custom-app-item ${state.selectedCustomPlatforms.has(plat.id) ? 'selected' : ''}" data-app-id="${plat.id}">
        <div class="app-item-check">✓</div>
        <div class="app-item-icon" style="background: ${plat.color}15;">
          ${plat.logoSvg}
        </div>
        <div class="app-item-info">
          <span class="app-item-name">${plat.name}</span>
          <span class="app-item-price">$3.00/mes</span>
        </div>
      </button>
    `).join('');

    selectorGrid.querySelectorAll('.custom-app-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-app-id');
        if (state.selectedCustomPlatforms.has(id)) {
          if (state.selectedCustomPlatforms.size > 1) {
            state.selectedCustomPlatforms.delete(id);
          } else {
            showToast('Selecciona al menos 1 plataforma');
          }
        } else {
          state.selectedCustomPlatforms.add(id);
        }
        updateSummary();
      });
    });

    window.selectComboPlatforms = function (appIds) {
      if (!Array.isArray(appIds)) return;
      state.selectedCustomPlatforms.clear();
      appIds.forEach(id => state.selectedCustomPlatforms.add(id));
      updateSummary();
      const studio = document.querySelector('.custom-combo-studio-card');
      if (studio) studio.scrollIntoView({ behavior: 'smooth' });
      showToast(`¡Combo cargado en el configurador!`);
    };

    updateSummary();
  }

  // API pública
  window.OrbitaApp = {
    openMovieById: (id) => {
      const movie = (window.STREAMING_CATALOG || []).find(m => m.id === id);
      if (movie) openMovieDetailModal(movie);
    },
    openOrbitAi: openOrbitAiWindow,
    formatPrice
  };

})();
