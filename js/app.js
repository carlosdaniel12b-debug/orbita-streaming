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

  function formatAiText(str) {
    if (!str) return '';
    let formatted = escapeHtml(str);
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    formatted = formatted.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
    return `<p>${formatted}</p>`;
  }

  function processAiQuery(userText, directPreset = null) {
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
      const rawText = userText.toLowerCase();
      const normText = rawText.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      // A) Saludos y cortesía básica
      const isGreeting = /\b(hola|buen dia|buenos dias|buenas tardes|buenas noches|hey|que tal|saludos|hello|hi)\b/.test(normText);

      // B) Preguntas de funciones / Capacidades del bot
      const isCapabilities = /\b(que puedes hacer|quien eres|para que sirves|como me ayudas|tus funciones|que haces|ayuda|funciones|capacidades|como funcionas)\b/.test(normText);

      // C) Medios de pago y proceso de compra
      const isPayment = /\b(como pago|medios de pago|metodos de pago|formas de pago|forma de pago|transferencia|binance|usdt|zelle|pago movil|nequi|dolar|bolivares|pesos|tarjeta|como comprar|como compro|donde pago|pago)\b/.test(normText);

      // D) Preguntas de garantía y seguridad
      const isWarranty = /\b(garantia|se cae|soporte|estafa|seguro|seguridad|confiable|confianza|caida|problema|reposicion)\b/.test(normText);

      // E) Preguntas sobre perfiles con PIN
      const isProfilePin = /\b(pin|clave pin|perfil privado|alguien mas|pantalla privada|historial|mi perfil)\b/.test(normText);

      // F) Promoción de Spotify Gratis
      const isPromoSpotify = /\b(spotify gratis|promo spotify|promocion spotify|regalo spotify|gratis spotify)\b/.test(normText);

      // G) Comparativas directas entre plataformas
      const isComparison = /\b(diferencia|cual es mejor|comparar|comparativa|vs|versus|o max|o netflix|o disney)\b/.test(normText);

      // H) Detección de Géneros Cinematográficos
      const isTerror = /\b(terror|miedo|suspenso|horror|paranormal|scream|conjuro|sangre|exorcismo|fantasmas|monstruo|halloween|escalofrio|perturbadora|perturbador)\b/.test(normText);
      const isAccion = /\b(accion|disparos|adrenalina|persecucion|peleas|pelea|john wick|rapido|top gun|mision imposible|balas|combate|artes marciales)\b/.test(normText);
      const isScifi = /\b(ciencia ficcion|scifi|sci fi|espacio|interestelar|interstellar|dune|stranger things|star wars|alien|aliens|galaxia|viajes en el tiempo|futurista|futuro|cyberpunk)\b/.test(normText);
      const isDrama = /\b(drama|llorar|emotiva|conmovedora|oppenheimer|succession|the bear|shogun|oscar|premios|profunda|triste|reflexiva)\b/.test(normText);
      const isComedia = /\b(comedia|risa|risas|divertida|graciosa|chistosa|the office|friends|sitcom|humor|reir)\b/.test(normText);
      const isAnime = /\b(anime|otaku|manga|japones|demon slayer|attack on titan|jujutsu|shonen|goku|naruto|bleach|animacion japonesa)\b/.test(normText);
      const isFamily = /\b(nino|ninos|nina|ninas|infantil|caricatura|caricaturas|bebe|bebes|pixar|toy story|bob esponja|paw patrol|disney|intensamente|moana|familia|familiar)\b/.test(normText);
      const isRomance = /\b(romance|romantica|romanticas|amor|pareja|novios|enamorados|la la land|desamor|san valentin|novia|novio)\b/.test(normText);
      const isSports = /\b(deporte|deportes|futbol|champions|messi|ronaldo|liga|espn|premier|partido|partidos|soccer|f1|formula 1|tenis|ufc|libertadores|sudamericana|conmebol|básquet|basquet|nba)\b/.test(normText);
      const isTools = /\b(diseno|logo|logos|instagram|redes|post|flyer|publicidad|emprendimiento|negocio|estudio|tarea|universidad|plantilla|plantillas|quitar fondo|quitafondos|creador|marketing|fotos)\b/.test(normText);
      const isMusic = /\b(musica|cancion|canciones|playlist|podcast|podcasts|gym|gimnasio|audifonos|auriculares|sonido|audio|escuchar)\b/.test(normText);

      // I) Detección de Plataformas Mencionadas Directamente
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

      // J) Cantidad solicitada (1, 2 o 3 apps)
      const comboRegex = /\b(dos|2|ambas|combo|duo|dupla|pareja|juntas|las dos|los dos|2 aplicaciones|2 apps|dos aplicaciones|dos apps|armar combo|paquete|duplas)\b/;
      const threeRegex = /\b(tres|3|3 aplicaciones|3 apps|tres aplicaciones|trio|trío)\b/;

      // -------------------------------------------------------------
      // ROUTING DE INTENCIONES CONVERSACIONALES
      // -------------------------------------------------------------

      // 1. Saludos iniciales
      if (isGreeting && detectedPlatforms.length === 0 && !isTerror && !isAccion && !isScifi) {
        rec = {
          title: "¡Hola! Soy Orbit, tu Copiloto IA",
          badge: "Agente Inteligente Activo",
          reason: "¡Hola! 👋 Qué alegría saludarte. Soy **Orbit**, tu agente de inteligencia artificial en Órbita Streaming.\n\nPuedo conversar contigo y ayudarte en lo que necesites:\n• 🍿 **Recomendarte qué ver hoy:** Pídeme películas o series de terror, acción, comedia, anime, ciencia ficción o romance con títulos exactos.\n• 💡 **Descubrir qué app te conviene:** Te comparo Netflix, Max, Disney+, Prime, Paramount y más.\n• ⚡ **Armar tu Combo Dúo (2 apps x $5/mes)** y aprovechar la promo de Spotify Gratis.\n• 🔒 Resolver dudas sobre perfiles privados con PIN, medios de pago y garantía.\n\n¿De qué tienes ganas hoy, o qué plataforma estás buscando?",
          recommendIds: ['netflix', 'hbomax', 'disneyplus'],
          isCombo: true,
          price: 5.00,
          tip: "💡 Puedes escribir lo que quieras: 'recomiéndame pelis de terror', 'cuánto vale disney', 'cómo pago', etc."
        };
      }

      // 2. ¿Qué puedes hacer? / Capacidades
      else if (isCapabilities && detectedPlatforms.length === 0) {
        rec = {
          title: "¿Qué puedo hacer por ti?",
          badge: "Capacidades de Orbit AI",
          reason: "🤖 **¡Tengo superpoderes para tu entretenimiento!** Como tu agente de IA oficial en Órbita Streaming, puedo:\n\n1. 🎬 **Recomendar Cine y Series:** Pídeme por ejemplo *'películas de terror'*, *'anime de acción'*, *'series adictivas para maratonear'* o *'qué ver en pareja'*, y te daré títulos recomendados y la plataforma exacta donde verlos.\n2. ⚖️ **Comparar Plataformas:** Pregúntame *'¿qué es mejor, Netflix o Max?'* o *'¿dónde ver fútbol en vivo?'* y te lo explico sin rodeos.\n3. 💰 **Optimizar tu Presupuesto:** Te asesoro entre 1 app individual ($3/mes), Canva Pro Anual ($4/año) o Combos Dúo (2 apps x $5/mes con Spotify gratis).\n4. 🛡️ **Garantía y Métodos de Pago:** Te explico cómo pagar por Binance USDT, Zelle, Pago Móvil o transferencias, y cómo activar tu perfil privado con PIN.\n\n¡Dime qué te gustaría saber o qué género prefieres!",
          recommendIds: ['netflix', 'disneyplus'],
          isCombo: true,
          price: 5.00,
          tip: "⚡ Escribe tu duda o pide una recomendación de cine y te responderé de inmediato."
        };
      }

      // 3. Medios de pago / Cómo comprar
      else if (isPayment && detectedPlatforms.length === 0) {
        rec = {
          title: "Medios de Pago & Activación en 5 Min",
          badge: "Pagos 100% Seguros",
          reason: "💳 **¡Pagar y activar tus cuentas es sumamente sencillo y seguro!**\n\nAceptamos diversos métodos de pago:\n• 🪙 **Criptomonedas:** Binance Pay (USDT) directo y sin comisiones.\n• 🇺🇸 **Zelle** para pagos en dólares.\n• 📱 **Pago Móvil & Transferencias Bancarias** (a tasa del día garantizada).\n• 🇨🇴 **Nequi / Bancolombia** (según disponibilidad para usuarios en Colombia).\n\n⚡ **Entrega Express:** Al enviar tu comprobante a nuestro WhatsApp oficial, te entregamos tu acceso oficial con tu **PIN de perfil privado en menos de 5 minutos**.",
          recommendIds: ['netflix', 'disneyplus'],
          isCombo: true,
          price: 5.00,
          tip: "📲 Pulsa el botón de WhatsApp abajo para solicitar los datos de pago al instante."
        };
      }

      // 4. Garantía y soporte
      else if (isWarranty && detectedPlatforms.length === 0) {
        rec = {
          title: "Garantía de Reposición Órbita (30 Días)",
          badge: "Seguridad & Garantía Total",
          reason: "🛡️ **Tu servicio está completamente protegido en Órbita:**\n\n• **Garantía Total de 30 Días:** Cada cuenta contratada cuenta con garantía activa durante todo el mes. Si en algún momento presentas cualquier inconveniente, nuestro equipo de soporte en WhatsApp te da **reemplazo o solución inmediata**.\n• **Cuentas 100% Originales:** Son accesos a las aplicaciones oficiales, no APKs modificadas ni enlaces de dudosa procedencia.\n• **Soporte Humano 24/7:** Te atendemos directamente vía WhatsApp todos los días.",
          recommendIds: ['netflix'],
          isCombo: false,
          price: 3.00,
          tip: "✨ Miles de clientes activos confían en nuestra atención y garantía continua."
        };
      }

      // 5. Perfil privado y PIN
      else if (isProfilePin) {
        rec = {
          title: "Privacidad Total: Tu Perfil con Clave PIN",
          badge: "100% Privado & Seguro",
          reason: "🔒 **¿Cómo funciona el perfil privado con PIN?**\n\n• Al contratar tu pantalla, te asignamos un **perfil exclusivo con tu nombre** dentro de la cuenta oficial.\n• Le colocas una **clave PIN personal de 4 dígitos** para que nadie más pueda entrar a ver tus cosas.\n• Tu historial, tu lista de películas y el algoritmo son **totalmente tuyos**, con reproducción en Ultra HD 4K.",
          recommendIds: ['netflix', 'hbomax'],
          isCombo: true,
          price: 5.00,
          tip: "🔒 Tu privacidad es sagrada: nadie interfiere con tus series ni con tu historial."
        };
      }

      // 6. Promo de Spotify gratis
      else if (isPromoSpotify) {
        rec = {
          title: "Super Promo: Combo 2x$5 + SPOTIFY GRATIS",
          badge: "Promoción Estrella de Regalo",
          reason: "🎁 **¡La mejor promoción de Órbita Streaming!**\n\nAl ordenar cualquier **Combo Dúo de 2 aplicaciones por solo $5.00/mes** (como Netflix + Disney+, o Max + Prime Video), te obsequiamos **1 cuenta de SPOTIFY PREMIUM totalmente GRATIS** durante el mes.\n\n¡Disfrutas del mejor cine y series en dos plataformas más 100 millones de canciones sin anuncios sin pagar un solo centavo extra!",
          recommendIds: ['netflix', 'disneyplus', 'spotify'],
          isCombo: true,
          price: 5.00,
          tip: "🎁 Para activarla, pulsa en WhatsApp y pide tu Combo 2x$5 con el bono de Spotify de regalo."
        };
      }

      // 7. Comparativas (Netflix vs Max, etc.)
      else if (isComparison) {
        rec = {
          title: "Comparativa: Netflix vs Max (HBO)",
          badge: "Duelo de Gigantes",
          reason: "⚖️ **¿Netflix o Max? Aquí te ayudo a elegir la mejor opción:**\n\n• **Elige Netflix ($3/mes):** Si prefieres cantidad masiva de contenido, series que se vuelven virales cada semana (*Stranger Things*, *Merlina*, *El Juego del Calamar*), realities y documentales.\n• **Elige Max ($3/mes):** Si priorizas el cine de mayor prestigio mundial, producciones de HBO multipremiadas (*House of the Dragon*, *The Last of Us*, *Succession*), cine de Warner en 4K y el universo de *Dune* y *DC Comics*.\n\n💡 **El Secreto:** En lugar de elegir una sola por $3, ¡puedes llevarte el **Combo Dúo Cinéfilo con ambas por solo $5/mes**!",
          recommendIds: ['netflix', 'hbomax'],
          isCombo: true,
          price: 5.00,
          tip: "⚡ Las dos plataformas en Ultra HD 4K con perfil privado y PIN por solo $5."
        };
      }

      // 8. Recomendación por Géneros de Películas y Series
      else if (isTerror && window.ORBITA_AI_KB && ORBITA_AI_KB.genres && ORBITA_AI_KB.genres.terror) {
        const g = ORBITA_AI_KB.genres.terror;
        rec = {
          title: g.name,
          badge: "Recomendación de Terror & Suspenso",
          reason: g.answer,
          recommendIds: g.idealCombo,
          isCombo: true,
          price: 5.00,
          tip: "👻 Pide tu combo de terror en WhatsApp y recíbelo con entrega inmediata en 5 minutos."
        };
      } else if (isAccion && window.ORBITA_AI_KB && ORBITA_AI_KB.genres && ORBITA_AI_KB.genres.accion) {
        const g = ORBITA_AI_KB.genres.accion;
        rec = {
          title: g.name,
          badge: "Recomendación de Acción Pura",
          reason: g.answer,
          recommendIds: g.idealCombo,
          isCombo: true,
          price: 5.00,
          tip: "💥 Películas taquilleras y superproducciones en Ultra HD 4K."
        };
      } else if (isScifi && window.ORBITA_AI_KB && ORBITA_AI_KB.genres && ORBITA_AI_KB.genres.scifi) {
        const g = ORBITA_AI_KB.genres.scifi;
        rec = {
          title: g.name,
          badge: "Recomendación Sci-Fi & Espacio",
          reason: g.answer,
          recommendIds: g.idealCombo,
          isCombo: true,
          price: 5.00,
          tip: "🚀 Visuales asombrosos en 4K Dolby Vision y sonido envolvente."
        };
      } else if (isDrama && window.ORBITA_AI_KB && ORBITA_AI_KB.genres && ORBITA_AI_KB.genres.drama) {
        const g = ORBITA_AI_KB.genres.drama;
        rec = {
          title: g.name,
          badge: "Cine de Culto & Premiadas",
          reason: g.answer,
          recommendIds: g.idealCombo,
          isCombo: true,
          price: 5.00,
          tip: "🏆 Historias profundas y actuaciones multipremiadas."
        };
      } else if (isComedia && window.ORBITA_AI_KB && ORBITA_AI_KB.genres && ORBITA_AI_KB.genres.comedia) {
        const g = ORBITA_AI_KB.genres.comedia;
        rec = {
          title: g.name,
          badge: "Comedia & Sitcoms Adictivas",
          reason: g.answer,
          recommendIds: ['hbomax', 'netflix'],
          isCombo: true,
          price: 5.00,
          tip: "😂 Las mejores sitcoms de la historia completas en tu pantalla."
        };
      } else if (isAnime && window.ORBITA_AI_KB && ORBITA_AI_KB.genres && ORBITA_AI_KB.genres.anime) {
        const g = ORBITA_AI_KB.genres.anime;
        rec = {
          title: g.name,
          badge: "Universo Anime Shonen",
          reason: g.answer,
          recommendIds: g.idealCombo,
          isCombo: true,
          price: 5.00,
          tip: "⚔️ Capítulos nuevos y películas anime en máxima resolución."
        };
      } else if (isFamily && window.ORBITA_AI_KB && ORBITA_AI_KB.genres && ORBITA_AI_KB.genres.infantil) {
        const g = ORBITA_AI_KB.genres.infantil;
        rec = {
          title: g.name,
          badge: "Infantil & Familiar Seguro",
          reason: g.answer,
          recommendIds: g.idealCombo,
          isCombo: true,
          price: 5.00,
          tip: "🎈 Control parental con PIN para que los niños disfruten con seguridad."
        };
      } else if (isRomance && window.ORBITA_AI_KB && ORBITA_AI_KB.genres && ORBITA_AI_KB.genres.romance) {
        const g = ORBITA_AI_KB.genres.romance;
        rec = {
          title: g.name,
          badge: "Cine Romántico & Parejas",
          reason: g.answer,
          recommendIds: g.idealCombo,
          isCombo: true,
          price: 5.00,
          tip: "❤️ Ideal para maratonear este fin de semana en pareja."
        };
      } else if (isSports) {
        rec = {
          title: "Deportes en Vivo: Champions, F1 & Ligas",
          badge: "Deportes & Fútbol Total",
          reason: "⚽ **¡La pasión del deporte en vivo sin cortes!**\n\n• **Disney+ (ESPN):** La casa de la Champions League, Premier League inglesa, Fórmula 1, torneos de tenis de Grand Slam y ligas internacionales por solo **$3.00/mes**.\n• **ViX Premium:** Transmisiones en vivo de la Liga MX y fútbol en español por **$3.00/mes**.\n\n💡 **Recomendación:** Llévate el **Combo Dúo Gol (Disney+ & ViX) por solo $5.00/mes** para tener cobertura deportiva total en vivo.",
          recommendIds: ['disneyplus', 'vix'],
          isCombo: true,
          price: 5.00,
          tip: "⚽ Transmisiones en vivo de ESPN y ViX con perfil privado."
        };
      } else if (isTools) {
        rec = {
          title: "Canva Pro Anual (365 Días)",
          badge: "Plan Anual $4",
          reason: "🎨 **¡La herramienta imprescindible para creadores, estudiantes y negocios!**\n\nObtienes **1 año completo (365 días)** de Canva Pro por solo **$4.00 el año** (menos de $0.35 al mes):\n• Quitafondos mágico en 1 clic.\n• Kit de marcas y fuentes personalizadas.\n• Más de 100 millones de fotos, videos y plantillas premium.\n• Activado directo a tu propio correo electrónico.",
          recommendIds: ['canva'],
          isCombo: false,
          price: 4.00,
          tip: "✨ Garantía completa durante todo el año de servicio."
        };
      } else if (isMusic) {
        rec = {
          title: "Spotify Premium Individual",
          badge: "1 Aplicación Individual ($3)",
          reason: "🎧 **¡Música y podcasts sin límites!**\n\nCon **Spotify Premium** disfrutas de más de 100 millones de canciones sin cortes comerciales, audio de máxima calidad (320 kbps) y descargas sin conexión a internet por solo **$3.00 al mes**.\n\n💡 **Tip de Ahorro:** Si compras un Combo Dúo de 2 aplicaciones por $5, ¡te regalamos Spotify totalmente gratis!",
          recommendIds: ['spotify'],
          isCombo: false,
          price: 3.00,
          tip: "💡 Tarifa individual de $3.00/mes o gratis con tu Combo 2x$5."
        };
      }

      // 9. Detección de Plataformas Específicas
      else if (detectedPlatforms.length === 1 && !comboRegex.test(normText)) {
        const targetId = detectedPlatforms[0];
        const pData = STREAMING_PLATFORMS.find(p => p.id === targetId) || STREAMING_PLATFORMS[0];
        const profile = (ORBITA_AI_KB.platforms && ORBITA_AI_KB.platforms[targetId]) || {};

        let reasonText = profile.reason || `Para lo que buscas, **${pData.name}** es excelente: perfil 100% privado con clave PIN, calidad Ultra HD y garantía total por solo ${formatPrice(pData.priceUSD)}/${pData.pricePeriod}.`;
        let tipText = pData.id === 'canva'
          ? '✨ Acceso anual completo (365 días) activado directo a tu propio correo.'
          : `💡 Si deseas sumar otra plataforma, con el Combo Dúo te llevas 2 pantallas por solo $5/mes (ahorras $1/mes).`;

        rec = {
          recommendIds: [pData.id],
          isCombo: false,
          price: pData.priceUSD,
          title: `${pData.name} (1 Pantalla Privada)`,
          badge: pData.id === 'canva' ? 'Plan Anual $4' : '1 Aplicación Individual ($3)',
          reason: reasonText,
          tip: tipText
        };
      }

      // 10. Detección de Combo de 2 Plataformas
      else if (detectedPlatforms.length >= 2 || comboRegex.test(normText)) {
        let pairIds = ['netflix', 'disneyplus'];
        if (detectedPlatforms.length >= 2) {
          pairIds = [detectedPlatforms[0], detectedPlatforms[1]];
        } else if (detectedPlatforms.length === 1) {
          const firstId = detectedPlatforms[0];
          const profile = (ORBITA_AI_KB.platforms && ORBITA_AI_KB.platforms[firstId]) || {};
          const partnerId = profile.partnerId || (firstId === 'disneyplus' ? 'netflix' : 'disneyplus');
          pairIds = [firstId, partnerId];
        }

        const p1 = STREAMING_PLATFORMS.find(p => p.id === pairIds[0]) || STREAMING_PLATFORMS[0];
        const p2 = STREAMING_PLATFORMS.find(p => p.id === pairIds[1]) || STREAMING_PLATFORMS[1];

        rec = {
          recommendIds: [p1.id, p2.id],
          isCombo: true,
          price: 5.00,
          title: `Combo Dúo: ${p1.shortName} + ${p2.shortName}`,
          badge: 'Combo Dúo (2 Pantallas x $5)',
          reason: `¡Excelente elección! Al combinar **${p1.name}** y **${p2.name}** tienes entretenimiento completo para todo tu hogar. En lugar de pagar $6 ($3 por cada una), en Órbita pagas únicamente **$5.00/mes** por ambas cuentas con perfiles 100% privados y PIN. ¡Y además puedes solicitar tu cuenta de Spotify de regalo!`,
          tip: '⚡ Al ordenar te entregamos ambas credenciales y tus PINs exclusivos en menos de 5 minutos.'
        };
      }

      // 11. Detección de Paquete de 3 Apps
      else if (threeRegex.test(normText)) {
        let trioIds = ['netflix', 'disneyplus', 'hbomax'];
        if (detectedPlatforms.length >= 3) {
          trioIds = detectedPlatforms.slice(0, 3);
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

      // 12. Fallback Conversacional Amigable (NUNCA recomienda Netflix a ciegas)
      else {
        rec = {
          title: "Orbit: Tu Asesor de Streaming",
          badge: "Asistente Inteligente",
          reason: "¡Entendido! Como tu asesor personal de streaming, puedo orientarte en lo que prefieras:\n\n• Si buscas **películas o series**, dime qué género te gusta (terror, acción, comedia, anime, ciencia ficción o drama) y te diré qué ver y dónde.\n• Si buscas **ahorrar**, nuestro **Combo Dúo de 2 aplicaciones por $5/mes** te incluye además **Spotify Gratis de regalo**.\n• Si deseas saber sobre **pagos**, aceptamos Binance USDT, Zelle, Pago Móvil y transferencias con entrega en 5 minutos.\n\n¿En qué plataforma estás pensando o qué te gustaría ver hoy?",
          recommendIds: ['netflix', 'hbomax'],
          isCombo: true,
          price: 5.00,
          tip: "💡 Pregúntame sobre cualquier película, serie o plataforma con total libertad."
        };
      }
    }

    if (!rec) return;

    // Preparar elementos de renderizado
    const recPlatforms = (rec.recommendIds || ['netflix']).map(id => STREAMING_PLATFORMS.find(p => p.id === id)).filter(Boolean);
    const priceFormatted = formatPrice(rec.price || (recPlatforms.length === 1 ? recPlatforms[0].priceUSD : 5.00));
    const periodLabel = rec.recommendIds && rec.recommendIds.includes('canva') && rec.recommendIds.length === 1 ? '/ año' : '/ mes';
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
      waMsg = `¡Hola Órbita Streaming! Orbit me recomendó: *${rec.title || appsNames}* por *${priceFormatted}* (${periodLabel}). Deseo activarlo de inmediato, ¿cuáles son los medios de pago?`;
    }
    const waUrl = `https://wa.me/${ORBITA_CONFIG.whatsappNumber}?text=${encodeURIComponent(waMsg)}`;

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
          <span>⚡ Cargar en Armar Combo ($5)</span>
        </button>
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="ai-btn-action-secondary">
          <span>📲 Pedir por WhatsApp (${priceFormatted})</span>
        </a>
      `;
    }

    const badgeClass = rec.isCombo ? 'badge-combo' : 'badge-single';
    const badgeText = rec.badge || (rec.isCombo ? 'Combo Dúo (2 Pantallas)' : '1 Aplicación Individual');
    const tipHtml = rec.tip ? `<div class="ai-rec-note">${rec.tip}</div>` : '';
    const formattedReason = formatAiText(rec.reason);

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
          <div class="ai-bot-name">Orbit ✦ Agente de Streaming IA</div>
          <div class="ai-text-body">${formattedReason}</div>
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
  // --- 13. MINIJUEGO ARCADE: FLAPPY SPACE (RECONSTRUIDO • 6 NIVELES • INFINITO) ---
  // =========================================================================
  function initOrbitMiniGame() {
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

    // Botones
    const btnStart = document.getElementById('og-btn-start');
    const btnRetry = document.getElementById('og-btn-retry');
    const btnExit = document.getElementById('og-btn-exit');
    const btnTapAction = document.getElementById('og-btn-tap-action');
    const closeBtn = document.getElementById('orbit-game-close-btn');

    // =======================================================================
    // 6 NIVELES CÓSMICOS PROGRESIVOS Y EXTENSOS
    // =======================================================================
    const LEVELS = [
      {
        id: 1,
        name: 'Nv. 1: Tierra',
        sector: 'Órbita Terrestre',
        minScore: 0,
        targetScore: 10,
        speed: 2.2,
        gap: 145,
        color: '#00f0ff',
        pylonColor: '#0a1d28',
        osc: 0
      },
      {
        id: 2,
        name: 'Nv. 2: Luna',
        sector: 'Estación Lunar & Satélites',
        minScore: 10,
        targetScore: 25,
        speed: 2.6,
        gap: 135,
        color: '#ccff00',
        pylonColor: '#192806',
        osc: 0
      },
      {
        id: 3,
        name: 'Nv. 3: Marte',
        sector: 'Cinturón de Asteroides',
        minScore: 25,
        targetScore: 45,
        speed: 3.0,
        gap: 125,
        color: '#ff9900',
        pylonColor: '#2b1504',
        osc: 0.6
      },
      {
        id: 4,
        name: 'Nv. 4: Saturno',
        sector: 'Anillos de Saturno',
        minScore: 45,
        targetScore: 70,
        speed: 3.4,
        gap: 118,
        color: '#c084fc',
        pylonColor: '#250836',
        osc: 1.2
      },
      {
        id: 5,
        name: 'Nv. 5: Hiperespacio',
        sector: 'Túnel Cuántico Warp',
        minScore: 70,
        targetScore: 100,
        speed: 3.8,
        gap: 110,
        color: '#f43f5e',
        pylonColor: '#360611',
        osc: 1.8
      },
      {
        id: 6,
        name: 'Nv. 6: Agujero Negro',
        sector: 'Horizonte de Sucesos (Infinito)',
        minScore: 100,
        targetScore: Infinity,
        speed: 4.2,
        gap: 104,
        color: '#fbbf24',
        pylonColor: '#362203',
        osc: 2.4
      }
    ];

    let isRunning = false;
    let animId = null;
    let score = 0;
    let currentLevel = LEVELS[0];
    let highscore = parseInt(localStorage.getItem('flappy_space_highscore') || '0', 10);
    if (highscoreEl) highscoreEl.textContent = highscore;

    let canvasW = 480;
    let canvasH = 350;

    // Nave espacial (Física Flappy refinada)
    const ship = {
      x: 75,
      y: 150,
      vy: 0,
      gravity: 0.34,
      jump: -5.7,
      radius: 9,
      tilt: 0
    };

    let pipes = [];
    let asteroids = [];
    let particles = [];
    let stars = [];
    const pipeWidth = 46;
    const pipeSpacing = 185;

    // Efectos de cambio de nivel
    let levelBannerText = '';
    let levelBannerSector = '';
    let levelBannerTimer = 0;
    let levelBannerColor = '#00f0ff';
    let screenFlashOpacity = 0;
    let screenFlashColor = '#00f0ff';

    // Sintetizador Web Audio API
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

    function playTone(freq, type = 'sine', duration = 0.08, gainVal = 0.12) {
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

    function playFlapSound() {
      try {
        const actx = getAudioContext();
        if (!actx) return;
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, actx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(540, actx.currentTime + 0.09);
        gain.gain.setValueAtTime(0.12, actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.09);
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start();
        osc.stop(actx.currentTime + 0.09);
      } catch (e) {}
    }

    function playScoreSound() {
      playTone(880, 'sine', 0.1, 0.14);
    }

    function playLevelUpSound() {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        setTimeout(() => playTone(freq, 'triangle', 0.22, 0.18), idx * 90);
      });
    }

    function playCrashSound() {
      try {
        const actx = getAudioContext();
        if (!actx) return;
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(190, actx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, actx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.2, actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start();
        osc.stop(actx.currentTime + 0.3);
      } catch (e) {}
    }

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvasW = Math.max(300, Math.floor(rect.width || 480));
      canvasH = Math.max(220, Math.floor(rect.height || 350));
      canvas.width = Math.floor(canvasW * dpr);
      canvas.height = Math.floor(canvasH * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function initStars() {
      stars = [];
      const starCount = 38;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvasW,
          y: Math.random() * canvasH,
          size: Math.random() * 2 + 0.7,
          speed: Math.random() * 0.7 + 0.3,
          alpha: Math.random() * 0.65 + 0.35
        });
      }
    }
    initStars();

    function openMiniGameModal() {
      getAudioContext();
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      if (window.Orbita3D && window.Orbita3D.pause) {
        window.Orbita3D.pause();
      }
      setTimeout(resizeCanvas, 40);
      showOverlay(overlayStart);
    }

    function closeMiniGameModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      stopGame();
      if (window.Orbita3D && window.Orbita3D.resume) {
        window.Orbita3D.resume();
      }
    }

    function showOverlay(ov) {
      [overlayStart, overlayGameOver].forEach(el => {
        if (el) {
          if (el === ov) el.classList.remove('hidden');
          else el.classList.add('hidden');
        }
      });
    }

    function updateLevelAndHUD() {
      let nextLevel = LEVELS[0];
      for (let i = LEVELS.length - 1; i >= 0; i--) {
        if (score >= LEVELS[i].minScore) {
          nextLevel = LEVELS[i];
          break;
        }
      }

      if (nextLevel.id !== currentLevel.id) {
        currentLevel = nextLevel;
        playLevelUpSound();

        levelBannerText = `¡SECTOR ${currentLevel.id}: ${currentLevel.name.split(':')[1].trim().toUpperCase()}!`;
        levelBannerSector = `Sector: ${currentLevel.sector}`;
        levelBannerTimer = 110;
        levelBannerColor = currentLevel.color;
        screenFlashColor = currentLevel.color;
        screenFlashOpacity = 0.55;

        for (let i = 0; i < 40; i++) {
          particles.push({
            x: ship.x,
            y: ship.y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            color: currentLevel.color,
            size: Math.random() * 4 + 1.5,
            life: 1.2
          });
        }
      }

      if (scoreEl) scoreEl.textContent = score;
      if (levelEl) {
        levelEl.textContent = currentLevel.name;
        levelEl.style.color = currentLevel.color;
      }
      if (highscoreEl) highscoreEl.textContent = highscore;

      if (levelNameEl) levelNameEl.textContent = currentLevel.name;
      if (levelProgressEl) {
        if (currentLevel.targetScore === Infinity) {
          levelProgressEl.style.width = '100%';
          levelProgressEl.style.background = currentLevel.color;
          if (levelPtsEl) levelPtsEl.textContent = '★ MODO MAESTRO';
        } else {
          const span = currentLevel.targetScore - currentLevel.minScore;
          const cur = score - currentLevel.minScore;
          const pct = Math.min(100, Math.max(0, (cur / span) * 100));
          levelProgressEl.style.width = `${pct}%`;
          levelProgressEl.style.background = `linear-gradient(90deg, #00f0ff, ${currentLevel.color})`;
          if (levelPtsEl) levelPtsEl.textContent = `${score} / ${currentLevel.targetScore} pts`;
        }
      }
    }

    function flap() {
      if (!isRunning) return;
      getAudioContext();
      ship.vy = ship.jump;
      ship.tilt = -0.42;
      playFlapSound();

      for (let i = 0; i < 7; i++) {
        particles.push({
          x: ship.x - 14,
          y: ship.y + (Math.random() - 0.5) * 6,
          vx: -(Math.random() * 3.5 + 2.5),
          vy: (Math.random() - 0.5) * 2.2,
          color: Math.random() > 0.35 ? currentLevel.color : '#ffffff',
          size: Math.random() * 2.5 + 1.2,
          life: 0.75
        });
      }
    }

    function spawnPipe(xPos) {
      const gapH = currentLevel.gap;
      const margin = 45;
      const minY = margin + gapH / 2;
      const maxY = (canvasH - margin) - gapH / 2;
      const baseGapY = minY + Math.random() * Math.max(20, maxY - minY);

      pipes.push({
        x: xPos,
        width: pipeWidth,
        baseGapY: baseGapY,
        currentGapY: baseGapY,
        gapH: gapH,
        passed: false,
        oscPhase: Math.random() * Math.PI * 2,
        oscSpeed: Math.random() * 0.03 + 0.02
      });
    }

    function spawnAsteroid(xPos) {
      const radius = Math.floor(Math.random() * 8 + 13); // 13 to 21px
      const minY = 45 + radius;
      const maxY = canvasH - 45 - radius;
      const yPos = minY + Math.random() * Math.max(20, maxY - minY);
      const vertexCount = 7;
      const vertices = [];
      for (let i = 0; i < vertexCount; i++) {
        const angle = (i / vertexCount) * Math.PI * 2;
        const r = radius * (0.75 + Math.random() * 0.45);
        vertices.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
      }
      asteroids.push({
        x: xPos,
        y: yPos,
        radius: radius,
        vertices: vertices,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.038,
        speed: currentLevel.speed * (0.95 + Math.random() * 0.3)
      });
    }

    function circleRectOverlap(cx, cy, r, rx, ry, rw, rh) {
      const closestX = Math.max(rx, Math.min(cx, rx + rw));
      const closestY = Math.max(ry, Math.min(cy, ry + rh));
      const dx = cx - closestX;
      const dy = cy - closestY;
      return (dx * dx + dy * dy) < (r * r);
    }

    function checkPipeCollision(s, p) {
      const topH = Math.max(10, p.currentGapY - p.gapH / 2);
      const botY = p.currentGapY + p.gapH / 2;
      const botH = Math.max(10, canvasH - botY);

      if (circleRectOverlap(s.x, s.y, s.radius, p.x, 0, p.width, topH)) {
        return true;
      }
      if (circleRectOverlap(s.x, s.y, s.radius, p.x, botY, p.width, botH)) {
        return true;
      }
      return false;
    }

    function startGame() {
      getAudioContext();
      resizeCanvas();
      isRunning = true;
      score = 0;
      currentLevel = LEVELS[0];
      pipes = [];
      asteroids = [];
      particles = [];
      levelBannerTimer = 0;
      screenFlashOpacity = 0;

      ship.x = Math.max(60, Math.floor(canvasW * 0.2));
      ship.y = Math.floor(canvasH * 0.45);
      ship.vy = 0;
      ship.tilt = 0;

      initStars();
      updateLevelAndHUD();
      showOverlay(null);
      playTone(520, 'triangle', 0.12);

      spawnPipe(canvasW + 50);
      spawnPipe(canvasW + 50 + pipeSpacing);

      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(gameLoop);
    }

    function stopGame() {
      isRunning = false;
      cancelAnimationFrame(animId);
    }

    function triggerGameOver() {
      stopGame();
      playCrashSound();

      for (let i = 0; i < 35; i++) {
        particles.push({
          x: ship.x,
          y: ship.y,
          vx: (Math.random() - 0.5) * 9,
          vy: (Math.random() - 0.5) * 9,
          color: Math.random() > 0.4 ? '#ff4757' : (Math.random() > 0.5 ? '#ffa502' : '#ffffff'),
          size: Math.random() * 4.5 + 1.5,
          life: 1.3
        });
      }

      const isNewRecord = score > highscore;
      if (isNewRecord) {
        highscore = score;
        try {
          localStorage.setItem('flappy_space_highscore', highscore.toString());
        } catch (e) {}
        if (highscoreEl) highscoreEl.textContent = highscore;
      }

      if (finalScoreEl) finalScoreEl.textContent = score;
      if (finalLevelEl) {
        finalLevelEl.textContent = currentLevel.name;
        finalLevelEl.style.color = currentLevel.color;
      }
      if (recordAlertEl) {
        if (isNewRecord && score > 0) {
          recordAlertEl.textContent = '⭐ ¡NUEVO RÉCORD GALÁCTICO! ⭐';
          recordAlertEl.style.display = 'block';
        } else {
          recordAlertEl.style.display = 'none';
        }
      }

      showOverlay(overlayGameOver);
    }

    // Manejo unificado de eventos táctiles, clics y teclado (cero doble-salto)
    let lastInputTime = 0;
    function handleFlapInput(e) {
      if (e) {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
      }
      const now = Date.now();
      if (now - lastInputTime < 80) return;
      lastInputTime = now;

      if (!isRunning) {
        startGame();
      } else {
        flap();
      }
    }

    // Botones para abrir el minijuego
    document.querySelectorAll('#open-minigame-btn, #hero-minigame-btn, #mobile-drawer-minigame-btn, #floating-minigame-btn, [data-open-minigame]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openMiniGameModal();
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeMiniGameModal);
    if (btnExit) btnExit.addEventListener('click', closeMiniGameModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeMiniGameModal();
    });

    // Control táctil y de botones
    if (btnStart) btnStart.addEventListener('pointerdown', handleFlapInput);
    if (btnRetry) btnRetry.addEventListener('pointerdown', handleFlapInput);
    if (btnTapAction) btnTapAction.addEventListener('pointerdown', handleFlapInput);

    // Tocar cualquier parte del canvas o los overlays para jugar
    canvas.addEventListener('pointerdown', handleFlapInput);
    if (overlayStart) overlayStart.addEventListener('pointerdown', handleFlapInput);
    if (overlayGameOver) overlayGameOver.addEventListener('pointerdown', handleFlapInput);

    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') {
        closeMiniGameModal();
        return;
      }
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        handleFlapInput(null);
      }
    });

    window.addEventListener('resize', () => {
      if (modal.classList.contains('active')) {
        resizeCanvas();
      }
    });

    // Bucle principal de animación y física Flappy Space (60 FPS)
    function gameLoop(timestamp) {
      if (!isRunning) return;

      ctx.clearRect(0, 0, canvasW, canvasH);

      // 1. Estrellas con efecto parallax
      ctx.fillStyle = currentLevel.color;
      stars.forEach(st => {
        st.x -= st.speed * (currentLevel.speed * 0.45);
        if (st.x < 0) {
          st.x = canvasW;
          st.y = Math.random() * canvasH;
        }
        ctx.globalAlpha = st.alpha * 0.85;
        if (currentLevel.id >= 5) {
          ctx.fillRect(st.x, st.y, st.size * 3.8, st.size * 0.75);
        } else {
          ctx.fillRect(st.x, st.y, st.size, st.size);
        }
      });
      ctx.globalAlpha = 1;

      // 2. Físicas de la nave
      ship.vy += ship.gravity;
      if (ship.vy > 7.5) ship.vy = 7.5;
      ship.y += ship.vy;

      const targetTilt = Math.min(0.75, ship.vy * 0.08);
      ship.tilt += (targetTilt - ship.tilt) * 0.12;

      // Techo seguro (no mata al jugador)
      if (ship.y < ship.radius + 2) {
        ship.y = ship.radius + 2;
        ship.vy = 0;
      }

      // Colisión con piso
      const floorY = canvasH - 6;
      if (ship.y + ship.radius >= floorY) {
        triggerGameOver();
        return;
      }

      // Estela de motor
      if (Math.random() > 0.25) {
        particles.push({
          x: ship.x - 14,
          y: ship.y,
          vx: -(currentLevel.speed + Math.random() * 2),
          vy: (Math.random() - 0.5) * 1.5,
          color: currentLevel.color,
          size: Math.random() * 2 + 0.8,
          life: 0.5
        });
      }

      // 3. GENERACIÓN INFINITA DE COMPUERTAS
      const lastPipe = pipes[pipes.length - 1];
      if (!lastPipe || (canvasW - lastPipe.x >= pipeSpacing)) {
        spawnPipe(canvasW + 10);
      }

      // 4. Actualizar y dibujar compuertas
      for (let i = pipes.length - 1; i >= 0; i--) {
        const p = pipes[i];
        p.x -= currentLevel.speed;

        if (currentLevel.osc > 0) {
          p.oscPhase += p.oscSpeed;
          p.currentGapY = p.baseGapY + Math.sin(p.oscPhase) * (currentLevel.osc * 15);
        } else {
          p.currentGapY = p.baseGapY;
        }

        const topH = Math.max(10, p.currentGapY - p.gapH / 2);
        const botY = p.currentGapY + p.gapH / 2;
        const botH = Math.max(10, canvasH - botY);

        // Pilón superior
        ctx.fillStyle = currentLevel.pylonColor;
        ctx.fillRect(p.x, 0, p.width, topH);
        ctx.strokeStyle = currentLevel.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(p.x, -2, p.width, topH + 2);

        // Emisor superior
        ctx.fillStyle = currentLevel.color;
        ctx.fillRect(p.x - 3, topH - 8, p.width + 6, 8);

        // Haz láser superior
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillRect(p.x + p.width / 2 - 1, 0, 2, topH);

        // Pilón inferior
        ctx.fillStyle = currentLevel.pylonColor;
        ctx.fillRect(p.x, botY, p.width, botH);
        ctx.strokeStyle = currentLevel.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(p.x, botY, p.width, botH + 2);

        // Emisor inferior
        ctx.fillStyle = currentLevel.color;
        ctx.fillRect(p.x - 3, botY, p.width + 6, 8);

        // Haz láser inferior
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillRect(p.x + p.width / 2 - 1, botY, 2, botH);

        // Cruzar compuerta y sumar punto
        if (!p.passed && (p.x + p.width < ship.x)) {
          p.passed = true;
          score++;
          playScoreSound();
          updateLevelAndHUD();
        }

        // Colisión con compuertas
        if (checkPipeCollision(ship, p)) {
          triggerGameOver();
          return;
        }

        // Remover compuertas fuera de pantalla
        if (p.x + p.width < -30) {
          pipes.splice(i, 1);
        }
      }

      // 4b. Spawn y movimiento de Asteroides Cósmicos (Desde Nivel 2)
      if (currentLevel.id >= 2) {
        const lastAst = asteroids[asteroids.length - 1];
        if (!lastAst || (canvasW - lastAst.x >= 260)) {
          if (Math.random() > 0.35) {
            spawnAsteroid(canvasW + 30);
          }
        }
      }

      for (let a = asteroids.length - 1; a >= 0; a--) {
        const ast = asteroids[a];
        ast.x -= ast.speed;
        ast.rotation += ast.rotSpeed;

        // Colisión con la nave espacial
        const distSq = (ship.x - ast.x) * (ship.x - ast.x) + (ship.y - ast.y) * (ship.y - ast.y);
        const colRadius = ship.radius + ast.radius * 0.82;
        if (distSq < colRadius * colRadius) {
          triggerGameOver();
          return;
        }

        // Dibujar Asteroide con relieve rocoso
        ctx.save();
        ctx.translate(ast.x, ast.y);
        ctx.rotate(ast.rotation);
        ctx.fillStyle = '#141d2b';
        ctx.strokeStyle = currentLevel.color;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        for (let v = 0; v < ast.vertices.length; v++) {
          const pt = ast.vertices[v];
          if (v === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Cráter superficial
        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.beginPath();
        ctx.arc(ast.radius * 0.25, -ast.radius * 0.2, ast.radius * 0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Remover asteroides fuera de pantalla
        if (ast.x + ast.radius < -30) {
          asteroids.splice(a, 1);
        }
      }

      // 5. Barrera de energía del piso
      ctx.fillStyle = currentLevel.color;
      ctx.fillRect(0, floorY, canvasW, 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(0, floorY + 2, canvasW, 4);

      // 6. Dibujar Nave Espacial (Flappy Shuttle Vectorial)
      ctx.save();
      ctx.translate(ship.x, ship.y);
      ctx.rotate(ship.tilt);

      // Fuego del motor
      ctx.beginPath();
      ctx.moveTo(-11, -3.5);
      ctx.lineTo(-21 - Math.random() * 8, 0);
      ctx.lineTo(-11, 3.5);
      ctx.closePath();
      ctx.fillStyle = Math.random() > 0.5 ? currentLevel.color : '#ffffff';
      ctx.fill();

      // Fuselaje
      ctx.beginPath();
      ctx.moveTo(16, 0);
      ctx.lineTo(-11, -8);
      ctx.lineTo(-7, 0);
      ctx.lineTo(-11, 8);
      ctx.closePath();
      ctx.fillStyle = '#0a1420';
      ctx.fill();
      ctx.strokeStyle = currentLevel.color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Cabina brillante
      ctx.beginPath();
      ctx.ellipse(2, 0, 5, 2.2, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // Luces de alerón
      ctx.fillStyle = currentLevel.color;
      ctx.fillRect(-6, -6, 2.5, 2.5);
      ctx.fillRect(-6, 4, 2.5, 2.5);

      ctx.restore();

      // 7. Partículas activas (Optimizado para 60 FPS)
      for (let pIdx = particles.length - 1; pIdx >= 0; pIdx--) {
        const pt = particles[pIdx];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= 0.035;

        if (pt.life <= 0) {
          particles.splice(pIdx, 1);
        } else {
          ctx.globalAlpha = Math.max(0, pt.life);
          ctx.fillStyle = pt.color;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // 8. Marcador flotante en pantalla de juego (Sin shadowBlur pesado)
      ctx.save();
      ctx.font = '900 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(score.toString(), canvasW / 2, 14);
      ctx.restore();

      // 9. Destello de cambio de nivel
      if (screenFlashOpacity > 0) {
        ctx.fillStyle = screenFlashColor;
        ctx.globalAlpha = screenFlashOpacity;
        ctx.fillRect(0, 0, canvasW, canvasH);
        ctx.globalAlpha = 1;
        screenFlashOpacity -= 0.025;
      }

      // 10. Cartel de Anuncio de Nivel (Ultra optimizado)
      if (levelBannerTimer > 0) {
        levelBannerTimer--;
        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const boxW = Math.min(canvasW - 30, 320);
        const boxH = 58;
        const boxX = (canvasW - boxW) / 2;
        const boxY = 48;

        ctx.fillStyle = 'rgba(5, 12, 20, 0.9)';
        ctx.strokeStyle = levelBannerColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(boxX, boxY, boxW, boxH, 10);
        else ctx.rect(boxX, boxY, boxW, boxH);
        ctx.fill();
        ctx.stroke();

        ctx.font = '900 15px sans-serif';
        ctx.fillStyle = levelBannerColor;
        ctx.fillText(levelBannerText, canvasW / 2, boxY + 20);

        ctx.font = '700 11px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(levelBannerSector, canvasW / 2, boxY + 40);
        ctx.restore();
      }

      animId = requestAnimationFrame(gameLoop);
    }

    // Exponer apertura global
    window.openOrbitMiniGame = openMiniGameModal;
  }


  window.OrbitaApp = {
    openPlatformModal,
    showToast,
    formatPrice
  };

})();
