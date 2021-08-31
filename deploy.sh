#!/bin/bash

set -e

pem=/Users/rick.wl/Desktop/rick01.pem
remote_path=/data/app/front/

echo "start to build project..."
npm run build

echo "start to deploy files to app..."

echo "delete index.html"
rm ./build/index.html

echo "deploy others..."
scp -i $pem -r ./build/* root@47.99.61.11:$remote_path

echo "done!"