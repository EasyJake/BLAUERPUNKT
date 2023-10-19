// document.addEventListener('DOMContentLoaded', function() {
//     const container = document.querySelector('#mobile-container');
//     const circle = document.createElement('div');

//     circle.style.width = '50px';
//     circle.style.height = '50px';
//     circle.style.backgroundColor = 'blue';
//     circle.style.borderRadius = '50%';
//     circle.style.position = 'absolute';
//     circle.style.bottom = '70px';
//     circle.style.left = 'calc(50% - 25px)';  // Adjust to center the circle without using translate
//     circle.style.cursor = 'pointer';

//     container.appendChild(circle);

//     let isDragging = false;
//     let startDragX = 0;
//     let startDragY = 0;
//     let startCircleLeft = 0;
//     let startCircleBottom = 0;

//     circle.addEventListener('mousedown', function(event) {
//         isDragging = true;
//         startDragX = event.clientX;
//         startDragY = event.clientY;
//         startCircleLeft = circle.getBoundingClientRect().left - container.getBoundingClientRect().left;
//         startCircleBottom = parseFloat(circle.style.bottom);
//         event.preventDefault();
//     });

//     document.addEventListener('mousemove', function(event) {
//         if (!isDragging) return;
        
//         let distanceMovedX = event.clientX - startDragX;
//         let distanceMovedY = startDragY - event.clientY; // Y axis is inverted
        
//         circle.style.left = (startCircleLeft + distanceMovedX) + 'px';
//         circle.style.bottom = (startCircleBottom + distanceMovedY) + 'px';
//     });

//     document.addEventListener('mouseup', function() {
//         if (!isDragging) return;
//         isDragging = false;
        
//         // Animate back to original position
//         circle.style.transition = 'left 0.5s cubic-bezier(.25,.82,.25,1), bottom 0.5s cubic-bezier(.25,.82,.25,1)';
        
//         setTimeout(() => {
//             circle.style.left = 'calc(50% - 25px)';
//             circle.style.bottom = '70px';
//             circle.style.transition = '';
//         }, 10); // Small timeout to allow the CSS transition to be applied correctly
//     });
// });


// added constraint to square boundary around the circle

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#mobile-container');
    const circle = document.createElement('div');
    const circleDiameter = 50;
    const maxMovement = circleDiameter * 2;  // Two times the circle's diameter

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
        }, 10); // Small timeout to allow the CSS transition to be applied correctly
    });
});
