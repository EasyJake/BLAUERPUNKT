document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#mobile-container');
    const player = document.createElement('div');

    const opponents = ['square', 'circle', 'oval', 'triangle', 'trapezoid', 'diamond', 'pentagon'];
    const projectiles = [];

    player.style.width = '50px';
    player.style.height = '50px';
    player.style.backgroundColor = 'blue';
    player.style.borderRadius = '50%';
    player.style.position = 'absolute';
    player.style.bottom = '70px';
    player.style.left = '50%';
    player.style.transform = 'translateX(-50%)';
    player.style.cursor = 'pointer';

    container.appendChild(player);

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
    let startPlayerBottom = 0;
    const radius = 25;

    function generateOpponent() {
        const opponent = document.createElement('div');
        const shape = opponents[Math.floor(Math.random() * opponents.length)];

        opponent.style.width = '50px';
        opponent.style.height = '50px';
        opponent.style.position = 'absolute';
        opponent.style.top = '0';
        opponent.style.left = Math.random() * (window.innerWidth - 50) + 'px';

        switch(shape) {
            case 'square':
                opponent.style.backgroundColor = 'red';
                break;
            case 'circle':
                opponent.style.backgroundColor = 'green';
                opponent.style.borderRadius = '50%';
                break;
            case 'oval':
                opponent.style.backgroundColor = 'yellow';
                opponent.style.borderRadius = '50%';
                opponent.style.height = '75px';
                break;
            case 'triangle':
                opponent.style.width = '0';
                opponent.style.height = '0';
                opponent.style.borderLeft = '25px solid transparent';
                opponent.style.borderRight = '25px solid transparent';
                opponent.style.borderBottom = '50px solid purple';
                break;
            case 'trapezoid':
                opponent.style.backgroundColor = 'transparent';
                opponent.style.borderBottom = '50px solid cyan';
                opponent.style.borderLeft = '15px solid transparent';
                opponent.style.borderRight = '15px solid transparent';
                break;
            case 'diamond':
                opponent.style.backgroundColor = 'orange';
                opponent.style.transform = 'rotate(45deg)';
                break;
            case 'pentagon':
                // This requires a more complex clip-path for an actual pentagon
                opponent.style.backgroundColor = 'pink';
                break;
            default:
                break;
        }

        container.appendChild(opponent);
        projectiles.push(opponent);

        function moveOpponent() {
            const currentTop = parseFloat(opponent.style.top);
            if (currentTop < window.innerHeight) {
                opponent.style.top = (currentTop + 5) + 'px';
                requestAnimationFrame(moveOpponent);
            } else {
                opponent.remove();
                projectiles.splice(projectiles.indexOf(opponent), 1);
            }
        }

        moveOpponent();
    }

    setInterval(generateOpponent, 2000);

    player.addEventListener('mousedown', function(event) {
        isDragging = true;
        startDragY = event.clientY;
        startPlayerBottom = parseFloat(player.style.bottom);
        event.preventDefault();
    });

    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return;
        let distanceMoved = startDragY - event.clientY;
        distanceMoved = Math.max(Math.min(distanceMoved, radius), -radius);
        player.style.bottom = (startPlayerBottom + distanceMoved) + 'px';
    });

    document.addEventListener('mouseup', function() {
        if (!isDragging) return;
        isDragging = false;

        const bullet = document.createElement('div');
        bullet.style.width = '25px';
        bullet.style.height = '25px';
        bullet.style.backgroundColor = 'blue';
        bullet.style.borderRadius = '50%';
        bullet.style.position = 'absolute';
        bullet.style.bottom = (parseFloat(player.style.bottom) + 25) + 'px';
        bullet.style.left = '50%';
        bullet.style.transform = 'translateX(-50%)';

        container.appendChild(bullet);

        function checkCollision() {
            const bulletRect = bullet.getBoundingClientRect();

            projectiles.forEach((projectile, index) => {
                const projectileRect = projectile.getBoundingClientRect();
                if (bulletRect.left < projectileRect.right &&
                    bulletRect.right > projectileRect.left &&
                    bulletRect.top < projectileRect.bottom &&
                    bulletRect.bottom > projectileRect.top) {

                    projectile.remove();
                    projectiles.splice(index, 1);
                    bullet.remove();

                    showWinScreen();
                }
            });
        }

        function animateBullet() {
            const currentBottom = parseFloat(bullet.style.bottom);
            if (currentBottom < window.innerHeight) {
                bullet.style.bottom = (currentBottom + 5) + 'px';
                checkCollision();
                requestAnimationFrame(animateBullet);
            } else {
                bullet.remove();
            }
        }

        requestAnimationFrame(animateBullet);
        player.style.transition = 'bottom 0.5s cubic-bezier(.25,.82,.25,1)';
        player.style.bottom = '70px';
        setTimeout(() => player.style.transition = '', 500);
    });

    function showWinScreen() {
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
