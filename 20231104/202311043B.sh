#!/bin/bash
# Create the HTML and CSS content.

echo '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tap the Dot</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="game-container">
        <div id="score-board">Score: <span id="score">00000</span></div>
        <div id="dot" class="dot"></div>
    </div>
    <script src="game.js"></script>
</body>
</html>' > index.html

echo '/* Style.css file */
#game-container {
    position: relative;
    width: 600px;
    height: 400px;
    margin: 20px auto;
    background-color: #fff;
    border: 1px solid #000;
}
#score-board {
    padding: 10px;
    text-align: center;
}
.dot {
    width: 50px;
    height: 50px;
    background-color: blue;
    border-radius: 50%;
    position: absolute;
}
' > style.css
