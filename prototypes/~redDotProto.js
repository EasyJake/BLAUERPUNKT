// Wait for the HTML document to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Get the container element where the circle will be appended
    const container = document.querySelector('#mobile-container');
    
    // Create a new div element that will represent the circle (button)
    const circle = document.createElement('div');

    // Apply styling to make the div look like a circle and position it
    circle.style.width = '50px';
    circle.style.height = '50px';
    circle.style.backgroundColor = 'blue';
    circle.style.borderRadius = '50%';
    circle.style.position = 'absolute';
    circle.style.bottom = '70px';
    circle.style.left = '50%';
    circle.style.transform = 'translateX(-50%)';
    circle.style.cursor = 'pointer'; // Cursor indicates it's draggable

    // Add the circle to the container
    container.appendChild(circle);

    // Define variables for dragging logic
    let isDragging = false;
    let startDragY = 0;
    let startCircleBottom = 0;
    const radius = 25; // Half of the circle's diameter to limit drag distance
    const dragThreshold = 10; // Minimum distance to consider it a drag, not a tap
    let projectileSpeed = 0; // Variable to store the projectile speed

    // Add an event listener for the mousedown event on the circle
    circle.addEventListener('mousedown', function(event) {
        isDragging = true;
        startDragY = event.clientY; // Record the initial y-coordinate on mouse down
        startCircleBottom = parseFloat(circle.style.bottom); // Record the circle's initial bottom position
        projectileSpeed = 0; // Reset projectile speed each time we start dragging
        event.preventDefault(); // Prevent text selection, etc.
    });

    // Add an event listener for the mousemove event on the document
    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return; // Do nothing if not dragging

        let distanceMoved = startDragY - event.clientY; // Calculate the distance moved

        // Calculate the projectile speed based on distance moved, only if it's upward
        if (distanceMoved > 0) {
            projectileSpeed = Math.min(distanceMoved, radius) / 10; // The speed is proportional to the drag distance, limited to the radius
        }

        // Limit the dragging movement within the radius
        distanceMoved = Math.max(Math.min(distanceMoved, radius), -radius);
        circle.style.bottom = (startCircleBottom + distanceMoved) + 'px';
    });

    // Add an event listener for the mouseup event on the document
    document.addEventListener('mouseup', function() {
        // If not dragging or the drag was too small, don't fire the projectile
        if (!isDragging || projectileSpeed === 0) return;
        isDragging = false; // Stop dragging

        // Create a new div element that will represent the projectile
        const projectile = document.createElement('div');
        // Apply styling to the projectile
        projectile.style.width = '25px';
        projectile.style.height = '25px';
        projectile.style.backgroundColor = 'red'; // Change color to differentiate from the circle
        projectile.style.borderRadius = '50%';
        projectile.style.position = 'absolute';
        projectile.style.bottom = (parseFloat(circle.style.bottom) + radius) + 'px'; // Start from the circle's bottom position
        projectile.style.left = '50%';
        projectile.style.transform = 'translateX(-50%)';

        // Add the projectile to the container
        container.appendChild(projectile);

        // Use requestAnimationFrame to animate the projectile
        requestAnimationFrame(function animate() {
            const currentBottom = parseFloat(projectile.style.bottom);
            // Continue animating if projectile hasn't reached the top of the window
            if (currentBottom < window.innerHeight) {
                projectile.style.bottom = (currentBottom + projectileSpeed) + 'px'; // Increment based on projectileSpeed
                requestAnimationFrame(animate); // Continue animation
            } else {
                container.removeChild(projectile); // Remove projectile when it goes off screen
            }
        });

        // Animate the circle back to its original position
        circle.style.transition = 'bottom 0.5s cubic-bezier(.25,.82,.25,1)';
        circle.style.bottom = '70px';

        // Remove the transition effect after it completes
        setTimeout(() => circle.style.transition = '', 500);
    });
});
