class Port {
  constructor(x = 0, y = 0) { // x et y paramétrables avec des valeurs par défaut
    this.width = 50; // Largeur du port
    this.height = canvas.height; // Hauteur du port, couvrant toute la hauteur du canvas
    this.x = x; // Position X du port
    this.y = y; // Position Y du port
    this.showMenu = false; // Variable pour savoir si le menu d'achat est affiché
  }

  // Vérifie si le bateau entre en collision avec le port
  checkCollision(bateau) {
    if (
      bateau.x < this.width && // Si le bateau est à gauche du port
      bateau.y + bateau.height > this.y && // Si le bateau est dans la zone verticale du port
      bateau.y < this.y + this.height // Si le bateau n'est pas en dehors du port
    ) {
      return true; // Collision détectée
    }

    return false; // Pas de collision
  }

  // Afficher le menu d'achat de power-ups
  showPowerUpMenu() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(100, 100, 300, 300); // Fond du menu

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Acheter des Power-Ups :', 120, 130);
    ctx.fillText('1. Soin (+50 PV) (-100 points)', 120, 170);
    ctx.fillText('2. Vitesse+ (-50 points)', 120, 210);
    ctx.fillText('3. PV+ (+50 PV MAX) (-150 points)', 120, 250);
    ctx.fillText('4. CD Tir- (-0.5 sec) (-200 points)', 120, 290);
    ctx.fillText('5. XScore+ (+0.5) (-250 points)', 120, 330);
    ctx.fillText('6. Vie+ (-300 points)', 120, 370);
    ctx.fillText('Appuyez sur les touches 1, 2, 3, 4, 5 ou 6 pour acheter.', 120, 410);
  }

  // Gérer l'achat de power-ups
  buyPowerUp(bateau, powerUpType) {
    if (powerUpType === 1 && bateau.score >= 50) {
      if (bateau.hpMax - bateau.hp < 50) {
        bateau.hp = bateau.hpMax;
      } else {
        bateau.hp += 50;
      }
      bateau.score -= 50; // Déduire 50 points du score
    } else if (powerUpType === 2 && bateau.score >= 100) {
      bateau.speed += 2; // Augmenter la vitesse du bateau
      bateau.score -= 100; // Déduire 100 points du score
    } else if (powerUpType === 3 && bateau.score >= 150) {
      bateau.hpMax += 50; // Ajouter 50 PV au bateau
      bateau.score -= 150; // Déduire 150 points du score
    } else if (powerUpType === 4 && bateau.score >= 200) {
      bateau.shootCooldown = Math.max(1000, bateau.shootCooldown - 2000); // Réduire le cooldown
      bateau.score -= 200; // Déduire 200 points du score
    } else if (powerUpType === 5 && bateau.score >= 250) {
      bateau.scoreMultiplier += 0.5; // Réduire le cooldown
      bateau.score -= 250; // Déduire 250 points du score
    } else if (powerUpType === 6 && bateau.score >= 300) {
      bateau.stocks++; // Réduire le cooldown
      bateau.score -= 300; // Déduire 300 points du score
    }
  }

  // Dessiner le port
  draw() {
    ctx.fillStyle = 'brown'; // Couleur du port (marron)
    ctx.fillRect(this.x, this.y, this.width, this.height); // Dessiner un rectangle pour le port
  }
}