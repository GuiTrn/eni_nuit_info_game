class Bateau {
  constructor(nom, x = 25, y = canvas.height / 2 - 25) { // x et y paramétrables avec des valeurs par défaut
    this.nom = nom;
    this.x = x; // Position X initiale
    this.y = y; // Position Y initiale
    this.width = 120; // Largeur du bateau
    this.height = 60; // Longueur du bateau (vue de dessus)
    this.speed = 5; // Vitesse du bateau
    this.hpMax = 100;
    this.hp = this.hpMax; // Points de vie du bateau (initialement 100)
    this.stocks = 3; // Nombre de vies du bateau
    this.score = 0; // Ajouter le score comme une propriété du bateau
    this.scoreMultiplier = 1;
    this.victories = 0;
    this.defeats = 0;

    // Ajouter des propriétés pour gérer le cooldown de tir
    this.shootCooldown = 10000; // Délai entre chaque tir (10 secondes)
    this.lastShootTime = 0; // Temps du dernier tir
  }

  // Les méthodes haut, bas, gauche, droite restent inchangées
  haut() {
    if (this.y > 0) {
      this.y -= this.speed;
    }
  }

  bas() {
    if (bateauJoueur.y + bateauJoueur.height < canvas.height) {
      this.y += this.speed;
    }
  }

  gauche() {
    if (bateauJoueur.x > 0) {
      this.x -= this.speed;
    }
  }

  droite() {
    if (bateauJoueur.x + bateauJoueur.width < canvas.width) {
      this.x += this.speed;
    }
  }

  // Vérifier la collision avec les débris
  checkCollisionWithDetritus(detritus) {
    for (let i = 0; i < detritus.length; i++) {
      const d = detritus[i];

      const distX = Math.abs(this.x + this.width / 2 - d.x);
      const distY = Math.abs(this.y + this.height / 2 - d.y);

      if (
        distX < this.width / 2 + d.radius &&
        distY < this.height / 2 + d.radius
      ) {
        this.score += 10 * this.scoreMultiplier; // Gagner 10 points
        detritus.splice(i, 1); // Supprimer le débris après collision
        i--; // Ajuster l'index
      }
    }
  }

  checkHp(bateauEnnemie) {
    if (this.hp <= 0) {
      this.stocks--;
      this.hp = this.hpMax;
    }

    if (this.stocks <= 0) {
      this.defeats++;
      bateauEnnemie.victories++;
      this.stocks = 3;
      this.hpMax = 100;
      this.hp = this.hpMax;
    }
  }

  // Fonction pour gérer le tir des projectiles avec cooldown
  shoot(mouseX, mouseY) {
    const currentTime = Date.now();

    if (currentTime - this.lastShootTime >= this.shootCooldown) {
      const angle = Math.atan2(mouseY - (this.y + this.height / 2), mouseX - (this.x + this.width / 2));
      projectiles.push(new Projectile(this, this.x + this.width / 2, this.y + this.height / 2, angle));

      this.lastShootTime = currentTime;
    }
  }

  // Dessiner le bateau
  draw() {
    ctx.fillStyle = '#3498db'; // Couleur bleue du bateau
    ctx.fillRect(this.x, this.y, this.width, this.height); // Dessiner le rectangle du bateau

    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';


    const currentTime = Date.now();
    const timeRemaining = Math.max(0, this.shootCooldown - (currentTime - this.lastShootTime));
    const cooldownSeconds = (timeRemaining / 1000).toFixed(1);

    ctx.fillText('<' + this.nom + '>', this.x + 10, this.y + this.height - 68);
    ctx.fillText('HP : ' + this.hp + '/' + this.hpMax, this.x + 10, this.y + this.height + 20);
    ctx.fillText('Vies : ' + this.stocks, this.x + 10, this.y + this.height + 40);
    ctx.fillText('Victoires : ' + this.victories, this.x + 10, this.y + this.height + 60);
    ctx.fillText('Défaites : ' + this.defeats, this.x + 10, this.y + this.height + 80);
    ctx.fillText('Score : ' + this.score, this.x + 10, this.y + this.height + 100);
    ctx.fillText('Multiplicateur : x' + this.scoreMultiplier, this.x + 10, this.y + this.height + 120);
    ctx.fillText('Prochain tir : ' + cooldownSeconds + 's', this.x + 10, this.y + this.height + 140);
  }
}