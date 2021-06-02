#!/bin/bash

# YOINK! https://stackoverflow.com/a/4774063
SCRIPTS_DIR="$(cd "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P)"

source "${SCRIPTS_DIR}/handler.sh"

echo "/proc/sys/kernel/pid_max"
cat /proc/sys/kernel/pid_max

# echo "Yarn version"
# yarn set version from sources

echo "Installing"
yarn install

echo "Building cjs"
yarn tsc -b

echo "Linting packages"
yarn lint

echo "Linting shrinkwrap"
yarn pkg

echo "Test"
yarn test

echo "Done"

exit
