#!/bin/bash

ROUTES_FILE="src/common/constants/routes.ts"
APP_DIR="src/app"

toPascalCase() {
  local IFS='/'
  read -ra PARTS <<< "$1"
  local RESULT=""
  for part in "${PARTS[@]}"; do
    if [ -n "$part" ]; then
      RESULT+=$(tr '[:lower:]' '[:upper:]' <<< "${part:0:1}")${part:1}
    fi
  done
  echo "$RESULT"
}

ROUTES=$(grep -oP '"\K[^"]+' "$ROUTES_FILE")

for route in $ROUTES; do
  
  if [ "$route" == "/" ]; then
    continue
  fi

  DIR_PATH="$APP_DIR$route"
  
  if [ ! -d "$DIR_PATH" ]; then
    echo "Creating folder $DIR_PATH"
    mkdir -p "$DIR_PATH"
  fi
  
  FILE_PATH="$DIR_PATH/page.tsx"
  COMPONENT_NAME="$(toPascalCase "$route")Page"

  if [ ! -f "$FILE_PATH" ]; then
    echo "Creating $FILE_PATH"
    cat > "$FILE_PATH" <<EOL
export default function $COMPONENT_NAME() {
  return <h1>Page: $route</h1>;
}
EOL
  fi
done

echo "Routes successfully created with proper component names!"
