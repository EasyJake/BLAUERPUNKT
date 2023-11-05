#!/bin/bash

# Name of the output HTML file
INDEX_FILE="index.html"

# Begin the index.html file with the provided HTML structure
cat > $INDEX_FILE <<EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DodgerDotter</title>
    <link rel="stylesheet" href="styles.css">
EOF

# Add script tags for each JS file in the current directory, ignoring subdirectories
# This uses a for loop over the list of files from the find command
# The -maxdepth option restricts the search to the current directory
for jsfile in $(find . -maxdepth 1 -type f -name '*.js'); do
    # Exclude dodgerdotter.js as it's already included in the template
    if [[ $jsfile != "./dodgerdotter.js" ]]; then
        echo "    <script src=\"${jsfile#./}\"></script>" >> $INDEX_FILE
    fi
done

# Finish the index.html file
cat >> $INDEX_FILE <<EOF

</head>
<body>
    <div id="mobile-container"> </div>
    <script src="dodgerdotter.js"></script> 
</body>
</html>
EOF

echo "Index file $INDEX_FILE created successfully."
