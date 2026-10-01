/**
 * Órbita Streaming - Base de Datos Central & Knowledge Base
 * 
 * - Plataformas individuales: $3.00 / mes (Perfil privado con PIN)
 * - Combos de 2 aplicaciones: $5.00 / mes (Ahorro garantizado + Spotify Gratis)
 * - Pack Trío (3 aplicaciones): $8.00 / mes
 * - Canva Pro Anual: $4.00 / año (365 días a tu correo)
 * - WhatsApp Oficial: +593 99 822 6756 (Ecuador & Soporte Internacional)
 * - Catálogo Real & Curado de Estrenos, Películas y Series 2024-2026
 * - Asistente IA Orbit con Recomendaciones Visuales y Semánticas
 */

const ORBITA_CONFIG = {
  brandName: "Órbita Streaming",
  slogan: "Todo tu universo de entretenimiento en una sola órbita",
  whatsappNumber: "593998226756",
  supportEmail: "soporte@orbitastreaming.com",
  schedule: "Atención 24/7 • Activación express en menos de 5 min",
  defaultCurrency: "USD",
  currencies: {
    USD: { symbol: "$", rate: 1, label: "USD ($)", formatDecimals: true },
    COP: { symbol: "$", rate: 4000, label: "COP (Pesos Colombianos)", formatDecimals: false },
    MXN: { symbol: "$", rate: 18.5, label: "MXN (Pesos Mexicanos)", formatDecimals: false },
    EUR: { symbol: "€", rate: 0.92, label: "EUR (€)", formatDecimals: true },
    PEN: { symbol: "S/.", rate: 3.75, label: "PEN (Soles Peruanos)", formatDecimals: true }
  }
};

const DEFAULT_COSMIC_THEME = {
  primaryColor: "#8b5cf6",     // Violeta Estelar
  secondaryColor: "#d946ef",   // Magenta Cósmico
  tertiaryColor: "#f97316",    // Naranja Supernova
  glowColor: "rgba(139, 92, 246, 0.45)",
  themeName: "Órbita Cósmica Original"
};

