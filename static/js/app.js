	// Javascript code below is messy. The function which calls the others is found below and is called "dragHandler". It is called when a file is dropped onto the html div with class ".dropzone". 
$(function() { 

	var addEntry = function(data) {				// This function compiles the Handlebars template for the table of filenames. Called by Function "uploadSuccess".
		var source = $("#tableTemplate").html(); 
		var template = Handlebars.compile(source);	// Compile template data into a js function.
		var context = template(data);
		var renderedText = $(context);
		$("#tableArea").empty();  
		$("#tableArea").append(renderedText);		// Add the rendered table to the html.
	};

	var uploadSuccess = function(data) {			// This function is called when the flask application receives the "POST" request successfully. 
		var dt = new Date();
		var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();	// Create string for 24 hour time.
		var object = {"time":time}			// These lines compile the Handlebars template for the time. 
		var source = $("#timeTemplate").html(); 	// These four lines are Handlebars processes.
		var template = Handlebars.compile(source);	// Compile template data into a js function.
		var context = template(object);
		var renderedText = $(context);
		$("#time").empty();  
		$("#time").append(renderedText);		// Add the rendered time to the html.
		if (data == "unsuccessful_upload") {
			$("#message").empty();			
			$("#message").append("<p>Your last file upload failed because there is already an existing file with the same name.</p>");		
			$("#message").append();				
		}
		else {
			$("#message").empty();			
			$("#message").append("<p>Your last file was uploaded successfully. </p>");	
		}		
		var promise = $.get("/filenames");
		promise.then(addEntry);
	};
	
	var uploadFailure = function(data) {			// This function will never be called since 
	}; 							// request method is always "POST".

	var dragHandler = function(event) {
		event.preventDefault(); 			// Suppress default browser drag behaviour.
	};

	var dropHandler = function(event) {			// [THIS FUNCTION INVOKES ALL THE OTHERS]
		event.preventDefault(); 			// Suppress default browser drop behaviour.
		var files = event.originalEvent.dataTransfer.files; 

		var formInput = new FormData();
		formInput.append("inputFile", files[0]); 	// If there are multiple dragged files we accept only the first.
	
		var formRequest = {
			url: "/",
			method: "POST",
			processData: false,
			contentType: false,
			data: formInput
		};
		
		var promise = $.ajax(formRequest); 		// Submit this data via ajax request.
		promise.then(uploadSuccess,uploadFailure); 	// Callback since ajax is asynchronous.

	};	

	var dropHandlerSet = {					// Create set of handlers for drag and drop events. 
		dragover: dragHandler,
		drop: dropHandler
	};

	$(".dropzone").on(dropHandlerSet); 			// Attach event handlers to events occuring on .dropzone

	uploadSuccess(false); // Called to ensure we have initial data; 
});		
