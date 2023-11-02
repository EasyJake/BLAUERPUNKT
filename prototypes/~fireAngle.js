document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#mobile-container');
    const circleDiameter = 50;  // Diameter of the draggable circle

    // Function to create a projectile
    function createProjectile(color, size, zIndex) {
        const projectile = document.createElement('div');
        Object.assign(projectile.style, {
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: '50%',
            position: 'absolute',
            display: 'none',  // Hide initially
            zIndex: zIndex.toString()
        });
        container.appendChild(projectile);
        return projectile;
    }

    // Original static projectile (large blue dot)
    const projectileOriginal = createProjectile('blue', circleDiameter, 1);

    // Setup original projectile position
    Object.assign(projectileOriginal.style, {
        left: '50%',
        bottom: '70px',
        transform: 'translateX(-50%)'
    });

    // Draggable circle (red)
    const circle = createProjectile('red', circleDiameter, 2);

    // Setup draggable circle position
    Object.assign(circle.style, {
        bottom: '70px',
        left: 'calc(50% - 25px)',
        cursor: 'pointer'
    });

    // New projectile (small blue dot)
    const projectile = createProjectile('blue', 10, 2);

    // Draggable logic
    let isDragging = false;
    let startDragX = 0;
    let startDragY = 0;
    let startCircleLeft = 0;
    let startCircleBottom = 0;

    circle.addEventListener('mousedown', function(event) {
        isDragging = true;
        startDragX = event.clientX;
        startDragY = event.clientY;
        const circleRect = circle.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        startCircleLeft = circleRect.left - containerRect.left;
        startCircleBottom = containerRect.bottom - circleRect.bottom; // Corrected calculation
        event.preventDefault();
    });

    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return;

        let deltaX = event.clientX - startDragX;
        let deltaY = startDragY - event.clientY; // Y axis is inverted
        const maxMovement = circleDiameter * 2;  // Limit drag distance

        deltaX = Math.max(Math.min(deltaX, maxMovement), -maxMovement);
        deltaY = Math.max(Math.min(deltaY, maxMovement), -maxMovement);

        circle.style.left = `${startCircleLeft + deltaX}px`;
        circle.style.bottom = `${startCircleBottom + deltaY}px`;
    });

    document.addEventListener('mouseup', function() {
        if (!isDragging) return;
        isDragging = false;

        // Calculate the vector
        const vectorX = event.clientX - startDragX;
        const vectorY = startDragY - event.clientY; // Corrected calculation

        // Position and show the projectile
        projectile.style.left = circle.style.left;
        projectile.style.bottom = circle.style.bottom;
        projectile.style.display = 'block';

        // Animate the projectile
        projectile.style.transition = 'left 1s linear, bottom 1s linear';
        setTimeout(() => {
            projectile.style.left = `${parseFloat(circle.style.left) + vectorX * 5}px`;
            projectile.style.bottom = `${parseFloat(circle.style.bottom) + vectorY * 5}px`;
        }, 10);

        // Reset circle and projectile
        circle.style.transition = 'left 0.5s ease-out, bottom 0.5s ease-out';
        setTimeout(() => {
            circle.style.left = 'calc(50% - 25px)';
            circle.style.bottom = '70px';
            circle.style.transition = '';

            projectile.style.display = 'none';
            projectile.style.transition = '';
        }, 1000);  // Wait for the projectile animation to finish
    });
});
