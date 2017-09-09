from server import app
from flask import Flask, request, render_template, url_for, jsonify
from werkzeug.utils import secure_filename
import os

@app.route("/",methods=["GET","POST"])
def index():
	if (request.method == "POST"):
		fileObject = request.files["inputFile"]
		fileName = secure_filename(fileObject.filename) 
		# Use secure_filename to ensure user does not submit dangerous form data
		fileList = os.listdir("uploads")
		# populate the list of files.
		if (fileName not in fileList):
			fileList.append(fileName)
			save_path = "{}/{}".format(app.config["UPLOAD_FOLDER"],fileName) 
			# Create the save path
			fileObject.save(save_path)
			# Save the object in the target folder 'uploads'
			return "successful_upload"
		else: 	
			return "unsuccessful_upload"
		
	else:
		return render_template("index.html")

@app.route("/filenames",methods=["GET"])
def check():
	filenames = os.listdir("uploads") 
	returnDict = dict(filenames=filenames) 
	return jsonify(returnDict) 
