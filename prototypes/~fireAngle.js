document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#mobile-container');
    const circle = document.createElement('div');

    circle.style.width = '50px';
    circle.style.height = '50px';
    circle.style.backgroundColor = 'blue';
    circle.style.borderRadius = '50%';
    circle.style.position = 'absolute';
    circle.style.bottom = '70px';
    circle.style.left = '50%';
    circle.style.transform = 'translateX(-50%)';
    circle.style.cursor = 'pointer'; // Cursor indicates it's draggable

    container.appendChild(circle);

    let isDragging = false;
    let startDragX = 0;
    let startDragY = 0;
    let startCircleLeft = 0;
    let startCircleBottom = 0;
    const radius = 25; // Half of the circle's diameter
    const dragThreshold = 10; // Minimum distance the mouse must move to trigger the projectile
    let hasExceededThreshold = false;

    circle.addEventListener('mousedown', function(event) {
        isDragging = true;
        startDragX = event.clientX;
        startDragY = event.clientY;
        startCircleLeft = parseFloat(circle.style.left);
        startCircleBottom = parseFloat(circle.style.bottom);
        hasExceededThreshold = false;
        event.preventDefault(); // Prevent text selection, etc.
    });

    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return;

        let distanceMovedY = startDragY - event.clientY;

        // Check if the drag threshold is exceeded
        if (Math.abs(distanceMovedY) >= dragThreshold) {
            hasExceededThreshold = true;
        }

        // Limit the distance to the radius of the circle
        if (distanceMovedY > radius) {
            distanceMovedY = radius;
        } else if (distanceMovedY < -radius) {
            distanceMovedY = -radius;
        }

        circle.style.bottom = (startCircleBottom + distanceMovedY) + 'px';
    });

    document.addEventListener('mouseup', function(event) {
        if (!isDragging || !hasExceededThreshold) return;
        isDragging = false;

        // Calculate the direction vector based on initial and dragged positions
        let vectorX = startDragX - event.clientX;
        let vectorY = event.clientY - startDragY;

        // Create and position the projectile
        const projectile = document.createElement('div');
        projectile.style.width = '25px';
        projectile.style.height = '25px';
        projectile.style.backgroundColor = 'red'; // Different color to distinguish projectile
        projectile.style.borderRadius = '50%';
        projectile.style.position = 'absolute';
        projectile.style.bottom = circle.style.bottom; // Start from the circle's current position
        projectile.style.left = circle.style.left;
        projectile.style.transform = 'translateX(-50%)';
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
        circle.style.transition = 'bottom 0.5s cubic-bezier(.25,.82,.25,1)';
        circle.style.bottom = '70px';

        // Remove transition once animation is complete
        setTimeout(() => circle.style.transition = '', 500);
    });
});
