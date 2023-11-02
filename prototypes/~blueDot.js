document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#mobile-container');
    const circleDiameter = 50;  // Same as the draggable circle's diameter

    const projectile = document.createElement('div');

    // Setup for the projectile (larger blue dot)
    projectile.style.width = circleDiameter + 'px';
    projectile.style.height = circleDiameter + 'px';
    projectile.style.backgroundColor = 'blue';
    projectile.style.borderRadius = '50%';
    projectile.style.position = 'absolute';
    projectile.style.left = '50%';
    projectile.style.bottom = '70px';
    projectile.style.transform = 'translateX(-50%)';

    container.appendChild(projectile);
});


// //