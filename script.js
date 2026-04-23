if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

let minScroll = 0;

window.addEventListener('scroll', () => {
  

  if (window.scrollY > minScroll) {
    minScroll = window.scrollY;
  } else if (window.scrollY < minScroll) {
    window.scrollTo(0, minScroll);
    return;
  }

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('progress-fill').style.width = progress + '%';

const titre = document.getElementById('titre-principal'); // ← change cette ligne
const flou = Math.min(scrollTop / 100, 8);
const opacite = Math.max(1 - scrollTop / 200, 0);
titre.style.filter = `blur(${flou}px)`;
titre.style.opacity = opacite;

});


// Splash screen
document.getElementById('titre-cliquable').addEventListener('click', () => {
  document.getElementById('splash').style.display = 'none';
});


// Données d'archive
const archives = {

    1: {
    titre: "Avenue Pie-X, Victoriaville",
    annee: "Photo d'archive — N.D.",
    texte: "On peut observer une entreprise de bois se situant sur l’avenue Pie-X <br> à Victoriaville. L’image provient du livre De mémoire, Victoriaville 2000, écrit par Claude Raymond.",
    image: "images/avenuepiex.jpg"
  },


    2: {
    titre: "Ancien hotel de ville de Victoriaville",
    annee: "Photo d'archive — N.D.",
    texte: "L’image est une archive provenant des Frères du Sacré-Coeur. <br> Elle est prise dans le livre De mémoire, Victoriaville 2000, écrit <br> par Claude Raymond. Une voit une vue de l’ancien hôtel de ville.</br>",
    image: "images/premierhotelvillevicto.jpg"
  },

  3: {
    titre: "Mont Arthabaska",
    annee: "Photo d'archive — 1946",
    texte: "Une vue aérienne du Mont Arthabaska en 1946.",
    image: "images/mont st-michel-2.jpg"
  },

    4: {
    titre: "Vue de l'Église Sainte-Victoire",
    annee: "Photo d'archive — 1946",
    texte: "Il s'agit d'une image d'archive provenant du Flick de la Ville <br> de Victoriaville. Le photographe est Jacques Foucault. On peut <br> voir encore beaucoup de terre agricole et, au loin, on voit <br> l'église de Sainte-Victoire.",
    image: "images/terredesjeunes1946.jpg"
  },

   5: {
    titre: "Quartier industrielle Victoriaville",
    annee: "Photo d'archive — vers 1970",
    texte: "Sur la vue aérienne, on distingue un secteur organisé par <br> de nouvelles voies routières et de grands bâtiments, avec <br> le développement résidentiel qui avance à proximité.",
    image: "images/Modifier/sectionindu1970.jpg"
  },

    6: {
    titre: "Réservoir Beaudet",
    annee: "Photo d'archive — vers 1970",
    texte: "« La belle famille de mon oncle s'est fait exproprier de leurs terres <br> pour que la ville construise le réservoir d'eau de la ville. » <br> - André Normand, agriculteur",
    image: "images/temoignages/avantreservoirbaudet.jpg"
  },

    7: {
    titre: "Secteur industriel de Victoriaville",
    annee: "Photo d'archive — vers 2000",
    texte: "Dans l'image ci-dessus, on peut voir une vue aérienne <br> du quartier industriel du Victoriaville en 2000.",
    image: "images/Modifier/Carte arthabaska 6.jpg"
  },

  8: {
    titre: "Ancienne ferme d'André Normand",
    annee: "Photo d'archive — vers 2010",
    texte: "« Il s'agit de l'ancienne étable en face de la maison <br> qu'on a démolie il y a quelques années. Elle se trouvait <br> où le réservoir Baudet est aujourd'hui. » <br> - André Normand",
    image: "images/temoignages/Vieilleimagemaison copy.jpg"
  }
};


// Overlay
const overlay  = document.getElementById('overlay');
const closeBtn = document.getElementById('close-btn');

document.querySelectorAll('.poi').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.id;
    const data = archives[id];
    if (!data) return;

    document.getElementById('archive-img').src           = data.image;
    document.getElementById('archive-img').alt = data.alt || data.titre;
    document.getElementById('archive-title').textContent = data.titre;
    document.getElementById('archive-year').textContent  = data.annee;
    document.getElementById('archive-text').innerHTML    = data.texte;

    overlay.classList.remove('hidden');
  });
});

closeBtn.addEventListener('click', () => overlay.classList.add('hidden'));
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.classList.add('hidden');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') overlay.classList.add('hidden');
});

// Pour les boutons des anciennes cartes et terres agricole 

// --- Bouton : changer la carte ---
const btnCarte  = document.getElementById('btn-toggle-carte');
const imgCarte  = document.getElementById('carte');

const carteActuelle = "images/arriereplan/carteactuellevicto2026v3.jpg";
const carteAncienne = "images/arriereplan/cartevicto1984v2.jpg";

let carteMode = 'actuelle';

btnCarte.addEventListener('click', () => {
  if (carteMode === 'actuelle') {
    imgCarte.src  = carteAncienne;
    btnCarte.textContent = " Carte actuelle";
    btnCarte.classList.add('actif');
    carteMode = 'ancienne';
  } else {
    imgCarte.src  = carteActuelle;
    btnCarte.textContent = " Carte ancienne";
    btnCarte.classList.remove('actif');
    carteMode = 'actuelle';
  }
});


// --- Bouton : révéler les zones agricoles ---
const btnZones  = document.getElementById('btn-toggle-zones');
const divZones  = document.getElementById('zones-agricoles');

let zonesVisibles = false;

btnZones.addEventListener('click', () => {
  zonesVisibles = !zonesVisibles;

  if (zonesVisibles) {
    divZones.classList.remove('hidden');
    btnZones.textContent = " Cacher les zones";
    btnZones.classList.add('actif');
  } else {
    divZones.classList.add('hidden');
    btnZones.textContent = " Pertes agricoles";
    btnZones.classList.remove('actif');
  }
});




// --- Bouton info ---
const btnInfo      = document.getElementById('btn-info');
const overlayInfo  = document.getElementById('overlay-info');
const closeInfo    = document.getElementById('close-info');

btnInfo.addEventListener('click', () => {
  overlayInfo.classList.remove('hidden');
});

closeInfo.addEventListener('click', () => {
  overlayInfo.classList.add('hidden');
});

overlayInfo.addEventListener('click', (e) => {
  if (e.target === overlayInfo) overlayInfo.classList.add('hidden');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') overlayInfo.classList.add('hidden');
});

// --- Bouton : révéler la carte d'origine ---

// --- Bouton : carte d'origine ---
const btnOrigine  = document.getElementById('btn-toggle-origine');
const imgOrigine  = document.getElementById('carte-origine');

let origineVisible = false;

btnOrigine.addEventListener('click', () => {
  origineVisible = !origineVisible;

  if (origineVisible) {
    imgOrigine.classList.remove('hidden');
    btnOrigine.textContent = "Cacher carte 1845";
    btnOrigine.classList.add('actif');
  } else {
    imgOrigine.classList.add('hidden');
    btnOrigine.textContent = "Carte 1845";
    btnOrigine.classList.remove('actif');
  }
});