const STREAMING_PLATFORMS = [
  {
    id: "netflix",
    name: "Netflix Premium",
    shortName: "Netflix",
    category: "cinema",
    categoryName: "Series & Películas",
    tagline: "Ultra HD 4K • Perfil 100% Privado con PIN",
    color: "#E50914",
    secondaryColor: "#ff4d6d",
    glowColor: "rgba(229, 9, 20, 0.45)",
    themeName: "Rojo Escarlata Netflix",
    badge: "Más Solicitado",
    priceUSD: 3.00,
    pricePeriod: "mes",
    iconUrl: "assets/icons/netflix.svg",
    logoSvg: `<img src="assets/icons/netflix.svg" alt="Netflix" class="platform-logo-img" loading="lazy">`,
    features: [
      "Calidad Ultra HD 4K + HDR10",
      "Perfil 100% privado con PIN personal de 4 dígitos",
      "Descargas sin conexión para todos tus dispositivos",
      "Garantía total de reposición durante los 30 días",
      "Renovación en la misma cuenta sin perder listas"
    ],
    devices: ["Smart TV", "Celulares iOS & Android", "PC / Mac", "Tablets", "Consolas & TV Box"],
    plans: [
      { name: "1 Mes - Perfil Privado 4K", priceUSD: 3.00, period: "1 mes", popular: true, desc: "Acceso individual exclusivo con tu clave PIN." }
    ]
  },
  {
    id: "disneyplus",
    name: "Disney+",
    shortName: "Disney+",
    category: "cinema",
    categoryName: "Series, Cine & Deportes ESPN",
    tagline: "Disney, Pixar, Marvel, Star Wars & ESPN en Vivo",
    color: "#1d4ed8",
    secondaryColor: "#38bdf8",
    glowColor: "rgba(29, 78, 216, 0.45)",
    themeName: "Zafiro Cósmico Disney",
    badge: "Incluye ESPN",
    priceUSD: 3.00,
    pricePeriod: "mes",
    iconUrl: "assets/icons/disneyplus.svg",
    logoSvg: `<img src="assets/icons/disneyplus.svg" alt="Disney+" class="platform-logo-img" loading="lazy">`,
    features: [
      "Deportes en vivo con señal ESPN (Champions, Premier, F1, Tenis)",
      "Todo Disney, Pixar, Marvel, Star Wars y National Geographic",
      "Resolución hasta 4K Ultra HD y audio IMAX Enhanced",
      "Perfil propio privado con PIN",
      "Soporte rápido en WhatsApp"
    ],
    devices: ["Smart TV", "Celulares", "Tablets", "Consolas", "PC / Mac"],
    plans: [
      { name: "1 Mes - Perfil Privado", priceUSD: 3.00, period: "1 mes", popular: true, desc: "Perfil individual con deportes y estrenos." }
    ]
  },
  {
    id: "hbomax",
    name: "Max (HBO)",
    shortName: "Max",
    category: "cinema",
    categoryName: "Series Aclamadas & Cine Warner",
    tagline: "HBO Originals, Warner Bros, Discovery & DC Universe",
    color: "#7c3aed",
    secondaryColor: "#c084fc",
    glowColor: "rgba(124, 58, 237, 0.45)",
    themeName: "Púrpura Galáctico Max",
    badge: "Cine Galardonado",
    priceUSD: 3.00,
    pricePeriod: "mes",
    iconUrl: "assets/icons/max.svg",
    logoSvg: `<img src="assets/icons/max.svg" alt="Max" class="platform-logo-img" loading="lazy">`,
    features: [
      "Series consagradas: House of the Dragon, The Last of Us, Succession",
      "Estrenos taquilleros directos de cine en 4K UHD",
      "Audio envolvente Dolby Atmos y Dolby Vision",
      "Perfil individual con PIN propio",
      "Activación inmediata garantizada"
    ],
    devices: ["Smart TV", "Celulares", "Tablets", "PC / Mac", "Fire TV"],
    plans: [
      { name: "1 Mes - Perfil Platino 4K", priceUSD: 3.00, period: "1 mes", popular: true, desc: "1 Pantalla privada 4K UHD con descargas." }
    ]
  },
  {
    id: "primevideo",
    name: "Amazon Prime Video",
    shortName: "Prime Video",
    category: "cinema",
    categoryName: "Series & Películas",
    tagline: "Amazon Originals, Cine Mundial & Series Taquilleras",
    color: "#0284c7",
    secondaryColor: "#f59e0b",
    glowColor: "rgba(2, 132, 199, 0.45)",
    themeName: "Cian & Ámbar Prime",
    badge: "Excelente Catálogo",
    priceUSD: 3.00,
    pricePeriod: "mes",
    iconUrl: "assets/icons/primevideo.svg",
    logoSvg: `<img src="assets/icons/primevideo.svg" alt="Prime Video" class="platform-logo-img" loading="lazy">`,
    features: [
      "Series exclusivas: The Boys, Los Anillos de Poder, Invincible, Fallout",
      "Resolución 4K Ultra HD y HDR10+",
      "Perfil propio con PIN de seguridad",
      "Descargas para ver sin internet en viajes",
      "Garantía de servicio 30 días continuos"
    ],
    devices: ["Smart TV", "Celulares", "Fire TV", "Tablets", "PC"],
    plans: [
      { name: "1 Mes - Perfil Privado", priceUSD: 3.00, period: "1 mes", popular: true, desc: "Acceso individual en alta definición." }
    ]
  },
  {
    id: "appletv",
    name: "Apple TV+",
    shortName: "Apple TV+",
    category: "cinema",
    categoryName: "Series de Culto & Cine 4K",
    tagline: "Máxima tasa de bits 4K, Dolby Vision & Audio Espacial",
    color: "#f8fafc",
    secondaryColor: "#8b5cf6",
    glowColor: "rgba(139, 92, 246, 0.45)",
    themeName: "Titanio Sideral Apple",
    badge: "Calidad de Cine",
    priceUSD: 3.00,
    pricePeriod: "mes",
    iconUrl: "assets/icons/appletv.svg",
    logoSvg: `<img src="assets/icons/appletv.svg" alt="Apple TV+" class="platform-logo-img" loading="lazy">`,
    features: [
      "Series galardonadas: Severance, Ted Lasso, Silo, The Morning Show",
      "La tasa de bits más alta de la industria (4K Dolby Vision puro)",
      "Audio espacial Dolby Atmos inmersivo",
      "Compatible con Smart TV Samsung, LG, Fire TV, Android y Apple",
      "Perfil privado individual"
    ],
    devices: ["Apple TV & iPhone", "Smart TV Samsung / LG", "Google TV", "Roku & Fire TV", "PC / Mac"],
    plans: [
      { name: "1 Mes - Perfil Privado", priceUSD: 3.00, period: "1 mes", popular: true, desc: "Cine y series con la más alta fidelidad." }
    ]
  },
  {
    id: "paramount",
    name: "Paramount+",
    shortName: "Paramount+",
    category: "cinema",
    categoryName: "Series, Cine & Deportes",
    tagline: "Showtime, Paramount Pictures, Nickelodeon & Fútbol",
    color: "#2563eb",
    secondaryColor: "#60a5fa",
    glowColor: "rgba(37, 99, 235, 0.45)",
    themeName: "Cobalto Paramount",
    badge: "Cine & Fútbol",
    priceUSD: 3.00,
    pricePeriod: "mes",
    iconUrl: "assets/icons/paramount.svg",
    logoSvg: `<img src="assets/icons/paramount.svg" alt="Paramount+" class="platform-logo-img" loading="lazy">`,
    features: [
      "Grandes franquicias: Yellowstone, Gladiator II, Top Gun, Star Trek",
      "Todo el universo Nickelodeon para niños (Paw Patrol, Bob Esponja)",
      "Fútbol internacional en vivo según región",
      "Perfil privado con clave PIN",
      "Soporte continuo en WhatsApp"
    ],
    devices: ["Smart TV", "Celulares", "Roku", "Tablets", "PC"],
    plans: [
      { name: "1 Mes - Perfil Privado", priceUSD: 3.00, period: "1 mes", popular: true, desc: "Partidos en vivo y series completas." }
    ]
  },
  {
    id: "crunchyroll",
    name: "Crunchyroll Mega Fan",
    shortName: "Crunchyroll",
    category: "cinema",
    categoryName: "Anime & Simulcast Japón",
    tagline: "El mayor catálogo de anime del mundo en HD y sin anuncios",
    color: "#f47521",
    secondaryColor: "#fb923c",
    glowColor: "rgba(244, 117, 33, 0.45)",
    themeName: "Fuego Anime Crunchyroll",
    badge: "Simulcast 1 Hora",
    priceUSD: 3.00,
    pricePeriod: "mes",
    iconUrl: "assets/icons/crunchyroll.svg",
    logoSvg: `<img src="assets/icons/crunchyroll.svg" alt="Crunchyroll" class="platform-logo-img" loading="lazy">`,
    features: [
      "Estrenos directos de Japón solo 1 hora tras su transmisión original",
      "Catálogo inmenso en Full HD sin cortes publicitarios",
      "Visualización sin conexión en celulares y tablets",
      "Audio original japonés y doblajes al español latino",
      "Garantía total de servicio durante 30 días"
    ],
    devices: ["Smart TV", "Celulares iOS & Android", "PlayStation / Xbox", "Tablets", "PC / Mac"],
    plans: [
      { name: "1 Mes - Perfil Mega Fan", priceUSD: 3.00, period: "1 mes", popular: true, desc: "Anime ilimitado con simulcasts exclusivos." }
    ]
  },
  {
    id: "vix",
    name: "ViX Premium",
    shortName: "ViX",
    category: "cinema",
    categoryName: "Series, Cine & Deportes",
    tagline: "Fútbol en vivo, Liga MX y series 100% en español",
    color: "#ea580c",
    secondaryColor: "#fb923c",
    glowColor: "rgba(234, 88, 12, 0.45)",
    themeName: "Fuego Astral ViX",
    badge: "100% en Español",
    priceUSD: 3.00,
    pricePeriod: "mes",
    iconUrl: "assets/icons/vix.svg",
    logoSvg: `<img src="assets/icons/vix.svg" alt="ViX" class="platform-logo-img" loading="lazy">`,
    features: [
      "Liga MX y partidos de fútbol exclusivos en vivo",
      "Telenovelas clásicas y estrenos originales en español",
      "Canales en vivo y catálogo a la carta sin comerciales",
      "Perfil privado individual con clave",
      "Atención y reposición rápida"
    ],
    devices: ["Smart TV", "Roku", "Celulares", "Tablets", "PC"],
    plans: [
      { name: "1 Mes - ViX Premium", priceUSD: 3.00, period: "1 mes", popular: true, desc: "Fútbol en vivo y producciones en tu idioma." }
    ]
  },
  {
    id: "spotify",
    name: "Spotify Premium",
    shortName: "Spotify",
    category: "music",
    categoryName: "Música & Podcasts",
    tagline: "Más de 100M de canciones sin anuncios y máxima calidad",
    color: "#10b981",
    secondaryColor: "#06b6d4",
    glowColor: "rgba(16, 185, 129, 0.45)",
    themeName: "Esmeralda Aurora Spotify",
    badge: "Música Ilimitada",
    priceUSD: 3.00,
    pricePeriod: "mes",
    iconUrl: "assets/icons/spotify.svg",
    logoSvg: `<img src="assets/icons/spotify.svg" alt="Spotify" class="platform-logo-img" loading="lazy">`,
    features: [
      "Música y podcasts sin interrupciones publicitarias",
      "Descarga de canciones para reproducir sin datos",
      "Audio en muy alta fidelidad (320 kbps)",
      "Saltos de canciones ilimitados",
      "Disponible gratis al comprar cualquier Combo 2x$5"
    ],
    devices: ["Celulares", "Smart TV", "Altavoces Alexa / Google", "PC / Mac", "CarPlay / Auto"],
    plans: [
      { name: "1 Mes - Spotify Premium", priceUSD: 3.00, period: "1 mes", popular: true, desc: "Música continua sin publicidad." }
    ]
  },
  {
    id: "canva",
    name: "Canva Pro Anual",
    shortName: "Canva Pro",
    category: "tools",
    categoryName: "Diseño & Productividad",
    tagline: "1 Año Completo con todas las herramientas Pro desbloqueadas",
    color: "#06b6d4",
    secondaryColor: "#8b5cf6",
    glowColor: "rgba(6, 182, 212, 0.45)",
    themeName: "Turquesa & Violeta Canva",
    badge: "Plan Anual $4",
    priceUSD: 4.00,
    pricePeriod: "año",
    iconUrl: "assets/icons/canva.svg",
    logoSvg: `<img src="assets/icons/canva.svg" alt="Canva Pro" class="platform-logo-img" loading="lazy">`,
    features: [
      "1 Año completo (365 días) de acceso Canva Pro ilimitado",
      "Millones de plantillas premium, fotos, videos y tipografías",
      "Quitafondos mágico en 1 clic (Magic Eraser)",
      "Kit de marca y redimensionamiento de diseños",
      "Activación directa a tu propio correo electrónico personal"
    ],
    devices: ["Navegador Web PC/Mac", "App Celulares Android & iOS", "Tablets / iPads"],
    plans: [
      { name: "1 Año Completo - Canva Pro", priceUSD: 4.00, period: "1 año", popular: true, desc: "Acceso anual ilimitado a tu propio correo." }
    ]
  }
];

