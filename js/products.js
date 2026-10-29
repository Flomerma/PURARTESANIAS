/* =========================================================
   CATÁLOGO DE PRODUCTOS
   - Para agregar un producto copiá un bloque { ... } y cambiá los datos.
   - "precio" en pesos argentinos (número sin puntos). Usá null para "Consultar".
   - "imagen" es la ruta a la foto dentro de /img/productos/.
   - "opciones" es opcional: el cliente elige una (talle, modelo, etc.).
   - "destacado: true" lo muestra primero.
   - "agotado: true" lo muestra pero no se puede pedir.
   ========================================================= */

window.CATEGORIAS = [
  { id: "instrumentos", nombre: "Instrumentos" },
  { id: "anillos", nombre: "Anillos" },
  { id: "collares", nombre: "Collares y dijes" },
  { id: "pulseras", nombre: "Pulseras" },
  { id: "tallados", nombre: "Tallados en piedra" },
  { id: "piedras", nombre: "Piedras y cristales" },
];

window.PRODUCTOS = [
  {
    id: "ocarina-grabada",
    nombre: "Ocarina de barro grabada",
    categoria: "instrumentos",
    precio: 15000,
    imagen: "img/productos/ocarina-grabada.jpg",
    descripcion:
      "Ocarina de cerámica cocida y grabada a mano con motivos andinos. Sonido dulce y profundo. Incluye tabla de digitación para empezar a tocar.",
    opciones: { nombre: "Diseño", valores: ["Espiral", "Sol", "Llama", "Sorpresa"] },
    destacado: true,
  },
  {
    id: "ocarinas-surtidas",
    nombre: "Ocarina colgante",
    categoria: "instrumentos",
    precio: 10000,
    imagen: "img/productos/ocarinas-surtidas.jpg",
    descripcion:
      "Ocarina pequeña de barro con cordón para llevar colgada. Cada pieza es única, con su propio grabado.",
    opciones: { nombre: "Diseño", valores: ["Espiral", "Sol", "Sorpresa"] },
  },
  {
    id: "quena-pintada",
    nombre: "Quena pintada a mano",
    categoria: "instrumentos",
    precio: 18000,
    imagen: "img/productos/quena-pintada.jpg",
    descripcion:
      "Flauta andina de caña con guardas geométricas pintadas a mano. Ideal para regalar o para iniciarse en la música del norte.",
    opciones: { nombre: "Color", valores: ["Violeta", "Rojo", "Natural"] },
  },
  {
    id: "tamborcito",
    nombre: "Tamborcito pintado",
    categoria: "instrumentos",
    precio: 12000,
    imagen: "img/productos/tamborcito.jpg",
    descripcion:
      "Pequeño sonajero de tambor con paisajes de los cerros salteños pintados a mano. Un recuerdo colorido del norte.",
  },
  {
    id: "anillos-plata",
    nombre: "Anillo de plata",
    categoria: "anillos",
    precio: 20000,
    imagen: "img/productos/anillos-plata.jpg",
    descripcion:
      "Anillos de plata trabajados a mano: espirales, chakanas, nudos y formas libres. Consultanos por el modelo que te gustó.",
    opciones: { nombre: "Talle", valores: ["12", "14", "16", "18", "20", "22", "24", "A consultar"] },
    destacado: true,
  },
  {
    id: "anillos-piedra",
    nombre: "Anillo de plata con piedra",
    categoria: "anillos",
    precio: 25000,
    imagen: "img/productos/anillos-piedra.jpg",
    descripcion:
      "Anillo de plata con piedra natural engarzada: turquesa, ónix, malaquita, ojo de tigre y más.",
    opciones: { nombre: "Talle", valores: ["12", "14", "16", "18", "20", "22", "24", "A consultar"] },
  },
  {
    id: "anillos-madera",
    nombre: "Anillo de madera",
    categoria: "anillos",
    precio: 5000,
    imagen: "img/productos/anillos-madera.jpg",
    descripcion: "Anillo tallado en madera, liviano y cálido. Pulido a mano.",
    opciones: { nombre: "Talle", valores: ["14", "16", "18", "20", "22", "A consultar"] },
  },
  {
    id: "collar-amatista",
    nombre: "Collar con punta de cuarzo",
    categoria: "collares",
    precio: 22000,
    imagen: "img/productos/collar-amatista.jpg",
    descripcion:
      "Cadena de plata con punta de piedra natural. Amatista, cuarzo rosa, cuarzo cristal y otras piedras.",
    opciones: { nombre: "Piedra", valores: ["Amatista", "Cuarzo rosa", "Cuarzo cristal", "Otra"] },
    destacado: true,
  },
  {
    id: "colgante-agata",
    nombre: "Colgante de ágata engarzada",
    categoria: "collares",
    precio: 28000,
    imagen: "img/productos/colgante-agata.jpg",
    descripcion:
      "Rodaja de ágata natural engarzada en alambre dorado. Las vetas de cada piedra son irrepetibles.",
  },
  {
    id: "dijes-piedra",
    nombre: "Dije de piedra",
    categoria: "collares",
    precio: 12000,
    imagen: "img/productos/dijes-piedra.jpg",
    descripcion:
      "Dijes de piedras naturales con terminación en plata: lágrimas, óvalos y medallas. También aros a juego.",
  },
  {
    id: "brazaletes",
    nombre: "Brazalete de alpaca con nácar",
    categoria: "pulseras",
    precio: 30000,
    imagen: "img/productos/brazaletes.jpg",
    descripcion:
      "Brazalete rígido de alpaca con incrustaciones de nácar y piedra formando flores. Trabajo de orfebrería artesanal.",
    destacado: true,
  },
  {
    id: "pulsera-cadena",
    nombre: "Pulsera de plata",
    categoria: "pulseras",
    precio: 15000,
    imagen: "img/productos/pulsera-cadena.jpg",
    descripcion: "Pulsera fina de cadena de plata, sola o con un pequeño dije de piedra.",
  },
  {
    id: "rosario-onix",
    nombre: "Rosario de ónix",
    categoria: "tallados",
    precio: 10000,
    imagen: "img/productos/rosario-onix.jpg",
    descripcion:
      "Rosario de cuentas de ónix con cruz tallada. En versión larga o decenario.",
    opciones: { nombre: "Tipo", valores: ["Rosario largo", "Decenario"] },
  },
  {
    id: "figuras-onix",
    nombre: "Figura tallada en ónix",
    categoria: "tallados",
    precio: 8000,
    imagen: "img/productos/figuras-onix.jpg",
    descripcion:
      "Pequeñas figuras talladas a mano en ónix: búhos, llamas, tortugas, cactus y más animales de la región.",
    opciones: { nombre: "Figura", valores: ["Búho", "Llama", "Tortuga", "Cactus", "Sorpresa"] },
    destacado: true,
  },
  {
    id: "buho-piedra",
    nombre: "Búho grande de piedra",
    categoria: "tallados",
    precio: 45000,
    imagen: "img/productos/buho-piedra.jpg",
    descripcion:
      "Búho tallado en piedra con ojos de color. Pieza de decoración grande, guardián de la casa.",
  },
  {
    id: "esferas-onix",
    nombre: "Huevo de ónix",
    categoria: "tallados",
    precio: 14000,
    imagen: "img/productos/esferas-onix.jpg",
    descripcion: "Huevo de ónix pulido a mano, con vetas naturales verdes y blancas.",
  },
  {
    id: "geoda-amatista",
    nombre: "Geoda de amatista",
    categoria: "piedras",
    precio: 40000,
    imagen: "img/productos/geoda-amatista.jpg",
    descripcion:
      "Geoda de amatista natural. Tamaños y formas variables: consultanos y te mandamos fotos de las disponibles.",
    opciones: { nombre: "Tamaño", valores: ["Chica", "Mediana", "Grande"] },
    destacado: true,
  },
  {
    id: "piramide-onix",
    nombre: "Pirámide de ónix",
    categoria: "piedras",
    precio: 15000,
    imagen: "img/productos/piramide-onix.jpg",
    descripcion: "Pirámide de ónix pulida, para escritorio o altar.",
  },
];
