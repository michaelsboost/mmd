// Initialize CodeMirror editor
var delay;
var editor = CodeMirror.fromTextArea(document.getElementById('full-site-code'), {
    mode: 'text/html',
    tabMode: 'indent',
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping: true,
    autoCloseTags: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
});
editor.on("change", function() {
    clearTimeout(delay);
    delay = setTimeout(updatePreview, 300);
});
function updatePreview() {
    var previewFrame = document.getElementById('workflow');
    var preview =  previewFrame.contentDocument ||  previewFrame.contentWindow.document;
    preview.open();
    preview.write(editor.getValue());
    preview.close();
}
setTimeout(updatePreview, 300);

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

// Insert Button in ExecCommand
function pasteHtmlAtCaret(html) {
	var sel, range;
	if (window.getSelection) {
		// IE9 and non-IE
		sel = window.getSelection();
		if (sel.getRangeAt && sel.rangeCount) {
			range = sel.getRangeAt(0);
			range.deleteContents();

			// Range.createContextualFragment() would be useful here but is
			// non-standard and not supported in all browsers (IE9, for one)
			var el = document.createElement("span");
			el.innerHTML = html;
			var frag = document.createDocumentFragment(), node, lastNode;
			while ( (node = el.firstChild) ) {
				lastNode = frag.appendChild(node);
			}
			range.insertNode(frag);
			
			// Preserve the selection
			if (lastNode) {
				range = range.cloneRange();
				range.setStartAfter(lastNode);
				range.collapse(true);
				sel.removeAllRanges();
				sel.addRange(range);
			}
		}
	} else if (document.selection && document.selection.type != "Control") {
		// IE < 9
		document.selection.createRange().pasteHTML(html);
	}
}

// Save Coded Document
function saveTextAsHTML() {
	var textToWrite = editor.getValue();
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

(function() {
    function scrollMenu(e) {
		e = window.event || e;
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
		document.getElementById('gentags').scrollLeft -= (delta*40); // Multiplied by 40
		e.preventDefault();
	}
	if (document.getElementById('gentags').addEventListener) {
		// IE9, Chrome, Safari, Opera
		document.getElementById('gentags').addEventListener("mousewheel", scrollMenu, false);
		// Firefox
		document.getElementById('gentags').addEventListener("DOMMouseScroll", scrollMenu, false);
	} else {
		// IE 6/7/8
		document.getElementById('gentags').attachEvent("onmousewheel", scrollMenu);
	}
})();
