document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#mobile-container');
    // Set up the player (blue circle)
     // Set up the player (blue circle)
    const circle = document.createElement('div');
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


        // Store opponent shapes and projectiles in arrays
        const opponents = [];
        const projectiles = [];
    

    // Initialize collision count
    let collisionCount = 0;

    

    function generateOpponent(yPosition) {
        const opponent = document.createElement('div');
        opponent.style.width = '50px';
        opponent.style.height = '50px';
        opponent.style.backgroundColor = 'red';
        opponent.style.position = 'absolute';
        opponent.style.top = yPosition + 'px';
        opponent.style.left = '-50px';

        container.appendChild(opponent);
        opponents.push(opponent);

        const speed = Math.random() * (1999 - 99) + 99;

        function moveOpponent() {
            const currentLeft = parseFloat(opponent.style.left);
            if (currentLeft < window.innerWidth) {
                opponent.style.left = (currentLeft + speed / 1000 * 5) + 'px';
                requestAnimationFrame(moveOpponent);
            } else {
                opponent.remove();
                opponents.splice(opponents.indexOf(opponent), 1);
            }
        }
        moveOpponent();
    }

    function generateOpponentsInRows(bottomLimit, topLimit) {
        // Get the height of the window to determine the drawing space
        const windowHeight = window.innerHeight;
        // Set the number of rows you want to populate with opponents
        const numberOfRows = 7;
        
        // Calculate the available space by taking into account the top and bottom limits
        const availableSpace = windowHeight - (bottomLimit + topLimit);
        // Determine the space between rows by dividing the available space by the number of rows plus one
        const spacingBetweenRows = availableSpace / (numberOfRows + 1);
        
        // Loop through the number of rows to place opponents on each
        for (let i = 1; i <= numberOfRows; i++) {
            // Calculate the Y position for each opponent, 
            // starting from the bottom limit and moving up by the spacing between rows
            const opponentPosition = bottomLimit + spacingBetweenRows * i;
            // Create a timeout to generate each opponent at random intervals
            // The opponent is generated at the calculated Y position
            setTimeout(() => generateOpponent(opponentPosition), Math.random() * 2000);
        }
    }
    
    // Example usage of the function with the bottom and top limits:
    // The bottomLimit is the space from the bottom of the screen where opponents will start appearing
    // The topLimit is the space from the top of the screen where the last row of opponents will be placed
    let bottomLimit = -999; // 100 pixels from the bottom of the screen
    let topLimit = 1;    // 50 pixels from the top of the screen
    
    // Call the function with the defined limits
    generateOpponentsInRows(bottomLimit, topLimit);
    

    setInterval(generateOpponentsInRows, 2000);

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

        function checkCollision() {
            projectiles.forEach((projectile, index) => {
                const projectileRect = projectile.getBoundingClientRect();

                opponents.forEach((opponent, opponentIndex) => {
                    const opponentRect = opponent.getBoundingClientRect();
                    if (projectileRect.left < opponentRect.right &&
                        projectileRect.right > opponentRect.left &&
                        projectileRect.top < opponentRect.bottom &&
                        projectileRect.bottom > opponentRect.top) {

                        opponent.remove();
                        opponents.splice(opponentIndex, 1);
                        projectile.remove();
                        projectiles.splice(index, 1);

                        showWinScreen();
                    }
                });
            });
        }

    // ... Projectile firing and collision detection code as defined previously ...

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

    circle.style.transition = 'bottom 0.5s cubic-bezier(.25,.82,.25,1)';
    circle.style.bottom = '70px';
    setTimeout(() => circle.style.transition = '', 500);
});

function showWinScreen() {
    const winScreen = document.createElement('div');
    winScreen.style.position = 'fixed';
    winScreen.style.top = '0';
    winScreen.style.left = '0';
    winScreen.style.width = '100%';
    winScreen.style.height = '100%';
    winScreen.style.backgroundColor = 'RED';
    winScreen.style.display = 'flex';
    winScreen.style.justifyContent = 'center';
    winScreen.style.alignItems = 'center';
    winScreen.style.flexDirection = 'column';
    winScreen.style.color = 'white';
    winScreen.style.fontSize = '2em';
    winScreen.style.zIndex = '1000';

    const winText = document.createElement('div');
    winText.textContent = 'GAME OVER';

    const playAgainButton = document.createElement('button');
    playAgainButton.textContent = 'Play Again';
    playAgainButton.style.marginTop = '20px';
    playAgainButton.style.fontSize = '1em';
    playAgainButton.onclick = function() {
        window.location.reload();
    };

    winScreen.appendChild(winText);
    winScreen.appendChild(playAgainButton);
    document.body.appendChild(winScreen);
}
});
    // ... Remaining gameplay logic as defined previously ...
