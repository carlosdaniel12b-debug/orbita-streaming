/**
 * Órbita Streaming - Base de Datos Central & Knowledge Base
 * 
 * - Plataformas individuales: $3
 * - Combos de 2 aplicaciones: $5
 * - Canva Pro Anual: $4
 * - WhatsApp: +593 99 822 6756 (Ecuador)
 * - Logos oficiales vectoriales descargados en assets/icons/
 * - Sistema de Asistente Inteligente Orbit integrado
 */

const ORBITA_CONFIG = {
  brandName: "Órbita Streaming",
  slogan: "Todo tu universo de entretenimiento en una sola órbita",
  whatsappNumber: "593998226756", // Ecuador (+593 998226756)
  supportEmail: "soporte@orbitastreaming.com",
  schedule: "Atención 24/7 • Activación en menos de 5 min",
  defaultCurrency: "USD",
  currencies: {
    USD: { symbol: "$", rate: 1, label: "USD ($)" },
    COP: { symbol: "$", rate: 4000, label: "COP (Pesos Colombianos)", formatDecimals: false },
    MXN: { symbol: "$", rate: 18.5, label: "MXN (Pesos Mexicanos)", formatDecimals: false },
    EUR: { symbol: "€", rate: 0.92, label: "EUR (€)", formatDecimals: true }
  }
};

const DEFAULT_COSMIC_THEME = {
  primaryColor: "#ccff00",
  secondaryColor: "#a3e635",
  glowColor: "rgba(204, 255, 0, 0.45)",
  themeName: "Órbita Original"
};

