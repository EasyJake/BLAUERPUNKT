#!/bin/bash

# Loop through each .js file in the directory
for jsfile in *.js; do
    # Extract the filename without the extension and remove the "~" at the front
    filename=$(basename "$jsfile" .js | sed 's/~//')
    
    # Create the corresponding .html file in the prototypes directory
    cat <<EOL > "${filename}.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${filename}</title>
    <link rel="stylesheet" type="text/css" href="../public/styles.css">
    <link rel="stylesheet" type="text/css" href="../public/mobile.css">
</head>
<body>
    <div id="mobile-container">
        <!-- Content inside the mobile container can go here -->
    </div>
    <script src="${jsfile}"></script>
</body>
</html>
EOL
done
