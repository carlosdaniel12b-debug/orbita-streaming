/**
 * Órbita Streaming - Aplicación Principal
 * Manejo de UI, Asistente Flotante Inteligente Orbit, Calculadora de Combos (2 x $5, Canva $4/año),
 * Modal de Plataformas, Conversor de Monedas, FAQ interactivo y Enlaces Directos de WhatsApp.
 */

(function () {
  'use strict';

  // Estado global de la aplicación
  const state = {
    currentCurrency: 'USD',
    currentFilter: 'all',
    activeModalPlatform: null,
    selectedCustomPlatforms: new Set(['netflix', 'disneyplus']), // 2 por defecto para activar el combo de $5
    isMenuOpen: false
  };

  // Inicialización cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', () => {
    initCurrency();
    initHeaderScroll();
    initMobileMenu();
    initAudioControls();
    initCosmicThemeEngine();
    initScrollDrivenThemeMorphing();
    initHeroOrbitSystem();
    initOrbitaAiAssistant();
    renderPlatforms();
    renderAdvantages();
    renderTestimonials();
    renderFaqs();
    initCustomComboBuilder();
    initFloatingWhatsApp();
    initScrollAnimations();
    initModalEvents();
    initOrbitMiniGame();
  });

  function initAudioControls() {
    const headerAudioBtn = document.getElementById('header-audio-toggle');
    if (headerAudioBtn) {
      headerAudioBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.Orbita3D && window.Orbita3D.toggleAudio) {
          const isMuted = window.Orbita3D.toggleAudio();
          showToast(isMuted ? '🔇 Audio cósmico silenciado' : '🔊 Audio cósmico activado');
        }
      });
    }
  }

  // --- MOTOR DE TEMA CÓSMICO DINÁMICO ---
  function hexToRgba(hex, alpha = 1) {
    let c = hex.replace('#', '');
    if (c.length === 3) {
      c = c.split('').map(x => x + x).join('');
    }
    const num = parseInt(c, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function applyCosmicTheme(platformOrId) {
    let platform = platformOrId;
    if (typeof platformOrId === 'string') {
      platform = STREAMING_PLATFORMS.find(p => p.id === platformOrId);
    }
    if (!platform) return;

    const root = document.documentElement;
    const primary = platform.color;
    const secondary = platform.secondaryColor || '#a3e635';

    root.style.setProperty('--accent-purple', primary);
    root.style.setProperty('--accent-purple-glow', hexToRgba(primary, 0.45));
    root.style.setProperty('--accent-cyan', secondary);
    root.style.setProperty('--accent-cyan-glow', hexToRgba(secondary, 0.4));
    root.style.setProperty('--theme-nebula-1', hexToRgba(primary, 0.20));
    root.style.setProperty('--theme-nebula-2', hexToRgba(secondary, 0.16));
    root.style.setProperty('--gradient-cosmic', `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`);
    root.style.setProperty('--gradient-text', `linear-gradient(135deg, #ffffff 15%, ${secondary} 65%, ${primary} 100%)`);

    // Sincronizar escena 3D Three.js
    if (window.Orbita3D && window.Orbita3D.setThemeColors) {
      window.Orbita3D.setThemeColors(primary, secondary);
    }

    // Actualizar indicador HUD de telemetría cósmica
    const hudLabel = document.getElementById('hud-orbit-theme');
    if (hudLabel) {
      hudLabel.textContent = `FRECUENCIA: ${platform.themeName || platform.name}`;
      hudLabel.style.color = secondary;
    }
  }

  function resetCosmicTheme() {
    const root = document.documentElement;
    const def = DEFAULT_COSMIC_THEME;

    root.style.setProperty('--accent-purple', def.primaryColor);
    root.style.setProperty('--accent-purple-glow', def.glowColor);
    root.style.setProperty('--accent-cyan', def.secondaryColor);
    root.style.setProperty('--accent-cyan-glow', 'rgba(163, 230, 53, 0.45)');
    root.style.setProperty('--theme-nebula-1', 'rgba(204, 255, 0, 0.12)');
    root.style.setProperty('--theme-nebula-2', 'rgba(163, 230, 53, 0.10)');
    root.style.setProperty('--gradient-cosmic', `linear-gradient(135deg, ${def.primaryColor} 0%, ${def.secondaryColor} 100%)`);
    root.style.setProperty('--gradient-text', `linear-gradient(135deg, #ffffff 15%, ${def.primaryColor} 65%, ${def.secondaryColor} 100%)`);

    if (window.Orbita3D && window.Orbita3D.resetThemeColors) {
      window.Orbita3D.resetThemeColors();
    }

    const hudLabel = document.getElementById('hud-orbit-theme');
    if (hudLabel) {
      hudLabel.textContent = `FRECUENCIA: ÓRBITA STREAMING`;
      hudLabel.style.color = '#ccff00';
    }
  }

  function initCosmicThemeEngine() {
    const resetBtn = document.getElementById('hud-theme-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resetCosmicTheme();
        showToast('Órbita restablecida al color oficial');
      });
    }
  }

  // --- SINCRONIZACIÓN DINÁMICA DE COLOR AL HACER SCROLL ---
  function initScrollDrivenThemeMorphing() {
    let lastActiveId = null;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollTheme();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    function updateScrollTheme() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      // Si el usuario está en el Hero superior (antes de 240px), regresar al tema espacial base
      if (scrollY < 240) {
        if (lastActiveId !== 'default') {
          lastActiveId = 'default';
          resetCosmicTheme();
        }
        return;
      }

      // Si está enfocado en la sección de Armar Combo Flagship
      const comboSection = document.getElementById('armar-combo');
      if (comboSection) {
        const cRect = comboSection.getBoundingClientRect();
        if (cRect.top <= window.innerHeight * 0.45 && cRect.bottom >= window.innerHeight * 0.35) {
          if (lastActiveId !== 'combo') {
            lastActiveId = 'combo';
            const comboPrimary = '#ccff00';
            const comboSecondary = '#a3e635';
            const root = document.documentElement;
            root.style.setProperty('--accent-purple', comboPrimary);
            root.style.setProperty('--accent-purple-glow', hexToRgba(comboPrimary, 0.45));
            root.style.setProperty('--accent-cyan', comboSecondary);
            root.style.setProperty('--accent-cyan-glow', hexToRgba(comboSecondary, 0.4));
            root.style.setProperty('--gradient-cosmic', `linear-gradient(135deg, ${comboPrimary} 0%, ${comboSecondary} 100%)`);
            if (window.Orbita3D && window.Orbita3D.setThemeColors) {
              window.Orbita3D.setThemeColors(comboPrimary, comboSecondary);
            }
            const hudLabel = document.getElementById('hud-orbit-theme');
            if (hudLabel) {
              hudLabel.textContent = `FRECUENCIA: ESTUDIO DE COMBOS`;
              hudLabel.style.color = comboPrimary;
            }
          }
          return;
        }
      }

      // Buscar tarjetas de plataformas y encontrar la que esté más cercana al centro de pantalla
      const cards = document.querySelectorAll('.platform-card[data-platform-id]');
      if (!cards.length) return;

      const viewportCenterY = window.innerHeight / 2;
      let closestCard = null;
      let minDistance = Infinity;

      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.bottom > 80 && rect.top < window.innerHeight - 80) {
          const cardCenterY = rect.top + rect.height / 2;
          const dist = Math.abs(cardCenterY - viewportCenterY);
          if (dist < minDistance) {
            minDistance = dist;
            closestCard = card;
          }
        }
      });

      if (closestCard) {
        const platformId = closestCard.getAttribute('data-platform-id');
        if (platformId && platformId !== lastActiveId) {
          lastActiveId = platformId;
          applyCosmicTheme(platformId);
        }
      }
    }
  }

  // =========================================================================
  // --- SISTEMA ORBITAL INTERACTIVO DE APLICACIONES EN EL HERO (60 FPS) ---
  // =========================================================================
  function initHeroOrbitSystem() {
    const arena = document.getElementById('orbit-system-arena');
    const layer = document.getElementById('orbit-nodes-layer');
    const hudName = document.getElementById('hud-platform-name');
    const hudRate = document.getElementById('hud-platform-rate');
    if (!arena || !layer) return;

    const platforms = (window.STREAMING_PLATFORMS && window.STREAMING_PLATFORMS.length) 
      ? window.STREAMING_PLATFORMS 
      : [];
    if (!platforms.length) return;

    const count = platforms.length;
    let angleOffset = 0;
    let orbitSpeed = 0.0055;
    let targetSpeed = 0.0055;

    // Generar los 9 nodos orbitales con logos vectoriales oficiales
    layer.innerHTML = platforms.map((p, idx) => `
      <div class="orbit-node-item" data-id="${p.id}" data-index="${idx}" style="--node-brand: ${p.color}; --node-glow: ${p.glowColor || p.color};" role="button" aria-label="${p.name} ($${p.priceUSD}/${p.pricePeriod})">
        <div class="orbit-node-disc">
          <img src="${p.iconUrl}" alt="${p.name}" class="orbit-node-img" loading="eager">
          <span class="orbit-node-price">$${p.priceUSD}</span>
        </div>
      </div>
    `).join('');

    const nodeElements = layer.querySelectorAll('.orbit-node-item');

    function getRadii() {
      const arenaW = arena.clientWidth || 360;
      const isMobile = window.innerWidth < 768;
      return {
        rx: isMobile ? Math.min(arenaW * 0.42, 160) : Math.min(arenaW * 0.43, 275),
        ry: isMobile ? 48 : 68
      };
    }

    let radii = getRadii();
    window.addEventListener('resize', () => {
      radii = getRadii();
    }, { passive: true });

    arena.addEventListener('mouseenter', () => {
      targetSpeed = 0.0015;
    });

    arena.addEventListener('mouseleave', () => {
      targetSpeed = 0.0055;
      if (hudName) hudName.textContent = 'Toca cualquier aplicación para sintonizar';
      if (hudRate) hudRate.textContent = '$3.00 / mes';
    });

    nodeElements.forEach(node => {
      const pId = node.dataset.id;
      const platform = platforms.find(p => p.id === pId);

      const activateNode = () => {
        if (!platform) return;
        if (hudName) hudName.innerHTML = `<strong>${platform.name}</strong> • ${platform.categoryName}`;
        if (hudRate) hudRate.textContent = `$${platform.priceUSD}.00 / ${platform.pricePeriod}`;
        applyCosmicTheme(platform);
      };

      node.addEventListener('mouseenter', activateNode);
      node.addEventListener('touchstart', activateNode, { passive: true });

      node.addEventListener('click', (e) => {
        e.preventDefault();
        activateNode();
        if (typeof openPlatformModal === 'function') {
          openPlatformModal(pId);
        } else {
          const card = document.getElementById('card-' + pId) || document.getElementById('plataformas');
          if (card) card.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    function orbitLoop() {
      orbitSpeed += (targetSpeed - orbitSpeed) * 0.06;
      angleOffset += orbitSpeed;

      const arenaW = arena.clientWidth || 360;
      const arenaH = arena.clientHeight || 200;
      const centerX = arenaW / 2;
      const centerY = arenaH / 2;

      nodeElements.forEach((node, i) => {
        const angle = angleOffset + (i * 2 * Math.PI / count);
        const x = Math.cos(angle) * radii.rx;
        const y = Math.sin(angle) * radii.ry;

        const depth = y / (radii.ry || 1); // -1 (fondo) a +1 (frente)
        const scale = 0.84 + (depth + 1) * 0.18; // 0.84 a 1.20
        const opacity = 0.58 + (depth + 1) * 0.21; // 0.58 a 1.00
        const zIndex = Math.round(50 + (depth + 1) * 30);

        node.style.transform = `translate3d(${(centerX + x).toFixed(1)}px, ${(centerY + y).toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        node.style.zIndex = zIndex;
        node.style.opacity = opacity.toFixed(2);
      });

      requestAnimationFrame(orbitLoop);
    }

    requestAnimationFrame(orbitLoop);
  }

  // --- 1. MANEJO DE MONEDA Y PRECIOS ---
  function initCurrency() {
    const selector = document.getElementById('currency-selector');
    if (selector) {
      selector.value = state.currentCurrency;
      selector.addEventListener('change', (e) => {
        state.currentCurrency = e.target.value;
        renderPlatforms();
        updateCustomComboCalculator();
        if (state.activeModalPlatform) {
          updateModalPricing(state.activeModalPlatform);
        }
        showToast(`Divisa actualizada a ${state.currentCurrency}`);
      });
    }
  }

  function formatPrice(amountUSD) {
    const curr = ORBITA_CONFIG.currencies[state.currentCurrency] || ORBITA_CONFIG.currencies.USD;
    const converted = amountUSD * curr.rate;
    if (curr.formatDecimals === false) {
      return `${curr.symbol}${Math.round(converted).toLocaleString('es-CO')}`;
    }
    return `${curr.symbol}${converted.toFixed(2)}`;
  }

  // --- 2. HEADER SCROLL Y MENÚ MÓVIL ---
  function initHeaderScroll() {
    const header = document.getElementById('main-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const closeBtn = document.getElementById('mobile-drawer-close');

    if (!toggleBtn || !mobileDrawer) return;

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu(!state.isMenuOpen);
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        toggleMobileMenu(false);
      });
    }

    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        toggleMobileMenu(false);
      }
    });

    mobileDrawer.querySelectorAll('a, button:not(#mobile-drawer-close)').forEach(el => {
      el.addEventListener('click', () => {
        toggleMobileMenu(false);
      });
    });
  }

  function toggleMobileMenu(open) {
    state.isMenuOpen = open;
    const mobileDrawer = document.getElementById('mobile-drawer');
    const toggleBtn = document.getElementById('mobile-menu-toggle');

    if (mobileDrawer) {
      if (open) {
        mobileDrawer.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else {
        mobileDrawer.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        toggleBtn.classList.add('active');
      } else {
        toggleBtn.classList.remove('active');
      }
    }
  }

  // =========================================================================
  // --- 3. ASISTENTE INTELIGENTE FLOTANTE: ORBIT AI ---
  // =========================================================================
  function openOrbitAiWindow() {
    const win = document.getElementById('orbit-ai-window');
    if (!win) return;
    win.classList.add('active');
    win.setAttribute('aria-hidden', 'false');

    const chatBox = document.getElementById('ai-chat-box');
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;

    const input = document.getElementById('ai-user-query');
    if (input) {
      // En dispositivos de escritorio se autoenfoca; en móviles evitamos abrir el teclado de golpe
      if (window.innerWidth > 768) {
        setTimeout(() => input.focus(), 150);
      }
    }

    if (window.Orbita3D && window.Orbita3D.triggerShockwave) {
      window.Orbita3D.triggerShockwave('#ccff00');
    }
  }

  function closeOrbitAiWindow() {
    const win = document.getElementById('orbit-ai-window');
    if (!win) return;
    win.classList.remove('active');
    win.setAttribute('aria-hidden', 'true');
    const dialog = win.querySelector('.orbit-ai-window-dialog');
    if (dialog) {
      dialog.style.height = '';
      dialog.style.maxHeight = '';
    }
  }

  window.openOrbitAi = openOrbitAiWindow;
  window.closeOrbitAi = closeOrbitAiWindow;

  function initOrbitaAiAssistant() {
    const chipsContainer = document.getElementById('ai-prompt-chips');
    const chatBox = document.getElementById('ai-chat-box');
    const inputForm = document.getElementById('ai-input-form');
    const textInput = document.getElementById('ai-user-query');

    // Botones para abrir la ventana flotante Orbit AI
    document.querySelectorAll('[data-open-orbit-ai]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openOrbitAiWindow();
      });
    });

    const floatingBtn = document.getElementById('floating-orbit-ai-btn');
    if (floatingBtn) {
      floatingBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openOrbitAiWindow();
      });
    }

    const closeBtn = document.getElementById('orbit-ai-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeOrbitAiWindow);

    const backdrop = document.getElementById('orbit-ai-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeOrbitAiWindow);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeOrbitAiWindow();
    });

    // Ajuste dinámico de viewport visual para teclados en teléfonos móviles
    if (window.visualViewport) {
      const handleMobileViewport = () => {
        const dialog = document.querySelector('.orbit-ai-window-dialog');
        if (!dialog) return;
        if (window.innerWidth <= 768) {
          const vh = window.visualViewport.height;
          // Si el teclado virtual está desplegado (la altura visual es notablemente menor)
          if (vh < window.innerHeight * 0.82) {
            dialog.style.height = `${Math.floor(vh)}px`;
            dialog.style.maxHeight = `${Math.floor(vh)}px`;
            if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
          } else {
            dialog.style.height = '';
            dialog.style.maxHeight = '';
          }
        } else {
          dialog.style.height = '';
          dialog.style.maxHeight = '';
        }
      };

      window.visualViewport.addEventListener('resize', handleMobileViewport);
      window.visualViewport.addEventListener('scroll', handleMobileViewport);
    }

    if (textInput) {
      textInput.addEventListener('focus', () => {
        setTimeout(() => {
          textInput.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
        }, 280);
      });
    }

    if (!chipsContainer || !chatBox || !inputForm) return;

    // 1. Renderizar botones rápidos / chips con preguntas frecuentes
    if (window.ORBITA_AI_KB && ORBITA_AI_KB.presets) {
      chipsContainer.innerHTML = ORBITA_AI_KB.presets.map((preset, idx) => `
        <button type="button" class="ai-chip-btn ${idx === 0 ? 'active' : ''}" data-preset-id="${preset.id}">
          <span>${preset.label}</span>
        </button>
      `).join('');

      chipsContainer.querySelectorAll('.ai-chip-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          chipsContainer.querySelectorAll('.ai-chip-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const presetId = btn.dataset.presetId;
          const preset = ORBITA_AI_KB.presets.find(p => p.id === presetId);
          if (preset) {
            processAiQuery(preset.prompt, preset);
          }
        });
      });
    }

    // 2. Manejador de formulario con consulta libre del usuario
    inputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = textInput.value.trim();
      if (!query) return;
      textInput.value = '';
      processAiQuery(query);
    });
  }

  function processAiQuery(userText, directPreset = null) {
    // Asegurar que la ventana flotante esté abierta al procesar consulta
    openOrbitAiWindow();

    const chatBox = document.getElementById('ai-chat-box');
    if (!chatBox) return;

    // 1. Agregar mensaje del usuario a la conversación
    const userMsgEl = document.createElement('div');
    userMsgEl.className = 'ai-message ai-user-message';
    userMsgEl.innerHTML = `
      <div class="ai-message-content">
        <p>${escapeHtml(userText)}</p>
      </div>
    `;
    chatBox.appendChild(userMsgEl);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Pulso lumínico en la órbita 3D
    if (window.Orbita3D && window.Orbita3D.triggerShockwave) {
      window.Orbita3D.triggerShockwave('#ccff00');
    }

    // 2. Determinar la recomendación (directPreset o análisis natural)
    let rec = null;

    if (directPreset) {
      rec = { ...directPreset };
    } else {
      // Normalizar texto sin tildes para matching robusto
      const rawText = userText.toLowerCase();
      const normText = rawText.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      // A) Detección de Plataformas Mencionadas Directamente
      const detectedPlatforms = [];
      if (/\b(netflix)\b/.test(normText)) detectedPlatforms.push('netflix');
      if (/\b(disney|disney\+|disneyplus|star\+|starplus)\b/.test(normText)) detectedPlatforms.push('disneyplus');
      if (/\b(max|hbo|hbomax)\b/.test(normText)) detectedPlatforms.push('hbomax');
      if (/\b(prime|amazon|primevideo)\b/.test(normText)) detectedPlatforms.push('primevideo');
      if (/\b(paramount|paramount\+|paramountplus)\b/.test(normText)) detectedPlatforms.push('paramount');
      if (/\b(vix|vix\+|vix premium)\b/.test(normText)) detectedPlatforms.push('vix');
      if (/\b(apple|apple tv|appletv)\b/.test(normText)) detectedPlatforms.push('appletv');
      if (/\b(spotify|spoty)\b/.test(normText)) detectedPlatforms.push('spotify');
      if (/\b(canva|canva pro)\b/.test(normText)) detectedPlatforms.push('canva');

      // B) Detección de Cantidad Solicitada
      // Regex para 1 SOLA plataforma:
      const singleRegex = /\b(una|1|uno|sola|solo|solita|solito|solamente|individual|unitaria|1 sola|1 solo|una sola|solo una|solo 1|una sola aplicacion|una sola plataforma|una sola app|una aplicacion|una plataforma|una app|1 aplicacion|1 plataforma|1 app|nada mas una|solito)\b/;
      // Regex explícito para rechazo de combo:
      const noComboRegex = /\b(no quiero combo|sin combo|en vez de combo|cero combo)\b/;

      // Regex para 2 PLATAFORMAS / COMBO:
      const comboRegex = /\b(dos|2|ambas|combo|duo|dupla|pareja|juntas|las dos|los dos|2 aplicaciones|2 apps|dos aplicaciones|dos apps|armar combo|paquete|duplas)\b/;

      // Regex para 3 PLATAFORMAS:
      const threeRegex = /\b(tres|3|3 aplicaciones|3 apps|tres aplicaciones|trio|trío)\b/;

      let requestedCount = null;
      if (threeRegex.test(normText)) {
        requestedCount = 3;
      } else if (noComboRegex.test(normText)) {
        requestedCount = 1;
      } else if (comboRegex.test(normText) && !singleRegex.test(normText)) {
        requestedCount = 2;
      } else if (singleRegex.test(normText) && !comboRegex.test(normText)) {
        requestedCount = 1;
      } else if (singleRegex.test(normText) && comboRegex.test(normText)) {
        // Conflicto: e.g. "quiero una sola aplicacion, no un combo"
        requestedCount = 1;
      }

      // Si el usuario especificó exactamente 2 plataformas y no dijo que quería 1 sola:
      if (detectedPlatforms.length === 2 && requestedCount !== 1) {
        requestedCount = 2;
      } else if (detectedPlatforms.length === 1 && requestedCount === null) {
        // Mencionó 1 plataforma específica y no mencionó combo -> Tratar como 1 sola
        requestedCount = 1;
      }

      // C) Detección Temática / Categoría
      const isSports = /\b(deporte|deportes|futbol|champions|messi|ronaldo|liga|espn|premier|partido|partidos|soccer|f1|formula 1|tenis|ufc|libertadores|sudamericana|conmebol|básquet|basquet|nba)\b/.test(normText);
      const isCinema = /\b(serie|series|pelicula|peliculas|cine|estreno|estrenos|maraton|stranger|dragon|last of us|hollywood|taquillera|accion|terror|comedia|drama)\b/.test(normText);
      const isMusic = /\b(musica|cancion|canciones|playlist|podcast|podcasts|gym|gimnasio|audifonos|auriculares|sonido|audio|escuchar)\b/.test(normText);
      const isTools = /\b(diseno|logo|logos|instagram|redes|post|flyer|publicidad|emprendimiento|negocio|estudio|tarea|universidad|plantilla|plantillas|quitar fondo|quitafondos|creador|marketing|fotos)\b/.test(normText);
      const isFamily = /\b(nino|ninos|infantil|infantiles|caricatura|caricaturas|familia|familiar|pixar|marvel|star wars|nickelodeon|paw patrol|bob esponja|disney)\b/.test(normText);
      const isQuality = /\b(calidad|4k|dolby|vision|atmos|tasa de bits|bitrate|apple tv|fidelidad)\b/.test(normText);
      const isNovelas = /\b(novela|novelas|mexico|mexicana|latino|latina|televisa|univision|telenovela)\b/.test(normText);

      // D) Construcción de la Recomendación según requestedCount

      // CASO 1: El usuario pidió 1 SOLA APLICACIÓN (o mencionó 1 específica)
      if (requestedCount === 1) {
        let targetId = 'netflix'; // Default para 1 app
        if (detectedPlatforms.length > 0) {
          targetId = detectedPlatforms[0];
        } else if (isMusic) {
          targetId = 'spotify';
        } else if (isTools) {
          targetId = 'canva';
        } else if (isSports) {
          targetId = 'disneyplus';
        } else if (isFamily) {
          targetId = 'disneyplus';
        } else if (isQuality) {
          targetId = 'appletv';
        } else if (isNovelas) {
          targetId = 'vix';
        } else if (isCinema) {
          targetId = 'netflix';
        }

        const platformData = STREAMING_PLATFORMS.find(p => p.id === targetId) || STREAMING_PLATFORMS[0];
        const profile = (ORBITA_AI_KB.platforms && ORBITA_AI_KB.platforms[targetId]) || {};

        let reasonText = profile.reason || `Para lo que necesitas en 1 sola aplicación, **${platformData.name}** es la opción ideal: perfil privado con clave PIN, alta definición y garantía total por solo ${formatPrice(platformData.priceUSD)}/${platformData.pricePeriod}.`;
        
        let tipText = platformData.id === 'canva'
          ? '✨ Acceso anual completo (365 días) activado directo a tu propio correo electrónico.'
          : `💡 Si luego deseas sumar otra plataforma, con nuestro Combo Dúo te llevas 2 pantallas por solo $5.00/mes (ahorras $1/mes).`;

        rec = {
          recommendIds: [platformData.id],
          isCombo: false,
          price: platformData.priceUSD,
          title: `${platformData.name} (1 Pantalla Privada)`,
          badge: platformData.id === 'canva' ? 'Plan Anual $4' : '1 Aplicación Individual ($3)',
          reason: reasonText,
          tip: tipText
        };
      }

      // CASO 2: El usuario pidió 2 APLICACIONES / COMBO DÚO
      else if (requestedCount === 2) {
        let pairIds = ['netflix', 'disneyplus']; // Default para combo
        if (detectedPlatforms.length >= 2) {
          pairIds = [detectedPlatforms[0], detectedPlatforms[1]];
        } else if (detectedPlatforms.length === 1) {
          const firstId = detectedPlatforms[0];
          const profile = (ORBITA_AI_KB.platforms && ORBITA_AI_KB.platforms[firstId]) || {};
          const partnerId = profile.partnerId || (firstId === 'disneyplus' ? 'netflix' : 'disneyplus');
          pairIds = [firstId, partnerId];
        } else if (isSports) {
          pairIds = (ORBITA_AI_KB.categories && ORBITA_AI_KB.categories.sports.comboIds) || ['disneyplus', 'vix'];
        } else if (isCinema) {
          pairIds = (ORBITA_AI_KB.categories && ORBITA_AI_KB.categories.cinema.comboIds) || ['netflix', 'hbomax'];
        } else if (isMusic) {
          pairIds = (ORBITA_AI_KB.categories && ORBITA_AI_KB.categories.music.comboIds) || ['spotify', 'netflix'];
        } else if (isTools) {
          pairIds = (ORBITA_AI_KB.categories && ORBITA_AI_KB.categories.tools.comboIds) || ['canva', 'netflix'];
        } else if (isFamily) {
          pairIds = (ORBITA_AI_KB.categories && ORBITA_AI_KB.categories.family.comboIds) || ['disneyplus', 'paramount'];
        } else if (isQuality) {
          pairIds = (ORBITA_AI_KB.categories && ORBITA_AI_KB.categories.quality.comboIds) || ['appletv', 'hbomax'];
        } else if (isNovelas) {
          pairIds = (ORBITA_AI_KB.categories && ORBITA_AI_KB.categories.novelas.comboIds) || ['vix', 'netflix'];
        }

        const p1 = STREAMING_PLATFORMS.find(p => p.id === pairIds[0]) || STREAMING_PLATFORMS[0];
        const p2 = STREAMING_PLATFORMS.find(p => p.id === pairIds[1]) || STREAMING_PLATFORMS[1];

        rec = {
          recommendIds: [p1.id, p2.id],
          isCombo: true,
          price: 5.00,
          title: `Combo Dúo: ${p1.shortName} + ${p2.shortName}`,
          badge: 'Combo Dúo (2 Pantallas x $5)',
          reason: `¡Excelente elección! Combinando **${p1.name}** y **${p2.name}** tienes la cobertura de entretenimiento perfecta. En lugar de pagar $6 ($3 por cada una), en Órbita pagas únicamente **$5.00/mes** por ambas cuentas con perfiles 100% privados y PIN.`,
          tip: '⚡ Al ordenar te entregamos ambas credenciales y tus PINs exclusivos en menos de 5 minutos.'
        };
      }

      // CASO 3: El usuario pidió 3 APLICACIONES
      else if (requestedCount === 3) {
        let trioIds = ['netflix', 'disneyplus', 'hbomax'];
        if (detectedPlatforms.length >= 3) {
          trioIds = detectedPlatforms.slice(0, 3);
        } else if (detectedPlatforms.length === 2) {
          const third = STREAMING_PLATFORMS.find(p => !detectedPlatforms.includes(p.id)) || STREAMING_PLATFORMS[2];
          trioIds = [...detectedPlatforms, third.id];
        }

        const plats = trioIds.map(id => STREAMING_PLATFORMS.find(p => p.id === id)).filter(Boolean);
        const trioNames = plats.map(p => p.shortName).join(' + ');

        rec = {
          recommendIds: trioIds,
          isCombo: true,
          isThree: true,
          price: 8.00,
          title: `Paquete Trío: ${trioNames}`,
          badge: 'Pack 3 Pantallas ($8.00)',
          reason: `Para 3 plataformas, te aplicamos la regla de ahorro Órbita: **Combo Dúo de 2 apps por $5** + **3ra aplicación por $3** = **$8.00/mes** en total. Tres pantallas privadas con PIN para tu hogar.`,
          tip: '⚡ Puedes cargar las 3 de inmediato en el configurador o pedirlas juntas por WhatsApp.'
        };
      }

      // CASO 4: Consulta abierta / recomendación general sin cantidad explícita
      else {
        // Si es de música o diseño, por naturaleza es 1 app
        if (isMusic) {
          rec = {
            recommendIds: ['spotify'],
            isCombo: false,
            price: 3.00,
            title: 'Spotify Premium Individual',
            badge: '1 Aplicación Individual ($3)',
            reason: '**Spotify Premium** es la indicada: más de 100M de canciones sin anuncios, calidad de audio máxima y descargas por solo $3.00 al mes. Si también te gustan las series, puedes sumarle Netflix en Combo Dúo por solo $5/mes.',
            tip: '💡 Tarifa individual de $3.00/mes o en Combo Dúo con otra app por $5.00/mes.'
          };
        } else if (isTools) {
          rec = {
            recommendIds: ['canva'],
            isCombo: false,
            price: 4.00,
            title: 'Canva Pro Anual (365 Días)',
            badge: 'Plan Anual $4',
            reason: 'Para diseño y redes sociales, **Canva Pro Anual** a solo $4.00 por todo el año es la mejor inversión: quitafondos mágico, kit de marcas y plantillas premium directo a tu correo.',
            tip: '✨ 365 días de garantía y soporte continuo en WhatsApp.'
          };
        } else if (isSports) {
          rec = {
            recommendIds: ['disneyplus'],
            isCombo: false,
            price: 3.00,
            title: 'Disney+ con ESPN en Vivo (1 Pantalla)',
            badge: '1 Aplicación Individual ($3)',
            reason: 'Para fútbol y deportes en vivo, **Disney+** es la opción principal gracias a ESPN (Champions League, Premier, F1 y tenis) por solo $3.00 al mes. Si también sigues la Liga MX o deseas más partidos, puedes llevarte el **Combo Dúo con ViX por solo $5.00/mes**.',
            tip: '⚽ Llévate solo Disney+ por $3/mes o añade ViX en combo por $5/mes.'
          };
        } else {
          rec = {
            recommendIds: ['netflix'],
            isCombo: false,
            price: 3.00,
            title: 'Netflix Premium 4K (1 Pantalla)',
            badge: '1 Aplicación Individual ($3)',
            reason: '¡Te recomiendo **Netflix Premium**! Es el catálogo de series y estrenos más visto del mundo, con perfil 100% privado con PIN y calidad Ultra HD 4K por solo $3.00 al mes. Además, si deseas más entretenimiento, puedes armar un **Combo Dúo con Disney+ o Max por solo $5.00/mes**.',
            tip: '💡 En Órbita tú decides: 1 aplicación por $3, o cualquier combo de 2 por solo $5.'
          };
        }
      }
    }

    if (!rec) return;

    // Preparar elementos de renderizado
    const recPlatforms = rec.recommendIds.map(id => STREAMING_PLATFORMS.find(p => p.id === id)).filter(Boolean);
    const priceFormatted = formatPrice(rec.price || (recPlatforms.length === 1 ? recPlatforms[0].priceUSD : 5.00));
    const periodLabel = rec.recommendIds.includes('canva') && rec.recommendIds.length === 1 ? '/ año' : '/ mes';
    const appsNames = recPlatforms.map(p => p.shortName || p.name).join(' + ');

    const chipsHtml = recPlatforms.map(p => `
      <span class="ai-rec-app-chip">
        <img src="${p.iconUrl}" alt="${p.shortName}" onerror="this.style.display='none'">
        <span>${p.shortName}</span>
      </span>
    `).join('');

    // Mensaje dinámico y URL de WhatsApp
    let waMsg = '';
    if (!rec.isCombo && recPlatforms.length === 1) {
      waMsg = `¡Hola Órbita Streaming! Deseo adquirir 1 pantalla privada de *${recPlatforms[0].name}* por *${priceFormatted}* (${periodLabel}). ¿Cuáles son los medios de pago para activarla de inmediato?`;
    } else if (rec.isThree) {
      waMsg = `¡Hola Órbita Streaming! Deseo solicitar el paquete de 3 aplicaciones: *${appsNames}* por *${priceFormatted}* (${periodLabel}). ¿Cuáles son los métodos de pago?`;
    } else {
      waMsg = `¡Hola Órbita Streaming! Orbit me recomendó el *Combo Dúo: ${appsNames}* por *${priceFormatted}* (${periodLabel}). Deseo activarlo de inmediato, ¿cuáles son los medios de pago?`;
    }
    const waUrl = `https://wa.me/${ORBITA_CONFIG.whatsappNumber}?text=${encodeURIComponent(waMsg)}`;

    // Botones de acción dinámicos según sea 1 sola aplicación o combo
    let actionButtonsHtml = '';
    if (!rec.isCombo && recPlatforms.length === 1) {
      const p = recPlatforms[0];
      const singleOrderText = p.id === 'canva' ? '📲 Activar Canva Pro ($4/año)' : `📲 Pedir ${p.shortName} por WhatsApp (${priceFormatted})`;
      const secondaryBtn = p.id === 'canva'
        ? `<button type="button" class="ai-btn-action-secondary" onclick="window.openPlatformDetails('canva')"><span>✨ Ver Detalles de Canva Pro</span></button>`
        : `<button type="button" class="ai-btn-action-secondary" onclick="window.selectComboPlatforms(['${p.id}'])"><span>⚡ O armar Combo Dúo por $5</span></button>`;

      actionButtonsHtml = `
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="ai-btn-action-primary">
          <span>${singleOrderText}</span>
        </a>
        ${secondaryBtn}
      `;
    } else if (rec.isThree) {
      actionButtonsHtml = `
        <button type="button" class="ai-btn-action-primary" onclick="window.selectComboPlatforms(${JSON.stringify(rec.recommendIds)})">
          <span>⚡ Cargar 3 Apps en Configurador</span>
        </button>
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="ai-btn-action-secondary">
          <span>📲 Pedir Trío por WhatsApp (${priceFormatted})</span>
        </a>
      `;
    } else {
      actionButtonsHtml = `
        <button type="button" class="ai-btn-action-primary" onclick="window.selectComboPlatforms(${JSON.stringify(rec.recommendIds)})">
          <span>⚡ Cargar en Armar Combo (2 x $5)</span>
        </button>
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="ai-btn-action-secondary">
          <span>📲 Pedir Combo por WhatsApp (${priceFormatted})</span>
        </a>
      `;
    }

    const badgeClass = rec.isCombo ? 'badge-combo' : 'badge-single';
    const badgeText = rec.badge || (rec.isCombo ? 'Combo Dúo (2 Pantallas)' : '1 Aplicación Individual');
    const tipHtml = rec.tip ? `<div class="ai-rec-note">${rec.tip}</div>` : '';

    // 3. Respuesta con typing simulation (280ms)
    setTimeout(() => {
      const botMsgEl = document.createElement('div');
      botMsgEl.className = 'ai-message ai-bot-message';
      botMsgEl.innerHTML = `
        <div class="ai-bot-avatar">
          <svg viewBox="0 0 100 100" class="ai-avatar-svg">
            <circle cx="50" cy="50" r="41" fill="none" stroke="#ccff00" stroke-width="7"/>
            <circle cx="50" cy="50" r="23" fill="none" stroke="#ccff00" stroke-width="12"/>
            <circle cx="50" cy="9" r="4" fill="#ffffff"/>
          </svg>
        </div>
        <div class="ai-message-content">
          <div class="ai-bot-name">Orbit ✦ Asistente Inteligente</div>
          <p>${rec.reason}</p>
          <div class="ai-recommendation-card">
            <div class="ai-rec-header">
              <div>
                <span class="ai-rec-badge ${badgeClass}">${badgeText}</span>
                <div class="ai-rec-title">${rec.title || appsNames}</div>
              </div>
              <div class="ai-rec-price-box" style="text-align: right;">
                <div class="ai-rec-price">${priceFormatted}</div>
                <div style="font-size: 0.75rem; color: #cbd5e1; font-weight: 600;">${periodLabel}</div>
              </div>
            </div>
            <div class="ai-rec-apps-row">
              ${chipsHtml}
            </div>
            <div class="ai-rec-actions">
              ${actionButtonsHtml}
            </div>
            ${tipHtml}
          </div>
        </div>
      `;
      chatBox.appendChild(botMsgEl);
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 280);
  }

  function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
  }

  // Función global para seleccionar plataformas en el configurador desde cualquier lugar
  window.selectComboPlatforms = function(platformIds) {
    if (!Array.isArray(platformIds)) return;
    state.selectedCustomPlatforms.clear();
    platformIds.forEach(id => state.selectedCustomPlatforms.add(id));
    renderCustomComboCheckboxes();
    updateCustomComboCalculator();

    if (window.Orbita3D && window.Orbita3D.triggerShockwave) {
      window.Orbita3D.triggerShockwave('#ccff00');
    }

    const comboSection = document.getElementById('armar-combo');
    if (comboSection) {
      comboSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = `combos.html?add=${platformIds.join(',')}`;
      return;
    }

    showToast(`✦ Cargado en el Configurador: ${platformIds.join(' + ')} ✦`);
  };

  // Función global para abrir el modal de una plataforma directamente por su ID
  window.openPlatformDetails = function(platformId) {
    const plat = STREAMING_PLATFORMS.find(p => p.id === platformId);
    if (plat) {
      openPlatformModal(plat);
    }
  };

  // Exponer processAiQuery globalmente
  window.processAiQuery = processAiQuery;

  // =========================================================================
  // --- 4. PLATAFORMAS DE STREAMING (TARJETAS MINIMALISTAS) ---
  // =========================================================================
  function renderPlatforms() {
    const container = document.getElementById('platforms-grid');
    if (!container) return;

    // Filtros por categoría
    const filterButtons = document.querySelectorAll('.platform-filter-btn');
    filterButtons.forEach(btn => {
      btn.onclick = () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.currentFilter = btn.dataset.filter;
        renderPlatforms();
      };
    });

    const filtered = STREAMING_PLATFORMS.filter(p => {
      if (state.currentFilter === 'all') return true;
      if (state.currentFilter === 'tools') return p.category === 'tools';
      return p.category === state.currentFilter;
    });

    container.innerHTML = '';

    filtered.forEach(platform => {
      const card = document.createElement('article');
      card.className = 'platform-card';
      card.style.setProperty('--brand-color', platform.color);
      card.style.setProperty('--brand-glow', platform.glowColor);
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Ver detalles de ${platform.name}`);
      card.setAttribute('data-platform-id', platform.id);

      const periodLabel = platform.pricePeriod === 'año' ? '/ año' : '/ mes';

      card.innerHTML = `
        <div class="card-glow-overlay"></div>
        <div class="card-top-bar">
          <span class="card-badge">${platform.badge}</span>
          <span class="card-category-tag">${platform.categoryName}</span>
        </div>
        <div class="card-brand-display">
          <div class="card-logo-wrap" style="color: ${platform.color};">
            ${platform.logoSvg}
          </div>
          <h3 class="card-platform-title">${platform.name}</h3>
          <p class="card-tagline">${platform.tagline}</p>
        </div>
        <div class="card-perks-preview">
          <div class="perk-mini-item">
            <svg class="check-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>${platform.id === 'canva' ? 'Activación a tu Correo' : 'Perfil Privado con PIN'}</span>
          </div>
          <div class="perk-mini-item">
            <svg class="check-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>Garantía & Soporte Directo</span>
          </div>
        </div>
        <div class="card-footer">
          <div class="card-pricing-block">
            <span class="price-main-value">${formatPrice(platform.priceUSD)}</span>
            <span class="price-period-label">${periodLabel}</span>
          </div>
          <button class="card-action-btn" type="button">
            <span>Ver Plan</span>
            <svg class="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      `;

      // Interacción táctil y clic
      card.addEventListener('click', () => {
        openPlatformModal(platform);
      });

      card.addEventListener('mouseenter', () => {
        applyCosmicTheme(platform);
      });

      container.appendChild(card);
    });
  }

  // =========================================================================
  // --- 5. MODAL DE DETALLE DE PLATAFORMA ---
  // =========================================================================
  function initModalEvents() {
    const modal = document.getElementById('platform-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    if (!modal) return;

    if (closeBtn) {
      closeBtn.addEventListener('click', closePlatformModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closePlatformModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closePlatformModal();
      }
    });
  }

  function openPlatformModal(platform) {
    const modal = document.getElementById('platform-modal');
    const modalContent = document.getElementById('modal-body-content');
    if (!modal || !modalContent) return;

    state.activeModalPlatform = platform;
    applyCosmicTheme(platform);

    const periodLabel = platform.pricePeriod === 'año' ? '/ año' : '/ mes';
    const waText = `Hola Órbita Streaming, deseo activar mi cuenta de ${platform.name} por ${formatPrice(platform.priceUSD)} ${periodLabel}.`;
    const waUrl = `https://wa.me/${ORBITA_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`;

    modalContent.innerHTML = `
      <div class="modal-platform-hero">
        <div class="modal-logo-wrap" style="color: ${platform.color};">
          ${platform.logoSvg}
        </div>
        <div class="modal-title-info">
          <span class="modal-badge-tag">${platform.badge}</span>
          <h2 class="modal-title">${platform.name}</h2>
          <p class="modal-tagline">${platform.tagline}</p>
        </div>
      </div>

      <div class="modal-features-grid">
        <h4 class="modal-section-title">Beneficios Incluidos:</h4>
        <ul class="modal-features-list">
          ${platform.features.map(f => `
            <li>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div class="modal-pricing-box">
        <div class="modal-price-display">
          <span class="modal-price-val">${formatPrice(platform.priceUSD)}</span>
          <span class="modal-price-period">${periodLabel}</span>
        </div>
        <div class="modal-actions-group">
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-cosmic-primary" style="justify-content: center;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.188.014.303-.058.116-.087.188-.173.289l-.26.302c-.087.087-.179.182-.077.357.101.174.449.741.964 1.2 1.05 1.077 1.77 1.267 2.015 1.4.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086.159.058 1.011.477 1.184.564.173.086.289.13.332.202.043.072.043.419-.101.824z"/>
            </svg>
            <span>Pedir por WhatsApp (${formatPrice(platform.priceUSD)})</span>
          </a>
          <button type="button" class="btn-cosmic-glass" style="justify-content: center;" onclick="window.selectComboPlatforms(['${platform.id}'])">
            <span>⚡ Añadir a Armar Combo</span>
          </button>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function updateModalPricing(platform) {
    openPlatformModal(platform);
  }

  function closePlatformModal() {
    const modal = document.getElementById('platform-modal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    state.activeModalPlatform = null;
  }

  // =========================================================================
  // --- 6. CONFIGURADOR INTERACTIVO "ARMAR COMBO" ($3 c/u, 2 x $5, Canva $4) ---
  // =========================================================================
  function initCustomComboBuilder() {
    try {
      const params = new URLSearchParams(window.location.search);
      const addParam = params.get('add');
      const comboParam = params.get('combo');
      if (addParam) {
        state.selectedCustomPlatforms.clear();
        addParam.split(',').forEach(id => {
          const cleanId = id.trim().toLowerCase();
          if (STREAMING_PLATFORMS.some(p => p.id === cleanId)) {
            state.selectedCustomPlatforms.add(cleanId);
          }
        });
      } else if (comboParam === 'rey') {
        state.selectedCustomPlatforms = new Set(['netflix', 'disneyplus']);
      } else if (comboParam === 'cine') {
        state.selectedCustomPlatforms = new Set(['netflix', 'hbomax']);
      } else if (comboParam === 'total') {
        state.selectedCustomPlatforms = new Set(['netflix', 'spotify']);
      } else if (comboParam === 'trio') {
        state.selectedCustomPlatforms = new Set(['netflix', 'disneyplus', 'hbomax']);
      }
    } catch (e) {}

    renderCustomComboCheckboxes();
    updateCustomComboCalculator();
  }

  function renderCustomComboCheckboxes() {
    const listContainer = document.getElementById('custom-app-selector-grid') || document.getElementById('calc-platforms-picker');
    if (!listContainer) return;

    listContainer.innerHTML = STREAMING_PLATFORMS.map(p => {
      const isChecked = state.selectedCustomPlatforms.has(p.id);
      const periodBadge = p.pricePeriod === 'año' ? '$4.00 / año' : '$3.00 / mes';
      const badgeDesc = p.id === 'canva' ? 'Diseño Anual' : 'Perfil Privado PIN';

      return `
        <div class="calc-platform-card ${isChecked ? 'active' : ''}" data-id="${p.id}" tabindex="0" role="checkbox" aria-checked="${isChecked}">
          <div class="calc-check-bubble">
            <svg class="check-svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="calc-platform-logo-box" style="color: ${p.color};">
            ${p.logoSvg}
          </div>
          <div class="calc-card-info">
            <span class="calc-platform-name">${p.shortName}</span>
            <span class="calc-platform-badge-tag">${badgeDesc}</span>
          </div>
          <div class="calc-card-rate-pill">
            <span>${periodBadge}</span>
          </div>
        </div>
      `;
    }).join('');

    // Listeners de clic en cada tarjeta del configurador
    listContainer.querySelectorAll('.calc-platform-card').forEach(card => {
      const toggle = () => {
        const id = card.dataset.id;
        if (state.selectedCustomPlatforms.has(id)) {
          state.selectedCustomPlatforms.delete(id);
          card.classList.remove('active');
          card.setAttribute('aria-checked', 'false');
        } else {
          state.selectedCustomPlatforms.add(id);
          card.classList.add('active');
          card.setAttribute('aria-checked', 'true');

          const plat = STREAMING_PLATFORMS.find(p => p.id === id);
          if (plat) applyCosmicTheme(plat);

          // Onda de choque lumínica en la órbita 3D
          if (window.Orbita3D && window.Orbita3D.triggerAbsorb && plat) {
            window.Orbita3D.triggerAbsorb(plat.id, plat.color);
          }
        }
        updateCustomComboCalculator();
      };

      card.addEventListener('click', toggle);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  function updateCustomComboCalculator() {
    const selectedIds = Array.from(state.selectedCustomPlatforms);
    const countEl = document.getElementById('custom-selected-count') || document.getElementById('calc-selected-count');
    const appsSummaryEl = document.getElementById('summary-combo-apps');
    const discountTag = document.getElementById('summary-discount-tag');
    const totalPriceEl = document.getElementById('custom-total-price') || document.getElementById('calc-orbita-total');
    const pricePeriodEl = document.getElementById('custom-price-period');
    const regularPriceBox = document.getElementById('custom-regular-price');
    const ctaBtn = document.getElementById('btn-order-custom-combo') || document.getElementById('calc-whatsapp-btn');

    if (countEl) countEl.textContent = selectedIds.length;

    let streamingCount = 0;
    let hasCanva = false;
    const selectedPlatforms = [];

    selectedIds.forEach(id => {
      const plat = STREAMING_PLATFORMS.find(p => p.id === id);
      if (plat) {
        selectedPlatforms.push(plat);
        if (id === 'canva') {
          hasCanva = true;
        } else {
          streamingCount++;
        }
      }
    });

    if (selectedPlatforms.length === 0) {
      if (appsSummaryEl) appsSummaryEl.textContent = 'Selecciona al menos 1 aplicación';
      if (totalPriceEl) totalPriceEl.textContent = '0.00';
      if (discountTag) discountTag.style.display = 'none';
      if (regularPriceBox) regularPriceBox.style.display = 'none';
      if (ctaBtn) {
        ctaBtn.classList.add('disabled');
        ctaBtn.href = '#';
      }
      return;
    }

    if (ctaBtn) ctaBtn.classList.remove('disabled');

    // Nombres seleccionados
    const namesList = selectedPlatforms.map(p => p.shortName).join(' + ');
    if (appsSummaryEl) appsSummaryEl.textContent = namesList;

    // Regla Oficial de Precios Órbita:
    // - Streaming individual: $3.00 c/u
    // - Combo 2 apps: cada par de streaming = $5.00
    // - Canva Pro Anual: $4.00
    const pairs = Math.floor(streamingCount / 2);
    const remainder = streamingCount % 2;
    const finalPriceUSD = (pairs * 5.00) + (remainder * 3.00) + (hasCanva ? 4.00 : 0);
    const regularTotalUSD = (streamingCount * 3.00) + (hasCanva ? 4.00 : 0);
    const discountUSD = regularTotalUSD - finalPriceUSD;

    if (totalPriceEl) totalPriceEl.textContent = formatPrice(finalPriceUSD).replace('$', '');

    // Descuento aplicado y Promo Spotify GRATIS
    const hasSpotifyPromo = streamingCount >= 2;
    if (hasSpotifyPromo) {
      if (discountTag) {
        discountTag.style.display = 'inline-block';
        discountTag.innerHTML = `🎉 ¡Descuento de Combo + 🎧 <strong>Cuenta SPOTIFY GRATIS</strong> Incluida!`;
      }
      if (regularPriceBox) {
        regularPriceBox.style.display = 'block';
        regularPriceBox.querySelector('span').textContent = formatPrice(regularTotalUSD);
      }
    } else if (discountUSD > 0) {
      if (discountTag) {
        discountTag.style.display = 'inline-block';
        discountTag.textContent = '🎉 ¡Descuento de Combo Aplicado!';
      }
      if (regularPriceBox) {
        regularPriceBox.style.display = 'block';
        regularPriceBox.querySelector('span').textContent = formatPrice(regularTotalUSD);
      }
    } else {
      if (discountTag) discountTag.style.display = 'none';
      if (regularPriceBox) regularPriceBox.style.display = 'none';
    }

    // Actualizar botón de WhatsApp Ecuador (+593 998226756)
    if (ctaBtn) {
      const fullNames = selectedPlatforms.map(p => p.name).join(', ');
      let msg = `¡Hola Órbita Streaming! Deseo activar mi combo personalizado con: *${fullNames}* por un total de *${formatPrice(finalPriceUSD)}*.`;
      if (hasSpotifyPromo) {
        msg += ` ¡Y quiero reclamar mi cuenta de *SPOTIFY GRATIS* de regalo! 🎁🎧`;
      }
      msg += ` ¿Cuáles son los métodos de pago para activarlo ya?`;
      ctaBtn.href = `https://wa.me/${ORBITA_CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`;
      ctaBtn.target = "_blank";
      ctaBtn.rel = "noopener noreferrer";
    }
  }

  // =========================================================================
  // --- 7. VENTAJAS COMPETITIVAS ---
  // =========================================================================
  function renderAdvantages() {
    const container = document.getElementById('advantages-grid');
    if (!container) return;

    const iconMap = {
      zap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
      'shield-check': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>`,
      'life-buoy': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"/><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"/></svg>`,
      tv: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>`,
      sparkles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.636 5.636l2.121 2.121m8.486 8.486l2.121 2.121M5.636 18.364l2.121-2.121m8.486-8.486l2.121-2.121"/></svg>`,
      'refresh-cw': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`
    };

    container.innerHTML = ADVANTAGES.map(adv => `
      <div class="advantage-card">
        <div class="advantage-icon-box">
          ${iconMap[adv.icon] || ''}
        </div>
        <h4 class="advantage-title">${adv.title}</h4>
        <p class="advantage-desc">${adv.desc}</p>
      </div>
    `).join('');
  }

  // =========================================================================
  // --- 8. TESTIMONIOS REALES ---
  // =========================================================================
  function renderTestimonials() {
    const container = document.getElementById('testimonials-grid');
    if (!container) return;

    container.innerHTML = TESTIMONIALS.map(t => `
      <div class="testimonial-card">
        <div class="testimonial-rating">
          ${Array(t.rating).fill('★').join('')}
        </div>
        <p class="testimonial-text">"${t.comment}"</p>
        <div class="testimonial-author-box">
          <div class="author-avatar">${t.name.charAt(0)}</div>
          <div class="author-meta">
            <span class="author-name">${t.name}</span>
            <span class="author-location">${t.city} • <strong class="author-plan">${t.plan}</strong></span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // =========================================================================
  // --- 9. PREGUNTAS FRECUENTES (FAQ ACORDEÓN) ---
  // =========================================================================
  function renderFaqs() {
    const container = document.getElementById('faq-accordion-wrap') || document.getElementById('faqs-accordion');
    if (!container) return;

    container.innerHTML = FAQS.map((faq, index) => `
      <div class="faq-item" data-index="${index}">
        <button class="faq-question-btn" aria-expanded="false" aria-controls="faq-ans-${index}">
          <span class="faq-question-text">${faq.question}</span>
          <span class="faq-chevron-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </button>
        <div id="faq-ans-${index}" class="faq-answer-panel" role="region">
          <div class="faq-answer-content">
            <p>${faq.answer}</p>
          </div>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.faq-question-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        const isOpen = item.classList.contains('open');

        container.querySelectorAll('.faq-item').forEach(other => {
          if (other !== item) {
            other.classList.remove('open');
            other.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          item.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    const firstItem = container.querySelector('.faq-item');
    if (firstItem) {
      firstItem.classList.add('open');
      firstItem.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'true');
    }
  }

  // =========================================================================
  // --- 10. BOTÓN FLOTANTE WHATSAPP ---
  // =========================================================================
  function initFloatingWhatsApp() {
    const floatBtn = document.getElementById('floating-whatsapp');
    const floatPopup = document.getElementById('whatsapp-quick-popup');
    const closePopupBtn = document.getElementById('whatsapp-popup-close');

    if (!floatBtn) return;

    floatBtn.addEventListener('click', (e) => {
      if (floatPopup) {
        e.stopPropagation();
        floatPopup.classList.toggle('active');
      } else {
        window.open(`https://wa.me/${ORBITA_CONFIG.whatsappNumber}?text=Hola%20Órbita%20Streaming,%20deseo%20adquirir%20servicios`, '_blank');
      }
    });

    if (closePopupBtn && floatPopup) {
      closePopupBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        floatPopup.classList.remove('active');
      });

      document.addEventListener('click', (e) => {
        if (!floatPopup.contains(e.target) && !floatBtn.contains(e.target)) {
          floatPopup.classList.remove('active');
        }
      });
    }
  }

  // =========================================================================
  // --- 11. SCROLL REVEAL ---
  // =========================================================================
  function initScrollAnimations() {
    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
    if (!elementsToReveal.length) return;

    if (!('IntersectionObserver' in window)) {
      elementsToReveal.forEach(el => el.classList.add('revealed'));
      return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '200px 0px 200px 0px'
    });

    elementsToReveal.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 150) {
        el.classList.add('revealed');
      } else {
        revealObserver.observe(el);
      }
    });
  }

  // =========================================================================
  // --- 12. TOAST NOTIFICACIONES ---
  // =========================================================================
  function showToast(message) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'app-toast';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('visible');

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('visible');
    }, 3000);
  }

  // =========================================================================
  // --- 13. MINIJUEGO ORBITAL ARCADE: DEFENSOR DEL ESPACIO ---
  // =========================================================================
  function initOrbitMiniGame() {
    const modal = document.getElementById('orbit-game-modal');
    const canvas = document.getElementById('orbit-arcade-canvas');
    if (!modal || !canvas) return;

    const ctx = canvas.getContext('2d');
    const scoreEl = document.getElementById('og-score');
    const comboEl = document.getElementById('og-combo');
    const shieldsEl = document.getElementById('og-shields');
    const highscoreEl = document.getElementById('og-highscore');
    const overlayStart = document.getElementById('og-overlay-start');
    const overlayVictory = document.getElementById('og-overlay-victory');
    const overlayGameOver = document.getElementById('og-overlay-gameover');
    const victoryScoreEl = document.getElementById('og-victory-score');
    const finalScoreEl = document.getElementById('og-final-score');

    // Botones
    const btnStart = document.getElementById('og-btn-start');
    const btnRetry = document.getElementById('og-btn-retry');
    const btnReplayVic = document.getElementById('og-btn-replay-vic');
    const btnTapAction = document.getElementById('og-btn-tap-action');
    const closeBtn = document.getElementById('orbit-game-close-btn');

    // Botones de apertura del modal
    document.querySelectorAll('#open-minigame-btn, #hero-minigame-btn, #mobile-drawer-minigame-btn, [data-open-minigame]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openMiniGameModal();
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeMiniGameModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeMiniGameModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeMiniGameModal();
      }
    });

    // Estado del juego
    let isRunning = false;
    let animId = null;
    let score = 0;
    let combo = 1;
    let comboTimer = 0;
    let shields = 3;
    let highscore = parseInt(localStorage.getItem('orbita_highscore') || '0', 10);
    if (highscoreEl) highscoreEl.textContent = highscore;

    // Configuración orbital
    const INNER_R = 65;
    const OUTER_R = 120;
    let targetRadius = INNER_R;
    let currentRadius = INNER_R;
    let currentOrbit = 0; // 0 = inner, 1 = outer
    let shipAngle = 0;
    let shipSpeed = 0.038;

    let items = [];
    let asteroids = [];
    let particles = [];
    let stars = [];
    let lastSpawnTime = 0;
    let lastAsteroidTime = 0;

    // Sintetizador simple de audio para efectos
    function playBeep(freq, type = 'sine', duration = 0.1) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const actx = new AudioCtx();
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, actx.currentTime);
        gain.gain.setValueAtTime(0.15, actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + duration);
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start();
        osc.stop(actx.currentTime + duration);
      } catch (e) {}
    }

    // Inicializar campo estelar del canvas
    for (let i = 0; i < 45; i++) {
      stars.push({
        x: Math.random() * 480,
        y: Math.random() * 320,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.7 + 0.3
      });
    }

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    function openMiniGameModal() {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      setTimeout(resizeCanvas, 50);
      showOverlay(overlayStart);
    }

    function closeMiniGameModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      stopGame();
    }

    function showOverlay(overlayToShow) {
      [overlayStart, overlayVictory, overlayGameOver].forEach(ov => {
        if (ov) {
          if (ov === overlayToShow) ov.classList.remove('hidden');
          else ov.classList.add('hidden');
        }
      });
    }

    function switchOrbit() {
      if (!isRunning) return;
      currentOrbit = 1 - currentOrbit;
      targetRadius = currentOrbit === 0 ? INNER_R : OUTER_R;
      playBeep(440, 'triangle', 0.08);

      // Partículas al cambiar de órbita
      for (let i = 0; i < 8; i++) {
        particles.push({
          x: (canvas.width / (2 * (window.devicePixelRatio || 1))) + Math.cos(shipAngle) * currentRadius,
          y: (canvas.height / (2 * (window.devicePixelRatio || 1))) + Math.sin(shipAngle) * currentRadius,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          color: '#ccff00',
          size: Math.random() * 3 + 1,
          life: 1
        });
      }
    }

    function startGame() {
      isRunning = true;
      score = 0;
      combo = 1;
      shields = 3;
      items = [];
      asteroids = [];
      particles = [];
      targetRadius = INNER_R;
      currentRadius = INNER_R;
      currentOrbit = 0;
      shipAngle = 0;

      updateHUD();
      showOverlay(null);
      playBeep(523.25, 'sine', 0.15);

      cancelAnimationFrame(animId);
      lastSpawnTime = performance.now();
      lastAsteroidTime = performance.now();
      animId = requestAnimationFrame(gameLoop);
    }

    function stopGame() {
      isRunning = false;
      cancelAnimationFrame(animId);
    }

    function updateHUD() {
      if (scoreEl) scoreEl.textContent = score;
      if (comboEl) comboEl.textContent = `x${combo}`;
      if (shieldsEl) {
        let shieldIcons = '';
        for (let s = 0; s < shields; s++) shieldIcons += '🛡️ ';
        shieldsEl.textContent = shieldIcons.trim() || '💥 0';
      }
    }

    // Input listeners
    if (btnStart) btnStart.addEventListener('click', startGame);
    if (btnRetry) btnRetry.addEventListener('click', startGame);
    if (btnReplayVic) btnReplayVic.addEventListener('click', startGame);
    if (btnTapAction) btnTapAction.addEventListener('click', switchOrbit);
    canvas.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (!isRunning) return;
      switchOrbit();
    });

    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (isRunning) switchOrbit();
        else if (!overlayStart.classList.contains('hidden')) startGame();
      }
    });

    const PLATFORM_ORBS = [
      { id: 'netflix', color: '#E50914', label: 'N', points: 50 },
      { id: 'disney', color: '#00A3FF', label: 'D', points: 50 },
      { id: 'max', color: '#8a3afe', label: 'M', points: 50 },
      { id: 'prime', color: '#00d9ff', label: 'P', points: 50 },
      { id: 'spotify', color: '#25D366', label: '★', points: 100, isSpotify: true }
    ];

    function spawnItem() {
      const orbType = PLATFORM_ORBS[Math.floor(Math.random() * PLATFORM_ORBS.length)];
      const orbit = Math.random() > 0.5 ? 1 : 0;
      const radius = orbit === 0 ? INNER_R : OUTER_R;
      // Aparece al otro lado de la nave
      const angle = shipAngle + Math.PI + (Math.random() - 0.5) * 1.2;

      items.push({
        orbit,
        radius,
        angle,
        speed: (Math.random() * 0.01 + 0.015) * (Math.random() > 0.5 ? 1 : -1),
        type: orbType,
        size: orbType.isSpotify ? 12 : 9.5
      });
    }

    function spawnAsteroid() {
      const orbit = Math.random() > 0.5 ? 1 : 0;
      const radius = orbit === 0 ? INNER_R : OUTER_R;
      const angle = shipAngle + Math.PI * 0.9;

      asteroids.push({
        orbit,
        radius,
        angle,
        speed: (Math.random() * 0.012 + 0.02) * (Math.random() > 0.5 ? 1 : -1),
        size: 11,
        rot: 0,
        rotSpeed: 0.03
      });
    }

    function gameLoop(timestamp) {
      if (!isRunning) return;

      const logicalW = canvas.width / (window.devicePixelRatio || 1);
      const logicalH = canvas.height / (window.devicePixelRatio || 1);
      const cx = logicalW / 2;
      const cy = logicalH / 2;

      // 1. Spawning
      if (timestamp - lastSpawnTime > 1400) {
        if (items.length < 5) spawnItem();
        lastSpawnTime = timestamp;
      }
      if (timestamp - lastAsteroidTime > 2600) {
        if (asteroids.length < 4) spawnAsteroid();
        lastAsteroidTime = timestamp;
      }

      // 2. Actualizar física
      currentRadius += (targetRadius - currentRadius) * 0.16;
      shipAngle += shipSpeed;

      // Estela de motor
      if (Math.random() > 0.3) {
        particles.push({
          x: cx + Math.cos(shipAngle - 0.18) * currentRadius,
          y: cy + Math.sin(shipAngle - 0.18) * currentRadius,
          vx: -Math.cos(shipAngle) * 1.5 + (Math.random() - 0.5),
          vy: -Math.sin(shipAngle) * 1.5 + (Math.random() - 0.5),
          color: '#ccff00',
          size: Math.random() * 2.5 + 1,
          life: 0.7
        });
      }

      // Combo timer
      if (combo > 1) {
        comboTimer += 0.016;
        if (comboTimer > 3.5) {
          combo = 1;
          comboTimer = 0;
          updateHUD();
        }
      }

      // 3. Render
      ctx.clearRect(0, 0, logicalW, logicalH);

      // Fondo Estrellas
      ctx.fillStyle = '#ffffff';
      stars.forEach(s => {
        ctx.globalAlpha = s.alpha;
        ctx.fillRect(s.x, s.y, s.size, s.size);
      });
      ctx.globalAlpha = 1;

      // Órbitas Concéntricas
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(204, 255, 0, 0.2)';
      ctx.beginPath();
      ctx.arc(cx, cy, INNER_R, 0, Math.PI * 2);
      ctx.stroke();

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(204, 255, 0, 0.35)';
      ctx.beginPath();
      ctx.arc(cx, cy, OUTER_R, 0, Math.PI * 2);
      ctx.stroke();

      // Núcleo Central Órbita
      const pulse = Math.sin(timestamp * 0.005) * 2;
      const coreGrad = ctx.createRadialGradient(cx, cy, 3, cx, cy, 22 + pulse);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.4, '#ccff00');
      coreGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 22 + pulse, 0, Math.PI * 2);
      ctx.fill();

      // Nave del Jugador
      const shipX = cx + Math.cos(shipAngle) * currentRadius;
      const shipY = cy + Math.sin(shipAngle) * currentRadius;

      ctx.save();
      ctx.translate(shipX, shipY);
      ctx.rotate(shipAngle + Math.PI / 2);

      // Escudo si está activo
      ctx.strokeStyle = 'rgba(204, 255, 0, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.stroke();

      // Nave estilizada
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(0, -9);
      ctx.lineTo(7, 7);
      ctx.lineTo(0, 4);
      ctx.lineTo(-7, 7);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#ccff00';
      ctx.beginPath();
      ctx.arc(0, -1, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Items / Esferas de Streaming
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        item.angle += item.speed;
        const ix = cx + Math.cos(item.angle) * item.radius;
        const iy = cy + Math.sin(item.angle) * item.radius;

        // Dibujar aura y esfera
        ctx.fillStyle = item.type.color;
        ctx.shadowColor = item.type.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(ix, iy, item.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Letra inicial
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 9px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(item.type.label, ix, iy + 0.5);

        // Colisión con la nave
        const dist = Math.hypot(shipX - ix, shipY - iy);
        if (dist < 18) {
          // Recolectado
          const earned = item.type.points * combo;
          score += earned;
          combo = Math.min(combo + 1, 5);
          comboTimer = 0;

          if (item.type.isSpotify && shields < 3) {
            shields++;
            playBeep(784, 'sine', 0.2);
          } else {
            playBeep(587.33, 'triangle', 0.12);
          }

          // Partículas de recolección
          for (let p = 0; p < 12; p++) {
            particles.push({
              x: ix,
              y: iy,
              vx: (Math.random() - 0.5) * 5,
              vy: (Math.random() - 0.5) * 5,
              color: item.type.color,
              size: Math.random() * 3 + 1,
              life: 1
            });
          }

          items.splice(i, 1);
          updateHUD();

          // Condición de victoria / Promo secreta desbloqueada a los 300 pts
          if (score >= 300) {
            triggerVictory();
            return;
          }
        }
      }

      // Asteroides / Amenazas
      for (let a = asteroids.length - 1; a >= 0; a--) {
        const ast = asteroids[a];
        ast.angle += ast.speed;
        ast.rot += ast.rotSpeed;
        const ax = cx + Math.cos(ast.angle) * ast.radius;
        const ay = cy + Math.sin(ast.angle) * ast.radius;

        ctx.save();
        ctx.translate(ax, ay);
        ctx.rotate(ast.rot);

        ctx.fillStyle = '#64748b';
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.rect(-ast.size / 2, -ast.size / 2, ast.size, ast.size);
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        // Colisión con la nave
        const aDist = Math.hypot(shipX - ax, shipY - ay);
        if (aDist < 19) {
          shields--;
          combo = 1;
          playBeep(140, 'sawtooth', 0.25);

          // Explosión de impacto
          for (let p = 0; p < 15; p++) {
            particles.push({
              x: ax,
              y: ay,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              color: '#ff4757',
              size: Math.random() * 3 + 1.5,
              life: 1
            });
          }

          asteroids.splice(a, 1);
          updateHUD();

          if (shields <= 0) {
            triggerGameOver();
            return;
          }
        }
      }

      // Actualizar y dibujar partículas
      for (let p = particles.length - 1; p >= 0; p--) {
        const part = particles[p];
        part.x += part.vx;
        part.y += part.vy;
        part.life -= 0.035;

        if (part.life <= 0) {
          particles.splice(p, 1);
        } else {
          ctx.globalAlpha = part.life;
          ctx.fillStyle = part.color;
          ctx.beginPath();
          ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      animId = requestAnimationFrame(gameLoop);
    }

    function triggerVictory() {
      stopGame();
      if (score > highscore) {
        highscore = score;
        localStorage.setItem('orbita_highscore', highscore.toString());
        if (highscoreEl) highscoreEl.textContent = highscore;
      }
      if (victoryScoreEl) victoryScoreEl.textContent = score;
      showOverlay(overlayVictory);
      playBeep(880, 'sine', 0.3);
      if (window.Orbita3D && window.Orbita3D.triggerShockwave) {
        window.Orbita3D.triggerShockwave('#25D366');
      }
    }

    function triggerGameOver() {
      stopGame();
      if (score > highscore) {
        highscore = score;
        localStorage.setItem('orbita_highscore', highscore.toString());
        if (highscoreEl) highscoreEl.textContent = highscore;
      }
      if (finalScoreEl) finalScoreEl.textContent = score;
      showOverlay(overlayGameOver);
    }
  }

  window.OrbitaApp = {
    openPlatformModal,
    showToast,
    formatPrice
  };

})();