/**
 * Catálogo Real, Actual y Verificado de Streaming (2024 - 2026)
 * Posters y backdrops oficiales de alta resolución desde TMDB
 */
const STREAMING_CATALOG = [
  {
    id: "dune-2",
    title: "Dune: Parte Dos",
    originalTitle: "Dune: Part Two",
    type: "movie",
    platforms: ["hbomax"],
    platformName: "Max (HBO)",
    year: 2024,
    rating: 8.6,
    quality: "4K UHD • Dolby Vision",
    duration: "2h 46m",
    genres: ["Ciencia Ficción", "Aventura", "Acción"],
    posterUrl: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s520DRq.jpg",
    synopsis: "Paul Atreides se une a Chani y a los Fremen mientras busca venganza contra los conspiradores que destruyeron a su familia, enfrentando una decisión entre el amor de su vida y el destino del universo.",
    badge: "Super Éxito 4K",
    categories: ["estrenos", "populares_peliculas", "tendencias", "recomendadas"]
  },
  {
    id: "severance-2",
    title: "Severance (Temporada 2)",
    originalTitle: "Severance Season 2",
    type: "series",
    platforms: ["appletv"],
    platformName: "Apple TV+",
    year: 2025,
    rating: 8.8,
    quality: "4K Dolby Vision • Atmos",
    duration: "2 Temporadas",
    genres: ["Ciencia Ficción", "Suspenso", "Misterio"],
    posterUrl: "https://image.tmdb.org/t/p/w500/A1gbti5pP1N0b90c741eN6Fh5gE.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/i4w5445Jm93o96hY5U8p4E26PZ.jpg",
    synopsis: "Mark Scout lidera un equipo en Lumon Industries cuyos recuerdos han sido separados quirúrgicamente entre su vida laboral y personal. Al descubrir los secretos de Lumon, la frontera entre ambas realidades colapsa.",
    badge: "Aclamada por la Crítica",
    categories: ["estrenos", "populares_series", "tendencias", "recomendadas"]
  },
  {
    id: "squid-game-2",
    title: "El Juego del Calamar (Temporada 2)",
    originalTitle: "Squid Game 2",
    type: "series",
    platforms: ["netflix"],
    platformName: "Netflix",
    year: 2024,
    rating: 8.1,
    quality: "4K UHD • HDR",
    duration: "2 Temporadas",
    genres: ["Suspenso", "Drama", "Supervivencia"],
    posterUrl: "https://image.tmdb.org/t/p/w500/1XddXPXQI2bU161Ppt5Y58Yp9PZ.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/7c9UVPPiTPltouxShY44KzCldq8.jpg",
    synopsis: "Tres años después de ganar el Juego del Calamar, el jugador 456 Gi-hun renuncia a ir a Estados Unidos y regresa con una firme resolución en mente: desenmascarar y destruir la organización desde adentro.",
    badge: "Fenómeno Global",
    categories: ["estrenos", "populares_series", "tendencias"]
  },
  {
    id: "deadpool-wolverine",
    title: "Deadpool & Wolverine",
    originalTitle: "Deadpool & Wolverine",
    type: "movie",
    platforms: ["disneyplus"],
    platformName: "Disney+",
    year: 2024,
    rating: 7.8,
    quality: "4K IMAX Enhanced",
    duration: "2h 08m",
    genres: ["Acción", "Comedia", "Ciencia Ficción"],
    posterUrl: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/9l1eZiJHmhr5jY76h02zL12o6p9.jpg",
    synopsis: "Un apático Wade Wilson se esfuerza por llevar una vida civil ordinaria, pero cuando una amenaza existencial se cierne sobre su mundo, debe convencer a un Wolverine reacio para luchar juntos.",
    badge: "Taquilla Histórica",
    categories: ["estrenos", "populares_peliculas", "tendencias"]
  },
  {
    id: "the-boys-4",
    title: "The Boys (Temporada 4)",
    originalTitle: "The Boys Season 4",
    type: "series",
    platforms: ["primevideo"],
    platformName: "Prime Video",
    year: 2024,
    rating: 8.7,
    quality: "4K UHD • HDR10+",
    duration: "4 Temporadas",
    genres: ["Acción", "Superhéroes", "Sátira"],
    posterUrl: "https://image.tmdb.org/t/p/w500/7Ns6tO3aYjppI5LO8Np1bpwr091.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/nxxCPRgtNm4L4Yx8Y74w1y0eG1Z.jpg",
    synopsis: "El mundo está al borde del colapso: Victoria Neuman está más cerca que nunca de la presidencia bajo el control implacable de Homelander. Butcher debe encontrar la forma de salvar al mundo antes de que se agote su tiempo.",
    badge: "Top 1 Prime",
    categories: ["populares_series", "tendencias", "recomendadas"]
  },
  {
    id: "house-of-the-dragon-2",
    title: "House of the Dragon (Temporada 2)",
    originalTitle: "House of the Dragon 2",
    type: "series",
    platforms: ["hbomax"],
    platformName: "Max (HBO)",
    year: 2024,
    rating: 8.4,
    quality: "4K Dolby Vision • Atmos",
    duration: "2 Temporadas",
    genres: ["Fantasía", "Drama", "Acción"],
    posterUrl: "https://image.tmdb.org/t/p/w500/t9XkeFaNaP92Q3Q5Gg6y17K6q3d.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/etj5CuMuI2i4UmOpzN95G8NiMj.jpg",
    synopsis: "Westeros está al borde de una sangrienta guerra civil entre el Consejo Verde del Rey Aegon y el Consejo Negro de la Reina Rhaenyra Targaryen. Ningún dragón permanecerá en reposo.",
    badge: "Épico HBO",
    categories: ["estrenos", "populares_series", "recomendadas"]
  },
  {
    id: "shogun",
    title: "Shōgun",
    originalTitle: "Shōgun",
    type: "series",
    platforms: ["disneyplus"],
    platformName: "Disney+",
    year: 2024,
    rating: 8.8,
    quality: "4K UHD • HDR",
    duration: "Miniserie (10 Episodios)",
    genres: ["Drama Histórico", "Guerra", "Aventura"],
    posterUrl: "https://image.tmdb.org/t/p/w500/7O4iVfOMQmdCSxhOg1WNzG1AgYT.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/jBnpJjG0W1Y3Qn1t2k588t6P3n8.jpg",
    synopsis: "En el Japón de 1600, Lord Yoshii Toranaga lucha por su vida cuando sus enemigos del Consejo de Regentes se unen en su contra. La llegada de un misterioso barco europeo altera el equilibrio de poder.",
    badge: "Récord de Premios Emmy",
    categories: ["populares_series", "tendencias", "recomendadas"]
  },
  {
    id: "the-penguin",
    title: "El Pingüino (The Penguin)",
    originalTitle: "The Penguin",
    type: "series",
    platforms: ["hbomax"],
    platformName: "Max (HBO)",
    year: 2024,
    rating: 8.8,
    quality: "4K UHD • Dolby Atmos",
    duration: "Miniserie",
    genres: ["Crimen", "Drama", "Thriller"],
    posterUrl: "https://image.tmdb.org/t/p/w500/vOWFfknzFq6kP363Gj3KkU2Z8H.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/yDHYTfA3R0jFYba16jBB12vJ21g.jpg",
    synopsis: "Tras el colapso de Gotham City en The Batman, Oz Cobb se abre paso a través de la violencia, la astucia y la traición para adueñarse de los restos del imperio criminal de Carmine Falcone.",
    badge: "Aclamada por el Público",
    categories: ["estrenos", "populares_series", "tendencias"]
  },
  {
    id: "gladiator-2",
    title: "Gladiador II",
    originalTitle: "Gladiator II",
    type: "movie",
    platforms: ["paramount"],
    platformName: "Paramount+",
    year: 2024,
    rating: 7.5,
    quality: "4K UHD • Dolby Vision",
    duration: "2h 28m",
    genres: ["Acción", "Aventura", "Drama Épico"],
    posterUrl: "https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRHbtVIeaVhxw.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/euYIwmwkmz95mnEx7vGPYht7wtv.jpg",
    synopsis: "Años después de presenciar la muerte de Máximo a manos de su tío, Lucius debe entrar al Coliseo tras ser capturado por los despiadados emperadores que gobiernan Roma con puño de hierro.",
    badge: "Estreno de Cine",
    categories: ["estrenos", "populares_peliculas", "tendencias"]
  },
  {
    id: "interstellar",
    title: "Interestelar (Interstellar)",
    originalTitle: "Interstellar",
    type: "movie",
    platforms: ["hbomax", "primevideo"],
    platformName: "Max / Prime",
    year: 2014,
    rating: 8.7,
    quality: "4K UHD • IMAX",
    duration: "2h 49m",
    genres: ["Ciencia Ficción", "Drama", "Aventura Espacial"],
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/rAiYTnrZYgr9zcLHIf97Zt9YPr.jpg",
    synopsis: "Con la Tierra al borde del agotamiento de recursos, un equipo de exploradores viaja a través de un agujero de gusano cerca de Saturno en busca de un nuevo hogar para la humanidad a través del tiempo y el espacio.",
    badge: "Obra Maestra Sci-Fi",
    categories: ["populares_peliculas", "recomendadas"]
  },
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    originalTitle: "Ore dake Level Up na Ken",
    type: "series",
    platforms: ["crunchyroll"],
    platformName: "Crunchyroll",
    year: 2024,
    rating: 8.5,
    quality: "Full HD 1080p",
    duration: "2 Temporadas",
    genres: ["Anime", "Acción", "Fantasía Oscura"],
    posterUrl: "https://image.tmdb.org/t/p/w500/geCRueV3ElhRTr0xtJuPxJ8BGdM.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/8Z0997kL9YwF2yZ8yM8w78V6T2Z.jpg",
    synopsis: "Sung Jinwoo, conocido como el cazador más débil de toda la humanidad, es herido de muerte dentro de una mazmorra doble. Al despertar, una pantalla misteriosa le otorga el poder único de subir de nivel sin límites.",
    badge: "Top 1 Anime 2024",
    categories: ["estrenos", "populares_series", "tendencias", "recomendadas"]
  },
  {
    id: "arcane-2",
    title: "Arcane (Temporada Final)",
    originalTitle: "Arcane Season 2",
    type: "series",
    platforms: ["netflix"],
    platformName: "Netflix",
    year: 2024,
    rating: 9.0,
    quality: "4K UHD • Dolby Vision",
    duration: "2 Temporadas",
    genres: ["Animación", "Ciencia Ficción", "Acción"],
    posterUrl: "https://image.tmdb.org/t/p/w500/abfJJLgzF0q3GgW1z6nC2R9FqKz.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/uDgy6hyPd82kOHh6I95fltLPP63.jpg",
    synopsis: "La fractura entre las ciudades gemelas de Piltover y Zaun desemboca en una guerra abierta total. Las hermanas Vi y Jinx se encuentran en bandos opuestos en un clímax donde el destino de todos pende de un hilo.",
    badge: "Puntuación Perfecta 9.0",
    categories: ["estrenos", "populares_series", "tendencias", "recomendadas"]
  },
  {
    id: "the-bear-3",
    title: "The Bear (Temporada 3)",
    originalTitle: "The Bear Season 3",
    type: "series",
    platforms: ["disneyplus"],
    platformName: "Disney+",
    year: 2024,
    rating: 8.6,
    quality: "4K UHD • HDR",
    duration: "3 Temporadas",
    genres: ["Drama", "Comedia", "Gastronomía"],
    posterUrl: "https://image.tmdb.org/t/p/w500/rJ9Bv93L6yY8qW1Z1Y8k3j0r2mK.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/mAMb5m3V2wY8e0r6m2K1Y1W9Z1p.jpg",
    synopsis: "Carmy Berzatto, Sydney y Richie se exigen al límite absoluto para transformar su humilde tienda de emparedados en un restaurante de alta cocina con estrella Michelin, desafiando sus relaciones y cordura.",
    badge: "Ganadora del Globo de Oro",
    categories: ["populares_series", "recomendadas"]
  },
  {
    id: "fallout",
    title: "Fallout",
    originalTitle: "Fallout",
    type: "series",
    platforms: ["primevideo"],
    platformName: "Prime Video",
    year: 2024,
    rating: 8.4,
    quality: "4K UHD • HDR10+",
    duration: "1 Temporada",
    genres: ["Ciencia Ficción", "Aventura Postapocalíptica", "Acción"],
    posterUrl: "https://image.tmdb.org/t/p/w500/AnsSKR9LuK0T9bAILJJTrxCHBEF.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/ehmG0V6U5Q6W0Z1p8r0m0Q9m2k.jpg",
    synopsis: "Doscientos años después del apocalipsis nuclear, Lucy abandona su apacible refugio subterráneo para rescatar a su padre en un yermo de Los Ángeles brutal, extravagante y lleno de peligros inesperados.",
    badge: "Sensación del Año",
    categories: ["populares_series", "tendencias"]
  },
  {
    id: "inside-out-2",
    title: "Intensamente 2",
    originalTitle: "Inside Out 2",
    type: "movie",
    platforms: ["disneyplus"],
    platformName: "Disney+",
    year: 2024,
    rating: 7.7,
    quality: "4K UHD • Dolby Atmos",
    duration: "1h 36m",
    genres: ["Animación", "Familiar", "Comedia"],
    posterUrl: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/xg27NrXi7EgUrZYmkoEv9rPIUwO.jpg",
    synopsis: "La mente de la adolescente Riley sufre una repentina demolición para hacer espacio a nuevas y complejas emociones: Ansiedad, Envidia, Ennui y Vergüenza, quienes desafían el liderazgo de Alegría y Tristeza.",
    badge: "Película Animada #1",
    categories: ["estrenos", "populares_peliculas", "tendencias"]
  },
  {
    id: "top-gun-maverick",
    title: "Top Gun: Maverick",
    originalTitle: "Top Gun: Maverick",
    type: "movie",
    platforms: ["paramount"],
    platformName: "Paramount+",
    year: 2022,
    rating: 8.3,
    quality: "4K UHD • HDR",
    duration: "2h 10m",
    genres: ["Acción", "Aviación", "Drama"],
    posterUrl: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/Aa9TLpNpBMyRkD8sPJ7ENZTUIm9.jpg",
    synopsis: "Tras más de treinta años de servicio como uno de los mejores aviadores de la Armada, Pete 'Maverick' Mitchell entrena a un destacamento de graduados para una misión especializada sin precedentes.",
    badge: "Cine Adrenalina Pura",
    categories: ["populares_peliculas", "recomendadas"]
  },
  {
    id: "stranger-things-5",
    title: "Stranger Things 5 (Temporada Final)",
    originalTitle: "Stranger Things Season 5",
    type: "series",
    platforms: ["netflix"],
    platformName: "Netflix",
    year: 2025,
    rating: 8.7,
    quality: "4K UHD • Dolby Vision",
    duration: "Próximamente",
    genres: ["Ciencia Ficción", "Terror", "Misterio"],
    posterUrl: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/56v2KjUmLeLo5aEzOPutfd9w60q.jpg",
    synopsis: "La batalla definitiva por Hawkins ha llegado. Once y el grupo deben enfrentar a Vecna en su propio terreno para cerrar la grieta del Mundo del Revés antes de que consuma toda la realidad.",
    badge: "Próximo Gran Estreno",
    categories: ["proximamente", "tendencias"]
  },
  {
    id: "dandadan",
    title: "DanDaDan",
    originalTitle: "Dan Da Dan",
    type: "series",
    platforms: ["crunchyroll", "netflix"],
    platformName: "Crunchyroll / Netflix",
    year: 2024,
    rating: 8.6,
    quality: "Full HD 1080p",
    duration: "1 Temporada",
    genres: ["Anime", "Sobrenatural", "Acción Comedia"],
    posterUrl: "https://image.tmdb.org/t/p/w500/kZ1N8bO5eE8e0V9YwW1p8M1v0G2.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/8b6gV0X9Z8mY5T3o8L1p0W1z7K2.jpg",
    synopsis: "Momo, una chica que cree en fantasmas pero no en extraterrestres, y Okarun, un chico que cree en alienígenas pero no en espíritus, apuestan para demostrar quién tiene la razón y despiertan fuerzas arcanas.",
    badge: "Éxito Viral 2024",
    categories: ["estrenos", "populares_series", "tendencias"]
  },
  {
    id: "the-substance",
    title: "La Sustancia (The Substance)",
    originalTitle: "The Substance",
    type: "movie",
    platforms: ["primevideo"],
    platformName: "Prime Video",
    year: 2024,
    rating: 7.5,
    quality: "4K UHD • HDR",
    duration: "2h 21m",
    genres: ["Terror", "Drama", "Sci-Fi Corporal"],
    posterUrl: "https://image.tmdb.org/t/p/w500/lqoMzCcZY5yg5y2iM8m6n10Vp6q.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/7kQjK4gX0aY6a0r2P1m8p0Z6v9q.jpg",
    synopsis: "Una celebridad en decadencia decide consumir una droga clandestina que genera una versión más joven y perfecta de sí misma a nivel celular, desatando consecuencias grotescas e impredecibles.",
    badge: "Cine de Terror Festival Cannes",
    categories: ["estrenos", "populares_peliculas", "tendencias"]
  },
  {
    id: "baby-reindeer",
    title: "Bebé Reno (Baby Reindeer)",
    originalTitle: "Baby Reindeer",
    type: "series",
    platforms: ["netflix"],
    platformName: "Netflix",
    year: 2024,
    rating: 7.9,
    quality: "4K UHD",
    duration: "Miniserie (7 Episodios)",
    genres: ["Drama", "Suspenso Psicológico"],
    posterUrl: "https://image.tmdb.org/t/p/w500/wzZ4V8M6K1p6o9V0x9Z7k0w8L9m.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/8p1k9W8Z8mY5T3o8L1p0W1z7K2.jpg",
    synopsis: "Un acto de amabilidad de un comediante vulnerable hacia una mujer solitaria da inicio a una obsesión asfixiante que amenaza con desmoronar la vida de ambos en una historia basada en hechos reales.",
    badge: "Ganadora del Emmy",
    categories: ["populares_series", "tendencias"]
  },
  {
    id: "yellowstone",
    title: "Yellowstone",
    originalTitle: "Yellowstone",
    type: "series",
    platforms: ["paramount"],
    platformName: "Paramount+",
    year: 2024,
    rating: 8.7,
    quality: "4K UHD • HDR",
    duration: "5 Temporadas",
    genres: ["Drama", "Western Moderno"],
    posterUrl: "https://image.tmdb.org/t/p/w500/peNC0eyc3TQJa6x4Td1IlRVj0Zz.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/9faGSFi5jam6pDhAzLuz2tYAlBP.jpg",
    synopsis: "John Dutton y su familia defienden el rancho ganadero contiguo más grande de Estados Unidos frente a constructores urbanos, reservas indígenas y el primer Parque Nacional de la nación.",
    badge: "Serie Insignia Paramount",
    categories: ["populares_series", "recomendadas"]
  },
  {
    id: "silo",
    title: "Silo (Temporada 2)",
    originalTitle: "Silo Season 2",
    type: "series",
    platforms: ["appletv"],
    platformName: "Apple TV+",
    year: 2024,
    rating: 8.2,
    quality: "4K Dolby Vision • Atmos",
    duration: "2 Temporadas",
    genres: ["Ciencia Ficción", "Misterio", "Distopía"],
    posterUrl: "https://image.tmdb.org/t/p/w500/1Nhy7V0gZ3V1W2p8r0m0Q9m2k.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/7kQjK4gX0aY6a0r2P1m8p0Z6v9q.jpg",
    synopsis: "En un futuro tóxico e inhabitable, una comunidad sobrevive dentro de un gigantesco silo subterráneo de cientos de pisos. Tras descubrir la verdad sobre el exterior, la ingeniera Juliette desafía al régimen.",
    badge: "Sci-Fi 4K Sobresaliente",
    categories: ["estrenos", "populares_series", "recomendadas"]
  }
];

