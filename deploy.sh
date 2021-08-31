#!/bin/bash

echo "start to deploy files to app..."

echo "delete index.html"
rm ./build/index.html
echo "deploy others..."

scp -i /Users/rick.wl/Desktop/rick01.pem -r ./build/* root@47.99.61.11:/data/app/front/

echo "done!"