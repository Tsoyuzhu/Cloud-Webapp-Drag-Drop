#!/bin/bash
echo "[initialising virtualenv...]"
source cloudAppProjectDependencies/bin/activate
echo "[moving you to app directory]"
cd ..
python3 run.py 
echo 
deactivate
echo "[moving you back to bin directory]"
cd bin
echo "[execution finished.]"
