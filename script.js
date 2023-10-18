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
    circle.style.cursor = 'pointer'; 

    container.appendChild(circle);

    let isDragging = false;
    let startDragY = 0;
    let startCircleBottom = 0;
    const radius = 25;

    let initialPosition = null;
    let tension = 0;

    circle.addEventListener('mousedown', function(event) {
        isDragging = true;
        startDragY = event.clientY;
        startCircleBottom = parseFloat(circle.style.bottom);
        initialPosition = { x: event.clientX, y: event.clientY };
        event.preventDefault();
    });

    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return;

        const currentPosition = { x: event.clientX, y: event.clientY };
        tension = Math.sqrt(Math.pow(currentPosition.x - initialPosition.x, 2) + Math.pow(currentPosition.y - initialPosition.y, 2));
        
        let distanceMoved = startDragY - event.clientY;
        if (distanceMoved > radius) distanceMoved = radius;
        else if (distanceMoved < -radius) distanceMoved = -radius;
        
        circle.style.bottom = (startCircleBottom + distanceMoved) + 'px';
    });

    document.addEventListener('mouseup', function() {
        if (!isDragging) return;

        if (tension > radius) { // only shoot if there's proper tension
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
        }

        // Animate main circle back to original position
        circle.style.transition = 'bottom 0.5s cubic-bezier(.25,.82,.25,1)';
        circle.style.bottom = '70px';
        setTimeout(() => circle.style.transition = '', 500);

        isDragging = false;
        tension = 0;
    });
});