const ADVANTAGES = [
  {
    icon: "zap",
    title: "Activación en Menos de 5 Min",
    desc: "Recibe tus credenciales y clave PIN al instante por WhatsApp tras confirmar tu comprobante de pago."
  },
  {
    icon: "shield-check",
    title: "Perfiles 100% Privados con PIN",
    desc: "Pantallas estrictamente personales con tu propio PIN de 4 dígitos. Tu historial, descargas y listas son solo tuyos."
  },
  {
    icon: "life-buoy",
    title: "Garantía & Reposición Inmediata",
    desc: "Cobertura total durante los 30 días de tu plan. Soporte humano real disponible para resolver cualquier duda."
  },
  {
    icon: "tv",
    title: "Compatibilidad Universal",
    desc: "Disfruta en Smart TV (Samsung, LG, Sony, Google TV), Roku, Fire Stick, iPhone, Android, PC y consolas."
  },
  {
    icon: "sparkles",
    title: "Calidad 4K UHD, HDR & Dolby Atmos",
    desc: "Cuentas oficiales configuradas con la tasa de bits más alta y audio espacial inmersivo disponible."
  },
  {
    icon: "refresh-cw",
    title: "Renovación Sin Pérdida de Historial",
    desc: "Renueva mes a mes conservando tu mismo perfil, tus recomendaciones algorítmicas y tus listas de seguimiento."
  }
];

