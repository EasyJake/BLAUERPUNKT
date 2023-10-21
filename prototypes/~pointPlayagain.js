document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#mobile-container');
    const circle = document.createElement('div');
    const projectiles = []; // Store projectiles in an array

    circle.style.width = '50px';
    circle.style.height = '50px';
    circle.style.backgroundColor = 'blue';
    circle.style.borderRadius = '50%';
    circle.style.position = 'absolute';
    circle.style.bottom = '70px';
    circle.style.left = '50%';
    circle.style.transform = 'translateX(-50%)';
    circle.style.cursor = 'pointer'; // Cursor indicates it's draggable

    container.appendChild(circle);

    let isDragging = false;
    let startDragY = 0;
    let startCircleBottom = 0;
    const radius = 25; // Half of the circle's diameter

    circle.addEventListener('mousedown', function(event) {
        isDragging = true;
        startDragY = event.clientY;
        startCircleBottom = parseFloat(circle.style.bottom);
        event.preventDefault(); // Prevent text selection, etc.
    });

    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return;

        let distanceMoved = startDragY - event.clientY;

        // Limit the distance to the radius of the circle
        if (distanceMoved > radius) {
            distanceMoved = radius;
        } else if (distanceMoved < -radius) {
            distanceMoved = -radius;
        }

        circle.style.bottom = (startCircleBottom + distanceMoved) + 'px';
    });

    document.addEventListener('mouseup', function() {
        if (!isDragging) return;
        isDragging = false;

        // Create and animate the projectile
        const projectile = document.createElement('div');
        projectile.style.width = '25px';
        projectile.style.height = '25px';
        projectile.style.backgroundColor = 'blue';
        projectile.style.borderRadius = '50%';
        projectile.style.position = 'absolute';
        projectile.style.bottom = (parseFloat(circle.style.bottom) + 25) + 'px';
        projectile.style.left = '50%';
        projectile.style.transform = 'translateX(-50%)';
        container.appendChild(projectile);

        projectiles.push(projectile); // Add projectile to the array

        function checkCollision() {
            const circleRect = circle.getBoundingClientRect();
            const projectileRect = projectile.getBoundingClientRect();

            if (
                projectileRect.left < circleRect.right &&
                projectileRect.right > circleRect.left &&
                projectileRect.bottom > circleRect.top &&
                projectileRect.top < circleRect.bottom
            ) {
                // Collision detected, remove the projectile
                container.removeChild(projectile);
                projectiles.pop(); // Remove projectile from the array
                
                // Create the "POINT" screen
                const pointScreen = document.createElement('div');
                pointScreen.style.width = '100%';
                pointScreen.style.height = '100%';
                pointScreen.style.backgroundColor = 'blue';
                pointScreen.style.position = 'absolute';
                pointScreen.style.top = '0';
                pointScreen.style.left = '0';
                pointScreen.style.display = 'flex';
                pointScreen.style.flexDirection = 'column';
                pointScreen.style.alignItems = 'center';
                pointScreen.style.justifyContent = 'center';
                pointScreen.style.color = 'white';
                pointScreen.style.fontSize = '2em';

                // Create the "POINT" text
                const pointText = document.createElement('div');
                pointText.textContent = 'POINT';
                pointText.style.marginBottom = '20px';

                // Create the "Play Again" button
                const playAgainButton = document.createElement('button');
                playAgainButton.textContent = 'Play Again';
                playAgainButton.style.padding = '10px 20px';
                playAgainButton.style.fontSize = '1.5em';

                // Add event listener to restart the game when clicking "Play Again"
                playAgainButton.addEventListener('click', function() {
                    container.removeChild(pointScreen);
                    // Reset the game here (e.g., reset circle position)
                    circle.style.bottom = '70px';
                });

                // Append elements to the "POINT" screen
                pointScreen.appendChild(pointText);
                pointScreen.appendChild(playAgainButton);

                // Append the "POINT" screen to the container
                container.appendChild(pointScreen);
            }
        }

        requestAnimationFrame(function animateProjectile() {
            const currentBottom = parseFloat(projectile.style.bottom);
            if (currentBottom < window.innerHeight) {
                projectile.style.bottom = (currentBottom + 5) + 'px';
                checkCollision(); // Check for collision on each frame
                requestAnimationFrame(animateProjectile);
            } else {
                container.removeChild(projectile);
                projectiles.pop(); // Remove projectile from the array
            }
        });

        // Animate main circle back to original position
        circle.style.transition = 'bottom 0.5s cubic-bezier(.25,.82,.25,1)';
        circle.style.bottom = '70px';

        // Remove transition once animation is complete
        setTimeout(() => circle.style.transition = '', 500);
    });
});
