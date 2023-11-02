document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#mobile-container');
    const borderContainer = document.createElement('div'); // Container for the border
    const circle = document.createElement('div');
    const projectile = document.createElement('div');
    const circleDiameter = 50;
    const maxMovement = circleDiameter * 2;  // Two times the circle's diameter

    // Setup for the border container
    borderContainer.style.width = maxMovement + 'px';
    borderContainer.style.height = maxMovement + 'px';
    borderContainer.style.position = 'absolute';
    borderContainer.style.bottom = '70px';
    borderContainer.style.left = '50%';
    borderContainer.style.transform = 'translateX(-50%)';
    borderContainer.style.border = '2px solid lightgray'; // Light gray border
    container.appendChild(borderContainer);

    // Setup for the draggable circle
    circle.style.width = circleDiameter + 'px';
    circle.style.height = circleDiameter + 'px';
    circle.style.backgroundColor = 'blue';
    circle.style.borderRadius = '50%';
    circle.style.position = 'absolute';
    circle.style.top = '50%';
    circle.style.left = '50%';
    circle.style.transform = 'translate(-50%, -50%)';
    circle.style.cursor = 'pointer';
    borderContainer.appendChild(circle); // Append circle to border container

    // Setup for the projectile (small blue dot)
    projectile.style.width = '10px';
    projectile.style.height = '10px';
    projectile.style.backgroundColor = 'blue';
    projectile.style.borderRadius = '50%';
    projectile.style.position = 'absolute';
    projectile.style.display = 'none'; // Hide it initially
    borderContainer.appendChild(projectile); // Append projectile to border container

    let isDragging = false;
    let startDragX = 0;
    let startDragY = 0;
    let startCircleLeft = 0;
    let startCircleTop = 0;
    let endDragX = 0;
    let endDragY = 0;

    circle.addEventListener('mousedown', function(event) {
        isDragging = true;
        startDragX = event.clientX;
        startDragY = event.clientY;
        const rect = circle.getBoundingClientRect();
        startCircleLeft = rect.left - borderContainer.getBoundingClientRect().left + rect.width / 2;
        startCircleTop = rect.top - borderContainer.getBoundingClientRect().top + rect.height / 2;
        event.preventDefault();
    });

    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return;

        let distanceMovedX = event.clientX - startDragX;
        let distanceMovedY = startDragY - event.clientY; // Y axis is inverted

        // Restrict movement within the allowed range
        distanceMovedX = Math.max(Math.min(distanceMovedX, maxMovement/2 - circleDiameter/2), -maxMovement/2 + circleDiameter/2);
        distanceMovedY = Math.max(Math.min(distanceMovedY, maxMovement/2 - circleDiameter/2), -maxMovement/2 + circleDiameter/2);

        circle.style.left = 'calc(50% + ' + distanceMovedX + 'px)';
        circle.style.top = 'calc(50% - ' + distanceMovedY + 'px)';
        
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
        projectile.style.top = circle.style.top;
        projectile.style.display = 'block';

        // Animate the projectile along the vector
        projectile.style.transition = 'left 1s linear, top 1s linear';
        setTimeout(() => {
            projectile.style.left = 'calc(50% + ' + (vectorX * 5) + 'px)'; // Multiply by a factor to increase the travel distance
            projectile.style.top = 'calc(50% - ' + (vectorY * 5) + 'px)';
        }, 10);

        // Animate back to original position
        circle.style.transition = 'left 0.5s cubic-bezier(.25,.82,.25,1), top 0.5s cubic-bezier(.25,.82,.25,1)';
        setTimeout(() => {
            circle.style.left = '50%';
            circle.style.top = '50%';
            circle.style.transition = '';

            // Reset the projectile
            projectile.style.display = 'none';
            projectile.style.transition = '';
        }, 10); // Small timeout to allow the CSS transition to be applied correctly
    });
});
