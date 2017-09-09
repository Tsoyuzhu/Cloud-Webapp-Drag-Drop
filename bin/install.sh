#!/bin/bash
echo "[installing virtualenv]" 
pip install virtualenv 
echo "[creating virtualenv in current directory]"
virtualenv cloudAppProjectDependencies
echo "[activating virtualenv]"
source cloudAppProjectDependencies/bin/activate
echo "[Installing flask...]" 
pip install flask
deactivate
echo "[Installations complete. Please execute 'run.sh']"
