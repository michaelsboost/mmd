// Load html file to document
$(window).load(function() {
	// Trigger LoadFile DIV TO Load File
	$('#openload').click(function() {
		$('#loadfile').trigger('click');
	});
	
	// Load File into Editor
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		var LoadFile = function(input) {
			var reader = new FileReader();
				reader.onload = function(e) {
					var content = e.target.result;
					code.val(content);
				};
			reader.readAsText(input[0]);
		};
		
		try {
			$('#loadfile').on('change', function() {
				LoadFile(this.files);
				preview.html(code.val());
			});
		}
		catch(event) {
			alert("Oops there's been an error.");
		}
	} else {
		alert('The File APIs are not fully supported in this browser.');
	}
});

// Save Coded Document
function saveTextAsFile() {
	var textToWrite = document.getElementById("code").value;
	var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
	var fileNameToSaveAs = "gen-layout.html";

	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}

function destroyClickedElement(event) {
	document.body.removeChild(event.target);
}

// Horizontal WYSIWYG Menu's Scrollbar
(function() {
    function scrollMenu(e) {
		e = window.event || e;
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		document.getElementById('idive').scrollLeft -= (delta*40); // Multiplied by 40
		e.preventDefault();
	}
	if (document.getElementById('idive').addEventListener) {
		// IE9, Chrome, Safari, Opera
		document.getElementById('idive').addEventListener("mousewheel", scrollMenu, false);
		// Firefox
		document.getElementById('idive').addEventListener("DOMMouseScroll", scrollMenu, false);
	} else {
		// IE 6/7/8
		document.getElementById('idive').attachEvent("onmousewheel", scrollMenu);
	}
})();
