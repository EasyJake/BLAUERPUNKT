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
    let startDragY = 0;
    let startCircleBottom = 0;
    const radius = 25; // Half of the circle's diameter
    const dragThreshold = 10; // Minimum distance the mouse must move to trigger the projectile
    let hasExceededThreshold = false;

    circle.addEventListener('mousedown', function(event) {
        isDragging = true;
        startDragY = event.clientY;
        startCircleBottom = parseFloat(circle.style.bottom);
        hasExceededThreshold = false;
        event.preventDefault(); // Prevent text selection, etc.
    });

    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return;

        let distanceMoved = startDragY - event.clientY;

        // Check if the drag threshold is exceeded
        if (Math.abs(distanceMoved) >= dragThreshold) {
            hasExceededThreshold = true;
        }

        // Limit the distance to the radius of the circle
        if (distanceMoved > radius) {
            distanceMoved = radius;
        } else if (distanceMoved < -radius) {
            distanceMoved = -radius;
        }

        circle.style.bottom = (startCircleBottom + distanceMoved) + 'px';
    });

    document.addEventListener('mouseup', function() {
        if (!isDragging || !hasExceededThreshold) return;
        isDragging = false;

        // Create and animate the projectile
        const projectile = document.createElement('div');
        projectile.style.width = '25px';
        projectile.style.height = '25px';
        projectile.style.backgroundColor = 'blue';
        projectile.style.borderRadius = '50%';
        projectile.style.position = 'absolute';
        projectile.style.bottom = (parseFloat(circle.style.bottom) + 25) + 'px';
        projectile.style.left = '50%';
        projectile.style.transform = 'translateX(-50%)';
        container.appendChild(projectile);

        requestAnimationFrame(function animate() {
            const currentBottom = parseFloat(projectile.style.bottom);
            if (currentBottom < window.innerHeight) {
                projectile.style.bottom = (currentBottom + 5) + 'px';
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
