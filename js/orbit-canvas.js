/**
 * Órbita Streaming - Motor 3D Orbital de Alto Rendimiento (60 FPS Cero Lag)
 * 
 * Basado en la identidad oficial de Órbita Streaming (anillos orbitales concéntricos):
 * - Sistema orbital 3D de anillos concéntricos en color verde lima neón (#ccff00 / #a3e635)
 * - Satélites y nodos de energía en traslación orbital fluida
 * - Núcleo radiante con halo atmosférico reactivo
 * - Campo estelar tridimensional ultraligero
 * - Sincronización y morfismo de color dinámico en tiempo real según la plataforma activa
 * - Interacción táctil suave en móviles e interactividad con el ratón en escritorio
 * - Optimización para celulares: 60 FPS garantizados, renderer con DPR controlado y pausa inteligente al hacer scroll
 * - Intro espacial cinematográfica rápida (1.2s) con salto instantáneo y persistencia por sesión
 * - Sintetizador de audio ambiental con Web Audio API
 */

(function () {
  'use strict';

  const container = document.getElementById('hero-3d-canvas-container');
  if (!container) return;

  const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Variables Three.js
  let scene, camera, renderer, clock;
  let orbitSystemGroup;
  let outerRingMesh, innerRingMesh, coreSphereMesh, coreCoronaMesh;
  let satelliteNodes = [];
  let starFieldPoints, shockwaves = [];
  let ambientLight, pointLightPrimary, pointLightSecondary;

  // Estado de interactividad
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let isVisible = true;
  let isIntroPlaying = false;
  let animFrameId = null;

  // Paleta de colores de marca oficial (Verde Lima Neón & Grafito)
  const currentColors = {
    primary: new THREE.Color(0xccff00),     // Lima neón característico
    secondary: new THREE.Color(0xa3e635),   // Verde lima de apoyo
    core: new THREE.Color(0xffffff),        // Núcleo blanco radiante
    targetPrimary: new THREE.Color(0xccff00),
    targetSecondary: new THREE.Color(0xa3e635),
    targetCore: new THREE.Color(0xffffff)
  };

  // Coordenadas base de cámara
  const CAMERA_BASE_Z = isMobile ? 550 : 480;

  // =========================================================================
  // 1. SINTETIZADOR DE AUDIO AMBIENTAL SUTIL (WEB AUDIO API)
  // =========================================================================
  const OrbitaAudio = {
    ctx: null,
    isMuted: true,
    droneOsc: null,
    droneGain: null,

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
    },

    toggleMute() {
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.isMuted = !this.isMuted;
      this.updateIcons();

      if (!this.isMuted) {
        this.startHum();
      } else {
        this.stopHum();
      }
      return this.isMuted;
    },

    updateIcons() {
      const headerIcon = document.getElementById('header-audio-icon');
      const introIcon = document.getElementById('intro-audio-icon');
      const introText = document.getElementById('intro-audio-text');

      const icon = this.isMuted ? '🔇' : '🔊';
      const text = this.isMuted ? 'Sonido: OFF' : 'Sonido: ON';

      if (headerIcon) headerIcon.textContent = icon;
      if (introIcon) introIcon.textContent = icon;
      if (introText) introText.textContent = text;
    },

    startHum() {
      if (this.isMuted || !this.ctx || this.droneOsc) return;
      try {
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(55, this.ctx.currentTime); // 55 Hz A1

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(120, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 1.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        this.droneOsc = osc;
        this.droneGain = gain;
      } catch (e) {}
    },

    stopHum() {
      if (this.droneGain && this.ctx) {
        try {
          this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.3);
          setTimeout(() => {
            if (this.droneOsc) {
              this.droneOsc.stop();
              this.droneOsc.disconnect();
              this.droneOsc = null;
            }
          }, 350);
        } catch (e) {}
      }
    },

    playChime(freq = 520) {
      if (this.isMuted || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.3);

        gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.5);
      } catch (e) {}
    }
  };

  // =========================================================================
  // 2. INICIALIZACIÓN DE LA ESCENA THREE.JS
  // =========================================================================
  function init() {
    clock = new THREE.Clock();

    // 1. Escena
    scene = new THREE.Scene();

    // 2. Cámara de perspectiva
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, aspect, 1, 3000);
    camera.position.set(0, 0, CAMERA_BASE_Z);

    // 3. Renderer con optimizaciones críticas para móviles
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true
    });
    // Limitar pixel ratio a 1.5 para evitar saturación en pantallas retina móviles
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Luces
    ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    pointLightPrimary = new THREE.PointLight(currentColors.primary, 3.5, 800);
    pointLightPrimary.position.set(0, 0, 50);
    scene.add(pointLightPrimary);

    pointLightSecondary = new THREE.PointLight(currentColors.secondary, 2.0, 700);
    pointLightSecondary.position.set(120, -100, 80);
    scene.add(pointLightSecondary);

    // 5. Grupo del Sistema Orbital
    orbitSystemGroup = new THREE.Group();
    // Inclinación inicial tipo 3D elegante
    orbitSystemGroup.rotation.x = Math.PI / 3.4;
    orbitSystemGroup.rotation.y = -Math.PI / 10;
    scene.add(orbitSystemGroup);

    // Construcción de componentes
    buildConcentricOrbitRings();
    buildLuminousCore();
    buildOrbitingSatellites();
    buildStarDustField();

    // 6. Listeners interactivos
    setupEvents();

    // 7. Evaluar introducción o modo directo
    evaluateIntro();

    // 8. Bucle de animación
    animate();
  }

  // =========================================================================
  // 3. CONSTRUCCIÓN DE COMPONENTES 3D
  // =========================================================================

  // Anillos concéntricos de Órbita (símbolo exacto del logo)
  function buildConcentricOrbitRings() {
    const segments = isMobile ? 64 : 128;
    const baseRadius = isMobile ? 65 : 85;

    // --- Anillo Exterior (Más fino, como en el logo) ---
    const outerRadius = baseRadius * 1.35;
    const outerTube = isMobile ? 1.5 : 2.0;
    const outerGeo = new THREE.TorusGeometry(outerRadius, outerTube, 16, segments);
    const outerMat = new THREE.MeshBasicMaterial({
      color: currentColors.primary,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending
    });
    outerRingMesh = new THREE.Mesh(outerGeo, outerMat);
    orbitSystemGroup.add(outerRingMesh);

    // Halo tenue exterior
    const outerGlowGeo = new THREE.TorusGeometry(outerRadius, outerTube * 2.2, 12, isMobile ? 48 : 80);
    const outerGlowMat = new THREE.MeshBasicMaterial({
      color: currentColors.primary,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });
    const outerGlowMesh = new THREE.Mesh(outerGlowGeo, outerGlowMat);
    outerRingMesh.add(outerGlowMesh);

    // --- Anillo Interior (Más grueso y concéntrico, como en el logo) ---
    const innerRadius = baseRadius * 0.78;
    const innerTube = isMobile ? 3.2 : 4.0;
    const innerGeo = new THREE.TorusGeometry(innerRadius, innerTube, 16, segments);
    const innerMat = new THREE.MeshBasicMaterial({
      color: currentColors.primary,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    innerRingMesh = new THREE.Mesh(innerGeo, innerMat);
    orbitSystemGroup.add(innerRingMesh);

    // Halo interior
    const innerGlowGeo = new THREE.TorusGeometry(innerRadius, innerTube * 1.8, 12, isMobile ? 48 : 80);
    const innerGlowMat = new THREE.MeshBasicMaterial({
      color: currentColors.secondary,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending
    });
    const innerGlowMesh = new THREE.Mesh(innerGlowGeo, innerGlowMat);
    innerRingMesh.add(innerGlowMesh);

    // --- Anillo Exterior Lejano (Pista de Aplicaciones Satelitales) ---
    const celestialRadius = baseRadius * 2.25;
    const celestialTube = isMobile ? 0.9 : 1.2;
    const celestialGeo = new THREE.TorusGeometry(celestialRadius, celestialTube, 12, isMobile ? 64 : 100);
    const celestialMat = new THREE.MeshBasicMaterial({
      color: 0xccff00,
      transparent: true,
      opacity: 0.24,
      blending: THREE.AdditiveBlending
    });
    const celestialMesh = new THREE.Mesh(celestialGeo, celestialMat);
    celestialMesh.rotation.x = 0.15;
    orbitSystemGroup.add(celestialMesh);

    // --- Anillo 4: Astrolabio Girosférico Cósmico Inclinado (Efecto Órbita 3D Profundo) ---
    const gyroRadius = baseRadius * 1.75;
    const gyroGeo = new THREE.TorusGeometry(gyroRadius, isMobile ? 0.75 : 1.1, 12, isMobile ? 50 : 90);
    const gyroMat = new THREE.MeshBasicMaterial({
      color: 0x00ffd5,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const gyroMesh = new THREE.Mesh(gyroGeo, gyroMat);
    gyroMesh.rotation.x = Math.PI / 3.8;
    gyroMesh.rotation.y = Math.PI / 5.5;
    orbitSystemGroup.add(gyroMesh);
    window._gyroOrbitalMesh = gyroMesh;
  }

  // Núcleo Radiante Central
  function buildLuminousCore() {
    const coreRadius = isMobile ? 9 : 12;

    // Núcleo blanco brillante
    const sphereGeo = new THREE.SphereGeometry(coreRadius, isMobile ? 20 : 28, isMobile ? 20 : 28);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.96
    });
    coreSphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    orbitSystemGroup.add(coreSphereMesh);

    // Corona atmosférica de resplandor
    const coronaGeo = new THREE.SphereGeometry(coreRadius * 2.0, isMobile ? 18 : 24, isMobile ? 18 : 24);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: currentColors.primary,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    coreCoronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    orbitSystemGroup.add(coreCoronaMesh);
  }

  // Satélites orbitales de aplicaciones que recorren los anillos
  function buildOrbitingSatellites() {
    satelliteNodes = [];
    const baseRadius = isMobile ? 65 : 85;

    // Definición de satélites celestiales con las frecuencias de color de las plataformas
    const platformPlanets = [
      { name: 'Netflix', color: 0xE50914, radius: baseRadius * 1.35, speed: 0.75, angle: 0, size: 3.8 },
      { name: 'Disney+', color: 0x00A3FF, radius: baseRadius * 1.35, speed: 0.75, angle: (2 * Math.PI) / 3, size: 3.6 },
      { name: 'Max', color: 0x7c3aed, radius: baseRadius * 1.35, speed: 0.75, angle: (4 * Math.PI) / 3, size: 3.6 },
      { name: 'Prime', color: 0x0284c7, radius: baseRadius * 2.25, speed: 0.48, angle: 0.4, size: 4.2 },
      { name: 'ViX', color: 0xea580c, radius: baseRadius * 2.25, speed: 0.48, angle: 0.4 + (2 * Math.PI) / 3, size: 3.9 },
      { name: 'Spotify', color: 0x16a34a, radius: baseRadius * 2.25, speed: 0.48, angle: 0.4 + (4 * Math.PI) / 3, size: 3.9 },
      { name: 'Paramount', color: 0x2563eb, radius: baseRadius * 0.78, speed: -1.05, angle: 0.2, size: 3.4 },
      { name: 'AppleTV', color: 0xffffff, radius: baseRadius * 0.78, speed: -1.05, angle: 0.2 + (2 * Math.PI) / 3, size: 3.4 },
      { name: 'Canva', color: 0x0891b2, radius: baseRadius * 0.78, speed: -1.05, angle: 0.2 + (4 * Math.PI) / 3, size: 3.4 }
    ];

    platformPlanets.forEach(p => {
      const pGroup = new THREE.Group();

      // Esfera del núcleo del satélite
      const sGeo = new THREE.SphereGeometry(isMobile ? p.size * 0.78 : p.size, 12, 12);
      const sMat = new THREE.MeshBasicMaterial({
        color: p.color,
        blending: THREE.AdditiveBlending
      });
      const sMesh = new THREE.Mesh(sGeo, sMat);
      pGroup.add(sMesh);

      // Corona de resplandor atmosférico
      const haloGeo = new THREE.SphereGeometry(isMobile ? p.size * 1.6 : p.size * 1.9, 10, 10);
      const haloMat = new THREE.MeshBasicMaterial({
        color: p.color,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      pGroup.add(haloMesh);

      orbitSystemGroup.add(pGroup);

      satelliteNodes.push({
        mesh: pGroup,
        radius: p.radius,
        angle: p.angle,
        speed: p.speed
      });
    });
  }

  // Campo de Polvo Estelar Ultraligero (Partículas 3D con cero sobrecarga)
  function buildStarDustField() {
    const count = isMobile ? 180 : 480;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Distribución esférica y cilíndrica profunda
      const radius = 100 + Math.random() * 800;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[idx] = radius * Math.cos(phi) * Math.cos(theta);
      positions[idx + 1] = radius * Math.cos(phi) * Math.sin(theta);
      positions[idx + 2] = radius * Math.sin(phi);

      // Color aleatorio entre blanco y verde lima sutil
      const isLime = Math.random() > 0.65;
      colors[idx] = isLime ? 0.8 : 1.0;
      colors[idx + 1] = isLime ? 1.0 : 1.0;
      colors[idx + 2] = isLime ? 0.2 : 1.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 2.5 : 3.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    starFieldPoints = new THREE.Points(geometry, material);
    scene.add(starFieldPoints);
  }

  // =========================================================================
  // 4. INTERACTIVIDAD & EVENTOS
  // =========================================================================
  function setupEvents() {
    // Movimiento de mouse en escritorio
    window.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    // Toque suave en móviles
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        targetMouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 1.6;
        targetMouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 1.6;
      }
    }, { passive: true });

    // Redimensionamiento de ventana
    window.addEventListener('resize', onWindowResize, { passive: true });

    // Pausar Three.js si el usuario hace scroll profundo (ahorro total de batería en móviles)
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      isVisible = scrollY < (window.innerHeight * 1.3);
    }, { passive: true });

    // Pausar si la pestaña está en segundo plano
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
    });
  }

  function onWindowResize() {
    if (!camera || !renderer) return;
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  // =========================================================================
  // 5. INTRO CINEMATOGRÁFICA RÁPIDA & SKIP
  // =========================================================================
  // =========================================================================
  // 5. INTRO CINEMATOGRÁFICA RÁPIDA & SKIP (1.4s)
  // =========================================================================
  function evaluateIntro() {
    const introOverlay = document.getElementById('cinematic-intro-overlay');
    const brandReveal = document.getElementById('intro-brand-reveal');
    const skipBtn = document.getElementById('btn-skip-intro');

    if (!introOverlay) return;

    isIntroPlaying = true;
    introOverlay.style.display = 'flex';
    introOverlay.style.opacity = '1';

    // Auto-cierre rápido y cinematográfico en 1350ms ("entrando a la órbita")
    const autoCloseTimer = setTimeout(() => {
      skipIntro();
    }, 1350);

    // Manejador del botón Saltar
    if (skipBtn) {
      skipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        clearTimeout(autoCloseTimer);
        skipIntro();
      });
    }

    // Tocar o hacer clic en cualquier parte de la intro para saltar inmediatamente
    introOverlay.addEventListener('click', () => {
      clearTimeout(autoCloseTimer);
      skipIntro();
    });

    // Secuencia de entrada en órbita con cámara Three.js
    if (camera) {
      camera.position.z = CAMERA_BASE_Z * 1.8;
      if (window.gsap) {
        gsap.to(camera.position, {
          z: CAMERA_BASE_Z,
          duration: 1.2,
          ease: 'power3.out'
        });
      } else {
        camera.position.z = CAMERA_BASE_Z;
      }
    }
  }

  function skipIntro() {
    isIntroPlaying = false;

    const introOverlay = document.getElementById('cinematic-intro-overlay');
    if (introOverlay) {
      introOverlay.style.transition = 'opacity 0.35s ease-out, transform 0.35s ease-out';
      introOverlay.style.opacity = '0';
      introOverlay.style.transform = 'scale(1.08)';
      introOverlay.style.pointerEvents = 'none';
      setTimeout(() => {
        introOverlay.style.display = 'none';
      }, 350);
    }

    if (camera) {
      if (window.gsap) {
        gsap.to(camera.position, {
          z: CAMERA_BASE_Z,
          duration: 0.5,
          ease: 'power2.out'
        });
      } else {
        camera.position.z = CAMERA_BASE_Z;
      }
    }
  }

  // =========================================================================
  // 6. ABSORCIÓN GRAVITACIONAL & ONDAS DE CHOQUE
  // =========================================================================
  function triggerShockwave(colorHex) {
    if (!orbitSystemGroup) return;

    const shockColor = colorHex ? new THREE.Color(colorHex) : currentColors.primary;
    const shockGeo = new THREE.RingGeometry(10, 22, isMobile ? 32 : 64);
    const shockMat = new THREE.MeshBasicMaterial({
      color: shockColor,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide
    });
    const shockMesh = new THREE.Mesh(shockGeo, shockMat);
    shockMesh.rotation.x = Math.PI / 2;
    orbitSystemGroup.add(shockMesh);

    shockwaves.push({
      mesh: shockMesh,
      scale: 1,
      maxScale: isMobile ? 8.5 : 12.0,
      opacity: 0.9
    });

    OrbitaAudio.playChime(620);
  }

  function triggerAbsorbAnimation(platformId, colorHex) {
    // Pulso lumínico en el núcleo
    if (coreCoronaMesh) {
      coreCoronaMesh.scale.set(2.4, 2.4, 2.4);
      setTimeout(() => {
        if (coreCoronaMesh) coreCoronaMesh.scale.set(1.9, 1.9, 1.9);
      }, 400);
    }

    triggerShockwave(colorHex);
  }

  // =========================================================================
  // 7. BUCLE PRINCIPAL DE ANIMACIÓN (60 FPS FLUIDO)
  // =========================================================================
  function animate() {
    animFrameId = requestAnimationFrame(animate);

    if (!isVisible) return; // Ahorro de GPU cuando no está en pantalla

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // 1. Suavizado de inclinación por ratón/toque (Inercia)
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    if (orbitSystemGroup) {
      orbitSystemGroup.rotation.x = (Math.PI / 3.4) + mouseY * 0.22;
      orbitSystemGroup.rotation.y = (-Math.PI / 10) + mouseX * 0.28;

      // Rotación de los anillos en sentidos opuestos y respiración armónica
      if (outerRingMesh) {
        outerRingMesh.rotation.z += delta * 0.25;
        const breathOut = 1.0 + Math.sin(elapsedTime * 1.8) * 0.022;
        outerRingMesh.scale.set(breathOut, breathOut, 1.0 + Math.cos(elapsedTime * 1.8) * 0.018);
      }
      if (innerRingMesh) {
        innerRingMesh.rotation.z -= delta * 0.35;
        const breathIn = 1.0 + Math.cos(elapsedTime * 2.1) * 0.028;
        innerRingMesh.scale.set(breathIn, breathIn, 1.0 + Math.sin(elapsedTime * 2.1) * 0.018);
      }
      if (window._gyroOrbitalMesh) {
        window._gyroOrbitalMesh.rotation.z += delta * 0.16;
        window._gyroOrbitalMesh.rotation.y += delta * 0.06;
      }
    }

    // 2. Movimiento orbital de satélites
    satelliteNodes.forEach(node => {
      node.angle += delta * node.speed;
      node.mesh.position.x = Math.cos(node.angle) * node.radius;
      node.mesh.position.y = Math.sin(node.angle) * node.radius;
      node.mesh.position.z = Math.sin(node.angle * 2) * 12; // Ligera oscilación en Z
    });

    // 3. Rotación sutil del campo estelar de fondo
    if (starFieldPoints) {
      starFieldPoints.rotation.y = elapsedTime * 0.015;
    }

    // 4. Pulso de respiración suave en el núcleo y coronas
    if (coreCoronaMesh) {
      const breath = 1.0 + Math.sin(elapsedTime * 2.2) * 0.08;
      coreCoronaMesh.scale.set(1.9 * breath, 1.9 * breath, 1.9 * breath);
    }

    // 5. Animación de ondas de choque activas
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const sw = shockwaves[i];
      sw.scale += delta * 14;
      sw.opacity -= delta * 1.8;
      sw.mesh.scale.set(sw.scale, sw.scale, sw.scale);
      sw.mesh.material.opacity = Math.max(0, sw.opacity);

      if (sw.opacity <= 0 || sw.scale >= sw.maxScale) {
        orbitSystemGroup.remove(sw.mesh);
        sw.mesh.geometry.dispose();
        sw.mesh.material.dispose();
        shockwaves.splice(i, 1);
      }
    }

    // 6. Ciclo ambiental sutil y elegante de colores cósmicos (cuando no hay hover activo)
    if (!window.activeHoverPlatform) {
      const cycleTime = elapsedTime * 0.16; // Ciclo suave
      const phase = (Math.sin(cycleTime) + 1) * 0.5; // 0 a 1
      const phase2 = (Math.cos(cycleTime * 0.8) + 1) * 0.5;

      // Morfismo sutil entre Lima (#ccff00), Cian (#00f0ff), Violeta (#a855f7) y Esmeralda (#10b981)
      currentColors.targetPrimary.setRGB(
        0.8 * (1 - phase) + 0.05 * phase,
        0.98 * (1 - phase) + 0.85 * phase,
        0.05 * (1 - phase) + 0.95 * phase
      );
      currentColors.targetSecondary.setRGB(
        0.55 * phase2 + 0.65 * (1 - phase2),
        0.88 * phase2 + 0.15 * (1 - phase2),
        0.95 * phase2 + 0.92 * (1 - phase2)
      );
    }

    // 7. Transición suave de colores (Lerp dinámico a 60 FPS)
    currentColors.primary.lerp(currentColors.targetPrimary, 0.04);
    currentColors.secondary.lerp(currentColors.targetSecondary, 0.04);

    if (outerRingMesh) outerRingMesh.material.color.copy(currentColors.primary);
    if (innerRingMesh) innerRingMesh.material.color.copy(currentColors.primary);
    if (coreCoronaMesh) coreCoronaMesh.material.color.copy(currentColors.secondary);
    if (pointLightPrimary) pointLightPrimary.color.copy(currentColors.primary);
    if (pointLightSecondary) pointLightSecondary.color.copy(currentColors.secondary);

    renderer.render(scene, camera);
  }

  // =========================================================================
  // 8. API GLOBAL EXPUESTA EN WINDOW.ORBITA3D
  // =========================================================================
  window.Orbita3D = {
    setThemeColors(primaryHex, secondaryHex) {
      if (primaryHex) currentColors.targetPrimary.set(primaryHex);
      if (secondaryHex) currentColors.targetSecondary.set(secondaryHex);
    },
    resetThemeColors() {
      currentColors.targetPrimary.set(0xccff00);
      currentColors.targetSecondary.set(0xa3e635);
    },
    triggerAbsorb(platformId, colorHex) {
      triggerAbsorbAnimation(platformId, colorHex);
    },
    triggerShockwave(colorHex) {
      triggerShockwave(colorHex);
    },
    toggleAudio() {
      return OrbitaAudio.toggleMute();
    },
    skipIntro() {
      skipIntro();
    }
  };

  // Compatibilidad con invocaciones antiguas
  window.OrbitaBlackHole = window.Orbita3D;

  // Iniciar al cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
