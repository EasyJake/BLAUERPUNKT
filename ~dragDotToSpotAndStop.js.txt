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

    circle.addEventListener('mousedown', function(event) {
        isDragging = true;
        startDragY = event.clientY;
        startCircleBottom = parseFloat(circle.style.bottom);
        event.preventDefault(); // Prevent text selection, etc.
    });

    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return;
        let distanceMoved = startDragY - event.clientY;
        circle.style.bottom = (startCircleBottom + distanceMoved) + 'px';
    });

    document.addEventListener('mouseup', function() {
        if (!isDragging) return;
        isDragging = false;
        
        // Animate back to original position
        circle.style.transition = 'bottom 0.5s cubic-bezier(.25,.82,.25,1)'; // A 'bounce' easing function
        circle.style.bottom = '70px';

        // Remove transition once animation is complete to avoid unwanted effects in future drag operations
        setTimeout(() => circle.style.transition = '', 500);
    });
});


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
    circle.style.transform = 'translate(-50%, 0)';
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
        startCircleLeft = parseFloat(circle.style.left);
        startCircleBottom = parseFloat(circle.style.bottom);
        event.preventDefault();
    });

    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return;
        
        let distanceMovedX = event.clientX - startDragX;
        let distanceMovedY = startDragY - event.clientY; // Y axis is inverted
        
        circle.style.left = (startCircleLeft + distanceMovedX) + 'px';
        circle.style.bottom = (startCircleBottom + distanceMovedY) + 'px';
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        // You can add any additional behavior here if needed
    });
});
