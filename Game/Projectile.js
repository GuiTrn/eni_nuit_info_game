class Projectile {
  constructor(shooter, x, y, angle) {
    this.shooter = shooter; // Identifie le bateau qui tire le projectile
    this.x = x; // Position X du centre du projectile
    this.y = y; // Position Y du centre du projectile
    this.length = 30; // Longueur du laser
    this.width = 5; // Largeur du laser
    this.speed = 20; // Vitesse du laser
    this.angle = angle; // Angle du tir
  }

  // Déplacer le projectile
  move() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
  }

  // Vérifier la collision avec un bateau
  checkCollision(bateau) {
    // Calculer la distance entre le projectile et le bateau
    const distX = Math.abs(this.x - bateau.x - bateau.width / 2);
    const distY = Math.abs(this.y - bateau.y - bateau.height / 2);

    // Si le projectile est dans la zone du bateau
    if (distX < bateau.width / 2 + this.length / 2 && distY < bateau.height / 2 + this.width / 2) {
      // Assurez-vous que le projectile ne touche pas le bateau qui l'a tiré
      if (this.shooter !== bateau) {
        bateau.hp -= 10; // Infliger des dégâts (par exemple, 10 points de vie)
        return true; // Collision détectée
      }
    }
    return false; // Pas de collision
  }

  // Dessiner le projectile
  draw() {
    ctx.save(); // Sauvegarder l'état actuel du contexte

    // Déplacer l'origine du laser au centre du projectile
    ctx.translate(this.x, this.y);

    // Faire pivoter le contexte pour aligner le laser avec l'angle
    ctx.rotate(this.angle);

    // Dessiner le laser (rectangle)
    ctx.fillStyle = 'cyan'; // Couleur du laser
    ctx.fillRect(0, -this.width / 2, this.length, this.width); // Dessiner le laser

    ctx.restore(); // Restaurer l'état du contexte
  }
}