#!/bin/bash

source './handler.sh'

# echo "Yarn version"
# yarn set version from sources

echo "Installing"
yarn install

pushd packages/@roots

for package in */ ; do
  pushd "$package"
  yarn build:cjs
  yarn build:esm
  popd
done

popd

echo "Linting packages"
yarn lint

echo "Linting shrinkwrap"
yarn pkg

echo "Test"
yarn test

echo "Done"

exit
