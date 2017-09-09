$(function() { 
	var dropHandler = function(event) {			// Function which saves a dropped file into the uploads folder.	
		event.preventDefault(); 			
		var files = event.originalEvent.dataTransfer.files; 

		var formInput = new FormData();
		formInput.append("inputFile", files[0]); 	// If there are multiple dragged files we accept only the first.
	
		var formRequest = {				// Form to post the file to the flask function.
			url: "/",
			method: "POST",
			processData: false,
			contentType: false,
			data: formInput
		};
		
		var promise = $.ajax(formRequest); 		// Submit this data via ajax request.
		promise.then(uploadSuccess,uploadFailure); 	// Callback function. 

	};	

	var dragHandler = function(event) {			// Function which allows files to be dragged into the page. 
		event.preventDefault(); 			
	};

	var dropHandlerSet = {					// Define the handler functions for drag and drop events. 
		dragover: dragHandler,
		drop: dropHandler
	};

	var uploadSuccess = function(data) {			// This function is called when the flask application receives the "POST" request successfully. 
		var dt = new Date();				// var data contains the return value of the flask function index, "upload_success" or "upload_failure"
		var time = dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds();	// Create string for 24 hour time.
		var object = {"time":time}			// These lines compile the Handlebars template for the time. 
		var source = $("#timeTemplate").html(); 	// These four lines compile and apply the Handlebars template.
		var template = Handlebars.compile(source);	// Compile template data into a js function.
		var context = template(object);
		var renderedText = $(context);
		$("#time").empty();  
		$("#time").append(renderedText);		// Add the rendered text to the html.
		if (data == "unsuccessful_upload") {		// Update the last upload status text within the html. 
			$("#message").empty();			
			$("#message").append("<p>Your last file upload failed because there is already an existing file with the same name.</p>");		
			$("#message").append();				
		}
		else {
			$("#message").empty();			
			$("#message").append("<p>Your last file was uploaded successfully. </p>");	
		}		
		var promise = $.get("/filenames");		// After the drop update the file list.
		promise.then(addEntry);
	};
	
	var uploadFailure = function(data) {			
	}; 						

	var addEntry = function(data) {				// This function compiles and renders the Handlebars template for the table of filenames.
		var source = $("#tableTemplate").html(); 
		var template = Handlebars.compile(source);	// Compile template data into a js function.
		var context = template(data);
		var renderedText = $(context);
		$("#tableArea").empty();  
		$("#tableArea").append(renderedText);		// Add the rendered table to the html.
	};

	$(".dropzone").on(dropHandlerSet); 			// Attach event handlers to events occuring on .dropzone
	uploadSuccess(false); 					// Called to ensure we have initial data; 
});		
