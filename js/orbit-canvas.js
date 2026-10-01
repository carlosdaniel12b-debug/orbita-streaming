/**
 * Órbita Streaming - Motor 3D Orbital Cinematográfico (Three.js WebGL a 60 FPS)
 * 
 * - Núcleo estelar gravitacional con corona volumétrica
 * - 4 Pistas orbitales concéntricas Keplerianas con partículas en traslación
 * - Satélites de plataformas de streaming con halos reactivos
 * - Respuesta al cursor (Parallax Lerp) y giroscopio móvil
 * - Ondas de choque gravitacionales (Gravitational Shockwaves)
 * - Transición de intro espacial hiper-optimizada
 * - Web Audio API procedural para sonido espacial sutil
 * - Pausa automática vía IntersectionObserver (Cero gasto de CPU/GPU fuera de vista)
 */

(function () {
  'use strict';

  const container = document.getElementById('hero-3d-canvas-container');
  if (!container) return;

  const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Variables Three.js
  let scene, camera, renderer, clock;
  let orbitSystemGroup, coreGroup;
  let coreMesh, coronaMesh, glowSprite;
  let orbitalRings = [];
  let satelliteMeshes = [];
  let starFieldPoints, shockwaves = [];
  let ambientLight, pointLightCore, pointLightAccent;

  // Estado de interactividad
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let isVisible = true;
  let isIntroPlaying = false;
  let animFrameId = null;

  // Colores Oficiales (Violeta Estelar, Magenta Cósmico y Ámbar Supernova)
  const currentColors = {
    primary: new THREE.Color(0x8b5cf6),    // Violeta principal
    secondary: new THREE.Color(0xd946ef),  // Magenta cósmico
    accent: new THREE.Color(0xf97316),     // Ámbar supernova
    core: new THREE.Color(0xffffff),       // Blanco estelar
    targetPrimary: new THREE.Color(0x8b5cf6),
    targetSecondary: new THREE.Color(0xd946ef)
  };

  const CAMERA_BASE_Z = isMobile ? 540 : 460;

  // =========================================================================
  // 1. SINTETIZADOR DE AUDIO AMBIENTAL PROCEDURAL (WEB AUDIO API)
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
      const svgMuted = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`;
      const svgPlaying = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d946ef" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
      if (headerIcon) headerIcon.innerHTML = this.isMuted ? svgMuted : svgPlaying;
    },

    startHum() {
      if (this.isMuted || !this.ctx || this.droneOsc) return;
      try {
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(55, this.ctx.currentTime); // 55 Hz (A1)

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(140, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.035, this.ctx.currentTime + 1.5);

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
          this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);
          setTimeout(() => {
            if (this.droneOsc) {
              this.droneOsc.stop();
              this.droneOsc.disconnect();
              this.droneOsc = null;
            }
          }, 650);
        } catch (e) {
          this.droneOsc = null;
        }
      }
    },

    playChime(freq = 520) {
      if (this.isMuted || !this.ctx) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.5);
      } catch (e) {}
    }
  };

  // =========================================================================
  // 2. CONFIGURACIÓN DEL MOTOR THREE.JS
  // =========================================================================
  function initScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06050b, 0.0016);

    camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 1, 1400);
    camera.position.z = CAMERA_BASE_Z;
    camera.position.y = 12;

    clock = new THREE.Clock();

    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance'
    });

    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    // Luces Cinematográficas
    ambientLight = new THREE.AmbientLight(0x2d1f4d, 0.9);
    scene.add(ambientLight);

    pointLightCore = new THREE.PointLight(0x8b5cf6, 2.5, 650);
    pointLightCore.position.set(0, 0, 30);
    scene.add(pointLightCore);

    pointLightAccent = new THREE.PointLight(0xd946ef, 1.8, 500);
    pointLightAccent.position.set(160, 90, 80);
    scene.add(pointLightAccent);

    orbitSystemGroup = new THREE.Group();
    scene.add(orbitSystemGroup);

    buildCosmicCore();
    buildOrbitalTracks();
    buildPlatformSatellites();
    buildStarField();

    initEvents();
    initIntersectionObserver();
  }

  // =========================================================================
  // 3. NÚCLEO ESTELAR GRAVITACIONAL
  // =========================================================================
  function buildCosmicCore() {
    coreGroup = new THREE.Group();
    orbitSystemGroup.add(coreGroup);

    // Esfera central brillante
    const coreGeo = new THREE.SphereGeometry(isMobile ? 22 : 28, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95
    });
    coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Corona externa luminosa
    const coronaGeo = new THREE.RingGeometry(isMobile ? 26 : 34, isMobile ? 42 : 56, 48);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    coreGroup.add(coronaMesh);

    // Segunda corona con tonalidad magenta
    const corona2Geo = new THREE.RingGeometry(isMobile ? 38 : 52, isMobile ? 54 : 76, 48);
    const corona2Mat = new THREE.MeshBasicMaterial({
      color: 0xd946ef,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    const corona2Mesh = new THREE.Mesh(corona2Geo, corona2Mat);
    coreGroup.add(corona2Mesh);
  }

  // =========================================================================
  // 4. ANILLOS ORBITALES CONCÉNTRICOS KEPLERIANOS
  // =========================================================================
  function buildOrbitalTracks() {
    const trackRadii = isMobile 
      ? [80, 130, 180, 230] 
      : [110, 175, 245, 315];

    orbitalRings = [];

    trackRadii.forEach((radius, idx) => {
      // Línea de la órbita
      const segments = 120;
      const curvePoints = [];
      const tiltX = (idx * 0.08) - 0.12;
      const tiltY = (idx * 0.1) - 0.15;

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        curvePoints.push(new THREE.Vector3(
          Math.cos(theta) * radius,
          Math.sin(theta) * (radius * 0.72),
          Math.sin(theta) * 20
        ));
      }

      const ringGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const ringMat = new THREE.LineBasicMaterial({
        color: idx % 2 === 0 ? 0x8b5cf6 : 0xd946ef,
        transparent: true,
        opacity: 0.35 - (idx * 0.05),
        blending: THREE.AdditiveBlending
      });
      const ringLine = new THREE.Line(ringGeo, ringMat);
      ringLine.rotation.x = 1.05 + tiltX;
      ringLine.rotation.y = tiltY;
      ringLine.userData = { radius, speed: (0.18 / (idx + 1)), baseRot: ringLine.rotation.clone() };

      orbitSystemGroup.add(ringLine);
      orbitalRings.push(ringLine);

      // Partículas a lo largo de cada órbita
      const particleCount = isMobile ? 12 : 24;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(particleCount * 3);

      for (let p = 0; p < particleCount; p++) {
        const pTheta = (p / particleCount) * Math.PI * 2;
        pPos[p * 3] = Math.cos(pTheta) * radius;
        pPos[p * 3 + 1] = Math.sin(pTheta) * (radius * 0.72);
        pPos[p * 3 + 2] = Math.sin(pTheta) * 20;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

      const pMat = new THREE.PointsMaterial({
        color: idx === 0 ? 0xf97316 : (idx === 1 ? 0xd946ef : 0x8b5cf6),
        size: isMobile ? 2.5 : 3.5,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
      });

      const pPoints = new THREE.Points(pGeo, pMat);
      pPoints.rotation.copy(ringLine.rotation);
      orbitSystemGroup.add(pPoints);
    });
  }

  // =========================================================================
  // 5. SATÉLITES DE PLATAFORMAS EN TRASLACIÓN
  // =========================================================================
  function buildPlatformSatellites() {
    satelliteMeshes = [];

    const platformsData = [
      { id: 'netflix', color: 0xe50914, ringIdx: 0, speed: 0.8, size: 7.5 },
      { id: 'disneyplus', color: 0x1d4ed8, ringIdx: 1, speed: 0.55, size: 7.0 },
      { id: 'hbomax', color: 0x7c3aed, ringIdx: 1, speed: -0.45, size: 7.0 },
      { id: 'primevideo', color: 0x0284c7, ringIdx: 2, speed: 0.38, size: 6.5 },
      { id: 'appletv', color: 0xf8fafc, ringIdx: 2, speed: -0.32, size: 6.0 },
      { id: 'crunchyroll', color: 0xf47521, ringIdx: 3, speed: 0.28, size: 6.5 },
      { id: 'paramount', color: 0x2563eb, ringIdx: 3, speed: -0.25, size: 6.0 },
      { id: 'spotify', color: 0x10b981, ringIdx: 0, speed: -0.7, size: 6.0 }
    ];

    platformsData.forEach((item, idx) => {
      const ring = orbitalRings[item.ringIdx];
      const radius = ring ? ring.userData.radius : 140;

      const satGroup = new THREE.Group();

      // Esfera satélite
      const satGeo = new THREE.SphereGeometry(item.size, 16, 16);
      const satMat = new THREE.MeshBasicMaterial({
        color: item.color,
        transparent: true,
        opacity: 0.95
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satGroup.add(satMesh);

      // Halo del satélite
      const haloGeo = new THREE.RingGeometry(item.size * 1.1, item.size * 2.2, 24);
      const haloMat = new THREE.MeshBasicMaterial({
        color: item.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      satGroup.add(haloMesh);

      satGroup.userData = {
        radius: radius,
        speed: item.speed * 0.8,
        angle: (idx / platformsData.length) * Math.PI * 2,
        ringIdx: item.ringIdx,
        baseColor: item.color
      };

      orbitSystemGroup.add(satGroup);
      satelliteMeshes.push(satGroup);
    });
  }

  // =========================================================================
  // 6. CAMPO ESTELAR TRIDIMENSIONAL
  // =========================================================================
  function buildStarField() {
    const starCount = isMobile ? 180 : 420;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    const palette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0x8b5cf6),
      new THREE.Color(0xd946ef),
      new THREE.Color(0xf97316)
    ];

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 850;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 650;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 1.6 : 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    starFieldPoints = new THREE.Points(geometry, material);
    scene.add(starFieldPoints);
  }

  // =========================================================================
  // 7. ONDAS DE CHOQUE GRAVITACIONALES
  // =========================================================================
  function triggerShockwave(hexColor = '#8b5cf6') {
    const color = new THREE.Color(hexColor);
    const waveGeo = new THREE.RingGeometry(10, 16, 48);
    const waveMat = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    waveMesh.rotation.x = Math.PI / 2;
    waveMesh.userData = { radius: 16, maxRadius: isMobile ? 220 : 340, life: 1 };

    scene.add(waveMesh);
    shockwaves.push(waveMesh);

    OrbitaAudio.playChime(640);
  }

  // =========================================================================
  // 8. ANIMACIÓN Y BUCLE PRINCIPAL (60 FPS)
  // =========================================================================
  function animate() {
    animFrameId = requestAnimationFrame(animate);

    if (!isVisible) return;

    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // Lerp suave del ratón
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Movimiento sutil de cámara por parallax
    camera.position.x = mouseX * 45;
    camera.position.y = 12 + (-mouseY * 30);
    camera.lookAt(0, 0, 0);

    // Pulsación del núcleo estelar
    if (coreMesh && coronaMesh) {
      const pulse = 1 + Math.sin(time * 2.4) * 0.05;
      coreMesh.scale.set(pulse, pulse, pulse);
      coronaMesh.rotation.z = time * 0.15;
    }

    // Rotación del sistema orbital general
    if (orbitSystemGroup) {
      orbitSystemGroup.rotation.y = time * 0.04;
      orbitSystemGroup.rotation.x = Math.sin(time * 0.2) * 0.04;
    }

    // Actualización de satélites en sus órbitas
    satelliteMeshes.forEach(sat => {
      sat.userData.angle += sat.userData.speed * delta;
      const theta = sat.userData.angle;
      const r = sat.userData.radius;

      sat.position.x = Math.cos(theta) * r;
      sat.position.y = Math.sin(theta) * (r * 0.72);
      sat.position.z = Math.sin(theta) * 20;

      // Orientar hacia la cámara
      sat.quaternion.copy(camera.quaternion);
    });

    // Ondas de choque
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const sw = shockwaves[i];
      sw.userData.radius += delta * 240;
      sw.userData.life -= delta * 1.5;

      const scale = sw.userData.radius / 16;
      sw.scale.set(scale, scale, 1);
      sw.material.opacity = Math.max(0, sw.userData.life * 0.8);

      if (sw.userData.life <= 0 || sw.userData.radius >= sw.userData.maxRadius) {
        scene.remove(sw);
        sw.geometry.dispose();
        sw.material.dispose();
        shockwaves.splice(i, 1);
      }
    }

    // Rotación suave del campo estelar
    if (starFieldPoints) {
      starFieldPoints.rotation.y = time * 0.012;
    }

    renderer.render(scene, camera);
  }

  // =========================================================================
  // 9. EVENTOS Y REDIMENSIONAMIENTO
  // =========================================================================
  function initEvents() {
    window.addEventListener('resize', onWindowResize, { passive: true });

    window.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });

    if (window.DeviceOrientationEvent && isMobile) {
      window.addEventListener('deviceorientation', (e) => {
        if (e.gamma !== null && e.beta !== null) {
          targetMouseX = Math.max(-1, Math.min(1, e.gamma / 25));
          targetMouseY = Math.max(-1, Math.min(1, (e.beta - 45) / 25));
        }
      }, { passive: true });
    }
  }

  function onWindowResize() {
    if (!container || !renderer || !camera) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.position.z = window.innerWidth < 768 ? 540 : 460;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  function initIntersectionObserver() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
        });
      }, { threshold: 0.05 });
      observer.observe(container);
    }
  }

  // =========================================================================
  // 10. API PÚBLICA PARA INTEGRACIÓN GLOBAL
  // =========================================================================
  window.Orbita3D = {
    triggerShockwave,
    toggleAudio: () => OrbitaAudio.toggleMute(),
    pause: () => { isVisible = false; },
    resume: () => { isVisible = true; },
    setThemeColors: (primaryHex, secondaryHex) => {
      if (pointLightCore) pointLightCore.color.set(primaryHex);
      if (pointLightAccent) pointLightAccent.color.set(secondaryHex);
    },
    resetThemeColors: () => {
      if (pointLightCore) pointLightCore.color.set(0x8b5cf6);
      if (pointLightAccent) pointLightAccent.color.set(0xd946ef);
    }
  };

  // Inicializar Three.js tras carga de página
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScene();
      animate();
    });
  } else {
    initScene();
    animate();
  }

})();
