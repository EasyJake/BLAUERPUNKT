

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#mobile-container');
    const circle = document.createElement('div');
    const projectile = document.createElement('div');
    const circleDiameter = 50;
    const maxMovement = circleDiameter * 2;  // Two times the circle's diameter

    // Setup for the draggable circle
    circle.style.width = circleDiameter + 'px';
    circle.style.height = circleDiameter + 'px';
    circle.style.backgroundColor = 'blue';
    circle.style.borderRadius = '50%';
    circle.style.position = 'absolute';
    circle.style.bottom = '70px';
    circle.style.left = 'calc(50% - 25px)';
    circle.style.cursor = 'pointer';
    container.appendChild(circle);

    // Setup for the projectile (small blue dot)
    projectile.style.width = '10px';
    projectile.style.height = '10px';
    projectile.style.backgroundColor = 'blue';
    projectile.style.borderRadius = '50%';
    projectile.style.position = 'absolute';
    projectile.style.display = 'none'; // Hide it initially
    container.appendChild(projectile);

    let isDragging = false;
    let startDragX = 0;
    let startDragY = 0;
    let startCircleLeft = 0;
    let startCircleBottom = 0;
    let endDragX = 0;
    let endDragY = 0;

    circle.addEventListener('mousedown', function(event) {
        isDragging = true;
        startDragX = event.clientX;
        startDragY = event.clientY;
        startCircleLeft = circle.getBoundingClientRect().left - container.getBoundingClientRect().left;
        startCircleBottom = parseFloat(circle.style.bottom);
        event.preventDefault();
    });

    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return;

        let distanceMovedX = event.clientX - startDragX;
        let distanceMovedY = startDragY - event.clientY; // Y axis is inverted


        // Restrict movement within the allowed range
        distanceMovedX = Math.max(Math.min(distanceMovedX, maxMovement), -maxMovement);
        distanceMovedY = Math.max(Math.min(distanceMovedY, maxMovement), -maxMovement);

        circle.style.left = (startCircleLeft + distanceMovedX) + 'px';
        circle.style.bottom = (startCircleBottom + distanceMovedY) + 'px';
        
        // Update the end drag positions
        endDragX = event.clientX;
        endDragY = event.clientY;
    });

    document.addEventListener('mouseup', function() {
        if (!isDragging) return;
        isDragging = false;

        // Calculate the vector
        let vectorX = endDragX - startDragX;
        let vectorY = startDragY - endDragY; // Y axis is inverted

        // Position and show the projectile
        projectile.style.left = circle.style.left;
        projectile.style.bottom = circle.style.bottom;
        projectile.style.display = 'block';

        // Animate the projectile along the vector
        projectile.style.transition = 'left 1s linear, bottom 1s linear';
        setTimeout(() => {
            projectile.style.left = (startCircleLeft + vectorX * 5) + 'px'; // Multiply by a factor to increase the travel distance
            projectile.style.bottom = (startCircleBottom + vectorY * 5) + 'px';
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

    document.addEventListener('mouseup', function() {
        if (!isDragging || !hasExceededThreshold) return;
        isDragging = false;
    
        // Calculate the direction vector
        let vectorX = parseFloat(circle.style.left) - startCircleLeft;
        let vectorY = parseFloat(circle.style.bottom) - startCircleBottom;
    
        // Create and position the projectile
        const projectile = document.createElement('div');
        projectile.style.width = '25px';
        projectile.style.height = '25px';
        projectile.style.backgroundColor = 'blue';
        projectile.style.borderRadius = '50%';
        projectile.style.position = 'absolute';
        projectile.style.bottom = circle.style.bottom;
        projectile.style.left = circle.style.left;
        container.appendChild(projectile);
    
        // Animate the projectile along the vector
        requestAnimationFrame(function animate() {
            const currentLeft = parseFloat(projectile.style.left);
            const currentBottom = parseFloat(projectile.style.bottom);
            if (currentBottom < window.innerHeight && currentLeft >= 0 && currentLeft <= window.innerWidth) {
                projectile.style.left = (currentLeft + vectorX * 0.05) + 'px'; // Small increments for smooth animation
                projectile.style.bottom = (currentBottom + vectorY * 0.05) + 'px';
                requestAnimationFrame(animate);
            } else {
                container.removeChild(projectile);
            }
        });
    
        // Animate main circle back to original position
        circle.style.transition = 'left 0.5s cubic-bezier(.25,.82,.25,1), bottom 0.5s cubic-bezier(.25,.82,.25,1)';
        circle.style.left = 'calc(50% - 25px)';
        circle.style.bottom = '70px';
    
        // Remove transition once animation is complete
        setTimeout(() => circle.style.transition = '', 500);
    });
    

});