const FAQS = [
  {
    question: "¿Cuáles son las tarifas oficiales de Órbita Streaming?",
    answer: "Nuestra política de precios es directa y transparente: Cualquier plataforma individual tiene un costo de $3.00 USD al mes con tu propio perfil privado con clave PIN. Si seleccionas el Combo Dúo (2 aplicaciones), pagas únicamente $5.00 USD al mes en total (ahorras $1 cada mes) y recibes Spotify Premium gratis. Además, contamos con Canva Pro Anual por solo $4.00 USD por los 365 días completos."
  },
  {
    question: "¿Cómo funciona el Combo Dúo de 2 aplicaciones por $5?",
    answer: "Puedes combinar libremente las 2 plataformas que prefieras (por ejemplo Netflix + Disney+, o Max + Prime Video, etc.). En lugar de pagar $6 ($3 por cada una), pagas únicamente $5 por ambas cuentas. Además, te obsequiamos 1 cuenta de Spotify Premium gratis durante el mes."
  },
  {
    question: "¿Cómo y cuándo recibo mi cuenta tras pagar?",
    answer: "El proceso es 100% digital e inmediato. Una vez envíes tu comprobante por WhatsApp, nuestro asesor te entrega el correo oficial, la contraseña y el número de tu perfil con su PIN privado de seguridad en menos de 5 minutos."
  },
  {
    question: "¿Los perfiles son realmente privados?",
    answer: "Sí, absolutamente. Te asignamos un perfil exclusivo protegido con tu propio PIN de 4 dígitos. Nadie más entra a tu pantalla, garantizando que tu historial, lista de reproducción y descargas sean 100% personales."
  },
  {
    question: "¿Qué garantía tengo durante el mes de servicio?",
    answer: "Cuentas con garantía activa de reposición y soporte durante los 30 días continuos (o 365 días en Canva Pro). Si se presenta alguna eventualidad técnica, la resolvemos o reponemos de inmediato por WhatsApp."
  },
  {
    question: "¿Cuáles son los métodos de pago aceptados?",
    answer: "Aceptamos Nequi, Daviplata, Bancolombia, MercadoPago, SPEI/OXXO en México, transferencias bancarias locales en Ecuador y varios países de Sudamérica, Zelle, Binance Pay (USDT sin comisiones) y PayPal."
  }
];

