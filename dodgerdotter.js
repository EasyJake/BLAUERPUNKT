document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#mobile-container');

    // Define the height for the blue background at the top
    const topBackgroundHeight = '150px'; // Adjust as needed

    // Create the top background element
    const topBackground = document.createElement('div');
    topBackground.style.width = '100%';
    topBackground.style.height = topBackgroundHeight;
    topBackground.style.backgroundColor = 'blue';
    topBackground.style.position = 'absolute';
    topBackground.style.top = '0';
    topBackground.style.left = '0';
    topBackground.style.zIndex = '-1'; // To ensure it stays behind other elements

    // Append the top background to the container
    container.appendChild(topBackground);

    // Create a counter element
    const counter = document.createElement('div');
    counter.textContent = '00000'; // Start with five zeros
    counter.style.position = 'absolute';
    counter.style.top = '10px'; // Adjust as necessary
    counter.style.left = '50%';
    counter.style.transform = 'translateX(-50%)';
    counter.style.color = 'white';
    counter.style.fontSize = '3em'; // Large block numbers
    counter.style.fontFamily = 'Arial, sans-serif';
    counter.style.zIndex = '10'; // Make sure it's visible on top
    document.body.appendChild(counter);

    // Initialize the projectile counter
    let projectileCount = 0;

    // Function to update the counter display
    function updateCounter() {
        projectileCount++;
        counter.textContent = String(projectileCount).padStart(5, '0'); // Pad with zeros to ensure five digits
    }

    // Store opponent shapes and projectiles in arrays
    const opponents = [];
    const projectiles = [];

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

    const tapDotElement = document.createElement('div');
    tapDotElement.textContent = "TAP THE DOT";
    tapDotElement.style.position = 'absolute';
    tapDotElement.style.bottom = '50px';
    tapDotElement.style.left = '50%';
    tapDotElement.style.transform = 'translateX(-50%)';
    tapDotElement.style.fontFamily = "system-ui, sans-serif";

    container.appendChild(tapDotElement);

    let isDragging = false;
    let startDragY = 0;
    let startCircleBottom = 0;
    const radius = 25;

    // ... Opponent generation code remains unchanged ...

    circle.addEventListener('mousedown', function(event) {
        isDragging = true;
        startDragY = event.clientY;
        startCircleBottom = parseFloat(circle.style.bottom);
        event.preventDefault();
    });

    // ... Mouse movement code remains unchanged ...

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
        projectile.counted = false; // Initialize as not counted

        container.appendChild(projectile);
        projectiles.push(projectile);

        // Animate the projectile and check for collisions
        requestAnimationFrame(() => animateProjectile(projectile));

        circle.style.transition = 'bottom 0.5s cubic-bezier(.25,.82,.25,1)';
        circle.style.bottom = '70px';
        setTimeout(() => circle.style.transition = '', 500);
    });

    function animateProjectile(projectile) {
    const currentBottom = parseFloat(projectile.style.bottom);
    const projectileHeight = parseFloat(projectile.style.height);

    if (currentBottom < window.innerHeight + projectileHeight) { // Now checking if it's gone past the top
        projectile.style.bottom = (currentBottom + 5) + 'px';

        // If projectile has not been counted and goes beyond the top of the screen
        if (!projectile.counted && currentBottom >= window.innerHeight) {
            updateCounter();
            projectile.counted = true; // Mark as counted
        }

        requestAnimationFrame(() => animateProjectile(projectile));
    } else {
        // Once the projectile goes off-screen, it gets removed and score doesn't increase
        projectile.remove();
        projectiles.splice(projectiles.indexOf(projectile), 1);
    }
}

    // ... Collision and game over code remains unchanged ...

    setInterval(generateOpponentsInRows, 2000); // This starts the generation of opponents in rows
});



document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#mobile-container');
    // ... rest of your code ...

    // Define the height for the blue background at the top
    const topBackgroundHeight = '150px'; // for example, adjust as needed

    // Create the top background element
    const topBackground = document.createElement('div');
    topBackground.style.width = '100%';
    topBackground.style.height = topBackgroundHeight;
    topBackground.style.backgroundColor = 'blue';
    topBackground.style.position = 'absolute';
    topBackground.style.top = '0';
    topBackground.style.left = '0';
    topBackground.style.zIndex = '-1'; // To ensure it stays behind other elements

    // Append the top background to the container
    container.appendChild(topBackground);

    // ... rest of your code ...
});




document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#mobile-container');
    const circle = document.createElement('div');

    // Store opponent shapes and projectiles in arrays
    const opponents = [];
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

    const tapDotElement = document.createElement('div');
    tapDotElement.textContent = "TAP THE DOT";
    tapDotElement.style.position = 'absolute';
    tapDotElement.style.bottom = '50px';
    tapDotElement.style.left = '50%';
    tapDotElement.style.transform = 'translateX(-50%)';
    tapDotElement.style.fontFamily = "system-ui, sans-serif";

    container.appendChild(tapDotElement);

    let isDragging = false;
    let startDragY = 0;
    let startCircleBottom = 0;
    const radius = 25;

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

    function generateOpponentsInRows() {
        const playerPosition = parseFloat(circle.style.bottom) + parseFloat(circle.style.height);
        const availableSpace = window.innerHeight - playerPosition;
        const numberOfRows = 7;
        const spacingBetweenRows = availableSpace / (numberOfRows + 1); 

        for (let i = 1; i <= numberOfRows; i++) {
            setTimeout(() => generateOpponent(playerPosition + spacingBetweenRows * i), Math.random() * 2000);
        }
    }

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
