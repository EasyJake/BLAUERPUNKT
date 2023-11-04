document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#mobile-container');
    const circle = document.createElement('div');
    const opponents = [];
    const projectiles = [];
    let score = 0;
    const winScore = 5; // Score required to win

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

    let isDragging = false;
    let startDragY = 0;
    let startCircleBottom = 70;
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
                        score++;

                        if (score >= winScore) {
                            showWinScreen();
                        }
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

        circle.style.transition = 'bottom 0.5s';
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
        winScreen.style.backgroundColor = 'rgba(0, 0, 255, 0.9)';
        winScreen.style.display = 'flex';
        winScreen.style.justifyContent = 'center';
        winScreen.style.alignItems = 'center';
        winScreen.style.flexDirection = 'column';
        winScreen.style.color = 'white';
        winScreen.style.fontSize = '2em';
        winScreen.style.zIndex = '1000';

        const winText = document.createElement('div');
        winText.textContent = 'YOU WIN';
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
