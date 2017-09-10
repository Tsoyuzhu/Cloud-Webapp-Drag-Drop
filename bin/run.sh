#!/bin/bash

echo "Checking if python is installed..."
echo "..."
if hash python 2>/dev/null; 
then
	echo "[python is installed]"
else
	echo "I require python but it's not installed. Aborting."
	exit 1
fi
echo "initialising virtualenv..."
source cloudAppProjectDependencies/bin/activate
echo "moving you to app directory"
cd ..
python run.py 
echo 
deactivate
echo "moving you back to bin directory"
cd bin
echo "[execution of run.sh is finished]"
