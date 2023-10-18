document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#mobile-container');
    const largeCircle = document.createElement('div');
    const smallCircle = document.createElement('div');

    const largeCircleSize = 200; // Set the size of the large circle (change as needed)
    const smallCircleSize = 50;  // Set the size of the small circle (change as needed)

    largeCircle.style.width = largeCircleSize + 'px';
    largeCircle.style.height = largeCircleSize + 'px';
    largeCircle.style.backgroundColor = 'lightgray';
    largeCircle.style.borderRadius = '50%';
    largeCircle.style.position = 'relative';

    smallCircle.style.width = smallCircleSize + 'px';
    smallCircle.style.height = smallCircleSize + 'px';
    smallCircle.style.backgroundColor = 'blue';
    smallCircle.style.borderRadius = '50%';
    smallCircle.style.position = 'absolute';
    smallCircle.style.top = '50%';
    smallCircle.style.left = '50%';
    smallCircle.style.transform = 'translate(-50%, -50%)';
    smallCircle.style.cursor = 'pointer';

    container.appendChild(largeCircle);
    largeCircle.appendChild(smallCircle);

    let isDragging = false;

    let initialPosition = null;

    smallCircle.addEventListener('mousedown', function(event) {
        isDragging = true;
        initialPosition = { x: event.clientX, y: event.clientY };
        event.preventDefault();
    });

    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return;

        const currentPosition = { x: event.clientX, y: event.clientY };
        const distance = Math.sqrt(
            Math.pow(currentPosition.x - initialPosition.x, 2) +
            Math.pow(currentPosition.y - initialPosition.y, 2)
        );

        // Calculate the maximum distance to stay within the large circle's radius
        const maxDistance = (largeCircleSize - smallCircleSize) / 2;

        if (distance <= maxDistance) {
            // Move the small circle within the large circle
            smallCircle.style.top = (50 - (distance / maxDistance) * 50) + '%';
            smallCircle.style.left = (50 - (distance / maxDistance) * 50) + '%';
        } else {
            // Limit the small circle's position to the edge of the large circle
            const angle = Math.atan2(currentPosition.y - initialPosition.y, currentPosition.x - initialPosition.x);
            smallCircle.style.top = (50 - Math.sin(angle) * 50) + '%';
            smallCircle.style.left = (50 - Math.cos(angle) * 50) + '%';
        }
    });

    document.addEventListener('mouseup', function() {
        if (!isDragging) return;

        // Snap the small circle back to the center of the large circle
        smallCircle.style.top = '50%';
        smallCircle.style.left = '50%';

        isDragging = false;
    });
});
