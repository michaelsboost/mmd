html, body {
  padding: 0; margin: 0;
  -webkit-font-smoothing: antialiased;
}

body {
  position: absolute;
  top:0; left:0; right:0; bottom:0;
  overflow: hidden;
}

.disismyfukentoolbuxhhehahooo ::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}
.disismyfukentoolbuxhhehahooo ::-webkit-scrollbar-button {
  width:0; height:0;
}
.disismyfukentoolbuxhhehahooo ::-webkit-scrollbar-thumb {
  background: rgba(221, 221, 221, 0.75);
  border:0; border-radius: 50px;
}
.disismyfukentoolbuxhhehahooo ::-webkit-scrollbar-thumb:hover {
  background: rgb(221, 221, 221);
  border:0; border-radius: 50px;
}
.disismyfukentoolbuxhhehahooo ::-webkit-scrollbar-track {
  background: transparent;
  border:0; border-radius: 50px;
}
.disismyfukentoolbuxhhehahooo ::-webkit-scrollbar-corner {
  background: transparent;
}

/* Toolbox */
.disismyfukentoolbuxhhehahooo {
  position: absolute;
  top:0; right:0; bottom:0;
  width: 300px;
  background: #333;
  font: 300 16px/1.5 'museo-sans', 'Open Sans', sans-serif;
  color: #ccc;
  z-index:1;
}

.toggle-options {
  cursor: pointer;
  margin:0 0 10px 0;
  padding: 10px;
  border:0; outline:none;
  width: 100%; height: 36px;
  color: #ddd; background: #444;
  font: 14px Arial;
}
.toggle-options:hover {
  color: #ddd;
  background: #555;
}
.toggle-options:active {
  color: #ddd;
  background: #222;
}
.show-options {
  position: absolute;
  top:0; left:0; right:0;
  z-index:1; display:none;
}

.disismyfukentoolbuxhhehahooo label {
  position:relative;
  top: -2px;
}

