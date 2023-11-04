document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('#mobile-container');

    // Create the blue background at the top
    const topBackgroundHeight = '150px'; // Adjust as needed
    const topBackground = document.createElement('div');
    topBackground.style.width = '100%';
    topBackground.style.height = topBackgroundHeight;
    topBackground.style.backgroundColor = 'blue';
    topBackground.style.position = 'absolute';
    topBackground.style.top = '0';
    topBackground.style.left = '0';
    topBackground.style.zIndex = '-1';
    container.appendChild(topBackground);

    // Create the counter element
    const counter = document.createElement('div');
    counter.textContent = '00000'; // Start with five zeros
    counter.style.position = 'absolute';
    counter.style.top = '10px';
    counter.style.left = '50%';
    counter.style.transform = 'translateX(-50%)';
    counter.style.color = 'white';
    counter.style.fontSize = '3em';
    counter.style.fontFamily = 'Arial, sans-serif';
    counter.style.zIndex = '10';
    document.body.appendChild(counter);

    // Initialize the projectile counter
    let projectileCount = 0;

    // Function to update the counter display
    function updateCounter() {
        projectileCount++;
        counter.textContent = String(projectileCount).padStart(5, '0');
    }

    // Store opponent shapes and projectiles in arrays
    const opponents = [];
    const projectiles = [];

    // Set up the player (blue circle)
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

    // Tap Dot Element
    const tapDotElement = document.createElement('div');
    tapDotElement.textContent = "TAP THE DOT";
    tapDotElement.style.position = 'absolute';
    tapDotElement.style.bottom = '50px';
    tapDotElement.style.left = '50%';
    tapDotElement.style.transform = 'translateX(-50%)';
    tapDotElement.style.fontFamily = "system-ui, sans-serif";
    container.appendChild(tapDotElement);

    let isDragging = false;
    let startDragY = 0;
    let startCircleBottom = 0;

    // Mouse down event to initiate drag
    circle.addEventListener('mousedown', function(event) {
        isDragging = true;
        startDragY = event.clientY;
        startCircleBottom = parseFloat(circle.style.bottom);
        event.preventDefault();
    });

    // Mouse move event to handle dragging
    document.addEventListener('mousemove', function(event) {
        if (!isDragging) return;
        let distanceMoved = startDragY - event.clientY;
        const maxMovement = window.innerHeight - parseFloat(circle.style.height) - parseFloat(topBackgroundHeight);
        let newBottom = startCircleBottom + distanceMoved;
        newBottom = Math.max(Math.min(newBottom, maxMovement), 0);
        circle.style.bottom = newBottom + 'px';
    });

    // Mouse up event to release drag and shoot projectile
    document.addEventListener('mouseup', function() {
        if (!isDragging) return;
        isDragging = false;

        const projectile = document.createElement('div');
        projectile.style.width = '25px';
        projectile.style.height = '25px';
        projectile.style.backgroundColor = 'blue';
        projectile.style.borderRadius = '50%';
        projectile.style.position = 'absolute';
        projectile.style.bottom = (parseFloat(circle.style.bottom) + parseFloat(circle.style.height) / 2 - parseFloat(projectile.style.height) / 2) + 'px';
        projectile.style.left = '50%';
        projectile.style.transform = 'translateX(-50%)';
        projectile.counted = false;
        container.appendChild(projectile);
        projectiles.push(projectile);

        requestAnimationFrame(() => animateProjectile(projectile));

        circle.style.transition = 'bottom 0.5s cubic-bezier(.25,.82,.25,1)';
        circle.style.bottom = '70px';
        setTimeout(() => circle.style.transition = '', 500);
    });

    // Function to animate projectiles and check for collisions
    function animateProjectile(projectile) {
        const currentBottom = parseFloat(projectile.style.bottom);
        const projectileHeight = parseFloat(projectile.style.height);
    
        if (currentBottom < window.innerHeight + projectileHeight) {
            projectile.style.bottom = (currentBottom + 5) + 'px';
    
            if (!projectile.counted && currentBottom >= window.innerHeight) {
                updateCounter();
                projectile.counted = true;
            }
    
            requestAnimationFrame(() => animateProjectile(projectile));
        } else {
            projectile.remove();
            projectiles.splice(projectiles.indexOf(projectile), 1);
        }
    }

    // Functions related to generating opponents
    function generateOpponent(yPosition) {
        // ... Opponent generation code ...
    }

    function generateOpponentsInRows() {
        // ... Opponents in rows generation code ...
    }

    // Collision and game over code
    function checkCollision() {
        // ... Collision checking code ...
    }

    function showWinScreen() {
        // ... Win screen display code ...
    }

    // Start generating opponents in rows
    setInterval(generateOpponentsInRows, 2000);
});
