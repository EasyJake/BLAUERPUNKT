// Wait until the HTML document is fully loaded before running the script.
document.addEventListener('DOMContentLoaded', function() {
    // Select the container element in which the game elements will be displayed.
    const container = document.querySelector('#mobile-container');

    // Create and style a div element to serve as the blue background at the top of the game area.
    const topBackgroundHeight = '150px';
    const topBackground = document.createElement('div');
    topBackground.style.width = '100%';
    topBackground.style.height = topBackgroundHeight;
    topBackground.style.backgroundColor = 'blue';
    topBackground.style.position = 'absolute';
    topBackground.style.top = '0';
    topBackground.style.left = '0';
    topBackground.style.zIndex = '-1'; // Set behind other elements.
    container.appendChild(topBackground); // Append to the game container.

    // Create and style a div element to display the score counter.
    const counter = document.createElement('div');
    counter.textContent = '00000'; // Initialize with a placeholder value.
    counter.style.position = 'absolute';
    counter.style.top = '10px';
    counter.style.left = '50%';
    counter.style.transform = 'translateX(-50%)'; // Center the element horizontally.
    counter.style.color = 'white';
    counter.style.fontSize = '3em';
    counter.style.fontFamily = 'Arial, sans-serif';
    counter.style.zIndex = '10'; // Ensure it is above other elements.
    document.body.appendChild(counter); // Append to the body element.

    // Variable to keep track of the number of projectiles shot.
    let projectileCount = 0;

    // Function to increment the projectile count and update the display.
    function updateCounter() {
        projectileCount++;
        counter.textContent = String(projectileCount).padStart(5, '0'); // Format with leading zeros.
    }

    // Arrays to keep track of opponent objects and projectile objects.
    const opponents = [];
    const projectiles = [];

    // Create and style the player character (a blue circle).
    const circle = document.createElement('div');
    circle.style.width = '50px';
    circle.style.height = '50px';
    circle.style.backgroundColor = 'blue';
    circle.style.borderRadius = '50%'; // Make it a circle.
    circle.style.position = 'absolute';
    circle.style.bottom = '70px'; // Position from the bottom of the container.
    circle.style.left = '50%';
    circle.style.transform = 'translateX(-50%)'; // Center horizontally.
    circle.style.cursor = 'pointer'; // Change cursor to indicate interactivity.
    container.appendChild(circle); // Append to the game container.

    // Create and style an element that prompts the user to interact.
    const tapDotElement = document.createElement('div');
    tapDotElement.textContent = "TAP THE DOT";
    tapDotElement.style.position = 'absolute';
    tapDotElement.style.bottom = '50px';
    tapDotElement.style.left = '50%';
    tapDotElement.style.transform = 'translateX(-50%)'; // Center horizontally.
    tapDotElement.style.fontFamily = "system-ui, sans-serif";
    container.appendChild(tapDotElement); // Append to the game container.

    // Variables to track the state of dragging.
    let isDragging = false;
    let startDragY = 0;
    let startCircleBottom = 0;
    let dragDistanceThreshold = 50; // Define minimum drag distance for action.

    // Event listener to handle the initiation of a drag event.
    circle.addEventListener('mousedown', function(event) {
        isDragging = true;
        startDragY = event.clientY; // Record the starting Y-coordinate.
        startCircleBottom = parseFloat(circle.style.bottom); // Record the starting bottom position of the circle.
        event.preventDefault(); // Prevent any default action caused by this event.
    });

    // Event listener to handle the dragging motion.
    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return; // Exit if not dragging.
        let distanceMoved = startDragY - event.clientY; // Calculate the distance moved during the drag.
        const maxMovement = window.innerHeight - parseFloat(circle.style.height) - parseFloat(topBackgroundHeight); // Define the maximum allowed movement.
        let newBottom = startCircleBottom + distanceMoved; // Update the bottom position based on the movement.
        newBottom = Math.max(Math.min(newBottom, maxMovement), 0); // Clamp the new bottom position within allowed bounds.
        circle.style.bottom = newBottom + 'px'; // Apply the new bottom position.
    });

    // Event listener to handle the end of a drag event.
    document.addEventListener('mouseup', function(event) {
        if (!isDragging) return; // Exit if not dragging.
        isDragging = false;
        let dragDistance = startDragY - event.clientY; // Determine the total drag distance.
        
        // Only execute the following block if the drag threshold is exceeded.
        if (Math.abs(dragDistance) >= dragDistanceThreshold) {
            // Create and style a projectile.
            const projectile = document.createElement('div');
            projectile.style.width = '25px';
            projectile.style.height = '25px';
            projectile.style.backgroundColor = 'blue';
            projectile.style.borderRadius = '50%'; // Make it a circle.
            projectile.style.position = 'absolute';
            projectile.style.bottom = (parseFloat(circle.style.bottom) + parseFloat(circle.style.height) / 2 - parseFloat(projectile.style.height) / 2) + 'px';
            projectile.style.left = '50%';
            projectile.style.transform = 'translateX(-50%)'; // Center horizontally.
            projectile.counted = false;
            container.appendChild(projectile); // Append to the game container.
            projectiles.push(projectile); // Add to the projectiles array.

            // Call the animation function to animate the projectile.
            requestAnimationFrame(() => animateProjectile(projectile));
        }
        
        // Reset the position of the player circle with a smooth transition.
        circle.style.transition = 'bottom 0.5s cubic-bezier(.25,.82,.25,1)';
        circle.style.bottom = '70px'; // Move back to the initial position.
        // Remove the transition style after it completes to prevent it from affecting future movements.
        setTimeout(() => circle.style.transition = '', 500);
    });

    // Function to animate projectiles and check for collisions.
    function animateProjectile(projectile) {
        // ... Unchanged code for projectile animation and collision checks ...
    }

    // ... Unchanged code for opponent generation and game mechanics ...

    // Begin generating opponents at a regular interval.
    setInterval(generateOpponentsInRows, 2000);
});