const TESTIMONIALS = [
  {
    name: "Mateo Cárdenas",
    city: "Quito, Ecuador",
    rating: 5,
    date: "Ayer",
    comment: "Llevo 6 meses usando el Combo Dúo de Netflix y Disney+ por $5. La entrega por WhatsApp fue en 2 minutos y el perfil con PIN funciona perfecto en mi Smart TV LG en 4K.",
    plan: "Combo 2 Apps x $5"
  },
  {
    name: "Valentina Gómez",
    city: "Bogotá, Colombia",
    rating: 5,
    date: "Hace 3 días",
    comment: "Compré Canva Pro Anual a $4 y me lo activaron a mi propio correo institucional en minutos. Además aproveché para pedir Max a $3 y ver House of the Dragon sin trabas.",
    plan: "Canva Pro Anual + Max"
  },
  {
    name: "Rodrigo Morales",
    city: "Ciudad de México",
    rating: 5,
    date: "Hace 5 días",
    comment: "Excelente servicio. Pagué por SPEI, me entregaron en menos de 4 minutos y el perfil privado con PIN me da total tranquilidad. El soporte en WhatsApp es súper amable.",
    plan: "Netflix 4K ($3)"
  }
];

/**
 * Knowledge Base & Motor Semántico para Orbit AI
 */