/* Tool Icons */
.disismyfukentoolbuxhhehahooo .tools {
  color: #ddd;
  font: 15px Arial;
  padding: 10px 0;
  background: #111;
}
.disismyfukentoolbuxhhehahooo .tools a {
  cursor: pointer;
  margin: 0 5px;
  color: #ddd;
  font: 25px Arial;
  text-decoration:none;
  outline:none;
}
.disismyfukentoolbuxhhehahooo .tools a:hover { color: #fff; }
.disismyfukentoolbuxhhehahooo .tools a:active { color: #333; }
.disismyfukentoolbuxhhehahooo .link-to-svgedit {
  width:25px; height:25px;
  opacity: 0.75;
}
.disismyfukentoolbuxhhehahooo .link-to-svgedit:hover {
  opacity: 1;
}

.disismyfukentoolbuxhhehahooo .left, .disismyfukentoolbuxhhehahooo .right {
  position: absolute;
  top:0;
}
.disismyfukentoolbuxhhehahooo .left { left:0; }
.disismyfukentoolbuxhhehahooo .center { margin-left:33.2%; }
.disismyfukentoolbuxhhehahooo .right { right:0; }
.disismyfukentoolbuxhhehahooo .fill { width: 100%; }
.disismyfukentoolbuxhhehahooo .half { width: 50%; }

.disismyfukentoolbuxhhehahooo .select-active, .disismyfukentoolbuxhhehahooo .edit-active, .disismyfukentoolbuxhhehahooo .remove-active, .disismyfukentoolbuxhhehahooo .drop-active { color: #35a0a0!important; }

/* Styles Inside Initatted Inspector & Groups Tabs */
.disismyfukentoolbuxhhehahooo .inspection {
  position: absolute;
  top:49px; left:0; right:0; bottom:0;
  overflow: auto;
}
.disismyfukentoolbuxhhehahooo .inspector {
  border-width: 0px 1px 0 0;
  border-color: transparent #333 transparent transparent;
}

.disismyfukentoolbuxhhehahooo .add-media-query, .disismyfukentoolbuxhhehahooo .add-css-selector {
  cursor:pointer;
  border:0; padding:2px; outline:none;
  background:transparent; color:#ccc;
}
.disismyfukentoolbuxhhehahooo .add-media-query:hover, .disismyfukentoolbuxhhehahooo .add-css-selector:hover { color:#fff; outline:none; }
.disismyfukentoolbuxhhehahooo .add-media-query:active, .disismyfukentoolbuxhhehahooo .add-css-selector:active { color:#35a0a0; outline:none; }

.disismyfukentoolbuxhhehahooo .drop, .disismyfukentoolbuxhhehahooo .dropp {
  cursor: pointer;
  padding: 0 5px;
  border-top: 1px solid #151515;
  border-bottom: 1px solid #151515;
  background: #252525;
  color: #999;
  font: 14px times;
  text-transform: uppercase;
}
.disismyfukentoolbuxhhehahooo .drop-section, .disismyfukentoolbuxhhehahooo .section-display {
  padding: 5px;
  font: 14px arial;
}

.disismyfukentoolbuxhhehahooo input[type=text], .disismyfukentoolbuxhhehahooo input[type=text]:active, .drop-section input[type=text], .drop-section input[type=text]:active {
  outline: 0;
  background: #444;
  border-radius:0;
  border-style: solid;
  border-width: 1px;
  border-color: #1a1a1a #272729 #272729 #272729;
  font: 15px arial;
  -webkit-font-smoothing: antialiased;
  color: #ced;
}
.disismyfukentoolbuxhhehahooo input[type=text]:focus, .disismyfukentoolbuxhhehahooo .drop-section input[type=text]:focus {
  color: #ccc;
  background: #222;
  -webkit-font-smoothing: antialiased;
}

.disismyfukentoolbuxhhehahooo ::-webkit-input-placeholder { /* WebKit browsers */
    color: #888;
}
.disismyfukentoolbuxhhehahooo :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #888;
}
.disismyfukentoolbuxhhehahooo ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #888;
}
.disismyfukentoolbuxhhehahooo :-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #888;
}

.disismyfukentoolbuxhhehahooo .search4urdamelms {
  width: 90%;
  margin: 4px 5px 5px 5px;
  text-align: center;
}

.disismyfukentoolbuxhhehahooo .starter-properties a, .disismyfukentoolbuxhhehahooo .select-properties a {
  padding: 5px 10px; outline:none;
  color: #a9a9a9;
  background: #444;
  text-decoration: none;
}

.disismyfukentoolbuxhhehahooo .solid, .disismyfukentoolbuxhhehahooo .dotted, .disismyfukentoolbuxhhehahooo .dashed, .disismyfukentoolbuxhhehahooo .double, .disismyfukentoolbuxhhehahooo .ridge, .disismyfukentoolbuxhhehahooo .groove, .disismyfukentoolbuxhhehahooo .inset, .disismyfukentoolbuxhhehahooo .outset {
  border-color: #a9a9a9;
  border-width: 3px;
  text-decoration:none;
}

.disismyfukentoolbuxhhehahooo .grab-border-color { cursor: pointer; border-color: #000; border-width: 2px; padding: 5px 10px; border-style: solid; background: #000; margin:0; }
.disismyfukentoolbuxhhehahooo .grab-txt-color { cursor: pointer; border-color: #000; border-width: 2px; padding: 3px 13px; border-style: solid; background: #000; margin:0; }
.disismyfukentoolbuxhhehahooo .none { border-color: #444; border-width: 2px; text-decoration:none; border-style: solid; background: #1c1c1c; }
.disismyfukentoolbuxhhehahooo .solid { border-style: solid; }
.disismyfukentoolbuxhhehahooo .dotted { border-style: dotted; }
.disismyfukentoolbuxhhehahooo .dashed { border-style: dashed; }
.disismyfukentoolbuxhhehahooo .double { border-style: double; }
.disismyfukentoolbuxhhehahooo .ridge { border-style: ridge; }
.disismyfukentoolbuxhhehahooo .groove { border-style: groove; }
.disismyfukentoolbuxhhehahooo .inset { border-style: inset; }
.disismyfukentoolbuxhhehahooo .outset { border-style: outset; }
.disismyfukentoolbuxhhehahooo .border-active { background-color: #1c1c1c!important; }
.disismyfukentoolbuxhhehahooo .hide { position:absolute!important; top:-99999999px!important; left:-99999999px!important; width:0!important; height:0!important; display:none!important; opacity:0!important; padding:0!important; margin:0!important; resize:none!important; }
.disismyfukentoolbuxhhehahooo .scroll { overflow:auto; }

.disismyfukentoolbuxhhehahooo .colorwheel {
  background: -moz-linear-gradient(left,  #ff0000 0%, #ffff00 18%, #00ff00 35%, #00ffff 50%, #0000ff 65%, #ff00ff 82%, #ff0004 100%); /* FF3.6+ */
  background: -webkit-gradient(linear, left top, right top, color-stop(0%,#ff0000), color-stop(18%,#ffff00), color-stop(35%,#00ff00), color-stop(50%,#00ffff), color-stop(65%,#0000ff), color-stop(82%,#ff00ff), color-stop(100%,#ff0004)); /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(left,  #ff0000 0%,#ffff00 18%,#00ff00 35%,#00ffff 50%,#0000ff 65%,#ff00ff 82%,#ff0004 100%); /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(left,  #ff0000 0%,#ffff00 18%,#00ff00 35%,#00ffff 50%,#0000ff 65%,#ff00ff 82%,#ff0004 100%); /* Opera 11.10+ */
  background: -ms-linear-gradient(left,  #ff0000 0%,#ffff00 18%,#00ff00 35%,#00ffff 50%,#0000ff 65%,#ff00ff 82%,#ff0004 100%); /* IE10+ */
  background: linear-gradient(to right,  #ff0000 0%,#ffff00 18%,#00ff00 35%,#00ffff 50%,#0000ff 65%,#ff00ff 82%,#ff0004 100%); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ff0000', endColorstr='#ff0004',GradientType=1 ); /* IE6-9 */
}
.disismyfukentoolbuxhhehahooo .bg-color-picker span, .disismyfukentoolbuxhhehahooo .border-color-picker span, .disismyfukentoolbuxhhehahooo .text-color-picker span {
  padding:5px 0;
}
.disismyfukentoolbuxhhehahooo .bg-color-picker input[type=range], .disismyfukentoolbuxhhehahooo .border-color-picker input[type=range], .disismyfukentoolbuxhhehahooo .text-color-picker input[type=range] {
  position:relative; top:5px; margin:0;
}
.disismyfukentoolbuxhhehahooo .active-btn {
  color: #666;
  background-color: #1f1f21;
}
.disismyfukentoolbuxhhehahooo .horizontal-bar {
  display: inline-block;
  position: relative;
  padding: 5px 0 10px 0;
  top: -5px;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}
.disismyfukentoolbuxhhehahooo .table-in input[type=text] {
  width: 100%;
}
.disismyfukentoolbuxhhehahooo select, .#idive select {
  padding:0;
}
.disismyfukentoolbuxhhehahooo .imaddinganelementinmyselection {
  color: rgb(255, 255, 183)!important;
}

/* Ruler & Slider */
.ruler-container {
  position: absolute;
  top:0; left:0; right: 300px;
  height: 24px;
  overflow: hidden;
  border-bottom: 1px solid #000;
}
.ruler {
  width:100%; height:100%;
  background: #fed;
  color: #333;
  font-family: source code pro, "Arial Narrow", "Helvetica Neue", Helvetica, Arial, Veranda, sans-serif;
  font-size: 12px;
  line-height: 14px;
}
.ruler > div {
  display: inline-block;
  background: #333;
}
.ruler .tickLabel {
  position:relative;
  top: -10px;
  margin-left: 4px;
  width: 1px;
  height: 100%;
  text-indent: 1px;
  line-height: 20px;
}
.ruler .tickLabel:first-of-type {
  margin-left: 0px;
}
.ruler .tickMajor {
  margin-top: 19px;
  margin-left: 4px;
  width: 1px; height: 6px;
}
.ruler .tickMinor {
  margin-left: 4px;
  width: 1px; height: 4px;
}

/* Resize Constructs */
.media-query-slider {
  display:none;
  position: absolute;
  top:30px; left:0;
  padding: 5px 15px;
  font: 14px arial;
  border-radius:100em;
  color: #fff; z-index: 1;
  background: #278ab4;
  text-align:center;
  line-height: 25px;
}
.cwidth-containment {
  position: absolute;
  top:0; left:0; right:300px;
  z-index:2;
}
.cwidth {
  position: absolute;
  top: -10px; left:0;
  padding:0; margin:0;
  width: 100%;
  background: transparent;
}

/* WYSIWYG Content Editor */
#idive-container, #inactive-menubtns {
  position: absolute;
  bottom:0; left:0; right:300px; height:25px;
  background:#272625; z-index:1;
  overflow: hidden;
}

#inactive-menubtns {
  position: absolute;
  left:0; width:100%; height:100%;
  z-index:2!important; opacity: .9;
}

#idive { height:50px; overflow-y: hidden; overflow-x: auto; white-space: nowrap; }
#idive a { margin: 0 5px; color:#ddd; font:15px Arial; text-decoration:none; }
#idive a:hover { color:#fff; }
#idive a:active { color:#111; }
#idive *:active, #idive *:focus { outline:none; }

/* Draggable Elements For Stage */
.disismyfukentoolbuxhhehahooo .elms-4-stage button, .disismyfukentoolbuxhhehahooo .elms-4-stage input[type=button] {
  padding:0; margin:0;
}
.disismyfukentoolbuxhhehahooo .elms-4-stage center * {
  display:block;
  width: 95%;
  cursor:pointer;
  padding:5px; margin:0;
  border:0; outline:0;
  font: 300 16px/1.5 'museo-sans', 'Open Sans', sans-serif;
  color:#fff;
  text-align:center;
  text-transform:capitalize;
  background:#555;
}
.disismyfukentoolbuxhhehahooo .elms-4-stage center *:nth-child(1) { background:#66d; }
.disismyfukentoolbuxhhehahooo .elms-4-stage center *:nth-child(2) { background:#6dd; }
.disismyfukentoolbuxhhehahooo .elms-4-stage center *:nth-child(3) { background:#6d6; }
.disismyfukentoolbuxhhehahooo .elms-4-stage center *:nth-child(5) { background:#cc6; }
.disismyfukentoolbuxhhehahooo .elms-4-stage center *:nth-child(4) { background:#d66; }

/* Global CSS Styles List */
.disismyfukentoolbuxhhehahooo .list-of-css-selectors button {
  cursor:default;
  padding:5px 0; margin:0; width:85%;
  font: 12px arial;
  color: #6dd;
  text-align:left;
  white-space: nowrap;
  background-color:#222;
  border:0; outline:0;
}
.disismyfukentoolbuxhhehahooo .list-of-css-selectors pre {
  cursor:default; display:none;
  padding:5px 0; margin:0; width:95%; height:auto;
  font: 12px arial;
}
.disismyfukentoolbuxhhehahooo .list-of-css-selectors .del-global-css-style {
  cursor:pointer;
  position:relative;
  top:2.5px; left:-5px;
  font-size: 24px; padding:0;
  background: transparent;
  color: #ccc;
}
.disismyfukentoolbuxhhehahooo .list-of-css-selectors .del-global-css-style:hover {
  color:#fff;
}
.disismyfukentoolbuxhhehahooo .list-of-css-selectors .del-global-css-style:active {
  color:#d66;
}

/* CSS Link References List */
.disismyfukentoolbuxhhehahooo .add-the-css-references .add-css-refer {
  cursor:pointer;
  padding:4px 0; margin:0; width:85%;
  font: 20px arial;
  color: #ccc;
  background-color:transparent;
  border:0; outline:0;
}
.disismyfukentoolbuxhhehahooo .add-the-css-references .add-css-refer:hover {
  color:#6df;
}
.disismyfukentoolbuxhhehahooo .add-the-css-references .add-css-refer:active {
  color: #111;
}
.disismyfukentoolbuxhhehahooo .add-the-css-references input[type=text]:focus {
  color:#6dd;
}
.disismyfukentoolbuxhhehahooo .list-of-css-references input[type=text], .disismyfukentoolbuxhhehahooo .list-of-css-references button {
  cursor:default;
  padding:5px 0; margin:0; width:85%;
  font: 12px arial;
  color: #6dd;
  text-align:left;
  white-space: nowrap;
  background-color:#222;
  border:0; outline:0;
}
.disismyfukentoolbuxhhehahooo .list-of-css-references pre {
  cursor:pointer;
  padding:5px 0; margin:0; width:95%;
  font: 12px arial;
}
.disismyfukentoolbuxhhehahooo .list-of-css-references .del-css-refer {
  cursor:pointer;
  position:relative;
  top:2.5px; left:-5px;
  font-size: 24px; padding:0;
  background: transparent;
  color: #ccc;
}
.disismyfukentoolbuxhhehahooo .list-of-css-references .del-css-refer:hover {
  color:#fff;
}
.disismyfukentoolbuxhhehahooo .list-of-css-references .del-css-refer:active {
  color:#d66;
}

/* Media Queries List */
.disismyfukentoolbuxhhehahooo .list-of-media-queries button {
  cursor:pointer;
  padding:5px 0; margin:0; width:85%;
  font: 14px arial;
  color: #66d;
  background-color:#222;
  border:0; outline:0;
}
.disismyfukentoolbuxhhehahooo .list-of-media-queries pre {
  cursor:pointer; display:none;
  padding:5px 0; margin:0; width:95%; height:150px;
  font: 12px arial;
}
.disismyfukentoolbuxhhehahooo .list-of-media-queries .del-media-query {
  cursor:pointer;
  position:relative;
  top:2.5px; left:-5px;
  font-size: 24px; padding:0;
  background: transparent;
  color: #ccc;
}
.disismyfukentoolbuxhhehahooo .list-of-media-queries .del-media-query:hover {
  color:#fff;
}
.disismyfukentoolbuxhhehahooo .list-of-media-queries .del-media-query:active {
  color:#d66;
}

.disismyfukentoolbuxhhehahooo .in-drop-button {
  cursor: pointer;
  border:0; outline:0;
  padding: 1em;
  color: #fff;
  font-family: arial;
  text-transform: uppercase;
  text-align: center;
  background: #393939;
}
.disismyfukentoolbuxhhehahooo .in-drop-button:hover {
  background: #444;
}
.disismyfukentoolbuxhhehahooo .in-drop-button:active {
  background: #222;
}
.disismyfukentoolbuxhhehahooo .debug-indicator-on {
  color: #0cf;
}
.disismyfukentoolbuxhhehahooo .debug-indicator-off {
  color: rgb(255, 91, 91);
}

/* Resize Handlers */
.drag {
  position: absolute;
  border: 1px solid #89B;
  background: #BCE;
  height: 58px; width: 58px;
  top: 120px;
  cursor: move;
}
.handle {
  position: absolute;
  height: 10px; width: 10px;
  border: 1px solid #89B;
  background: #9AC; 
}
.NW, .NN, .NE { top: -4px; }
.NE, .EE, .SE { right: -4px; }
.SW, .SS, .SE { bottom: -4px; }
.NW, .WW, .SW { left: -4px; }
.SE, .NW { cursor: nw-resize; }
.SW, .NE { cursor: ne-resize; }
.NN, .SS { cursor: n-resize; left: 50%; margin-left: -4px; }
.EE, .WW { cursor: e-resize; top: 50%; margin-top: -4px; }
.selected { background-color: #ECB; border-color: #B98; }
.selected .handle { background-color: #CA9; border-color: #B98; }

/* Design Area */
.itsthecavnescontainerbro {
  position: absolute;
  top:25px; left:0; right: 300px; bottom:25px;
  /* background: #aaa url(img/il-grid-trans.png) top left repeat; */
}
.itsthecavnescontainerbro .canves {
  position: absolute;
  top:0; left:0;
  width:100%; height:100%;
  overflow: auto;
  background: transparent url(img/il-grid-trans.png) top left repeat;
}
.itsthecavnescontainerbro .canves .noselect {
  -webkit-user-select: none;
   -khtml-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
       -o-user-select: none;
          user-select: none;
}
.itsthecavnescontainerbro .canves .sort-placer {
  border:2px solid orange;
}
.itsthecavnescontainerbro #preview-pane iframe {
  position: absolute;
  top:0; left:0;
  width: 100%; height: 100%;
  float: left;
  border:0;
}
