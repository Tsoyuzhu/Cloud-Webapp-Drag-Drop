Hello! Thanks for taking the time to look at my submission.
IMPORTANT NOTE: [[It may be necessary to execute the scripts with 'sudo ./install.sh' and 'sudo ./run.sh' as the scripts will make install programs 
onto your computer. The programs installed are: virtual environment and flask.]] 
Please execute install.sh first in order to ensure your computer has the necessary packages to run the app.
The bash script assumes you have the latest pip and python installed under the executables 'pip' and 'python'.
After 'install.sh' has run correctly, execute 'run.sh'.
The script wil execute run.py using python which will run the application on localhost:9393 
The app rejects a file upload if there is already a file with identical name in the uploads directory. 
There is an empty text file initially in the uploads directory to ensure the uploads folder is committed to the git repository.
If the bash scripts fail to run correctly then as last resort the app can be run (assuming flask is installed)
from the directory containing "run.py" with the command:
python run.py 

Theon 
