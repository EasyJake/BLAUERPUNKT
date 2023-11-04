document.addEventListener("DOMContentLoaded", function() {
    var score = 0;
    var dot = document.getElementById("dot");

    dot.addEventListener("click", function() {
        score += 10; // Increment score
        document.getElementById("score").textContent = score.toString().padStart(5, "0");

        // Move the dot to a new random position within the game container
        var gameContainer = document.getElementById("game-container");
        var maxX = gameContainer.clientWidth - dot.clientWidth;
        var maxY = gameContainer.clientHeight - dot.clientHeight;
        dot.style.left = Math.random() * maxX + "px";
        dot.style.top = Math.random() * maxY + "px";
    });
});
