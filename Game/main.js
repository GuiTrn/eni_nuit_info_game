// Initialisation du canvas et du contexte
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Définir la taille du canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialiser les objets du jeu
let bateauJoueur = new Bateau('Joueur');
let bateauIA = new Bateau('IA', canvas.width - 150, canvas.height / 2 - 25);

// Créer une instance de la classe Port
let portJoueur = new Port();
let portIA = new Port(canvas.width - 50, 0);
let projectiles = [];
let detritus = [];

// Variables pour gérer l'état du menu et de l'achat
let powerUpActive = false;

// Variables pour la souris et les touches
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;
let keys = {};

// Événements de clavier
window.addEventListener('keydown', e => {
  keys[e.key] = true;
});
window.addEventListener('keyup', e => {
  keys[e.key] = false;
});

// Événements de la souris pour viser
canvas.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Clic de souris pour tirer
canvas.addEventListener('click', () => {
  bateauJoueur.shoot(mouseX, mouseY); // Appel de la méthode shoot du bateau
});

// Acheter des power-ups en fonction des touches pressées
window.addEventListener('keydown', e => {
  if (portJoueur.showMenu) {
    if (e.key === '1') {
      portJoueur.buyPowerUp(bateauJoueur, 1); // Acheter la vitesse
    } else if (e.key === '2') {
      portJoueur.buyPowerUp(bateauJoueur, 2); // Ajouter des PV
    } else if (e.key === '3') {
      portJoueur.buyPowerUp(bateauJoueur, 3); // Agrandir le bateau
    } else if (e.key === '4') {
      portJoueur.buyPowerUp(bateauJoueur, 4); // Agrandir le bateau
    } else if (e.key === '5') {
      portJoueur.buyPowerUp(bateauJoueur, 5); // Agrandir le bateau
    } else if (e.key === '6') {
      portJoueur.buyPowerUp(bateauJoueur, 6); // Agrandir le bateau
    }
  }
});

let isGameRunning = true;

// Instancier l'IA
let ia = new IA(portIA);

// Mise à jour de la boucle de jeu pour inclure l'IA
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer l'écran

  // Mise à jour de l'IA
  ia.update(bateauIA, bateauJoueur, detritus);

  // Déplacer et mettre à jour les objets du joueur
  if (keys['z']) bateauJoueur.haut();
  if (keys['s']) bateauJoueur.bas();
  if (keys['q']) bateauJoueur.gauche();
  if (keys['d']) bateauJoueur.droite();

  bateauJoueur.checkCollisionWithDetritus(detritus);
  bateauIA.checkCollisionWithDetritus(detritus);

  // Vérifier les collisions avec les ports
  if (portJoueur.checkCollision(bateauJoueur)) portJoueur.showMenu = true;
  else portJoueur.showMenu = false;

  if (portIA.checkCollision(bateauIA)) portIA.showMenu = true;
  else portIA.showMenu = false;

  if (portJoueur.showMenu) portJoueur.showPowerUpMenu();

  if (portIA.showMenu) portIA.showPowerUpMenu();

  // Dessiner les éléments
  portJoueur.draw();
  portIA.draw();

  // Gérer les projectiles
  for (let p of projectiles) {
    if (p.checkCollision(bateauJoueur) || p.checkCollision(bateauIA)) {
      projectiles.splice(projectiles.indexOf(p), 1);
    }
    p.move();
    p.draw();
  }

  // Gérer les débris
  for (let d of detritus) {
    d.move();
    d.draw();
  }

  bateauJoueur.checkHp(bateauIA);
  bateauIA.checkHp(bateauJoueur);

  bateauJoueur.draw();
  bateauIA.draw();

  requestAnimationFrame(gameLoop);
}

// Spawner les débris à intervalles réguliers
setInterval(() => {
  detritus.push(new Detritus()); // Ajouter un débris toutes les secondes
}, 1000); // Intervalle de spawn des débris

// Démarrer la boucle de jeu
gameLoop();