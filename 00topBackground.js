document.addEventListener('DOMContentLoaded', function() {

    const container = document.querySelector('#mobile-container');

    // Define the height for the blue background at the top
    const topBackgroundHeight = '150px'; // Adjust as needed

    // Create the top background element
    const topBackground = document.createElement('div');
    topBackground.style.width = '100%';
    topBackground.style.height = topBackgroundHeight;
    topBackground.style.backgroundColor = 'blue';
    topBackground.style.position = 'absolute';
    topBackground.style.top = '0';
    topBackground.style.left = '0';
    topBackground.style.zIndex = '-1'; // To ensure it stays behind other elements

    // Append the top background to the container
    container.appendChild(topBackground);


}); // Removed the extra parenthesis
