#!/bin/bash
echo "Making sure uploads folder exists in app folder"
cd ..
mkdir uploads
cd bin

echo "Checking if pip is installed"
echo "..."
if hash pip 2>/dev/null; 
then
	echo "[pip is installed]"
	pip install virtualenv
else
	echo "I require pip but it's not installed. Aborting."
	exit 1
fi

echo "installing virtualenv using pip..."
echo "..." 
pip install virtualenv 
echo "creating virtualenv in current directory"
virtualenv cloudAppProjectDependencies
echo "[activating virtualenv]"
source cloudAppProjectDependencies/bin/activate
echo "Installing flask..." 
pip install flask
deactivate
echo "[Installations complete. Please execute 'run.sh']"
