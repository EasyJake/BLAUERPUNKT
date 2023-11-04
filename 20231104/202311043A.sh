#!/bin/bash
# Set up the game directory and create the files.

GAME_DIR="TapTheDotGame"
mkdir -p "$GAME_DIR"
cd "$GAME_DIR"
touch index.html style.css game.js
