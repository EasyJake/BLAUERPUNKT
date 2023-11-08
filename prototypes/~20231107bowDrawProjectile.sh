// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Select the container element where the circle will be placed
    const container = document.querySelector('#mobile-container');
    // Create a new div element that will act as the draggable circle
    const circle = document.createElement('div');

    // Apply styles to the circle to make it look and behave like a slingshot pellet
    circle.style.width = '50px'; // Circle width
    circle.style.height = '50px'; // Circle height
    circle.style.backgroundColor = 'blue'; // Circle color
    circle.style.borderRadius = '50%'; // Make the div round
    circle.style.position = 'absolute'; // Position it absolutely within the container
    circle.style.bottom = '70px'; // Distance from the bottom of the container
    circle.style.left = '50%'; // Center horizontally
    circle.style.transform = 'translateX(-50%)'; // Centering adjustment
    circle.style.cursor = 'pointer'; // Change cursor to indicate it's draggable

    // Add the circle to the container
    container.appendChild(circle);

    // Initialize variables for dragging logic
    let isDragging = false; // Whether the circle is currently being dragged
    let startDragY = 0; // The Y-coordinate where the drag started
    let startCircleBottom = 0; // The starting bottom value of the circle
    let dragDistance = 0; // The distance the mouse has dragged

    // Add a mousedown event listener to the circle for drag initiation
    circle.addEventListener('mousedown', function(event) {
        isDragging = true; // Set dragging state to true
        startDragY = event.clientY; // Record the Y-coordinate when the drag starts
        startCircleBottom = parseFloat(circle.style.bottom); // Record the circle's initial position
        event.preventDefault(); // Prevent default actions like text selection
    });

    // Add a mousemove event listener to the window for drag tracking
    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return; // If we're not dragging, don't do anything

        let currentDragY = event.clientY; // Get the current Y-coordinate of the mouse
        // Calculate the drag distance
        dragDistance = currentDragY - startDragY;

        // If we've dragged downwards, update the circle's position
        if (dragDistance > 0) {
            // Limit the drag distance to simulate the elasticity of a slingshot
            dragDistance = Math.min(dragDistance, 100); // Replace 100 with max drag limit
            // Update the circle's position to follow the mouse, but not beyond the limit
            circle.style.bottom = (startCircleBottom - dragDistance) + 'px';
        }
    });

    // Add a mouseup event listener to the window for drag release
    document.addEventListener('mouseup', function() {
        if (!isDragging) return; // If we're not dragging, don't do anything

        isDragging = false; // Reset dragging state

        // Only create and animate the projectile if we've actually dragged the circle
        if (dragDistance > 0) {
            // Create the projectile element
            const projectile = document.createElement('div');
            // Style the projectile to look like a smaller circle
            projectile.style.width = '10px';
            projectile.style.height = '10px';
            projectile.style.backgroundColor = 'red';
            projectile.style.borderRadius = '50%';
            projectile.style.position = 'absolute';
            // Set its initial position to the circle's current position
            projectile.style.bottom = (parseFloat(circle.style.bottom) + 25) + 'px';
            projectile.style.left = '50%';
            projectile.style.transform = 'translateX(-50%)';
            // Add the projectile to the container
            container.appendChild(projectile);

            // Determine the projectile's speed based on the drag distance
            const projectileSpeed = dragDistance * 0.2; // Adjust the multiplier as needed

            // Define an animation function to move the projectile
            (function animateProjectile(currentBottom) {
                const newBottom = currentBottom + projectileSpeed; // Calculate the new position
                // Check if the projectile has not yet reached the top of the window
                if (newBottom < window.innerHeight) {
                    projectile.style.bottom = newBottom + 'px'; // Update the position
                    // Call the animation function again on the next animation frame
                    requestAnimationFrame(() => animateProjectile(newBottom));
                } else {
                    // If the projectile has reached the top, remove it from the container
                    container.removeChild(projectile);
                }
            })(parseFloat(projectile.style.bottom)); // Start the animation

            // Reset the circle's position with an ease-out transition to simulate snap-back
            circle.style.transition = 'bottom 0.2s ease-out';
            circle.style.bottom = '70px'; // Reset to initial position
            // Remove the transition style after the animation is complete
            setTimeout(() => circle.style.transition = '', 200);
        }

        // Reset drag distance after releasing the mouse button
        dragDistance = 0;
    });
});
