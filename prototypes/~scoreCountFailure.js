document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#mobile-container');
    const circle = document.createElement('div');

    // Store opponent shapes and projectiles in arrays
    const opponents = [];
    const projectiles = [];

    let score = 0;

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
    tapDotElement.textContent = "TAP"
    ;
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
    const scoreDisplay = document.createElement('div');
    scoreDisplay.style.position = 'absolute';
    scoreDisplay.style.top = '10px';
    scoreDisplay.style.left = '10px';
    scoreDisplay.style.fontFamily = "system-ui, sans-serif";
    scoreDisplay.style.fontSize = '24px';
    scoreDisplay.style.color = 'white';
    scoreDisplay.textContent = `Score: ${score}`;
    container.appendChild(scoreDisplay);
    
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
        
                // Check if the projectile passed the top border
                if (currentBottom > window.innerHeight - 25) { // 25 is the projectile's height
                    score++;
                    scoreDisplay.textContent = `Score: ${score}`;
                }
        
                checkCollision();
                requestAnimationFrame(animateProjectile);
            } else {
                projectile.remove();
                projectiles.splice(projectiles.indexOf(projectile), 1);
            }
        }
        
    });

    function showWinScreen() {
        const winScreen = document.createElement('div');
        winScreen.style.position = 'fixed';
        winScreen.style.top = '0';
        winScreen.style.left = '0';
        winScreen.style.width = '100%';
        winScreen.style.height = '100%';
        winScreen.style.backgroundColor = 'red';
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