const STREAMING_PLATFORMS = [
  {
    id: "netflix",
    name: "Netflix Premium",
    shortName: "Netflix",
    category: "cinema",
    categoryName: "Series & Películas",
    tagline: "Ultra HD 4K • Perfil Privado con PIN",
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
      "Calidad Ultra HD 4K + HDR",
      "Perfil 100% privado con PIN personal",
      "Descargas sin conexión disponibles",
      "Garantía total durante todo el mes",
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
    categoryName: "Series, Películas & Deportes",
    tagline: "Disney, Pixar, Marvel, Star Wars & ESPN",
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
      "Todo Disney, Pixar, Marvel y Star Wars",
      "Deportes en vivo con señal ESPN (Fútbol, F1, Tenis)",
      "Resolución hasta 4K Ultra HD",
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
    categoryName: "Series & Películas",
    tagline: "HBO, Warner Bros, Discovery & DC Universe",
    color: "#7c3aed",
    secondaryColor: "#a855f7",
    glowColor: "rgba(124, 58, 237, 0.45)",
    themeName: "Púrpura Galáctico Max",
    badge: "Estrenos de Cine",
    priceUSD: 3.00,
    pricePeriod: "mes",
    iconUrl: "assets/icons/max.svg",
    logoSvg: `<img src="assets/icons/max.svg" alt="Max" class="platform-logo-img" loading="lazy">`,
    features: [
      "Series galardonadas de HBO y HBO Originals",
      "Películas taquilleras de Warner Bros",
      "Audio envolvente y resolución 4K HDR",
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
    tagline: "Amazon Originals, Cine Mundial & Series",
    color: "#0284c7",
    secondaryColor: "#f59e0b",
    glowColor: "rgba(2, 132, 199, 0.45)",
    themeName: "Cian & Dorado Prime",
    badge: "Excelente Calidad",
    priceUSD: 3.00,
    pricePeriod: "mes",
    iconUrl: "assets/icons/primevideo.svg",
    logoSvg: `<img src="assets/icons/primevideo.svg" alt="Prime Video" class="platform-logo-img" loading="lazy">`,
    features: [
      "Series originales: The Boys, Los Anillos de Poder, Invincible",
      "Resolución 4K Ultra HD y HDR10+",
      "Perfil propio con PIN de seguridad",
      "Descargas para ver sin internet",
      "Garantía de servicio 30 días"
    ],
    devices: ["Smart TV", "Celulares", "Fire TV", "Tablets", "PC"],
    plans: [
      { name: "1 Mes - Perfil Privado", priceUSD: 3.00, period: "1 mes", popular: true, desc: "Acceso individual en alta definición." }
    ]
  },
  {
    id: "paramount",
    name: "Paramount+",
    shortName: "Paramount+",
    category: "cinema",
    categoryName: "Series, Películas & Deportes",
    tagline: "Showtime, Paramount Pictures & Fútbol",
    color: "#2563eb",
    secondaryColor: "#60a5fa",
    glowColor: "rgba(37, 99, 235, 0.45)",
    themeName: "Cobalto Paramount",
    badge: "Fútbol en Vivo",
    priceUSD: 3.00,
    pricePeriod: "mes",
    iconUrl: "assets/icons/paramount.svg",
    logoSvg: `<img src="assets/icons/paramount.svg" alt="Paramount+" class="platform-logo-img" loading="lazy">`,
    features: [
      "Fútbol internacional en vivo según región",
      "Universo Star Trek, Yellowstone y South Park",
      "Contenido familiar y Nickelodeon",
      "Perfil privado con clave PIN",
      "Soporte continuo en WhatsApp"
    ],
    devices: ["Smart TV", "Celulares", "Roku", "Tablets", "PC"],
    plans: [
      { name: "1 Mes - Perfil Privado", priceUSD: 3.00, period: "1 mes", popular: true, desc: "Partidos en vivo y series completas." }
    ]
  },
  {
    id: "vix",
    name: "ViX Premium",
    shortName: "ViX",
    category: "cinema",
    categoryName: "Series, Cine & Deportes",
    tagline: "Fútbol en vivo y series en español",
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
      "Liga MX y partidos de fútbol exclusivos",
      "Novelas clásicas y estrenos originales en español",
      "Canales en vivo y contenido a demanda",
      "Sin comerciales molestos",
      "Perfil privado individual"
    ],
    devices: ["Smart TV", "Roku", "Celulares", "Tablets", "PC"],
    plans: [
      { name: "1 Mes - ViX Premium", priceUSD: 3.00, period: "1 mes", popular: true, desc: "Fútbol en vivo y producciones en tu idioma." }
    ]
  },
  {
    id: "appletv",
    name: "Apple TV+",
    shortName: "Apple TV+",
    category: "cinema",
    categoryName: "Series & Películas",
    tagline: "Máxima tasa de bits 4K y producciones galardonadas",
    color: "#f8fafc",
    secondaryColor: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.45)",
    themeName: "Titanio Sideral Apple",
    badge: "Calidad de Cine",
    priceUSD: 3.00,
    pricePeriod: "mes",
    iconUrl: "assets/icons/appletv.svg",
    logoSvg: `<img src="assets/icons/appletv.svg" alt="Apple TV+" class="platform-logo-img" loading="lazy">`,
    features: [
      "Series consagradas: Ted Lasso, Severance, Silo",
      "La calidad de video más alta en 4K Dolby Vision",
      "Audio espacial Dolby Atmos",
      "Funciona en Smart TVs Samsung, LG, Fire TV, Android y Apple",
      "Perfil privado individual"
    ],
    devices: ["Apple TV & iPhone", "Smart TV Samsung / LG", "Google TV", "Roku & Fire TV", "PC / Mac"],
    plans: [
      { name: "1 Mes - Perfil Privado", priceUSD: 3.00, period: "1 mes", popular: true, desc: "Cine y series con la más alta fidelidad." }
    ]
  },
  {
    id: "spotify",
    name: "Spotify Premium",
    shortName: "Spotify",
    category: "music",
    categoryName: "Música & Podcasts",
    tagline: "Más de 100M de canciones sin anuncios",
    color: "#10b981",
    secondaryColor: "#06b6d4",
    glowColor: "rgba(16, 185, 129, 0.45)",
    themeName: "Esmeralda Aurora Spotify",
    badge: "Música Sin Límites",
    priceUSD: 3.00,
    pricePeriod: "mes",
    iconUrl: "assets/icons/spotify.svg",
    logoSvg: `<img src="assets/icons/spotify.svg" alt="Spotify" class="platform-logo-img" loading="lazy">`,
    features: [
      "Música y podcasts sin ningún anuncio",
      "Descarga de canciones para escuchar sin datos",
      "Audio en muy alta calidad (320 kbps)",
      "Saltos de canciones ilimitados",
      "A tu propia cuenta o cuenta nueva garantizada"
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
    tagline: "1 Año Completo con todas las funciones Pro desbloqueadas",
    color: "#06b6d4",
    secondaryColor: "#8b5cf6",
    glowColor: "rgba(6, 182, 212, 0.45)",
    themeName: "Turquesa & Violeta Canva",
    badge: "✨ Plan Anual $4",
    priceUSD: 4.00,
    pricePeriod: "año",
    iconUrl: "assets/icons/canva.svg",
    logoSvg: `<img src="assets/icons/canva.svg" alt="Canva Pro" class="platform-logo-img" loading="lazy">`,
    features: [
      "1 Año completo (365 días) de acceso Canva Pro",
      "Millones de plantillas premium, fotos, videos y tipografías",
      "Quitafondos mágico en 1 clic (Magic Eraser)",
      "Kit de marca y redimensionamiento mágico de diseños",
      "Activación a tu propio correo electrónico personal"
    ],
    devices: ["Navegador Web PC/Mac", "App Celulares Android & iOS", "Tablets / iPads"],
    plans: [
      { name: "1 Año Completo - Canva Pro", priceUSD: 4.00, period: "1 año", popular: true, desc: "Acceso anual ilimitado a tu propio correo." }
    ]
  }
];

