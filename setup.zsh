#!/bin/zsh
set -e

echo "Initializing client"
cd ./client
yarn

echo "Initializing server"
cd ../server
go mod tidy

echo "Initialization done."