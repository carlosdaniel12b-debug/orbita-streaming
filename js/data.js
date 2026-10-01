/**
 * Ã“rbita Streaming - Base de Datos Central & Knowledge Base
 * 
 * - Plataformas individuales: $3.00 / mes (Perfil privado con PIN)
 * - Combos de 2 aplicaciones: $5.00 / mes (Ahorro garantizado + Spotify Gratis)
 * - Pack TrÃ­o (3 aplicaciones): $8.00 / mes
 * - Canva Pro Anual: $4.00 / aÃ±o (365 dÃ­as a tu correo)
 * - WhatsApp Oficial: +593 99 822 6756 (Ecuador & Soporte Internacional)
 * - CatÃ¡logo Real & Curado de Estrenos, PelÃ­culas y Series 2024-2026
 * - Asistente IA Orbit con Recomendaciones Visuales y SemÃ¡nticas
 */

const ORBITA_CONFIG = {
  brandName: "Ã“rbita Streaming",
  slogan: "Todo tu universo de entretenimiento en una sola Ã³rbita",
  whatsappNumber: "593998226756",
  supportEmail: "soporte@orbitastreaming.com",
  schedule: "AtenciÃ³n 24/7 â€¢ ActivaciÃ³n express en menos de 5 min",
  defaultCurrency: "USD",
  currencies: {
    USD: { symbol: "$", rate: 1, label: "USD ($)", formatDecimals: true },
    COP: { symbol: "$", rate: 4000, label: "COP (Pesos Colombianos)", formatDecimals: false },
    MXN: { symbol: "$", rate: 18.5, label: "MXN (Pesos Mexicanos)", formatDecimals: false },
    EUR: { symbol: "â‚¬", rate: 0.92, label: "EUR (â‚¬)", formatDecimals: true },
    PEN: { symbol: "S/.", rate: 3.75, label: "PEN (Soles Peruanos)", formatDecimals: true }
  }
};

const DEFAULT_COSMIC_THEME = {
  primaryColor: "#8b5cf6",     // Violeta Estelar
  secondaryColor: "#d946ef",   // Magenta CÃ³smico
  tertiaryColor: "#f97316",    // Naranja Supernova
  glowColor: "rgba(139, 92, 246, 0.45)",
  themeName: "Ã“rbita CÃ³smica Original"
};

