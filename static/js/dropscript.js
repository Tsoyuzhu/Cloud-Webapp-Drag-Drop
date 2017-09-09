$(function() { 

	var addEntry = function(data) {
		var source = $("#tableTemplate").html(); 	// locate the template within the html document.
		var template = Handlebars.compile(source);	// compile template data -> function
		var context = template(data);
		var renderedText = $(context);
		console.log(data);
		$("#tableArea").empty();  	// Clear current table contents
		$("#tableArea").append(renderedText);
	};

	var uploadSuccess = function(data) {
		var promise = $.get("/filenames");
		promise.then(addEntry);
	};
	
	var uploadFailure = function(data) {
	}; 

	var dragHandler = function(event) {
		event.preventDefault(); // Suppress default browser drag behaviour
	};

	var dropHandler = function(event) {
		event.preventDefault(); // Suppress default browser drop behaviour
		var files = event.originalEvent.dataTransfer.files; 

		var formInput = new FormData();
		formInput.append("inputFile", files[0]); // Only accept one dragged file. 
	
		var formRequest = {
			url: "/",
			method: "POST",
			processData: false,
			contentType: false,
			data: formInput
		};
		
		var promise = $.ajax(formRequest); // Submit this data via ajax request
		promise.then(uploadSuccess,uploadFailure); // call function depending on success or failure 
		
	};	

	var dropHandlerSet = {			// Create set of handlers for drag and drop events. 
		dragover: dragHandler,
		drop: dropHandler
	};

	$(".dropzone").on(dropHandlerSet); 	// Attach event handlers to events occuring on .dropzone
	
	uploadSuccess(false); 	// provide initial data
});		