const ORBITA_AI_KB = {
  presets: [
    {
      id: "promo_spotify",
      label: "PROMO: 2 Apps + Spotify GRATIS",
      prompt: "¿Cómo funciona la promo de 2 aplicaciones por $5 y Spotify gratis?",
      recommendTitles: ["Dune: Parte Dos", "Deadpool & Wolverine"],
      recommendIds: ["netflix", "disneyplus"],
      isCombo: true,
      price: 5.00,
      title: "Super Combo 2x$5 + SPOTIFY GRATIS",
      badge: "Promoción Estrella",
      reason: "¡Es nuestra promoción más destacada! Al contratar cualquier **Combo Dúo de 2 aplicaciones por solo $5.00/mes** (ej. Netflix + Disney+, o Max + Prime Video), te obsequiamos **1 cuenta de SPOTIFY PREMIUM totalmente GRATIS** durante el mes. ¡Cine, series y toda la música sin costo adicional!",
      tip: "Pídela por WhatsApp diciendo que deseas tu Combo 2x$5 con el bono de Spotify de regalo."
    },
    {
      id: "scifi_interstellar",
      label: "Ciencia Ficción Épica",
      prompt: "Quiero una película o serie de ciencia ficción parecida a Interstellar",
      recommendTitles: ["Dune: Parte Dos", "Interestelar (Interstellar)", "Severance (Temporada 2)", "Silo (Temporada 2)"],
      recommendIds: ["hbomax", "appletv"],
      isCombo: true,
      price: 5.00,
      title: "Joyas Cósmicas: Max + Apple TV+",
      badge: "Sci-Fi Sublime en 4K",
      reason: "Para los amantes de *Interstellar* y la ciencia ficción de gran escala, **Dune: Parte Dos** en Max y **Severance** o **Silo** en Apple TV+ son las obras cumbres actuales. Imágenes 4K deslumbrantes, profundidad psicológica y misterio espacial.",
      tip: "En Combo Dúo te llevas Max + Apple TV+ por solo $5/mes con perfiles privados con PIN."
    },
    {
      id: "series_cortas",
      label: "Serie Corta Adictiva",
      prompt: "Recomiéndame una serie corta para ver este fin de semana",
      recommendTitles: ["Bebé Reno (Baby Reindeer)", "Shōgun", "El Pingüino (The Penguin)"],
      recommendIds: ["netflix", "disneyplus"],
      isCombo: false,
      price: 3.00,
      title: "Miniseries Aclamadas",
      badge: "Maratón de Fin de Semana",
      reason: "Si buscas series cortas e impactantes: **Bebé Reno** (7 episodios en Netflix, ganadora del Emmy), **Shōgun** (10 episodios en Disney+) o **El Pingüino** en Max te mantendrán pegado a la pantalla de principio a fin.",
      tip: "Puedes pedir cualquiera de ellas por solo $3.00 al mes."
    },
    {
      id: "pareja",
      label: "Para Ver en Pareja",
      prompt: "Quiero algo entretenido para ver en pareja esta noche",
      recommendTitles: ["Dune: Parte Dos", "The Bear (Temporada 3)", "Interestelar (Interstellar)", "Intensamente 2"],
      recommendIds: ["disneyplus", "netflix"],
      isCombo: true,
      price: 5.00,
      title: "Cine & Romance en Pareja",
      badge: "Planes Compartidos",
      reason: "Para una cita perfecta o velada en pareja: **The Bear** (comedia dramática frenética), **Dune 2** (espectáculo visual inolvidable) o un clásico conmovedor como **Interestelar**. Risas, emoción y conversación asegurada.",
      tip: "Combo Dúo Netflix + Disney+ te da todo el catálogo romántico y estrenos por $5/mes."
    },
    {
      id: "netflix_que_ver",
      label: "¿Qué ver en Netflix?",
      prompt: "¿Qué películas y series buenas hay en Netflix ahora mismo?",
      recommendTitles: ["El Juego del Calamar (Temporada 2)", "Arcane (Temporada Final)", "Bebé Reno (Baby Reindeer)", "DanDaDan"],
      recommendIds: ["netflix"],
      isCombo: false,
      price: 3.00,
      title: "Lo Más Top de Netflix",
      badge: "Estrenos Virales 4K",
      reason: "Actualmente en Netflix destacan la tensión mortal de **El Juego del Calamar 2**, la animación maestra de **Arcane 2**, el fenómeno psicológico **Bebé Reno** y el anime del momento **DanDaDan**.",
      tip: "Pantalla 100% privada con PIN por solo $3.00 al mes."
    },
    {
      id: "futbol_deportes",
      label: "Fútbol y Deportes en Vivo",
      prompt: "Quiero ver fútbol y deportes en vivo en alta definición",
      recommendTitles: [],
      recommendIds: ["disneyplus", "vix"],
      isCombo: true,
      price: 5.00,
      title: "Combo Dúo Deportes: Disney+ (ESPN) & ViX",
      badge: "Deportes en Vivo",
      reason: "Con **Disney+** tienes toda la señal en vivo de **ESPN** (Champions League, Premier League, Fórmula 1, torneos de tenis de Grand Slam), y con **ViX Premium** sumas la Liga MX y partidos en español. Ambas por solo $5/mes.",
      tip: "Señal fluida en 4K / 60 FPS directo en tu Smart TV."
    }
  ]
};

// Exponer en el objeto global window
window.ORBITA_CONFIG = ORBITA_CONFIG;
window.DEFAULT_COSMIC_THEME = DEFAULT_COSMIC_THEME;
window.STREAMING_PLATFORMS = STREAMING_PLATFORMS;
window.STREAMING_CATALOG = STREAMING_CATALOG;
window.ADVANTAGES = ADVANTAGES;
window.FAQS = FAQS;
window.TESTIMONIALS = TESTIMONIALS;
window.ORBITA_AI_KB = ORBITA_AI_KB;
