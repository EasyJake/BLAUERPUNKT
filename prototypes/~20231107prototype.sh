// This event listener waits for the DOM content to load before executing the enclosed code.
document.addEventListener('DOMContentLoaded', function() {
    // Grab the container element where the game will be placed.
    const container = document.querySelector('#mobile-container');

    // Create the blue background at the top that represents the scoring area.
    const topBackgroundHeight = '150px'; // Define the height of the scoring area.
    const topBackground = document.createElement('div'); // Create a new div element for the scoring area.
    topBackground.style.width = '100%'; // Set the width to span across the container.
    topBackground.style.height = topBackgroundHeight; // Set the defined height.
    topBackground.style.backgroundColor = 'blue'; // Color it blue.
    topBackground.style.position = 'absolute'; // Position it absolutely within its parent.
    topBackground.style.top = '0'; // Place it at the top of the container.
    topBackground.style.left = '0'; // Align it to the left.
    topBackground.style.zIndex = '1'; // Place it above other elements.
    container.appendChild(topBackground); // Append the top background to the container.

    // Create a counter element to display the score.
    const counter = document.createElement('div'); // Create a new div for the counter.
    counter.textContent = '00000'; // Start the counter with five zeros.
    counter.style.position = 'absolute'; // Position it absolutely.
    counter.style.top = '10px'; // Place it slightly below the top of the viewport.
    counter.style.left = '50%'; // Center it horizontally.
    counter.style.transform = 'translateX(-50%)'; // Correct the positioning due to centering.
    counter.style.color = 'white'; // Set the text color to white for visibility.
    counter.style.fontSize = '3em'; // Increase the font size to make it easily readable.
    counter.style.fontFamily = 'Arial, sans-serif'; // Set a common font family for the text.
    counter.style.zIndex = '2'; // Make sure it's above the topBackground.
    document.body.appendChild(counter); // Append the counter to the body of the document.

    // Initialize the score as a numerical variable.
    let score = 0;

    // Define a function to update the score and the counter display.
    function updateScore() {
        score++; // Increment the score by one.
        counter.textContent = String(score).padStart(5, '0'); // Update the counter display with leading zeros.
    }

    // Array to hold the projectiles that have been shot.
    const projectiles = [];

    // Create the player element, which is a blue circle the user will interact with.
    const player = document.createElement('div'); // Create a new div for the player.
    player.style.width = '50px'; // Set the width of the player.
    player.style.height = '50px'; // Set the height of the player.
    player.style.backgroundColor = 'blue'; // Color the player blue.
    player.style.borderRadius = '50%'; // Round the corners to make it a circle.
    player.style.position = 'absolute'; // Position it absolutely within its parent.
    player.style.bottom = '70px'; // Place it a bit up from the bottom of the container.
    player.style.left = '50%'; // Center it horizontally.
    player.style.transform = 'translateX(-50%)'; // Correct the positioning due to centering.
    player.style.cursor = 'pointer'; // Change the cursor to indicate it's clickable.
    container.appendChild(player); // Append the player to the container.

    // Function to handle the animation of the projectiles.
    function animateProjectile(projectile) {
        const currentBottom = parseFloat(projectile.style.bottom); // Get the current bottom position of the projectile.
        // Check if the projectile is still within the game container's vertical bounds.
        if (currentBottom < window.innerHeight - parseFloat(topBackgroundHeight)) {
            projectile.style.bottom = (currentBottom + 5) + 'px'; // Move the projectile up by 5 pixels.
            // Use requestAnimationFrame for smooth animation and to call the next frame in the animation.
            requestAnimationFrame(() => animateProjectile(projectile));
        } else {
            // Once the projectile reaches the top area, check if it hasn't been counted yet.
            if (!projectile.counted) {
                updateScore(); // Update the score.
                projectile.counted = true; // Mark it as counted.
            }
        }
    }

    // Event listener for the player element.
    player.addEventListener('click', function() {
        // Create a new projectile element.
        const projectile = document.createElement('div'); // Create a new div for the projectile.
        projectile.style.width = '10px'; // Set the width of the projectile.
        projectile.style.height = '10px'; // Set the height of the projectile.
        projectile.style.backgroundColor = 'red'; // Color the projectile red.
        projectile.style.borderRadius = '50%'; // Round the corners to make it a circle.
        projectile.style.position = 'absolute'; // Position it absolutely.
        projectile.style.bottom = '120px'; // Start the projectile just above the player.
        projectile.style.left = player.style.left; // Align it with the player's horizontal position.
        projectile.counted = false; // Initialize counted property to false for scoring.
        container.appendChild(projectile); // Append the projectile to the container.
        projectiles.push(projectile); // Add the projectile to the projectiles array.
        // Start animating the projectile.
        requestAnimationFrame(() => animateProjectile(projectile));
    });

    // Add any additional game logic you need below.

});
