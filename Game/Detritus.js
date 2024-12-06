class Detritus { // Changer Bulle à Detritus
  constructor() {
    this.radius = Math.random() * 20 + 20; // Taille aléatoire
    this.x = Math.random() * (canvas.width - this.radius * 2) + this.radius;
    this.y = Math.random() * (canvas.height / 2); // Apparition dans la moitié supérieure de l'écran
    this.angle = Math.random() * 2 * Math.PI; // Direction aléatoire
    this.speed = Math.random() * 0.3 + 0.05; // Vitesse aléatoire
  }

  // Déplacer le Détritus
  move() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    // Rebondir lorsqu'un débris atteint le bord du canvas
    if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
      this.angle = Math.PI - this.angle; // Rebond horizontal
    }
    if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
      this.angle = -this.angle; // Rebond vertical
    }
  }

  // Dessiner le Détritus
  draw() {
    ctx.fillStyle = 'green'; // Couleur pour représenter le débris
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}