document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#mobile-container');
    const circleDiameter = 50;  // Same as the draggable circle's diameter

    const projectileOriginal = document.createElement('div');

    // Setup for the original projectile (larger blue dot)
    projectileOriginal.style.width = circleDiameter + 'px';
    projectileOriginal.style.height = circleDiameter + 'px';
    projectileOriginal.style.backgroundColor = 'blue';
    projectileOriginal.style.borderRadius = '50%';
    projectileOriginal.style.position = 'absolute';
    projectileOriginal.style.left = '50%';
    projectileOriginal.style.bottom = '70px';
    projectileOriginal.style.transform = 'translateX(-50%)';
    projectileOriginal.style.zIndex = '1'; // Ensure it's above the new elements

    container.appendChild(projectileOriginal);

    // New code starts here
    const circle = document.createElement('div');
    const projectile = document.createElement('div');
    const maxMovement = circleDiameter * 2;  // Two times the circle's diameter

    // Setup for the draggable circle
    circle.style.width = circleDiameter + 'px';
    circle.style.height = circleDiameter + 'px';
    circle.style.backgroundColor = 'red'; // Changed color to distinguish
    circle.style.borderRadius = '50%';
    circle.style.position = 'absolute';
    circle.style.bottom = '70px';
    circle.style.left = 'calc(50% - 25px)';
    circle.style.cursor = 'pointer';
    circle.style.zIndex = '2'; // Higher Z-index to be on top
    container.appendChild(circle);

    // Setup for the new projectile (small blue dot)
    projectile.style.width = '10px';
    projectile.style.height = '10px';
    projectile.style.backgroundColor = 'red'; // Changed color to distinguish
    projectile.style.borderRadius = '50%';
    projectile.style.position = 'absolute';
    projectile.style.display = 'none'; // Hide it initially
    projectile.style.zIndex = '2'; // Higher Z-index to be on top
    container.appendChild(projectile);

    // Rest of the new code (event listeners and logic)
    let isDraggingNew = false;
    let startDragXNew = 0;
    let startDragYNew = 0;
    let startCircleLeftNew = 0;
    let startCircleBottomNew = 0;
    let endDragXNew = 0;
    let endDragYNew = 0;

    circle.addEventListener('mousedown', function(event) {
        isDraggingNew = true;
        startDragXNew = event.clientX;
        startDragYNew = event.clientY;
        startCircleLeftNew = circle.getBoundingClientRect().left - container.getBoundingClientRect().left;
        startCircleBottomNew = parseFloat(circle.style.bottom);
        event.preventDefault();
    });

    document.addEventListener('mousemove', function(event) {
        if (!isDraggingNew) return;

        let distanceMovedXNew = event.clientX - startDragXNew;
        let distanceMovedYNew = startDragYNew - event.clientY; // Y axis is inverted

        // Restrict movement within the allowed range
        distanceMovedXNew = Math.max(Math.min(distanceMovedXNew, maxMovement), -maxMovement);
        distanceMovedYNew = Math.max(Math.min(distanceMovedYNew, maxMovement), -maxMovement);

        circle.style.left = (startCircleLeftNew + distanceMovedXNew) + 'px';
        circle.style.bottom = (startCircleBottomNew + distanceMovedYNew) + 'px';
        
        // Update the end drag positions
        endDragXNew = event.clientX;
        endDragYNew = event.clientY;
    });

    document.addEventListener('mouseup', function() {
        if (!isDraggingNew) return;
        isDraggingNew = false;

        // Calculate the vector
        let vectorXNew = endDragXNew - startDragXNew;
        let vectorYNew = startDragYNew - endDragYNew; // Y axis is inverted

        // Position and show the projectile
        projectile.style.left = circle.style.left;
        projectile.style.bottom = circle.style.bottom;
        projectile.style.display = 'block';

        // Animate the projectile along the vector
        projectile.style.transition = 'left 1s linear, bottom 1s linear';
        setTimeout(() => {
            projectile.style.left = (startCircleLeftNew + vectorXNew * 5) + 'px'; // Multiply by a factor to increase the travel distance
            projectile.style.bottom = (startCircleBottomNew + vectorYNew * 5) + 'px';
        }, 10);

        // Animate back to original position
        circle.style.transition = 'left 0.5s cubic-bezier(.25,.82,.25,1), bottom 0.5s cubic-bezier(.25,.82,.25,1)';
        setTimeout(() => {
            circle.style.left = 'calc(50% - 25px)';
            circle.style.bottom = '70px';
            circle.style.transition = '';

            // Reset the projectile
            projectile.style.display = 'none';
            projectile.style.transition = '';
        }, 10); // Small timeout to allow the CSS transition to be applied correctly
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#mobile-container');
    const circleDiameter = 50;  // Same as the draggable circle's diameter

    // ... (original code for setting up the draggable circle and the static projectile)

    // New projectile code starts here
    const projectile = document.createElement('div');

    // Setup for the new projectile (small blue dot)
    projectile.style.width = '10px';
    projectile.style.height = '10px';
    projectile.style.backgroundColor = 'blue'; // Color of the new projectile
    projectile.style.borderRadius = '50%';
    projectile.style.position = 'absolute';
    projectile.style.display = 'none'; // Hide it initially
    container.appendChild(projectile);

    // Rest of the code for the draggable circle (event listeners and logic)
    // ... (code for the draggable circle's mouse events)

    document.addEventListener('mouseup', function() {
        if (!isDraggingNew) return;
        isDraggingNew = false;

        // Calculate the vector
        let vectorXNew = endDragXNew - startDragXNew;
        let vectorYNew = startDragYNew - endDragYNew; // Y axis is inverted

        // Position and show the projectile at the bottom center
        projectile.style.left = '50%';
        projectile.style.bottom = '70px';
        projectile.style.display = 'block';
        projectile.style.transform = 'translateX(-50%)';

        // Animate the projectile along the vector
        requestAnimationFrame(function animate() {
            const currentLeft = parseFloat(projectile.style.left);
            const currentBottom = parseFloat(projectile.style.bottom);
            if (currentBottom < window.innerHeight && currentLeft >= 0 && currentLeft <= window.innerWidth) {
                projectile.style.left = (currentLeft + vectorXNew * 0.05) + 'px'; // Small increments for smooth animation
                projectile.style.bottom = (currentBottom + vectorYNew * 0.05) + 'px';
                requestAnimationFrame(animate);
            } else {
                container.removeChild(projectile);
            }
        });

        // Animate back to original position
        circle.style.transition = 'left 0.5s cubic-bezier(.25,.82,.25,1), bottom 0.5s cubic-bezier(.25,.82,.25,1)';
        setTimeout(() => {
            circle.style.left = 'calc(50% - 25px)';
            circle.style.bottom = '70px';
            circle.style.transition = '';
        }, 10); // Small timeout to allow the CSS transition to be applied correctly
    });
});