const ADVANTAGES = [
  {
    icon: "zap",
    title: "Activación Inmediata",
    desc: "Recibe tus credenciales en menos de 5 minutos por WhatsApp tras confirmar tu pago."
  },
  {
    icon: "shield-check",
    title: "Perfiles 100% Privados con PIN",
    desc: "Cada perfil cuenta con su propio PIN de seguridad, historial independiente y descargas."
  },
  {
    icon: "life-buoy",
    title: "Garantía & Soporte Continuo",
    desc: "Cobertura total durante todo el mes contratado. Soporte humano disponible en todo momento."
  },
  {
    icon: "tv",
    title: "Compatibilidad Universal",
    desc: "Disfruta en Smart TV (Samsung, LG, Sony), Roku, Fire Stick, celulares iOS/Android y PC/Mac."
  },
  {
    icon: "sparkles",
    title: "Calidad 4K HDR & Dolby Atmos",
    desc: "Plataformas configuradas en su máxima resolución y fidelidad de audio posible."
  },
  {
    icon: "refresh-cw",
    title: "Renovación Sin Pérdida de Datos",
    desc: "Renueva mes a mes manteniendo tu mismo perfil, tu lista y tus recomendaciones."
  }
];

const FAQS = [
  {
    question: "¿Cuáles son los precios de los servicios?",
    answer: "Nuestra tarifa es simple y transparente: Cualquier aplicación individual tiene un costo de $3 al mes (o su equivalente en tu moneda local). Si adquieres un Combo de 2 aplicaciones, el precio especial es de solo $5. Además, contamos con Canva Pro Anual por solo $4 el año completo."
  },
  {
    question: "¿Cómo funciona el Combo de 2 aplicaciones por $5?",
    answer: "Puedes elegir libremente cualquiera de las 2 plataformas que prefieras (por ejemplo Netflix + Disney+, o Max + Prime Video, etc.) y en lugar de pagar $6 ($3 por cada una), pagas únicamente $5 por ambas cuentas."
  },
  {
    question: "¿Cómo recibo mi cuenta o perfil tras pagar?",
    answer: "El proceso es 100% digital e inmediato. Una vez confirmes tu pago por WhatsApp, te entregamos los datos de acceso y tu PIN privado en menos de 5 minutos."
  },
  {
    question: "¿Los perfiles son compartidos o privados?",
    answer: "Ofrecemos perfiles estrictamente privados con PIN de 4 dígitos. Nadie más entra a tu pantalla, garantizando que tu historial y recomendaciones sean exclusivos para ti."
  },
  {
    question: "¿Qué garantía tengo si el servicio presenta algún inconveniente?",
    answer: "Cuentas con garantía completa durante los 30 días de servicio (o los 365 días en el caso de Canva Pro). Cualquier eventualidad la resolvemos en minutos por WhatsApp."
  },
  {
    question: "¿Cuáles son los métodos de pago aceptados?",
    answer: "Aceptamos Nequi, Daviplata, Bancolombia, MercadoPago, SPEI/OXXO en México, transferencias bancarias, Zelle, Binance Pay (USDT) y PayPal. Consulta con tu asesor el medio más cómodo para tu país."
  }
];

