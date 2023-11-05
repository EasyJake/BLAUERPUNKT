document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#mobile-container');
    const opponents = []; // Assuming this array is defined somewhere in your working code

    // Function to generate a single opponent
    function generateOpponent(yPosition) {
        const opponent = document.createElement('div');
        opponent.style.cssText = `
            width: 50px;
            height: 50px;
            background-color: red;
            position: absolute;
            top: ${yPosition}px;
            left: -50px;
        `;

        container.appendChild(opponent);
        opponents.push(opponent);

        const speed = Math.random() * (1999 - 99) + 99;

        function moveOpponent() {
            const currentLeft = parseFloat(opponent.style.left);
            if (currentLeft < window.innerWidth) {
                opponent.style.left = `${currentLeft + speed / 1000 * 5}px`;
                requestAnimationFrame(moveOpponent);
            } else {
                opponent.remove();
                const index = opponents.indexOf(opponent);
                if (index > -1) {
                    opponents.splice(index, 1);
                }
            }
        }
        moveOpponent();
    }

    // Function to generate opponents in rows
    function generateOpponentsInRows() {
        const circle = document.querySelector('.player'); // Replace '.player' with your player element's selector
        const playerPosition = parseFloat(circle.style.bottom) + parseFloat(circle.getBoundingClientRect().height);
        const availableSpace = window.innerHeight - playerPosition;
        const numberOfRows = 7;
        const spacingBetweenRows = availableSpace / (numberOfRows + 1); 

        for (let i = 1; i <= numberOfRows; i++) {
            setTimeout(() => generateOpponent(playerPosition + spacingBetweenRows * i), Math.random() * 2000);
        }
    }

    // Interval to generate opponents in rows every 2 seconds
    setInterval(generateOpponentsInRows, 2000);
}); // Make sure this closing tag matches your existing code structure
