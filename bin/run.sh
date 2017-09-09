#! /bin/bash

clear
echo "Hello, $USER! This script assumes you have pip3 and at least python3 installed."
echo "moving you back to the app folder..."
echo
cd ..
echo "installing flask..."
pip3 install flask
echo "running app..."
python3 run.py 

