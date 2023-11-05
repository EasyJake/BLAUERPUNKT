document.addEventListener('DOMContentLoaded', function(){
    // Select the container with the ID 'mobile-container'
    const container = document.querySelector('#mobile-container');

    // Create a counter element
    const counter = document.createElement('div');
    counter.textContent = '00000'; // Start with five zeros
    counter.style.position = 'absolute';
    counter.style.top = '10px'; // Adjust as necessary
    counter.style.left = '50%';
    counter.style.transform = 'translateX(-50%)';
    counter.style.color = 'white';
    counter.style.fontSize = '3em'; // Large block numbers
    counter.style.fontFamily = 'Arial, sans-serif';
    counter.style.zIndex = '10'; // Make sure it's visible on top

    // Append the counter to the #mobile-container instead of the body
    container.appendChild(counter);

    
    // Initialize the projectile counter
    let projectileCount = 0;

    // Function to update the counter display
    function updateCounter() {
        projectileCount++;
        counter.textContent = String(projectileCount).padStart(5, '0'); // Pad with zeros to ensure five digits
    }

});


