document.addEventListener('DOMContentLoaded', function() {
    const gameContainer = document.getElementById('gameContainer');
    const player = document.createElement('div');
    player.classList.add('player');
    gameContainer.appendChild(player);

    let playerLeft = 375;
    player.style.left = playerLeft + 'px';

    function movePlayer(e) {
        if (e.key === 'ArrowLeft' && playerLeft > 0) {
            playerLeft -= 15;
            player.style.left = playerLeft + 'px';
        }
        if (e.key === 'ArrowRight' && playerLeft < 750) {
            playerLeft += 15;
            player.style.left = playerLeft + 'px';
        }
    }
    document.onkeydown = movePlayer;

    function createProjectile(e) {
        if (e.key === ' ') {
            const projectile = document.createElement('div');
            projectile.classList.add('projectile');
            gameContainer.appendChild(projectile);

            let projectileBottom = 20;
            let projectileLeft = playerLeft + 20;
            projectile.style.left = projectileLeft + 'px';
            projectile.style.bottom = projectileBottom + 'px';

            function moveProjectile() {
                if (projectileBottom < 580) {
                    projectileBottom += 5;
                    projectile.style.bottom = projectileBottom + 'px';
                } else {
                    clearInterval(projectileTimerId);
                    gameContainer.removeChild(projectile);
                }
            }
            let projectileTimerId = setInterval(moveProjectile, 30);
        }
    }
    document.onkeypress = createProjectile;
});