const TESTIMONIALS = [
  {
    name: "Alejandro Morales",
    city: "Bogotá, Colombia",
    rating: 5,
    date: "Hace 2 días",
    comment: "Llevo varios meses con el combo de 2 aplicaciones por $5 (Netflix y Disney+). La entrega fue en menos de 3 minutos por WhatsApp y el perfil con PIN funciona perfecto en mi Smart TV.",
    plan: "Combo 2 Apps x $5"
  },
  {
    name: "Mariana Silva",
    city: "Ciudad de México",
    rating: 5,
    date: "Hace 4 días",
    comment: "Compré Canva Pro Anual a $4 y me lo activaron a mi propio correo. Funciona excelente para mis diseños de la universidad y redes.",
    plan: "Canva Pro Anual ($4)"
  },
  {
    name: "Carlos Villalobos",
    city: "Santiago, Chile",
    rating: 5,
    date: "Hace 1 semana",
    comment: "Excelente servicio y precios claros: $3 por plataforma y $5 por dos. El soporte es súper amable y rápido.",
    plan: "Netflix 4K ($3)"
  }
];

/**
 * Knowledge Base para el Asistente Inteligente "Orbit"
 * Analiza preferencias de los usuarios para recomendar plataformas y combos óptimos
 */
const ORBITA_AI_KB = {
  // Botones Rápidos (Chips) en la consola: Opciones individuales ($3 y $4) y Combos ($5)
  presets: [
    {
      id: "single_cinema",
      label: "🍿 1 Sola: Series & Cine ($3)",
      prompt: "Quiero 1 sola aplicación para ver series y películas taquilleras",
      recommendIds: ["netflix"],
      isCombo: false,
      price: 3.00,
      title: "Netflix Premium 4K (1 Pantalla)",
      badge: "1 Aplicación Individual",
      reason: "Si buscas **1 sola aplicación** para ver las mejores series mundiales y estrenos de cine, **Netflix Premium** es la elección #1. Tienes catálogo gigantesco en Ultra HD 4K, perfil 100% privado con tu propio PIN y descargas offline por solo $3.00 al mes.",
      tip: "💡 Si luego deseas sumar otra plataforma, con nuestro Combo Dúo te llevas 2 pantallas por solo $5/mes (ahorras $1/mes)."
    },
    {
      id: "single_sports",
      label: "⚽ 1 Sola: Fútbol en Vivo ($3)",
      prompt: "Quiero 1 sola aplicación para ver fútbol y deportes en vivo",
      recommendIds: ["disneyplus"],
      isCombo: false,
      price: 3.00,
      title: "Disney+ con ESPN en Vivo (1 Pantalla)",
      badge: "1 Aplicación Individual",
      reason: "Para disfrutar del deporte rey con **1 sola aplicación**, **Disney+** es la mejor opción: incluye la señal en vivo de ESPN con la Champions League, Premier League, F1, tenis de Grand Slam y ligas internacionales por solo $3.00 al mes con perfil privado y PIN.",
      tip: "💡 Si eres fanático de la Liga MX o fútbol en español, también puedes combinarla con ViX Premium por solo $5/mes en Combo Dúo."
    },
    {
      id: "combo_duo",
      label: "⚡ Combo Dúo (2 Apps x $5)",
      prompt: "Recomiéndame el mejor combo de 2 aplicaciones por $5",
      recommendIds: ["netflix", "disneyplus"],
      isCombo: true,
      price: 5.00,
      title: "Combo Dúo Rey: Netflix + Disney+",
      badge: "Combo Dúo (2 Pantallas)",
      reason: "¡El combo más popular y completo de Órbita Streaming! Reúnes las series globales de Netflix con todo el deporte en vivo de ESPN y el cine de Disney, Marvel y Star Wars. Dos pantallas privadas con PIN por solo $5.00 al mes en total (en lugar de $6).",
      tip: "⚡ Al activar tu combo te entregamos ambas credenciales y tus PINs privados en menos de 5 minutos."
    },
    {
      id: "music",
      label: "🎧 1 Sola: Spotify ($3)",
      prompt: "Quiero 1 sola aplicación para escuchar música sin anuncios",
      recommendIds: ["spotify"],
      isCombo: false,
      price: 3.00,
      title: "Spotify Premium Individual",
      badge: "1 Aplicación Individual",
      reason: "Para música y podcasts continuos con **1 sola aplicación**, **Spotify Premium** te da más de 100 millones de canciones sin cortes comerciales, audio de máxima calidad (320 kbps) y descargas sin internet por solo $3.00 al mes.",
      tip: "💡 También puedes combinar Spotify + Netflix en Combo Dúo por solo $5/mes."
    },
    {
      id: "tools",
      label: "🎨 1 Sola: Canva Pro Anual ($4)",
      prompt: "Quiero Canva Pro para diseño gráfico y redes sociales",
      recommendIds: ["canva"],
      isCombo: false,
      price: 4.00,
      title: "Canva Pro Anual (365 Días)",
      badge: "Plan Anual de Productividad",
      reason: "¡La mejor inversión para creadores y estudiantes! Obtienes 1 año completo (365 días) de Canva Pro por solo $4.00/año (menos de $0.35 al mes). Quitafondos mágico en 1 clic, kit de marca y millones de recursos premium activados directo a tu correo.",
      tip: "✨ Garantía completa durante todo el año de servicio."
    },
    {
      id: "combo_cine",
      label: "🎬 Combo Dúo: Netflix + Max ($5)",
      prompt: "Quiero un combo de 2 aplicaciones para cine y series galardonadas",
      recommendIds: ["netflix", "hbomax"],
      isCombo: true,
      price: 5.00,
      title: "Combo Dúo Cinéfilo: Netflix + Max (HBO)",
      badge: "Combo Dúo (2 Pantallas)",
      reason: "La combinación definitiva para amantes del cine: los fenómenos virales de Netflix más las series multipremiadas de HBO (House of the Dragon, The Last of Us) y estrenos taquilleros de Warner Bros por solo $5.00 al mes en lugar de $6.",
      tip: "⚡ Ambas con perfil privado, PIN exclusivo y resolución 4K Ultra HD."
    },
    {
      id: "family",
      label: "👨‍👩‍👧 1 Sola: Familia & Niños ($3)",
      prompt: "Quiero 1 sola aplicación con contenido infantil y seguro para niños",
      recommendIds: ["disneyplus"],
      isCombo: false,
      price: 3.00,
      title: "Disney+ Familiar (1 Pantalla)",
      badge: "1 Aplicación Individual",
      reason: "Para niños y familia con **1 sola aplicación**, **Disney+** es la reina: catálogo completo de Pixar, clásicos de Disney, Marvel, Star Wars y National Geographic en un entorno con control parental seguro por solo $3.00 al mes.",
      tip: "💡 Si quieres sumar todo Nickelodeon (Paw Patrol, Bob Esponja), puedes pedir el Combo Disney+ & Paramount+ por $5/mes."
    }
  ],

  // Perfiles Individuales para cada una de las 9 Plataformas ($3 / $4)
  platforms: {
    netflix: {
      name: "Netflix Premium 4K",
      price: 3.00,
      period: "mes",
      badge: "1 Aplicación Individual",
      reason: "Netflix Premium es la reina indiscutible del streaming: catálogo inmenso con estrenos mundiales semanales (Stranger Things, Merlina, El Juego del Calamar), perfil 100% privado con tu propio PIN y resolución Ultra HD 4K por solo $3.00 al mes.",
      partnerId: "disneyplus",
      partnerReason: "Si te interesa armar Combo Dúo, combinarla con Disney+ te da la dupla de entretenimiento más completa por solo $5/mes."
    },
    disneyplus: {
      name: "Disney+ con ESPN",
      price: 3.00,
      period: "mes",
      badge: "1 Aplicación Individual",
      reason: "Disney+ te ofrece lo mejor de dos mundos: deportes en vivo con toda la señal de ESPN (Champions League, Premier, F1, tenis) más películas de Disney, Pixar, Marvel y Star Wars por solo $3.00 al mes con perfil privado con PIN.",
      partnerId: "netflix",
      partnerReason: "En Combo Dúo con Netflix tienes deportes en vivo y las series más virales por solo $5/mes."
    },
    hbomax: {
      name: "Max (HBO)",
      price: 3.00,
      period: "mes",
      badge: "1 Aplicación Individual",
      reason: "Max (HBO) cuenta con las producciones de mayor prestigio del mundo: House of the Dragon, The Last of Us, Succession, el universo DC Comics y estrenos de cine de Warner Bros en Ultra HD 4K por solo $3.00 al mes.",
      partnerId: "netflix",
      partnerReason: "Puedes sumarle Netflix en Combo Dúo Cinéfilo por solo $5/mes."
    },
    primevideo: {
      name: "Amazon Prime Video",
      price: 3.00,
      period: "mes",
      badge: "1 Aplicación Individual",
      reason: "Prime Video destaca por superproducciones exclusivas como The Boys, Los Anillos de Poder, Invincible y un enorme catálogo de cine taquillero con descargas offline por solo $3.00 al mes.",
      partnerId: "disneyplus",
      partnerReason: "Puedes armar combo con Disney+ para tener cine y deportes por solo $5/mes."
    },
    paramount: {
      name: "Paramount+",
      price: 3.00,
      period: "mes",
      badge: "1 Aplicación Individual",
      reason: "Paramount+ combina fútbol internacional en vivo, producciones como Yellowstone, Halo, Star Trek y todo el catálogo de Nickelodeon para niños (Bob Esponja, Paw Patrol) por solo $3.00 al mes.",
      partnerId: "disneyplus",
      partnerReason: "En Combo Dúo con Disney+ tienes la experiencia familiar e infantil definitiva por $5/mes."
    },
    vix: {
      name: "ViX Premium",
      price: 3.00,
      period: "mes",
      badge: "1 Aplicación Individual",
      reason: "ViX Premium es la plataforma número 1 para el fútbol mexicano (Liga MX), partidos en vivo exclusivos, telenovelas clásicas y contenido 100% en español sin comerciales por solo $3.00 al mes.",
      partnerId: "disneyplus",
      partnerReason: "Junto a Disney+ (ESPN) armas el combo deportivo definitivo por solo $5/mes."
    },
    appletv: {
      name: "Apple TV+",
      price: 3.00,
      period: "mes",
      badge: "1 Aplicación Individual",
      reason: "Apple TV+ ofrece la tasa de bits 4K Dolby Vision y Dolby Atmos más alta de la industria, con producciones aclamadas por la crítica como Ted Lasso, Severance, Silo y The Morning Show por solo $3.00 al mes.",
      partnerId: "hbomax",
      partnerReason: "Combinada con Max (HBO) armas el combo de ultra alta fidelidad cinematográfica por $5/mes."
    },
    spotify: {
      name: "Spotify Premium",
      price: 3.00,
      period: "mes",
      badge: "1 Aplicación Individual",
      reason: "Spotify Premium te da acceso ilimitado a más de 100 millones de canciones y podcasts con la máxima calidad de audio (320 kbps), descargas para escuchar sin internet y cero publicidad por solo $3.00 al mes.",
      partnerId: "netflix",
      partnerReason: "Puedes llevarte Spotify + Netflix en Combo Dúo por solo $5/mes."
    },
    canva: {
      name: "Canva Pro Anual (365 Días)",
      price: 4.00,
      period: "año",
      badge: "Plan Anual $4",
      reason: "Canva Pro Anual es la herramienta imprescindible para creadores, estudiantes y emprendedores: quitafondos mágico en 1 clic, kit de marcas, millones de plantillas y funciones de IA por solo $4.00 el año completo (menos de $0.35/mes).",
      partnerId: "netflix",
      partnerReason: "Te la activamos directo a tu propio correo electrónico en menos de 5 minutos."
    }
  },

  // Categorías de Recomendación Semántica
  categories: {
    sports: {
      singleId: "disneyplus",
      comboIds: ["disneyplus", "vix"],
      singleTitle: "Disney+ con ESPN en Vivo (1 Pantalla)",
      comboTitle: "Combo Dúo Gol: Disney+ (ESPN) & ViX Premium",
      singleReason: "Para ver deportes en vivo con **1 sola aplicación**, **Disney+** es la mejor opción: incluye la señal completa de ESPN con Champions League, ligas europeas, F1 y tenis de Grand Slam por solo $3.00 al mes con perfil privado.",
      comboReason: "¡Para los apasionados del deporte rey! Con Disney+ tienes ESPN (Champions League y torneos internacionales) y con ViX Premium sumas la Liga MX y partidos exclusivos en español. ¡Ambas por solo $5.00 al mes en lugar de $6!"
    },
    cinema: {
      singleId: "netflix",
      comboIds: ["netflix", "hbomax"],
      singleTitle: "Netflix Premium 4K (1 Pantalla)",
      comboTitle: "Combo Dúo Cinéfilo: Netflix + Max (HBO)",
      singleReason: "Para ver series mundiales y películas taquilleras con **1 sola aplicación**, **Netflix Premium** es la líder mundial: perfil individual con clave PIN, calidad Ultra HD 4K y descargas offline por solo $3.00 al mes.",
      comboReason: "La dupla de entretenimiento más poderosa: los éxitos virales de Netflix más las producciones de culto de HBO Max (House of the Dragon, The Last of Us) y cine de Warner en 4K por solo $5.00 al mes."
    },
    music: {
      singleId: "spotify",
      comboIds: ["spotify", "netflix"],
      singleTitle: "Spotify Premium Individual",
      comboTitle: "Combo Entretenimiento Total: Spotify + Netflix",
      singleReason: "**Spotify Premium** es la app ideal si buscas **1 sola plataforma** para escuchar música y podcasts: más de 100M de canciones sin anuncios, audio en alta fidelidad y descargas sin datos por solo $3.00 al mes.",
      comboReason: "¡Cubre tu día al 100%! Música ilimitada sin comerciales para el trabajo o gimnasio con Spotify, y series y películas para relajarte en la noche con Netflix por solo $5.00 al mes."
    },
    tools: {
      singleId: "canva",
      comboIds: ["canva", "netflix"],
      singleTitle: "Canva Pro Anual (365 Días)",
      comboTitle: "Canva Pro Anual ($4/año) + Netflix ($3/mes)",
      singleReason: "Para diseño gráfico, redes sociales y trabajo, **Canva Pro Anual** a solo $4.00/año es imbatible: acceso directo a tu propio correo, quitafondos mágico y recursos premium ilimitados.",
      comboReason: "Potencia tus diseños y contenidos con Canva Pro Anual ($4/año) y añade Netflix ($3/mes) para tus momentos de ocio con entrega inmediata."
    },
    family: {
      singleId: "disneyplus",
      comboIds: ["disneyplus", "paramount"],
      singleTitle: "Disney+ Familiar (1 Pantalla)",
      comboTitle: "Combo Dúo Familiar: Disney+ & Paramount+",
      singleReason: "Para niños y familia con **1 sola aplicación**, **Disney+** ofrece todo Pixar, clásicos Disney, Marvel y Star Wars en un espacio seguro por solo $3.00 al mes.",
      comboReason: "La combinación familiar más completa: Disney+ con todo Disney, Pixar y Marvel, y Paramount+ con todo Nickelodeon (Bob Esponja, Paw Patrol) por solo $5.00 al mes."
    },
    quality: {
      singleId: "appletv",
      comboIds: ["appletv", "hbomax"],
      singleTitle: "Apple TV+ 4K Dolby Vision (1 Pantalla)",
      comboTitle: "Combo Ultra Fidelidad 4K: Apple TV+ & Max",
      singleReason: "Si buscas la máxima calidad de imagen y sonido en **1 sola aplicación**, **Apple TV+** destaca con la tasa de bits 4K Dolby Vision y Dolby Atmos más pura del mercado por solo $3.00 al mes.",
      comboReason: "Para disfrutar en Smart TVs 4K de gran formato: la fidelidad audiovisual impecable de Apple TV+ junto a los estrenos taquilleros de Max en 4K HDR por solo $5.00 al mes."
    },
    novelas: {
      singleId: "vix",
      comboIds: ["vix", "netflix"],
      singleTitle: "ViX Premium (1 Pantalla)",
      comboTitle: "Combo Pasión Latina: ViX Premium & Netflix",
      singleReason: "Para telenovelas en español, series latinas y fútbol mexicano con **1 sola aplicación**, **ViX Premium** te da acceso sin cortes comerciales por solo $3.00 al mes.",
      comboReason: "Combina lo mejor de las novelas y fútbol latino de ViX con el catálogo mundial de series y películas de Netflix por solo $5.00 al mes."
    }
  }
};

// Exponer explícitamente en el objeto global window
window.ORBITA_CONFIG = ORBITA_CONFIG;
window.DEFAULT_COSMIC_THEME = DEFAULT_COSMIC_THEME;
window.STREAMING_PLATFORMS = STREAMING_PLATFORMS;
window.ADVANTAGES = ADVANTAGES;
window.FAQS = FAQS;
window.TESTIMONIALS = TESTIMONIALS;
window.ORBITA_AI_KB = ORBITA_AI_KB;
