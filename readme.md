# T1 Creative Coding Web Tools
## Idée

Un générateur de moodboard qui permet à l’utilisateur de composer automatiquement ou manuellement une planche d’inspiration visuelle à partir d’images, de couleurs ou de mots-clés.
Un outil utile pour les designers ou toute personne cherchant à définir une ambiance visuelle pour un projet.
- Images
- Couleurs
- [Références ](https://https://www.cosmos.so/e/967870254)

## Description de l'outil
L’outil génère automatiquement un ensemble d’images et de palettes de couleurs à partir des paramètres ou mots-clés saisis dans la console. Les données entrées sont traitées pour produire une composition visuelle dynamique (moodboard) qui regroupe des références visuelles cohérentes avec les critères définis.
Ce moodboard sert de support visuel interactif pour l’exploration et la recherche d’idées dans le cadre d’un projet de conception (design, graphisme, architecture, etc.).

## Les snippets :

Découpage des bouts de code pour le projet : 

- Afficher des images suite à une recherche
```js
let img;

function preload() {
  img = loadImage("https://picsum.photos/400/300"); // image aléatoire
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);
  image(img, 0, 0, width, height);
  filter(GRAY); // essaie aussi: INVERT, THRESHOLD, BLUR
}
```

- Choisir les différents paramètres : couleurs, mots clés
 ```js 
let colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];
let currentColor = "#000";

function setup() {
  createCanvas(600, 400);
  createButtons();
}

function draw() {
  background(currentColor);
}

function createButtons() {
  for (let i = 0; i < colors.length; i++) {
    let btn = createButton(colors[i]);
    btn.style("background-color", colors[i]);
    btn.style("color", "#fff");
    btn.mousePressed(() => currentColor = colors[i]);
  }
}
```
- Afficher une gallerie d'image
  
```js
<div id="gallery"></div>

<script>
  // Tableau d'URLs d'images à remplir
  const images = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg'
  ];

  // Création de la galerie
  const gallery = document.getElementById('gallery');
  gallery.style.display = 'grid';
  gallery.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
  gallery.style.gap = '10px';

  // Ajout des images dans la galerie
  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Image de la galerie';
    img.style.width = '100%';
    img.style.borderRadius = '6px';
    img.style.transition = 'transform 0.3s ease';
    img.onmouseover = () => img.style.transform = 'scale(1.05)';
    img.onmouseout = () => img.style.transform = 'scale(1)';
    gallery.appendChild(img);
  });
</script>
```
- Parcourir les images
  
```js
<div id="viewer">
  <button id="prev">⟨</button>
  <img id="image" src="" alt="image" />
  <button id="next">⟩</button>
</div>

<script>
  // 🔸 Liste des images à parcourir
  const images = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg'
  ];

  let index = 0;
  const img = document.getElementById('image');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');

  // 🔹 Mise en forme rapide (facultative)
  const viewer = document.getElementById('viewer');
  viewer.style.display = 'flex';
  viewer.style.alignItems = 'center';
  viewer.style.justifyContent = 'center';
  viewer.style.gap = '10px';

  img.style.width = '400px';
  img.style.height = '300px';
  img.style.objectFit = 'cover';
  img.style.borderRadius = '8px';

  // 🔹 Fonction d’affichage
  function showImage(i) {
    img.src = images[i];
  }

  // 🔹 Gestion des boutons
  prev.onclick = () => {
    index = (index - 1 + images.length) % images.length;
    showImage(index);
  };

  next.onclick = () => {
    index = (index + 1) % images.length;
    showImage(index);
  };

  // Afficher la première image au chargement
  showImage(index);
</script>
```


  