document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#mobile-container');
    const circle = document.createElement('div');

    // Store red squares and projectiles in arrays
    const redSquares = [];
    const projectiles = [];

    // Set up the player (blue circle)
    circle.style.width = '50px';
    circle.style.height = '50px';
    circle.style.backgroundColor = 'blue';
    circle.style.borderRadius = '50%';
    circle.style.position = 'absolute';
    circle.style.bottom = '70px';
    circle.style.left = '50%';
    circle.style.transform = 'translateX(-50%)';
    circle.style.cursor = 'pointer';

    container.appendChild(circle);
// Create the "tapdot" text element
const tapDotElement = document.createElement('div');
tapDotElement.textContent = "TAP THE DOT";
tapDotElement.style.position = 'absolute';
tapDotElement.style.bottom = '50px';  // 20 pixels below the circle's bottom
tapDotElement.style.left = '50%';
tapDotElement.style.transform = 'translateX(-50%)';
tapDotElement.style.fontFamily = "system-ui, sans-serif";

container.appendChild(tapDotElement);

    // Variables for dragging functionality
    let isDragging = false;
    let startDragY = 0;
    let startCircleBottom = 0;
    const radius = 25;

    // Function to generate and animate red squares
    function generateRedSquare() {
        const redSquare = document.createElement('div');
        redSquare.style.width = '50px';
        redSquare.style.height = '50px';
        redSquare.style.backgroundColor = 'red';
        redSquare.style.position = 'absolute';
        redSquare.style.top = '0';
        redSquare.style.left = '-50px';
        redSquare.style.transform = 'translateX(-50%)';

        container.appendChild(redSquare);
        redSquares.push(redSquare);

        // Move the red square from left to right
        function moveRedSquare() {
            const currentLeft = parseFloat(redSquare.style.left);
            if (currentLeft < window.innerWidth) {
                redSquare.style.left = (currentLeft + 5) + 'px';
                requestAnimationFrame(moveRedSquare);
            } else {
                redSquare.remove();
                redSquares.splice(redSquares.indexOf(redSquare), 1);
            }
        }
        moveRedSquare();
    }

    // Generate red squares periodically
    setInterval(generateRedSquare, 2000);

    // Event listeners for drag-and-release functionality
    circle.addEventListener('mousedown', function(event) {
        isDragging = true;
        startDragY = event.clientY;
        startCircleBottom = parseFloat(circle.style.bottom);
        event.preventDefault();
    });

    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return;
        let distanceMoved = startDragY - event.clientY;
        distanceMoved = Math.max(Math.min(distanceMoved, radius), -radius);
        circle.style.bottom = (startCircleBottom + distanceMoved) + 'px';
    });

    document.addEventListener('mouseup', function() {
        if (!isDragging) return;
        isDragging = false;

        // Create and animate a projectile when the mouse is released
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
        projectiles.push(projectile);

        // Check for collisions between projectiles and red squares
        function checkCollision() {
            projectiles.forEach((projectile, index) => {
                const projectileRect = projectile.getBoundingClientRect();

                redSquares.forEach((redSquare, squareIndex) => {
                    const redSquareRect = redSquare.getBoundingClientRect();
                    if (projectileRect.left < redSquareRect.right &&
                        projectileRect.right > redSquareRect.left &&
                        projectileRect.top < redSquareRect.bottom &&
                        projectileRect.bottom > redSquareRect.top) {

                        // Collision detected, remove the involved elements
                        redSquare.remove();
                        redSquares.splice(squareIndex, 1);
                        projectile.remove();
                        projectiles.splice(index, 1);

                        // Show the win screen since a red square was hit
                        showWinScreen();
                    }
                });
            });
        }

        // Animate the projectile
        function animateProjectile() {
            const currentBottom = parseFloat(projectile.style.bottom);
            if (currentBottom < window.innerHeight) {
                projectile.style.bottom = (currentBottom + 5) + 'px';
                checkCollision();
                requestAnimationFrame(animateProjectile);
            } else {
                projectile.remove();
                projectiles.splice(projectiles.indexOf(projectile), 1);
            }
        }
        requestAnimationFrame(animateProjectile);

        // Reset circle's position
        circle.style.transition = 'bottom 0.5s cubic-bezier(.25,.82,.25,1)';
        circle.style.bottom = '70px';
        setTimeout(() => circle.style.transition = '', 500);
    });

    // Function to show the winning screen
    function showWinScreen() {
        // Create the overlay
        const winScreen = document.createElement('div');
        winScreen.style.position = 'fixed';
        winScreen.style.top = '0';
        winScreen.style.left = '0';
        winScreen.style.width = '100%';
        winScreen.style.height = '100%';
        winScreen.style.backgroundColor = 'blue';
        winScreen.style.display = 'flex';
        winScreen.style.justifyContent = 'center';
        winScreen.style.alignItems = 'center';
        winScreen.style.flexDirection = 'column';
        winScreen.style.color = 'white';
        winScreen.style.fontSize = '2em';
        winScreen.style.zIndex = '1000'; // Ensure the overlay is on top of everything else

        // Create the "YOU WIN" text
        const winText = document.createElement('div');
        winText.textContent = 'YOU WIN';

        // Create the "play again" button
        const playAgainButton = document.createElement('button');
        playAgainButton.textContent = 'Play Again';
        playAgainButton.style.marginTop = '20px';
        playAgainButton.style.fontSize = '1em';
        playAgainButton.onclick = function() {
            window.location.reload(); // This will reload the page, resetting the game
        };

        // Append everything to the overlay
        winScreen.appendChild(winText);
        winScreen.appendChild(playAgainButton);
        document.body.appendChild(winScreen);
    }
});
