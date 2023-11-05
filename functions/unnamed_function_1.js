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
