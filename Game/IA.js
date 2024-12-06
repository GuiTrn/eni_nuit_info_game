class IA {
  constructor(portIA) {
    this.portIA = portIA; // Le port de l'IA
  }

  // Fonction pour calculer la distance entre deux points
  calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }

  // Fonction pour obtenir le débris le plus proche de l'IA
  getNearestDetritus(detritus) {
    let nearestDetritus = null;
    let minDistance = Infinity;

    for (let detritusItem of detritus) {
      const distance = this.calculateDistance(this.bateauIA.x, this.bateauIA.y, detritusItem.x, detritusItem.y);
      if (distance < minDistance) {
        minDistance = distance;
        nearestDetritus = detritusItem;
      }
    }
    return nearestDetritus;
  }

  // Fonction pour déplacer l'IA
  moveTo(x, y) {
    if (this.bateauIA.x < x) this.bateauIA.droite();
    if (this.bateauIA.x > x) this.bateauIA.gauche();
    if (this.bateauIA.y < y) this.bateauIA.bas();
    if (this.bateauIA.y > y) this.bateauIA.haut();
  }

  // Fonction pour l'IA qui gère son comportement
  update(bateauIA, bateauJoueur, detritus) {
    // Gérer le cooldown du tir
    const currentTime = Date.now();
    if (currentTime - bateauIA.lastShootTime >= this.bateauIA.shootCooldown) {
      bateauIA.cooldownTimer = 0;
    } else {
      bateauIA.cooldownTimer = bateauIA.shootCooldown - (currentTime - bateauIA.lastShootTime);
    }

    // Si l'IA est en cooldown, elle doit garder ses distances
    if (this.cooldownTimer > 0) {
      // Rester à distance du bateau ennemi
      const distanceToEnemy = this.calculateDistance(bateauIA.x, bateauIA.y, bateauJoueur.x, bateauJoueur.y);
      if (distanceToEnemy > 200) {
        this.moveTo(bateauJoueur.x, bateauJoueur.y); // Se rapprocher du bateau ennemi
      }
    } else {
      // Si le cooldown est terminé et qu'il n'y a pas de débris
      if (detritus.length === 0) {
        this.moveTo(bateauJoueur.x, bateauJoueur.y); // Se rendre vers le bateau ennemi et tirer
        this.bateauIA.shoot(bateauJoueur.x, bateauJoueur.y); // Lancer un tir
      } else {
        // Sinon, chercher un débris
        const nearestDetritus = this.getNearestDetritus(detritus);
        const distanceToDetritus = this.calculateDistance(bateauIA.x, bateauIA.y, nearestDetritus.x, nearestDetritus.y);
        const distanceToPort = this.calculateDistance(bateauIA.x, bateauIA.y, this.portIA.x, this.portIA.y);

        if (distanceToDetritus < distanceToPort) {
          // Si le débris le plus proche est plus proche que le port, aller vers le débris
          this.moveTo(nearestDetritus.x, nearestDetritus.y);
        } else {
          // Sinon, aller à son port pour acheter un power-up
          this.moveTo(this.portIA.x, this.portIA.y);
          this.portIA.buyPowerUp(bateauIA, 6); // Acheter le power-up le plus cher (Vie+)
        }
      }
    }
  }
}