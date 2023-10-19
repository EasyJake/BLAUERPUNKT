document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#mobile-container');
    const circle = document.createElement('div');
    const circleDiameter = 50;
    const circleRadius = circleDiameter / 2;
    const maxRadius = circleDiameter;  // The max movement radius is equal to the circle's diameter

    circle.style.width = circleDiameter + 'px';
    circle.style.height = circleDiameter + 'px';
    circle.style.backgroundColor = 'blue';
    circle.style.borderRadius = '50%';
    circle.style.position = 'absolute';
    circle.style.bottom = '70px';
    circle.style.left = 'calc(50% - 25px)';
    circle.style.cursor = 'pointer';

    container.appendChild(circle);

    let isDragging = false;
    let startDragX = 0;
    let startDragY = 0;
    let startCircleLeft = 0;
    let startCircleBottom = 0;

    circle.addEventListener('mousedown', function(event) {
        isDragging = true;
        startDragX = event.clientX;
        startDragY = event.clientY;
        const rect = circle.getBoundingClientRect();
        startCircleLeft = rect.left + circleRadius; // adjusted to the center of the circle
        startCircleBottom = container.getBoundingClientRect().bottom - rect.bottom - circleRadius; // adjusted to the center
        event.preventDefault();
    });

    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return;

        let distanceMovedX = event.clientX - startDragX;
        let distanceMovedY = startDragY - event.clientY; // Y axis is inverted

        // Check if movement is within the circular boundary
        let distanceFromStart = Math.sqrt(distanceMovedX * distanceMovedX + distanceMovedY * distanceMovedY);
        if (distanceFromStart > maxRadius) {
            // Calculate the angle of the drag to maintain the direction
            let angle = Math.atan2(distanceMovedY, distanceMovedX);
            distanceMovedX = maxRadius * Math.cos(angle);
            distanceMovedY = maxRadius * Math.sin(angle);
        }

        circle.style.left = (startCircleLeft - circleRadius + distanceMovedX) + 'px';
        circle.style.bottom = (startCircleBottom - circleRadius + distanceMovedY) + 'px';
    });

    document.addEventListener('mouseup', function() {
        if (!isDragging) return;
        isDragging = false;

        // Animate back to original position
        circle.style.transition = 'left 0.5s cubic-bezier(.25,.82,.25,1), bottom 0.5s cubic-bezier(.25,.82,.25,1)';

        setTimeout(() => {
            circle.style.left = 'calc(50% - 25px)';
            circle.style.bottom = '70px';
            circle.style.transition = '';
        }, 10); // Small delay to ensure the transition is applied correctly
    });
});