const STREAMING_PLATFORMS = [
  {
    id: "netflix",
    name: "Netflix Premium",
    shortName: "Netflix",
    category: "cinema",
    categoryName: "Series & PelÃ­culas",
    tagline: "Ultra HD 4K â€¢ Perfil 100% Privado con PIN",
    color: "#E50914",
    secondaryColor: "#ff4d6d",
    glowColor: "rgba(229, 9, 20, 0.45)",
    themeName: "Rojo Escarlata Netflix",
    badge: "MÃ¡s Solicitado",
    priceUSD: 3.00,
    pricePeriod: "mes",
    iconUrl: "assets/icons/netflix.svg",
    logoSvg: `<img src="assets/icons/netflix.svg" alt="Netflix" class="platform-logo-img" loading="lazy">`,
    features: [
      "Calidad Ultra HD 4K + HDR10",
      "Perfil 100% privado con PIN personal de 4 dÃ­gitos",
      "Descargas sin conexiÃ³n para todos tus dispositivos",
      "GarantÃ­a total de reposiciÃ³n durante los 30 dÃ­as",
      "RenovaciÃ³n en la misma cuenta sin perder listas"
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
    themeName: "Zafiro CÃ³smico Disney",
    badge: "Incluye ESPN",
    priceUSD: 3.00,
    pricePeriod: "mes",
    iconUrl: "assets/icons/disneyplus.svg",
    logoSvg: `<img src="assets/icons/disneyplus.svg" alt="Disney+" class="platform-logo-img" loading="lazy">`,
    features: [
      "Deportes en vivo con seÃ±al ESPN (Champions, Premier, F1, Tenis)",
      "Todo Disney, Pixar, Marvel, Star Wars y National Geographic",
      "ResoluciÃ³n hasta 4K Ultra HD y audio IMAX Enhanced",
      "Perfil propio privado con PIN",
      "Soporte rÃ¡pido en WhatsApp"
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
    themeName: "PÃºrpura GalÃ¡ctico Max",
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
      "ActivaciÃ³n inmediata garantizada"
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
    categoryName: "Series & PelÃ­culas",
    tagline: "Amazon Originals, Cine Mundial & Series Taquilleras",
    color: "#0284c7",
    secondaryColor: "#f59e0b",
    glowColor: "rgba(2, 132, 199, 0.45)",
    themeName: "Cian & Ãmbar Prime",
    badge: "Excelente CatÃ¡logo",
    priceUSD: 3.00,
    pricePeriod: "mes",
    iconUrl: "assets/icons/primevideo.svg",
    logoSvg: `<img src="assets/icons/primevideo.svg" alt="Prime Video" class="platform-logo-img" loading="lazy">`,
    features: [
      "Series exclusivas: The Boys, Los Anillos de Poder, Invincible, Fallout",
      "ResoluciÃ³n 4K Ultra HD y HDR10+",
      "Perfil propio con PIN de seguridad",
      "Descargas para ver sin internet en viajes",
      "GarantÃ­a de servicio 30 dÃ­as continuos"
    ],
    devices: ["Smart TV", "Celulares", "Fire TV", "Tablets", "PC"],
    plans: [
      { name: "1 Mes - Perfil Privado", priceUSD: 3.00, period: "1 mes", popular: true, desc: "Acceso individual en alta definiciÃ³n." }
    ]
  },
  {
    id: "appletv",
    name: "Apple TV+",
    shortName: "Apple TV+",
    category: "cinema",
    categoryName: "Series de Culto & Cine 4K",
    tagline: "MÃ¡xima tasa de bits 4K, Dolby Vision & Audio Espacial",
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
      "La tasa de bits mÃ¡s alta de la industria (4K Dolby Vision puro)",
      "Audio espacial Dolby Atmos inmersivo",
      "Compatible con Smart TV Samsung, LG, Fire TV, Android y Apple",
      "Perfil privado individual"
    ],
    devices: ["Apple TV & iPhone", "Smart TV Samsung / LG", "Google TV", "Roku & Fire TV", "PC / Mac"],
    plans: [
      { name: "1 Mes - Perfil Privado", priceUSD: 3.00, period: "1 mes", popular: true, desc: "Cine y series con la mÃ¡s alta fidelidad." }
    ]
  },
  {
    id: "paramount",
    name: "Paramount+",
    shortName: "Paramount+",
    category: "cinema",
    categoryName: "Series, Cine & Deportes",
    tagline: "Showtime, Paramount Pictures, Nickelodeon & FÃºtbol",
    color: "#2563eb",
    secondaryColor: "#60a5fa",
    glowColor: "rgba(37, 99, 235, 0.45)",
    themeName: "Cobalto Paramount",
    badge: "Cine & FÃºtbol",
    priceUSD: 3.00,
    pricePeriod: "mes",
    iconUrl: "assets/icons/paramount.svg",
    logoSvg: `<img src="assets/icons/paramount.svg" alt="Paramount+" class="platform-logo-img" loading="lazy">`,
    features: [
      "Grandes franquicias: Yellowstone, Gladiator II, Top Gun, Star Trek",
      "Todo el universo Nickelodeon para niÃ±os (Paw Patrol, Bob Esponja)",
      "FÃºtbol internacional en vivo segÃºn regiÃ³n",
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
    categoryName: "Anime & Simulcast JapÃ³n",
    tagline: "El mayor catÃ¡logo de anime del mundo en HD y sin anuncios",
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
      "Estrenos directos de JapÃ³n solo 1 hora tras su transmisiÃ³n original",
      "CatÃ¡logo inmenso en Full HD sin cortes publicitarios",
      "VisualizaciÃ³n sin conexiÃ³n en celulares y tablets",
      "Audio original japonÃ©s y doblajes al espaÃ±ol latino",
      "GarantÃ­a total de servicio durante 30 dÃ­as"
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
    tagline: "FÃºtbol en vivo, Liga MX y series 100% en espaÃ±ol",
    color: "#ea580c",
    secondaryColor: "#fb923c",
    glowColor: "rgba(234, 88, 12, 0.45)",
    themeName: "Fuego Astral ViX",
    badge: "100% en EspaÃ±ol",
    priceUSD: 3.00,
    pricePeriod: "mes",
    iconUrl: "assets/icons/vix.svg",
    logoSvg: `<img src="assets/icons/vix.svg" alt="ViX" class="platform-logo-img" loading="lazy">`,
    features: [
      "Liga MX y partidos de fÃºtbol exclusivos en vivo",
      "Telenovelas clÃ¡sicas y estrenos originales en espaÃ±ol",
      "Canales en vivo y catÃ¡logo a la carta sin comerciales",
      "Perfil privado individual con clave",
      "AtenciÃ³n y reposiciÃ³n rÃ¡pida"
    ],
    devices: ["Smart TV", "Roku", "Celulares", "Tablets", "PC"],
    plans: [
      { name: "1 Mes - ViX Premium", priceUSD: 3.00, period: "1 mes", popular: true, desc: "FÃºtbol en vivo y producciones en tu idioma." }
    ]
  },
  {
    id: "spotify",
    name: "Spotify Premium",
    shortName: "Spotify",
    category: "music",
    categoryName: "MÃºsica & Podcasts",
    tagline: "MÃ¡s de 100M de canciones sin anuncios y mÃ¡xima calidad",
    color: "#10b981",
    secondaryColor: "#06b6d4",
    glowColor: "rgba(16, 185, 129, 0.45)",
    themeName: "Esmeralda Aurora Spotify",
    badge: "MÃºsica Ilimitada",
    priceUSD: 3.00,
    pricePeriod: "mes",
    iconUrl: "assets/icons/spotify.svg",
    logoSvg: `<img src="assets/icons/spotify.svg" alt="Spotify" class="platform-logo-img" loading="lazy">`,
    features: [
      "MÃºsica y podcasts sin interrupciones publicitarias",
      "Descarga de canciones para reproducir sin datos",
      "Audio en muy alta fidelidad (320 kbps)",
      "Saltos de canciones ilimitados",
      "Disponible gratis al comprar cualquier Combo 2x$5"
    ],
    devices: ["Celulares", "Smart TV", "Altavoces Alexa / Google", "PC / Mac", "CarPlay / Auto"],
    plans: [
      { name: "1 Mes - Spotify Premium", priceUSD: 3.00, period: "1 mes", popular: true, desc: "MÃºsica continua sin publicidad." }
    ]
  },
  {
    id: "canva",
    name: "Canva Pro Anual",
    shortName: "Canva Pro",
    category: "tools",
    categoryName: "DiseÃ±o & Productividad",
    tagline: "1 AÃ±o Completo con todas las herramientas Pro desbloqueadas",
    color: "#06b6d4",
    secondaryColor: "#8b5cf6",
    glowColor: "rgba(6, 182, 212, 0.45)",
    themeName: "Turquesa & Violeta Canva",
    badge: "Plan Anual $4",
    priceUSD: 4.00,
    pricePeriod: "aÃ±o",
    iconUrl: "assets/icons/canva.svg",
    logoSvg: `<img src="assets/icons/canva.svg" alt="Canva Pro" class="platform-logo-img" loading="lazy">`,
    features: [
      "1 AÃ±o completo (365 dÃ­as) de acceso Canva Pro ilimitado",
      "Millones de plantillas premium, fotos, videos y tipografÃ­as",
      "Quitafondos mÃ¡gico en 1 clic (Magic Eraser)",
      "Kit de marca y redimensionamiento de diseÃ±os",
      "ActivaciÃ³n directa a tu propio correo electrÃ³nico personal"
    ],
    devices: ["Navegador Web PC/Mac", "App Celulares Android & iOS", "Tablets / iPads"],
    plans: [
      { name: "1 AÃ±o Completo - Canva Pro", priceUSD: 4.00, period: "1 aÃ±o", popular: true, desc: "Acceso anual ilimitado a tu propio correo." }
    ]
  }
];

/**
 * CatÃ¡logo Real, Actual y Verificado de Streaming (2024 - 2026)
 * Posters y backdrops oficiales de alta resoluciÃ³n desde TMDB
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
    quality: "4K UHD â€¢ Dolby Vision",
    duration: "2h 46m",
    genres: ["Ciencia FicciÃ³n", "Aventura", "AcciÃ³n"],
    posterUrl: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s520DRq.jpg",
    synopsis: "Paul Atreides se une a Chani y a los Fremen mientras busca venganza contra los conspiradores que destruyeron a su familia, enfrentando una decisiÃ³n entre el amor de su vida y el destino del universo.",
    badge: "Super Ã‰xito 4K",
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
    quality: "4K Dolby Vision â€¢ Atmos",
    duration: "2 Temporadas",
    genres: ["Ciencia FicciÃ³n", "Suspenso", "Misterio"],
    posterUrl: "https://image.tmdb.org/t/p/w500/pPHpeI2X1qEd1CS1SeyrdhZ4qnT.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/ixgFmf1X59PUZam2qbAfskx2gQr.jpg",
    synopsis: "Mark Scout lidera un equipo en Lumon Industries cuyos recuerdos han sido separados quirÃºrgicamente entre su vida laboral y personal. Al descubrir los secretos de Lumon, la frontera entre ambas realidades colapsa.",
    badge: "Aclamada por la CrÃ­tica",
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
    quality: "4K UHD â€¢ HDR",
    duration: "2 Temporadas",
    genres: ["Suspenso", "Drama", "Supervivencia"],
    posterUrl: "https://image.tmdb.org/t/p/w500/yEB6bMYgNu6qEQWoBvlkg6Ea5P.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/2meX1nMdScFOoV4370rqHWKmXhY.jpg",
    synopsis: "Tres aÃ±os despuÃ©s de ganar el Juego del Calamar, el jugador 456 Gi-hun renuncia a ir a Estados Unidos y regresa con una firme resoluciÃ³n en mente: desenmascarar y destruir la organizaciÃ³n desde adentro.",
    badge: "FenÃ³meno Global",
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
    genres: ["AcciÃ³n", "Comedia", "Ciencia FicciÃ³n"],
    posterUrl: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/9l1eZiJHmhr5jY76h02zL12o6p9.jpg",
    synopsis: "Un apÃ¡tico Wade Wilson se esfuerza por llevar una vida civil ordinaria, pero cuando una amenaza existencial se cierne sobre su mundo, debe convencer a un Wolverine reacio para luchar juntos.",
    badge: "Taquilla HistÃ³rica",
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
    quality: "4K UHD â€¢ HDR10+",
    duration: "4 Temporadas",
    genres: ["AcciÃ³n", "SuperhÃ©roes", "SÃ¡tira"],
    posterUrl: "https://image.tmdb.org/t/p/w500/in1R2dDc421JxsoRWaIIAqVI2KE.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/bq28ajZaoMyzEIm6REelqyqtEDZ.jpg",
    synopsis: "El mundo estÃ¡ al borde del colapso: Victoria Neuman estÃ¡ mÃ¡s cerca que nunca de la presidencia bajo el control implacable de Homelander. Butcher debe encontrar la forma de salvar al mundo antes de que se agote su tiempo.",
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
    quality: "4K Dolby Vision â€¢ Atmos",
    duration: "2 Temporadas",
    genres: ["FantasÃ­a", "Drama", "AcciÃ³n"],
    posterUrl: "https://image.tmdb.org/t/p/w500/7V0Ebks0GgpKvQ7QbLAIdX5dos4.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/577eXC8wFQT0eUrJcgznSiFPRmk.jpg",
    synopsis: "Westeros estÃ¡ al borde de una sangrienta guerra civil entre el Consejo Verde del Rey Aegon y el Consejo Negro de la Reina Rhaenyra Targaryen. NingÃºn dragÃ³n permanecerÃ¡ en reposo.",
    badge: "Ã‰pico HBO",
    categories: ["estrenos", "populares_series", "recomendadas"]
  },
  {
    id: "shogun",
    title: "ShÅgun",
    originalTitle: "ShÅgun",
    type: "series",
    platforms: ["disneyplus"],
    platformName: "Disney+",
    year: 2024,
    rating: 8.8,
    quality: "4K UHD â€¢ HDR",
    duration: "Miniserie (10 Episodios)",
    genres: ["Drama HistÃ³rico", "Guerra", "Aventura"],
    posterUrl: "https://image.tmdb.org/t/p/w500/7O4iVfOMQmdCSxhOg1WnzG1AgYT.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/bwSmgmd90hCWwqOKQYTEraeOZhJ.jpg",
    synopsis: "En el JapÃ³n de 1600, Lord Yoshii Toranaga lucha por su vida cuando sus enemigos del Consejo de Regentes se unen en su contra. La llegada de un misterioso barco europeo altera el equilibrio de poder.",
    badge: "RÃ©cord de Premios Emmy",
    categories: ["populares_series", "tendencias", "recomendadas"]
  },
  {
    id: "the-penguin",
    title: "El PingÃ¼ino (The Penguin)",
    originalTitle: "The Penguin",
    type: "series",
    platforms: ["hbomax"],
    platformName: "Max (HBO)",
    year: 2024,
    rating: 8.8,
    quality: "4K UHD â€¢ Dolby Atmos",
    duration: "Miniserie",
    genres: ["Crimen", "Drama", "Thriller"],
    posterUrl: "https://image.tmdb.org/t/p/w500/9VW8wF6KpG01fMY4erZ9bw7A4Er.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/y2s4Xdi99Mu2Nh85Y89YZrbY5r6.jpg",
    synopsis: "Tras el colapso de Gotham City en The Batman, Oz Cobb se abre paso a travÃ©s de la violencia, la astucia y la traiciÃ³n para adueÃ±arse de los restos del imperio criminal de Carmine Falcone.",
    badge: "Aclamada por el PÃºblico",
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
    quality: "4K UHD â€¢ Dolby Vision",
    duration: "2h 28m",
    genres: ["AcciÃ³n", "Aventura", "Drama Ã‰pico"],
    posterUrl: "https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/tOqIwliWMovSIZ9DyvHcHI7p2im.jpg",
    synopsis: "AÃ±os despuÃ©s de presenciar la muerte de MÃ¡ximo a manos de su tÃ­o, Lucius debe entrar al Coliseo tras ser capturado por los despiadados emperadores que gobiernan Roma con puÃ±o de hierro.",
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
    quality: "4K UHD â€¢ IMAX",
    duration: "2h 49m",
    genres: ["Ciencia FicciÃ³n", "Drama", "Aventura Espacial"],
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/rAiYTnrZYgr9zcLHIf97Zt9YPr.jpg",
    synopsis: "Con la Tierra al borde del agotamiento de recursos, un equipo de exploradores viaja a travÃ©s de un agujero de gusano cerca de Saturno en busca de un nuevo hogar para la humanidad a travÃ©s del tiempo y el espacio.",
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
    genres: ["Anime", "AcciÃ³n", "FantasÃ­a Oscura"],
    posterUrl: "https://image.tmdb.org/t/p/w500/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/xMNH87maNLt9n2bMDYeI6db5VFm.jpg",
    synopsis: "Sung Jinwoo, conocido como el cazador mÃ¡s dÃ©bil de toda la humanidad, es herido de muerte dentro de una mazmorra doble. Al despertar, una pantalla misteriosa le otorga el poder Ãºnico de subir de nivel sin lÃ­mites.",
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
    quality: "4K UHD â€¢ Dolby Vision",
    duration: "2 Temporadas",
    genres: ["AnimaciÃ³n", "Ciencia FicciÃ³n", "AcciÃ³n"],
    posterUrl: "https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/5cvnxEHT3e39DvT6ARw4GNCFrB0.jpg",
    synopsis: "La fractura entre las ciudades gemelas de Piltover y Zaun desemboca en una guerra abierta total. Las hermanas Vi y Jinx se encuentran en bandos opuestos en un clÃ­max donde el destino de todos pende de un hilo.",
    badge: "PuntuaciÃ³n Perfecta 9.0",
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
    quality: "4K UHD â€¢ HDR",
    duration: "3 Temporadas",
    genres: ["Drama", "Comedia", "GastronomÃ­a"],
    posterUrl: "https://image.tmdb.org/t/p/w500/eKfVzzEazSIjJMrw9ADa2x8ksLz.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/aJtG4txtmiRHwAAqENQHZvBs6kY.jpg",
    synopsis: "Carmy Berzatto, Sydney y Richie se exigen al lÃ­mite absoluto para transformar su humilde tienda de emparedados en un restaurante de alta cocina con estrella Michelin, desafiando sus relaciones y cordura.",
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
    quality: "4K UHD â€¢ HDR10+",
    duration: "1 Temporada",
    genres: ["Ciencia FicciÃ³n", "Aventura PostapocalÃ­ptica", "AcciÃ³n"],
    posterUrl: "https://image.tmdb.org/t/p/w500/c15BtJxCXMrISLVmysdsnZUPQft.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/coaPCIqQBPUZsOnJcWZxhaORcDT.jpg",
    synopsis: "Doscientos aÃ±os despuÃ©s del apocalipsis nuclear, Lucy abandona su apacible refugio subterrÃ¡neo para rescatar a su padre en un yermo de Los Ãngeles brutal, extravagante y lleno de peligros inesperados.",
    badge: "SensaciÃ³n del AÃ±o",
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
    quality: "4K UHD â€¢ Dolby Atmos",
    duration: "1h 36m",
    genres: ["AnimaciÃ³n", "Familiar", "Comedia"],
    posterUrl: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/xg27NrXi7EgUrZYmkoEv9rPIUwO.jpg",
    synopsis: "La mente de la adolescente Riley sufre una repentina demoliciÃ³n para hacer espacio a nuevas y complejas emociones: Ansiedad, Envidia, Ennui y VergÃ¼enza, quienes desafÃ­an el liderazgo de AlegrÃ­a y Tristeza.",
    badge: "PelÃ­cula Animada #1",
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
    quality: "4K UHD â€¢ HDR",
    duration: "2h 10m",
    genres: ["AcciÃ³n", "AviaciÃ³n", "Drama"],
    posterUrl: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/Aa9TLpNpBMyRkD8sPJ7ENZTUIm9.jpg",
    synopsis: "Tras mÃ¡s de treinta aÃ±os de servicio como uno de los mejores aviadores de la Armada, Pete 'Maverick' Mitchell entrena a un destacamento de graduados para una misiÃ³n especializada sin precedentes.",
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
    quality: "4K UHD â€¢ Dolby Vision",
    duration: "PrÃ³ximamente",
    genres: ["Ciencia FicciÃ³n", "Terror", "Misterio"],
    posterUrl: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/56v2KjUmLeLo5aEzOPutfd9w60q.jpg",
    synopsis: "La batalla definitiva por Hawkins ha llegado. Once y el grupo deben enfrentar a Vecna en su propio terreno para cerrar la grieta del Mundo del RevÃ©s antes de que consuma toda la realidad.",
    badge: "PrÃ³ximo Gran Estreno",
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
    genres: ["Anime", "Sobrenatural", "AcciÃ³n Comedia"],
    posterUrl: "https://image.tmdb.org/t/p/w500/6qfZAOEUFIrbUH3JvePclx1nXzz.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/uNTrRKIOyKYISthoeizghtXPEOK.jpg",
    synopsis: "Momo, una chica que cree en fantasmas pero no en extraterrestres, y Okarun, un chico que cree en alienÃ­genas pero no en espÃ­ritus, apuestan para demostrar quiÃ©n tiene la razÃ³n y despiertan fuerzas arcanas.",
    badge: "Ã‰xito Viral 2024",
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
    quality: "4K UHD â€¢ HDR",
    duration: "2h 21m",
    genres: ["Terror", "Drama", "Sci-Fi Corporal"],
    posterUrl: "https://image.tmdb.org/t/p/w500/lqoMzCcZYEFK729d6qzt349fB4o.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/bVSOgrxasVJF6V71T7v2KfBRSzu.jpg",
    synopsis: "Una celebridad en decadencia decide consumir una droga clandestina que genera una versiÃ³n mÃ¡s joven y perfecta de sÃ­ misma a nivel celular, desatando consecuencias grotescas e impredecibles.",
    badge: "Cine de Terror Festival Cannes",
    categories: ["estrenos", "populares_peliculas", "tendencias"]
  },
  {
    id: "baby-reindeer",
    title: "BebÃ© Reno (Baby Reindeer)",
    originalTitle: "Baby Reindeer",
    type: "series",
    platforms: ["netflix"],
    platformName: "Netflix",
    year: 2024,
    rating: 7.9,
    quality: "4K UHD",
    duration: "Miniserie (7 Episodios)",
    genres: ["Drama", "Suspenso PsicolÃ³gico"],
    posterUrl: "https://image.tmdb.org/t/p/w500/lCU77Jp0iWN2e1WuSJvR7M35ebN.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/ieiq46OoeTrLkjtclmhii6iRyzP.jpg",
    synopsis: "Un acto de amabilidad de un comediante vulnerable hacia una mujer solitaria da inicio a una obsesiÃ³n asfixiante que amenaza con desmoronar la vida de ambos en una historia basada en hechos reales.",
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
    quality: "4K UHD â€¢ HDR",
    duration: "5 Temporadas",
    genres: ["Drama", "Western Moderno"],
    posterUrl: "https://image.tmdb.org/t/p/w500/peNC0eyc3TQJa6x4TdKcBPNP4t0.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/ynSOcgDLZfdLCZfRSYZGiTgYJVo.jpg",
    synopsis: "John Dutton y su familia defienden el rancho ganadero contiguo mÃ¡s grande de Estados Unidos frente a constructores urbanos, reservas indÃ­genas y el primer Parque Nacional de la naciÃ³n.",
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
    quality: "4K Dolby Vision â€¢ Atmos",
    duration: "2 Temporadas",
    genres: ["Ciencia FicciÃ³n", "Misterio", "DistopÃ­a"],
    posterUrl: "https://image.tmdb.org/t/p/w500/r2QXomqKjkKHVtYGGtkf2l2Y7go.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/w1280/uTWhbLc7Bj4qNSdW3ZvZKL8cOHv.jpg",
    synopsis: "En un futuro tÃ³xico e inhabitable, una comunidad sobrevive dentro de un gigantesco silo subterrÃ¡neo de cientos de pisos. Tras descubrir la verdad sobre el exterior, la ingeniera Juliette desafÃ­a al rÃ©gimen.",
    badge: "Sci-Fi 4K Sobresaliente",
    categories: ["estrenos", "populares_series", "recomendadas"]
  }
];

const ADVANTAGES = [
  {
    icon: "zap",
    title: "ActivaciÃ³n en Menos de 5 Min",
    desc: "Recibe tus credenciales y clave PIN al instante por WhatsApp tras confirmar tu comprobante de pago."
  },
  {
    icon: "shield-check",
    title: "Perfiles 100% Privados con PIN",
    desc: "Pantallas estrictamente personales con tu propio PIN de 4 dÃ­gitos. Tu historial, descargas y listas son solo tuyos."
  },
  {
    icon: "life-buoy",
    title: "GarantÃ­a & ReposiciÃ³n Inmediata",
    desc: "Cobertura total durante los 30 dÃ­as de tu plan. Soporte humano real disponible para resolver cualquier duda."
  },
  {
    icon: "tv",
    title: "Compatibilidad Universal",
    desc: "Disfruta en Smart TV (Samsung, LG, Sony, Google TV), Roku, Fire Stick, iPhone, Android, PC y consolas."
  },
  {
    icon: "sparkles",
    title: "Calidad 4K UHD, HDR & Dolby Atmos",
    desc: "Cuentas oficiales configuradas con la tasa de bits mÃ¡s alta y audio espacial inmersivo disponible."
  },
  {
    icon: "refresh-cw",
    title: "RenovaciÃ³n Sin PÃ©rdida de Historial",
    desc: "Renueva mes a mes conservando tu mismo perfil, tus recomendaciones algorÃ­tmicas y tus listas de seguimiento."
  }
];

const FAQS = [
  {
    question: "Â¿CuÃ¡les son las tarifas oficiales de Ã“rbita Streaming?",
    answer: "Nuestra polÃ­tica de precios es directa y transparente: Cualquier plataforma individual tiene un costo de $3.00 USD al mes con tu propio perfil privado con clave PIN. Si seleccionas el Combo DÃºo (2 aplicaciones), pagas Ãºnicamente $5.00 USD al mes en total (ahorras $1 cada mes) y recibes Spotify Premium gratis. AdemÃ¡s, contamos con Canva Pro Anual por solo $4.00 USD por los 365 dÃ­as completos."
  },
  {
    question: "Â¿CÃ³mo funciona el Combo DÃºo de 2 aplicaciones por $5?",
    answer: "Puedes combinar libremente las 2 plataformas que prefieras (por ejemplo Netflix + Disney+, o Max + Prime Video, etc.). En lugar de pagar $6 ($3 por cada una), pagas Ãºnicamente $5 por ambas cuentas. AdemÃ¡s, te obsequiamos 1 cuenta de Spotify Premium gratis durante el mes."
  },
  {
    question: "Â¿CÃ³mo y cuÃ¡ndo recibo mi cuenta tras pagar?",
    answer: "El proceso es 100% digital e inmediato. Una vez envÃ­es tu comprobante por WhatsApp, nuestro asesor te entrega el correo oficial, la contraseÃ±a y el nÃºmero de tu perfil con su PIN privado de seguridad en menos de 5 minutos."
  },
  {
    question: "Â¿Los perfiles son realmente privados?",
    answer: "SÃ­, absolutamente. Te asignamos un perfil exclusivo protegido con tu propio PIN de 4 dÃ­gitos. Nadie mÃ¡s entra a tu pantalla, garantizando que tu historial, lista de reproducciÃ³n y descargas sean 100% personales."
  },
  {
    question: "Â¿QuÃ© garantÃ­a tengo durante el mes de servicio?",
    answer: "Cuentas con garantÃ­a activa de reposiciÃ³n y soporte durante los 30 dÃ­as continuos (o 365 dÃ­as en Canva Pro). Si se presenta alguna eventualidad tÃ©cnica, la resolvemos o reponemos de inmediato por WhatsApp."
  },
  {
    question: "Â¿CuÃ¡les son los mÃ©todos de pago aceptados?",
    answer: "Aceptamos Nequi, Daviplata, Bancolombia, MercadoPago, SPEI/OXXO en MÃ©xico, transferencias bancarias locales en Ecuador y varios paÃ­ses de SudamÃ©rica, Zelle, Binance Pay (USDT sin comisiones) y PayPal."
  }
];

const TESTIMONIALS = [
  {
    name: "Mateo CÃ¡rdenas",
    city: "Quito, Ecuador",
    rating: 5,
    date: "Ayer",
    comment: "Llevo 6 meses usando el Combo DÃºo de Netflix y Disney+ por $5. La entrega por WhatsApp fue en 2 minutos y el perfil con PIN funciona perfecto en mi Smart TV LG en 4K.",
    plan: "Combo 2 Apps x $5"
  },
  {
    name: "Valentina GÃ³mez",
    city: "BogotÃ¡, Colombia",
    rating: 5,
    date: "Hace 3 dÃ­as",
    comment: "ComprÃ© Canva Pro Anual a $4 y me lo activaron a mi propio correo institucional en minutos. AdemÃ¡s aprovechÃ© para pedir Max a $3 y ver House of the Dragon sin trabas.",
    plan: "Canva Pro Anual + Max"
  },
  {
    name: "Rodrigo Morales",
    city: "Ciudad de MÃ©xico",
    rating: 5,
    date: "Hace 5 dÃ­as",
    comment: "Excelente servicio. PaguÃ© por SPEI, me entregaron en menos de 4 minutos y el perfil privado con PIN me da total tranquilidad. El soporte en WhatsApp es sÃºper amable.",
    plan: "Netflix 4K ($3)"
  }
];

/**
 * Knowledge Base & Motor SemÃ¡ntico para Orbit AI
 */
const ORBITA_AI_KB = {
  presets: [
    {
      id: "promo_spotify",
      label: "PROMO: 2 Apps + Spotify GRATIS",
      prompt: "Â¿CÃ³mo funciona la promo de 2 aplicaciones por $5 y Spotify gratis?",
      recommendTitles: ["Dune: Parte Dos", "Deadpool & Wolverine"],
      recommendIds: ["netflix", "disneyplus"],
      isCombo: true,
      price: 5.00,
      title: "Super Combo 2x$5 + SPOTIFY GRATIS",
      badge: "PromociÃ³n Estrella",
      reason: "Â¡Es nuestra promociÃ³n mÃ¡s destacada! Al contratar cualquier **Combo DÃºo de 2 aplicaciones por solo $5.00/mes** (ej. Netflix + Disney+, o Max + Prime Video), te obsequiamos **1 cuenta de SPOTIFY PREMIUM totalmente GRATIS** durante el mes. Â¡Cine, series y toda la mÃºsica sin costo adicional!",
      tip: "PÃ­dela por WhatsApp diciendo que deseas tu Combo 2x$5 con el bono de Spotify de regalo."
    },
    {
      id: "scifi_interstellar",
      label: "Ciencia FicciÃ³n Ã‰pica",
      prompt: "Quiero una pelÃ­cula o serie de ciencia ficciÃ³n parecida a Interstellar",
      recommendTitles: ["Dune: Parte Dos", "Interestelar (Interstellar)", "Severance (Temporada 2)", "Silo (Temporada 2)"],
      recommendIds: ["hbomax", "appletv"],
      isCombo: true,
      price: 5.00,
      title: "Joyas CÃ³smicas: Max + Apple TV+",
      badge: "Sci-Fi Sublime en 4K",
      reason: "Para los amantes de *Interstellar* y la ciencia ficciÃ³n de gran escala, **Dune: Parte Dos** en Max y **Severance** o **Silo** en Apple TV+ son las obras cumbres actuales. ImÃ¡genes 4K deslumbrantes, profundidad psicolÃ³gica y misterio espacial.",
      tip: "En Combo DÃºo te llevas Max + Apple TV+ por solo $5/mes con perfiles privados con PIN."
    },
    {
      id: "series_cortas",
      label: "Serie Corta Adictiva",
      prompt: "RecomiÃ©ndame una serie corta para ver este fin de semana",
      recommendTitles: ["BebÃ© Reno (Baby Reindeer)", "ShÅgun", "El PingÃ¼ino (The Penguin)"],
      recommendIds: ["netflix", "disneyplus"],
      isCombo: false,
      price: 3.00,
      title: "Miniseries Aclamadas",
      badge: "MaratÃ³n de Fin de Semana",
      reason: "Si buscas series cortas e impactantes: **BebÃ© Reno** (7 episodios en Netflix, ganadora del Emmy), **ShÅgun** (10 episodios en Disney+) o **El PingÃ¼ino** en Max te mantendrÃ¡n pegado a la pantalla de principio a fin.",
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
      reason: "Para una cita perfecta o velada en pareja: **The Bear** (comedia dramÃ¡tica frenÃ©tica), **Dune 2** (espectÃ¡culo visual inolvidable) o un clÃ¡sico conmovedor como **Interestelar**. Risas, emociÃ³n y conversaciÃ³n asegurada.",
      tip: "Combo DÃºo Netflix + Disney+ te da todo el catÃ¡logo romÃ¡ntico y estrenos por $5/mes."
    },
    {
      id: "netflix_que_ver",
      label: "Â¿QuÃ© ver en Netflix?",
      prompt: "Â¿QuÃ© pelÃ­culas y series buenas hay en Netflix ahora mismo?",
      recommendTitles: ["El Juego del Calamar (Temporada 2)", "Arcane (Temporada Final)", "BebÃ© Reno (Baby Reindeer)", "DanDaDan"],
      recommendIds: ["netflix"],
      isCombo: false,
      price: 3.00,
      title: "Lo MÃ¡s Top de Netflix",
      badge: "Estrenos Virales 4K",
      reason: "Actualmente en Netflix destacan la tensiÃ³n mortal de **El Juego del Calamar 2**, la animaciÃ³n maestra de **Arcane 2**, el fenÃ³meno psicolÃ³gico **BebÃ© Reno** y el anime del momento **DanDaDan**.",
      tip: "Pantalla 100% privada con PIN por solo $3.00 al mes."
    },
    {
      id: "futbol_deportes",
      label: "FÃºtbol y Deportes en Vivo",
      prompt: "Quiero ver fÃºtbol y deportes en vivo en alta definiciÃ³n",
      recommendTitles: [],
      recommendIds: ["disneyplus", "vix"],
      isCombo: true,
      price: 5.00,
      title: "Combo DÃºo Deportes: Disney+ (ESPN) & ViX",
      badge: "Deportes en Vivo",
      reason: "Con **Disney+** tienes toda la seÃ±al en vivo de **ESPN** (Champions League, Premier League, FÃ³rmula 1, torneos de tenis de Grand Slam), y con **ViX Premium** sumas la Liga MX y partidos en espaÃ±ol. Ambas por solo $5/mes.",
      tip: "SeÃ±al fluida en 4K / 60 FPS directo en tu Smart TV."
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

