// Call our functions when the page is ready.
$(document).ready(function() {
  // Defines our variables
  var elmstyle = false,
      drawable = false,
      drawing  = false,
      mS = {},
      dBox,
      editableElm;
  
  // Setup LocalStorage
  if ( localStorage.getItem('SiteTitle')) {
    $(".thisisyourdocumenttitle").val(localStorage.getItem('SiteTitle'));
  }
  if ( localStorage.getItem('CSSRefer')) {
    $(".add-css-refer-val").val(localStorage.getItem('CSSRefer'));
  }
  if ( localStorage.getItem('JSSource')) {
    $(".add-js-source-val").val(localStorage.getItem('JSSource'));
  }
  if ( localStorage.getItem('JSSourceList')) {
    $(".list-of-js-source").html(localStorage.getItem('JSSourceList'));
  }
  if ( localStorage.getItem('JSCode')) {
    $("#js-code").val(localStorage.getItem('JSCode'));
  }
  if ( localStorage.getItem('CSSReferencesList')) {
    $(".list-of-css-references").html(localStorage.getItem('CSSReferencesList')); 
  }
  if ( localStorage.getItem('CSSSelectors')) {
    $("#fullrencode").val(localStorage.getItem('CSSSelectors')); 
  }
  if ( localStorage.getItem('CSSSelectorsHTML')) {
    $("#to-global-css").html(localStorage.getItem('CSSSelectorsHTML')); 
  }
  if ( localStorage.getItem('MQuery')) {
    $("#hold-media-queries").html(localStorage.getItem('MQuery')); 
  }
  if ( localStorage.getItem('MQueryHTMLGlobalVALS')) {
    $("#hold-media-queries textarea.globalcssquery").val(localStorage.getItem('MQueryHTMLGlobalVALS')); 
  }
  if ( localStorage.getItem('MQueryHTMLVALS')) {
    $("#hold-media-queries textarea.canvesquery").val(localStorage.getItem('MQueryHTMLVALS')); 
  }
  if ( localStorage.getItem('CanvesContent')) {
    $(".canves").html(localStorage.getItem('CanvesContent')); 
  }
  if ( localStorage.getItem('ActiveTheme')) {
    $('head').html(localStorage.getItem('ActiveTheme')); 
  }
  if ( localStorage.getItem('ThemeText')) {
    $('#toggle-themes').html(localStorage.getItem('ThemeText')); 
  }
  if ( localStorage.getItem('Notepad')) {
    $('#notepad').val(localStorage.getItem('Notepad')); 
  }
  
  // Define Global Functions
  var FinalizePrev = function() {
    $("#orightml").html( $(".canves").html() );
    if ($(".canves").html() === "") {
      // No html detected therefore we don't need to add a custom inline style sheet
      $("#style-sheet, #current-css-sheet").val("");
    } else {
      $("#current-css-sheet").val($(".canves").html());
      $("#style-sheet").val("\n" + $(".canves").children().text("").parent().html().replace(/<\/?/g,'').replace(/h1 /g,'').replace(/div /g,'').replace(/class="/g,'.').replace(/div/g,'').replace(/h1/g,'').replace(/style="/g,'{\n  ').replace(/;/g,';\n ').replace(/"/g,'').replace(/ >>/g,'}').replace(/>>/g,' {}').replace(/ }/g,'}\n').replace(/}./g,'}\n.').replace(/&quot;\n /g,"'").replace(/&quot;/g,"'") + "\n");
      $(".canves").html($("#current-css-sheet").val());
    }
    $("#yourhtml").html( $(".canves").html() );
    $("#yourhtml *").removeAttr('contenteditable').removeAttr('id').removeAttr('style');
    
    // Only show CSS code when we have CSS
    if ( $("#checkforstyle").html() === "" ) {
      $("#checkforstyle").html('');
    } else if ( ( $("#fullrencode").val() === "" ) && ($("#youraddedmediaqueries").val() === "" ) ) {
      $("#checkforstyle").html('&lt;style type="text/css"&gt;'+ $("#style-sheet").val() + "\n" +'&lt;/style&gt;');
    } else if ( ( $("#style-sheet").val() === "" ) && ($("#youraddedmediaqueries").val() === "" ) ) {
      $("#checkforstyle").html('&lt;style type="text/css"&gt;'+ $("#fullrencode").val() + "\n" +'&lt;/style&gt;');
    } else if ( $("#youraddedmediaqueries").val() === "" ) {
      $("#checkforstyle").html('&lt;style type="text/css"&gt;'+ $("#style-sheet").val() + $("#fullrencode").val() + "\n" +'&lt;/style&gt;');
    } else {
      $("#checkforstyle").html('&lt;style type="text/css"&gt;'+ $("#style-sheet").val() + $("#fullrencode").val() + $("#youraddedmediaqueries").val() + "\n" +'&lt;/style&gt;');
    }
    
    document.title = $(".thisisyourdocumenttitle").val();
    $('#mirror-title').text( $(".thisisyourdocumenttitle").val() );
    $("#html-sheet").val( $("#yourhtml").html());
    $("#mirror-html").text( $("#html-sheet").val() );
    $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
    
    if( $('.dadamcssreflist').val() === "div>" ) {
      $('.dadamcssrefhtml').html("");
      $('.dadamcssreflist').val("");
    }
    $('#mirror-css-link-refs').text( $('.dadamcssreflist').val() );
    $('#code').val( $('#mirror-code').text() );
    editor.setValue( $("#code").val() );
    format();
    $(".canves").html( $("#orightml").html() );
  };
  var MoveSelectedElement = function() {
    if ($("#select-tool.myfukentoolisactivebiotch").is(':visible')) {
      $(".designer").children().on('mousedown touchstart', function() {
        if(elmstyle) {
          // Add stylethis class
          $("div.handle").remove();
          $("#sel-css").val("");
          $("#known-class").text($(this).prop('class'));
          $(".canves, .canves *").removeAttr('id');
          $(this).attr('id', 'stylethis').append('<div class="handle NE"></div><div class="handle NN"></div><div class="handle NW"></div><div class="handle WW"></div><div class="handle EE"></div><div class="handle SW"></div><div class="handle SS"></div><div class="handle SE"></div>');
          $("#insert-your-own-html").val($(this).html());
          $("#select-elm-options").show();

          // Clear previous values to avoid any conflictions
          $("#select-mode #drop").find("input[type=text], input[type=number], select").val();
          
          // Grab position & width before an easy flow
          GrabStyles();
          
          if ($(".inputs-your-css-selector").val() === "") {
            
          } else {
            // Grab elements already added styles
            $(".list-of-your-global-css-selectors-container button:contains(" + $(".inputs-your-css-selector").val() + ")").trigger("click");
            
            // Delete already added style to avoid conflictions
            $(".list-of-your-global-css-selectors-container button:contains(" + $(".inputs-your-css-selector").val() + ")").prev().trigger("click");
          }
        }
      }).drag("start",function( ev, dd ){
        dd.attrc = $( ev.target ).prop("className");
        dd.attrd = $( ev.target ).prop("id");
        dd.width = $( this ).width();
        dd.height = $( this ).height();
      }).drag(function( ev, dd ){
        var props = {};
        if ( dd.attrc.indexOf("E") > -1 ){
          props.width = Math.max( 32, dd.width + dd.deltaX );
        }
        if ( dd.attrc.indexOf("S") > -1 ){
          props.height = Math.max( 32, dd.height + dd.deltaY );
        }
        if ( dd.attrc.indexOf("W") > -1 ){
          props.width = Math.max( 32, dd.width - dd.deltaX );
          props.left = dd.originalX + dd.width - props.width;
        }
        if ( dd.attrc.indexOf("N") > -1 ){
          props.height = Math.max( 32, dd.height - dd.deltaY );
          props.top = dd.originalY + dd.height - props.height;
        }
        if ( dd.attrd.indexOf("stylethis") > -1 ){
          props.top = dd.offsetY;
          props.left = dd.offsetX;
        }
        $('#stylethis').css( props );
        GrabStyles();
        $("#stylethis").css({
          "top": $("#drop .adds-your-position-top").val(),
          "left": $("#drop .adds-your-position-left").val(),
          "width": $("#drop .adds-your-width").val() + $("#width-identifier").text(),
          "height": $("#drop .adds-your-height").val() + $("#height-identifier").text()
        });
        localStorage.setItem('CanvesContent', $(".canves").html());
      }, {relative:true}).on('dblclick', function() {
        EditableStylez();
        return false;
      });
    }
  };
  var EditableStylez = function() {
    $(".canves *").prop('contenteditable', true);
    window.getSelection().removeAllRanges();
    $("#select-mode").hide();
    $("#edit-mode").show();
    // Deactivates interactive design and right click menu when tool is active
    $("div.handle").remove();
    $(".canves").removeClass("designer");
    $("#current-canvas").val($(".canves").html());
    $(".canves").html($("#current-canvas").val());
    $("#show-editable-elms-code").val($("#stylethis").html());
    $('[contenteditable]').on('focus',function() {
      editableElm = this;
    }).on('keyup',function() {
      localStorage.setItem('CanvesContent', $(".canves").html());
    });
    $(".canves *").on('focus keyup', function() {
      $("#show-editable-elms-code").val($(this).html());
    });
    $("#show-editable-elms-code").on('keyup change', function() {
      $(editableElm).html($(this).val());
      localStorage.setItem('CanvesContent',$(".canves").html());
      FinalizePrev();
    });
    $(".canves").find("#stylethis").trigger('focus');
    $(".canves *").removeAttr("id");
    if( $("#edit-mode").is(":visible") ) {
      drawable = false,
      $("#exit-edit-mode, #undo, #redo").show();
    } else {
      $("#exit-edit-mode, #undo, #redo").hide();
    }
  };
  function PrevStyles() {
    if ($("#stylethis").is(":visible")) {
      $("#stylethis").css({
        "top": $("#drop .adds-your-position-top").val(),
        "left": $("#drop .adds-your-position-left").val(),
        "right": $("#drop .adds-your-position-right").val(),
        "bottom": $("#drop .adds-your-position-bottom").val(),
        "width": $("#drop .adds-your-width").val() + $("#width-identifier").text(),
        "height": $("#drop .adds-your-height").val() + $("#height-identifier").text(),
        "margin-top": $("#drop .adds-your-margin-top").val() + "px",
        "margin-right": $("#drop .adds-your-margin-right").val() + "px",
        "margin-bottom": $("#drop .adds-your-margin-bottom").val() + "px",
        "margin-left": $("#drop .adds-your-margin-left").val() + "px",
        "padding-top": $("#drop .adds-your-padding-top").val() + "px",
        "padding-right": $("#drop .adds-your-padding-right").val() + "px",
        "padding-bottom": $("#drop .adds-your-padding-bottom").val() + "px",
        "padding-left": $("#drop .adds-your-padding-left").val() + "px",
        "background-position": $("#drop .adds-your-background-position").val(),
        "background-repeat": $("#drop .adds-your-background-repeat").val(),
        "background-attachment": $("#drop .adds-your-background-attachment").val(),
        "background-size": $("#drop .adds-your-background-size").val(),
        "background-color": $("#drop .adds-your-background-color").val(),
        "box-shadow": $("#drop .adds-your-box-shadow").val(),
        "border-top": $("#drop .adds-your-border-top").val(),
        "border-left": $("#drop .adds-your-border-left").val(),
        "border-right": $("#drop .adds-your-border-right").val(),
        "border-bottom": $("#drop .adds-your-border-bottom").val(),
        "border-top-left-radius": $("#drop .adds-your-border-radius-top-left").val() + "px",
        "border-top-right-radius": $("#drop .adds-your-border-radius-top-right").val() + "px",
        "border-bottom-left-radius": $("#drop .adds-your-border-radius-bottom-left").val() + "px",
        "border-bottom-right-radius": $("#drop .adds-your-border-radius-bottom-right").val() + "px",
        "font-size": $("#drop .adds-your-font-size").val() + "px",
        "color": $("#drop .adds-your-font-color").val(),
        "font-family": $("#drop .adds-your-font-family").val(),
        "font-varient": $("#drop .adds-your-font-varient").val(),
        "font-style": $("#drop .adds-your-font-style").val(),
        "font-weight": $("#drop .adds-your-font-weight").val(),
        "line-height": $("#drop .adds-your-line-height").val() + "px",
        "letter-spacing": $("#drop .adds-your-letter-spacing").val() + "px",
        "word-spacing": $("#drop .adds-your-word-spacing").val() + "px",
        "text-transform": $("#drop .adds-your-text-transform").val(),
        "text-decoration": $("#drop .adds-your-text-decoration").val(),
        "text-align": $("#drop .adds-your-text-align").val(),
        "word-wrap": $("#drop .adds-your-word-wrap").val(),
        "white-space": $("#drop .adds-your-white-space").val(),
        "text-shadow": $("#drop .adds-your-text-shadow").val(),
        "display": $("#drop .adds-your-display").val(),
        "overflow-x": $("#drop .adds-your-overflow-x").val(),
        "overflow-y": $("#drop .adds-your-overflow-y").val(),
        "opacity": $("#drop .adds-your-opacity").val(),
        "outline": $("#drop .adds-your-outline").val(),
        "resize": $("#drop .adds-your-resize").val(),
        "float": $("#drop .adds-your-float").val(),
        "z-index": $("#drop .adds-your-z-index").val(),
        "cursor": $("#drop .adds-your-cursor").val(),
        "list-style": $("#drop .adds-your-list-style").val(),
        "content": $("#drop .adds-your-content").val(),
        "vertical-align": $("#drop .adds-your-vertical-align").val(),
        "transition": $("#drop .adds-your-transition").val(),
        "transform": $("#drop .adds-your-transform").val(),
        "filter": $("#drop .adds-your-filter").val()
      });
      if ($("#drop .adds-your-position:first-of-type").val() === "placer") {
        $("#stylethis").css({
          "position": ""
        });
      } else {
        $("#stylethis").css({
          "position": $("#drop .adds-your-position").val()
        });
      }
      if ($("#drop .adds-your-background-image:first-of-type").val() === "") {
        $("#stylethis").css({
          "background-image": ""
        });
      } else {
        $("#stylethis").css({
          "background-image": "url('" + $("#drop .adds-your-background-image").val() + "')"
        });
      }
      if ($("#drop .adds-your-width:first-of-type").val() === "") {
        $("#stylethis").css({
          "width": ""
        });
      }
      if ($("#drop .adds-your-height:first-of-type").val() === "") {
        $("#stylethis").css({
          "height": ""
        });
      }
      if (($("#drop .adds-your-margin-final:first-of-type").val() === "") && ($("#drop .adds-your-margin-final-ints:first-of-type").val() === "") && ($("#drop .adds-your-margin:first-of-type").val() === "") && ($("#drop .adds-your-margin-top:first-of-type").val() === "") && ($("#drop .adds-your-margin-right:first-of-type").val() === "") && ($("#drop .adds-your-margin-bottom:first-of-type").val() === "") && ($("#drop .adds-your-margin-left:first-of-type").val() === "")) {
        $("#stylethis").css({
          "margin": ""
        });
      }
      if (($("#drop .adds-your-margin-final:first-of-type").val() === "undefined") && ($("#drop .adds-your-margin-final-ints:first-of-type").val() === "undefined") && ($("#drop .adds-your-margin:first-of-type").val() === "undefined") && ($("#drop .adds-your-margin-top:first-of-type").val() === "undefined") && ($("#drop .adds-your-margin-right:first-of-type").val() === "undefined") && ($("#drop .adds-your-margin-bottom:first-of-type").val() === "undefined") && ($("#drop .adds-your-margin-left:first-of-type").val() === "undefined")) {
        $("#stylethis").css({
          "margin": ""
        });
      }
      if (($("#drop .adds-your-padding:first-of-type").val() === "") && ($("#drop .adds-your-padding-top:first-of-type").val() === "") && ($("#drop .adds-your-padding-right:first-of-type").val() === "") && ($("#drop .adds-your-padding-bottom:first-of-type").val() === "") && ($("#drop .adds-your-padding-left:first-of-type").val() === "")) {
        $("#stylethis").css({
          "padding": ""
        });
      }
      if (($("#drop .adds-your-border-radius-top-left:first-of-type").val() === "") && ($("#drop .adds-your-border-radius-top-right:first-of-type").val() === "") && ($("#drop .adds-your-border-radius-bottom-left:first-of-type").val() === "") && ($("#drop .adds-your-border-radius-bottom-right:first-of-type").val() === "")) {
        $("#stylethis").css({
          "border-radius": ""
        });
      }
      if ($("#drop .adds-your-font-size:first-of-type").val() === "") {
        $("#stylethis").css({
          "font-size": ""
        });
      }
      if ($("#drop .adds-your-line-height:first-of-type").val() === "") {
        $("#stylethis").css({
          "line-height": ""
        });
      }
      if ($("#drop .adds-your-letter-spacing:first-of-type").val() === "") {
        $("#stylethis").css({
          "letter-spacing": ""
        });
      }
      if ($("#drop .adds-your-word-spacing:first-of-type").val() === "") {
        $("#stylethis").css({
          "word-spacing": ""
        });
      }
      localStorage.setItem('CanvesContent', $(".canves").html());
    } else {
      if ( $(".inputs-your-css-selector").val() === "undefined" ) {
        $(".add-css-selector-val").val("");
      }
      if ( $("#drop .adds-your-position").val() === "placer" ) {
      $("#grabelmvalz .testsyourglobalcss:first-of-type").val("\n" + $("#yourselector .inputs-your-css-selector:first-of-type").val() +" {"+ ( $("#drop .adds-your-position-top:first-of-type").val() === "" ? "" : "\n  top: " + $("#drop .adds-your-position-top:first-of-type").val() + ";" ) + ( $("#drop .adds-your-position-left:first-of-type").val() === "" ? "" : "\n  left: " + $("#drop .adds-your-position-left:first-of-type").val() + ";" ) + ( $("#drop .adds-your-position-bottom:first-of-type").val() === "" ? "" : "\n  bottom: " + $("#drop .adds-your-position-bottom:first-of-type").val() + ";" ) + ( $("#drop .adds-your-position-right:first-of-type").val() === "" ? "" : "\n  right: " + $("#drop .adds-your-position-right:first-of-type").val() + ";" ) + ( $("#drop .adds-your-width:first-of-type").val() === "" ? "" : "\n  width: " + $("#drop .adds-your-width:first-of-type").val() + $("#drop #width-identifier:first-of-type").text() + ";" ) + ( $("#drop .adds-your-height:first-of-type").val() === "" ? "" : "\n  height: " + $("#drop .adds-your-height:first-of-type").val() + $("#drop #height-identifier:first-of-type").text() + ";" ) + ( $("#drop .adds-your-padding-top:first-of-type").val() === "" ? "" : "\n  padding-top: " + $("#drop .adds-your-padding-top:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-padding-right:first-of-type").val() === "" ? "" : "\n  padding-right: " + $("#drop .adds-your-padding-right:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-padding-bottom:first-of-type").val() === "" ? "" : "\n  padding-bottom: " + $("#drop .adds-your-padding-bottom:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-padding-left:first-of-type").val() === "" ? "" : "\n  padding-left: " + $("#drop .adds-your-padding-left:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-margin-top:first-of-type").val() === "" ? "" : "\n  margin-top: " + $("#drop .adds-your-margin-top:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-margin-right:first-of-type").val() === "" ? "" : "\n  margin-right: " + $("#drop .adds-your-margin-right:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-margin-bottom:first-of-type").val() === "" ? "" : "\n  margin-bottom: " + $("#drop .adds-your-margin-bottom:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-margin-left:first-of-type").val() === "" ? "" : "\n  margin-left: " + $("#drop .adds-your-margin-left:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-background-image:first-of-type").val() === "" ? "" : "\n  background-image: url('" + $("#drop .adds-your-background-image:first-of-type").val() + "');" ) + ( $("#drop .adds-your-background-position:first-of-type").val() === "" ? "" : "\n  background-position: " + $("#drop .adds-your-background-position:first-of-type").val() + ";" ) + ( $("#drop .adds-your-background-repeat:first-of-type").val() === "" ? "" : "\n  background-repeat: " + $("#drop .adds-your-background-repeat:first-of-type").val() + ";" ) + ( $("#drop .adds-your-background-attachment:first-of-type").val() === "" ? "" : "\n  background-attachment: " + $("#drop .adds-your-background-attachment:first-of-type").val() + ";" ) + ( $("#drop .adds-your-background-size:first-of-type").val() === "" ? "" : "\n  background-size: " + $("#drop .adds-your-background-size:first-of-type").val() + ";" ) + ( $("#drop .adds-your-background-color:first-of-type").val() === "" ? "" : "\n  background-color: " + $("#drop .adds-your-background-color:first-of-type").val() + ";" ) + ( $("#drop .adds-your-box-shadow:first-of-type").val() === "" ? "" : "\n  box-shadow: " + $("#drop .adds-your-box-shadow:first-of-type").val() + ";" ) + ( $("#drop .adds-your-border-top:first-of-type").val() === "" ? "" : "\n  border-top: " + $("#drop .adds-your-border-top:first-of-type").val() + ";" ) + ( $("#drop .adds-your-border-left:first-of-type").val() === "" ? "" : "\n  border-left: " + $("#drop .adds-your-border-left:first-of-type").val() + ";" ) + ( $("#drop .adds-your-border-right:first-of-type").val() === "" ? "" : "\n  border-right: " + $("#drop .adds-your-border-right:first-of-type").val() + ";" ) + ( $("#drop .adds-your-border-bottom:first-of-type").val() === "" ? "" : "\n  border-bottom: " + $("#drop .adds-your-border-bottom:first-of-type").val() + ";" ) + ( $("#drop .adds-your-border-radius-top-left:first-of-type").val() === "" ? "" : "\n  border-top-left-radius: " + $("#drop .adds-your-border-radius-top-left:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-border-radius-top-right:first-of-type").val() === "" ? "" : "\n  border-top-right-radius: " + $("#drop .adds-your-border-radius-top-right:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-border-radius-bottom-left:first-of-type").val() === "" ? "" : "\n  border-bottom-left-radius: " + $("#drop .adds-your-border-radius-bottom-left:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-border-radius-bottom-right:first-of-type").val() === "" ? "" : "\n  border-bottom-right-radius: " + $("#drop .adds-your-border-radius-bottom-right:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-font-size:first-of-type").val() === "" ? "" : "\n  font-size: " + $("#drop .adds-your-font-size:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-font-color:first-of-type").val() === "" ? "" : "\n  color: " + $("#drop .adds-your-font-color:first-of-type").val() + ";" ) + ( $("#drop .adds-your-font-family:first-of-type").val() === "" ? "" : "\n  font-family: " + $("#drop .adds-your-font-family:first-of-type").val() + ";" ) + ( $("#drop .adds-your-font-varient:first-of-type").val() === "" ? "" : "\n  font-varient: " + $("#drop .adds-your-font-varient:first-of-type").val() + ";" ) + ( $("#drop .adds-your-font-style:first-of-type").val() === "" ? "" : "\n  font-style: " + $("#drop .adds-your-font-style:first-of-type").val() + ";" ) + ( $("#drop .adds-your-font-weight:first-of-type").val() === "" ? "" : "\n  font-weight: " + $("#drop .adds-your-font-weight:first-of-type").val() + ";" ) + ( $("#drop .adds-your-line-height:first-of-type").val() === "" ? "" : "\n  line-height: " + $("#drop .adds-your-line-height:first-of-type").val() + ";" ) + ( $("#drop .adds-your-letter-spacing:first-of-type").val() === "" ? "" : "\n  letter-spacing: " + $("#drop .adds-your-letter-spacing:first-of-type").val() + ";" ) + ( $("#drop .adds-your-word-spacing:first-of-type").val() === "" ? "" : "\n  word-spacing: " + $("#drop .adds-your-word-spacing:first-of-type").val() + ";" ) + ( $("#drop .adds-your-text-transform:first-of-type").val() === "" ? "" : "\n  text-transform: " + $("#drop .adds-your-text-transform:first-of-type").val() + ";" ) + ( $("#drop .adds-your-text-decoration:first-of-type").val() === "" ? "" : "\n  text-decoration: " + $("#drop .adds-your-text-decoration:first-of-type").val() + ";" ) + ( $("#drop .adds-your-text-align:first-of-type").val() === "" ? "" : "\n  text-align: " + $("#drop .adds-your-text-align:first-of-type").val() + ";" ) + ( $("#drop .adds-your-word-wrap:first-of-type").val() === "" ? "" : "\n  word-wrap: " + $("#drop .adds-your-word-wrap:first-of-type").val() + ";" ) + ( $("#drop .adds-your-white-space:first-of-type").val() === "" ? "" : "\n  white-space: " + $("#drop .adds-your-white-space:first-of-type").val() + ";" ) + ( $("#drop .adds-your-text-shadow:first-of-type").val() === "" ? "" : "\n  text-shadow: " + $("#drop .adds-your-text-shadow:first-of-type").val() + ";" ) + ( $("#drop .adds-your-display:first-of-type").val() === "" ? "" : "\n  display: " + $("#drop .adds-your-display:first-of-type").val() + ";" ) + ( $("#drop .adds-your-overflow-x:first-of-type").val() === "" ? "" : "\n  overflow-x: " + $("#drop .adds-your-overflow-x:first-of-type").val() + ";" ) + ( $("#drop .adds-your-overflow-y:first-of-type").val() === "" ? "" : "\n  overflow-y: " + $("#drop .adds-your-overflow-y:first-of-type").val() + ";" ) + ( $("#drop .adds-your-opacity:first-of-type").val() === "" ? "" : "\n  opacity: " + $("#drop .adds-your-opacity:first-of-type").val() + ";" ) + ( $("#drop .adds-your-outline:first-of-type").val() === "" ? "" : "\n  outline: " + $("#drop .adds-your-outline:first-of-type").val() + ";" ) + ( $("#drop .adds-your-resize:first-of-type").val() === "" ? "" : "\n  resize: " + $("#drop .adds-your-resize:first-of-type").val() + ";" ) + ( $("#drop .adds-your-float:first-of-type").val() === "" ? "" : "\n  float: " + $("#drop .adds-your-float:first-of-type").val() + ";" ) + ( $("#drop .adds-your-z-index:first-of-type").val() === "" ? "" : "\n  z-index: " + $("#drop .adds-your-z-index:first-of-type").val() + ";" ) + ( $("#drop .adds-your-cursor:first-of-type").val() === "" ? "" : "\n  cursor: " + $("#drop .adds-your-cursor:first-of-type").val() + ";" ) + ( $("#drop .adds-your-list-style:first-of-type").val() === "" ? "" : "\n  list-style: " + $("#drop .adds-your-list-style:first-of-type").val() + ";" ) + ( $("#drop .adds-your-content-prop:first-of-type").val() === "" ? "" : "\n  content: " + $("#drop .adds-your-content-prop:first-of-type").val() + ";" ) + ( $("#drop .adds-your-vertical-align:first-of-type").val() === "" ? "" : "\n  vertical-align: " + $("#drop .adds-your-vertical-align:first-of-type").val() + ";" ) + ( $("#drop .adds-your-transition:first-of-type").val() === "" ? "" : "\n  transition: " + $("#drop .adds-your-transition:first-of-type").val() + ";" ) + ( $("#drop .adds-your-transform:first-of-type").val() === "" ? "" : "\n  transform: " + $("#drop .adds-your-transform:first-of-type").val() + ";" ) + ( $("#drop .adds-your-filter:first-of-type").val() === "" ? "" : "\n  filter: " + $("#drop .adds-your-filter:first-of-type").val() + ";" ) + "\n}\n");
      } else {
        $("#grabelmvalz .testsyourglobalcss:first-of-type").val("\n" + $("#yourselector .inputs-your-css-selector:first-of-type").val() +" {"+ ( $("#drop .adds-your-position:first-of-type").val() === "" ? "" : "\n  position: " + $("#drop .adds-your-position:first-of-type").val() + ";" ) + ( $("#drop .adds-your-position-top:first-of-type").val() === "" ? "" : "\n  top: " + $("#drop .adds-your-position-top:first-of-type").val() + ";" ) + ( $("#drop .adds-your-position-left:first-of-type").val() === "" ? "" : "\n  left: " + $("#drop .adds-your-position-left:first-of-type").val() + ";" ) + ( $("#drop .adds-your-position-bottom:first-of-type").val() === "" ? "" : "\n  bottom: " + $("#drop .adds-your-position-bottom:first-of-type").val() + ";" ) + ( $("#drop .adds-your-position-right:first-of-type").val() === "" ? "" : "\n  right: " + $("#drop .adds-your-position-right:first-of-type").val() + ";" ) + ( $("#drop .adds-your-width:first-of-type").val() === "" ? "" : "\n  width: " + $("#drop .adds-your-width:first-of-type").val() + $("#drop #width-identifier:first-of-type").text() + ";" ) + ( $("#drop .adds-your-height:first-of-type").val() === "" ? "" : "\n  height: " + $("#drop .adds-your-height:first-of-type").val() + $("#drop #height-identifier:first-of-type").text() + ";" ) + ( $("#drop .adds-your-padding-top:first-of-type").val() === "" ? "" : "\n  padding-top: " + $("#drop .adds-your-padding-top:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-padding-right:first-of-type").val() === "" ? "" : "\n  padding-right: " + $("#drop .adds-your-padding-right:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-padding-bottom:first-of-type").val() === "" ? "" : "\n  padding-bottom: " + $("#drop .adds-your-padding-bottom:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-padding-left:first-of-type").val() === "" ? "" : "\n  padding-left: " + $("#drop .adds-your-padding-left:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-margin-top:first-of-type").val() === "" ? "" : "\n  margin-top: " + $("#drop .adds-your-margin-top:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-margin-right:first-of-type").val() === "" ? "" : "\n  margin-right: " + $("#drop .adds-your-margin-right:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-margin-bottom:first-of-type").val() === "" ? "" : "\n  margin-bottom: " + $("#drop .adds-your-margin-bottom:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-margin-left:first-of-type").val() === "" ? "" : "\n  margin-left: " + $("#drop .adds-your-margin-left:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-background-image:first-of-type").val() === "" ? "" : "\n  background-image: url('" + $("#drop .adds-your-background-image:first-of-type").val() + "');" ) + ( $("#drop .adds-your-background-position:first-of-type").val() === "" ? "" : "\n  background-position: " + $("#drop .adds-your-background-position:first-of-type").val() + ";" ) + ( $("#drop .adds-your-background-repeat:first-of-type").val() === "" ? "" : "\n  background-repeat: " + $("#drop .adds-your-background-repeat:first-of-type").val() + ";" ) + ( $("#drop .adds-your-background-attachment:first-of-type").val() === "" ? "" : "\n  background-attachment: " + $("#drop .adds-your-background-attachment:first-of-type").val() + ";" ) + ( $("#drop .adds-your-background-size:first-of-type").val() === "" ? "" : "\n  background-size: " + $("#drop .adds-your-background-size:first-of-type").val() + ";" ) + ( $("#drop .adds-your-background-color:first-of-type").val() === "" ? "" : "\n  background-color: " + $("#drop .adds-your-background-color:first-of-type").val() + ";" ) + ( $("#drop .adds-your-box-shadow:first-of-type").val() === "" ? "" : "\n  box-shadow: " + $("#drop .adds-your-box-shadow:first-of-type").val() + ";" ) + ( $("#drop .adds-your-border-top:first-of-type").val() === "" ? "" : "\n  border-top: " + $("#drop .adds-your-border-top:first-of-type").val() + ";" ) + ( $("#drop .adds-your-border-left:first-of-type").val() === "" ? "" : "\n  border-left: " + $("#drop .adds-your-border-left:first-of-type").val() + ";" ) + ( $("#drop .adds-your-border-right:first-of-type").val() === "" ? "" : "\n  border-right: " + $("#drop .adds-your-border-right:first-of-type").val() + ";" ) + ( $("#drop .adds-your-border-bottom:first-of-type").val() === "" ? "" : "\n  border-bottom: " + $("#drop .adds-your-border-bottom:first-of-type").val() + ";" ) + ( $("#drop .adds-your-border-radius-top-left:first-of-type").val() === "" ? "" : "\n  border-top-left-radius: " + $("#drop .adds-your-border-radius-top-left:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-border-radius-top-right:first-of-type").val() === "" ? "" : "\n  border-top-right-radius: " + $("#drop .adds-your-border-radius-top-right:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-border-radius-bottom-left:first-of-type").val() === "" ? "" : "\n  border-bottom-left-radius: " + $("#drop .adds-your-border-radius-bottom-left:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-border-radius-bottom-right:first-of-type").val() === "" ? "" : "\n  border-bottom-right-radius: " + $("#drop .adds-your-border-radius-bottom-right:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-font-size:first-of-type").val() === "" ? "" : "\n  font-size: " + $("#drop .adds-your-font-size:first-of-type").val() + "px;" ) + ( $("#drop .adds-your-font-color:first-of-type").val() === "" ? "" : "\n  color: " + $("#drop .adds-your-font-color:first-of-type").val() + ";" ) + ( $("#drop .adds-your-font-family:first-of-type").val() === "" ? "" : "\n  font-family: " + $("#drop .adds-your-font-family:first-of-type").val() + ";" ) + ( $("#drop .adds-your-font-varient:first-of-type").val() === "" ? "" : "\n  font-varient: " + $("#drop .adds-your-font-varient:first-of-type").val() + ";" ) + ( $("#drop .adds-your-font-style:first-of-type").val() === "" ? "" : "\n  font-style: " + $("#drop .adds-your-font-style:first-of-type").val() + ";" ) + ( $("#drop .adds-your-font-weight:first-of-type").val() === "" ? "" : "\n  font-weight: " + $("#drop .adds-your-font-weight:first-of-type").val() + ";" ) + ( $("#drop .adds-your-line-height:first-of-type").val() === "" ? "" : "\n  line-height: " + $("#drop .adds-your-line-height:first-of-type").val() + ";" ) + ( $("#drop .adds-your-letter-spacing:first-of-type").val() === "" ? "" : "\n  letter-spacing: " + $("#drop .adds-your-letter-spacing:first-of-type").val() + ";" ) + ( $("#drop .adds-your-word-spacing:first-of-type").val() === "" ? "" : "\n  word-spacing: " + $("#drop .adds-your-word-spacing:first-of-type").val() + ";" ) + ( $("#drop .adds-your-text-transform:first-of-type").val() === "" ? "" : "\n  text-transform: " + $("#drop .adds-your-text-transform:first-of-type").val() + ";" ) + ( $("#drop .adds-your-text-decoration:first-of-type").val() === "" ? "" : "\n  text-decoration: " + $("#drop .adds-your-text-decoration:first-of-type").val() + ";" ) + ( $("#drop .adds-your-text-align:first-of-type").val() === "" ? "" : "\n  text-align: " + $("#drop .adds-your-text-align:first-of-type").val() + ";" ) + ( $("#drop .adds-your-word-wrap:first-of-type").val() === "" ? "" : "\n  word-wrap: " + $("#drop .adds-your-word-wrap:first-of-type").val() + ";" ) + ( $("#drop .adds-your-white-space:first-of-type").val() === "" ? "" : "\n  white-space: " + $("#drop .adds-your-white-space:first-of-type").val() + ";" ) + ( $("#drop .adds-your-text-shadow:first-of-type").val() === "" ? "" : "\n  text-shadow: " + $("#drop .adds-your-text-shadow:first-of-type").val() + ";" ) + ( $("#drop .adds-your-display:first-of-type").val() === "" ? "" : "\n  display: " + $("#drop .adds-your-display:first-of-type").val() + ";" ) + ( $("#drop .adds-your-overflow-x:first-of-type").val() === "" ? "" : "\n  overflow-x: " + $("#drop .adds-your-overflow-x:first-of-type").val() + ";" ) + ( $("#drop .adds-your-overflow-y:first-of-type").val() === "" ? "" : "\n  overflow-y: " + $("#drop .adds-your-overflow-y:first-of-type").val() + ";" ) + ( $("#drop .adds-your-opacity:first-of-type").val() === "" ? "" : "\n  opacity: " + $("#drop .adds-your-opacity:first-of-type").val() + ";" ) + ( $("#drop .adds-your-outline:first-of-type").val() === "" ? "" : "\n  outline: " + $("#drop .adds-your-outline:first-of-type").val() + ";" ) + ( $("#drop .adds-your-resize:first-of-type").val() === "" ? "" : "\n  resize: " + $("#drop .adds-your-resize:first-of-type").val() + ";" ) + ( $("#drop .adds-your-float:first-of-type").val() === "" ? "" : "\n  float: " + $("#drop .adds-your-float:first-of-type").val() + ";" ) + ( $("#drop .adds-your-z-index:first-of-type").val() === "" ? "" : "\n  z-index: " + $("#drop .adds-your-z-index:first-of-type").val() + ";" ) + ( $("#drop .adds-your-cursor:first-of-type").val() === "" ? "" : "\n  cursor: " + $("#drop .adds-your-cursor:first-of-type").val() + ";" ) + ( $("#drop .adds-your-list-style:first-of-type").val() === "" ? "" : "\n  list-style: " + $("#drop .adds-your-list-style:first-of-type").val() + ";" ) + ( $("#drop .adds-your-content-prop:first-of-type").val() === "" ? "" : "\n  content: " + $("#drop .adds-your-content-prop:first-of-type").val() + ";" ) + ( $("#drop .adds-your-vertical-align:first-of-type").val() === "" ? "" : "\n  vertical-align: " + $("#drop .adds-your-vertical-align:first-of-type").val() + ";" ) + ( $("#drop .adds-your-transition:first-of-type").val() === "" ? "" : "\n  transition: " + $("#drop .adds-your-transition:first-of-type").val() + ";" ) + ( $("#drop .adds-your-transform:first-of-type").val() === "" ? "" : "\n  transform: " + $("#drop .adds-your-transform:first-of-type").val() + ";" ) + ( $("#drop .adds-your-filter:first-of-type").val() === "" ? "" : "\n  filter: " + $("#drop .adds-your-filter:first-of-type").val() + ";" ) + "\n}\n");
      }
      
      $("#apply-test-code").html("<style type='text/css'>"+ $("#grabelmvalz .testsyourglobalcss:first-of-type").val() +"</style>");
      localStorage.setItem('CanvesContent', $(".canves").html());
    }
  };
  var GrabStyles = function() {
    $('#drop .adds-your-position-top').val($("#stylethis").css('top'));
    $('#drop .adds-your-position-left').val($("#stylethis").css('left'));
    if ( $("#width-identifier").text() === "%" ) {
      var width = ( 100 * parseFloat($('#stylethis').width()) / parseFloat($('#stylethis').parent().width()) );
      $(".adds-your-width").val(width);
    } else if ( $("#width-identifier").text() === "px" ) {
      $('.adds-your-width').val($("#stylethis").css('width').replace(/px/g,''));
    }
    
    if ( $("#height-identifier").text() === "%" ) {
      var width = ( 100 * parseFloat($('#stylethis').css('height')) / parseFloat($('#stylethis').parent().css('height')) );
      $(".adds-your-height").val(width);
    } else if ( $("#height-identifier").text() === "px" ) {
      $('.adds-your-height').val($("#stylethis").css('height').replace(/px/g,''));
    }
    
    $('#drop .adds-your-position').val($("#stylethis").css('position').replace(/placer/g,''));
    $("#drop a").removeClass("imanactiveachornowyay");
    $('#drop a[title='+ $('#drop .adds-your-position').val() +']').addClass("imanactiveachornowyay");
    localStorage.setItem('CanvesContent', $(".canves").html());
  }
  function DuplicateSelectedElm() {
    $(".canves").append($("#stylethis").clone());
    $(".canves *").removeAttr("id");
    $('#select-elm-options').hide();
    $('#insert-your-own-html').val("");
    $("#known-class").text("");
    $("div.handle").remove();
    $("#select-move #drop").find("a").removeClass("imanactiveachornowyay");
    $("#select-move #drop").find("input[type=text], input[type=number], select, textarea").val("");
    MoveSelectedElement();
    createCustomMenu();
    localStorage.setItem('CanvesContent',$(".canves").html());
  }
  function DelSelectedElm() {
    $("#stylethis").remove();
    $(".canves *").removeAttr("id");
    $('#select-elm-options').hide();
    $('#insert-your-own-html').val("");
    $("#known-class").text("");
    $("#select-properties #drop").find("a").removeClass("imanactiveachornowyay");
    $("#select-properties #drop").find("input[type=text], input[type=number], select, textarea").val("");
    localStorage.setItem('CanvesContent',$(".canves").html());
  }
  function DeselectSelectedElm() {
    $("div.handle").remove();
    $(".canves *").removeAttr("id");
    $('#select-elm-options').hide();
    $("#known-class").text("");
  }
  function ClearInputs() {
    $("#select-properties #drop").find("a").removeClass("imanactiveachornowyay");
    $("#select-properties #drop").find("input[type=text], input[type=number], select, textarea").val("");
    if ( $($("#posvalz .adds-your-position")).val() === "" ) {
      $($("#posvalz .adds-your-position")).val("placer");
    }
    $("#sel-css, .inputs-your-css-selector").val("");
    PrevStyles();
  }
  function createRuler() {
    var $ruler = $('#ruler');
    for (var i = 0, step = 0; i < $ruler.innerWidth() / 5; i++, step++) {
      var $tick = $('<div>');
      if (step == 0) {
        $tick.addClass('tickLabel').html(i * 5) ;
      } else if ([1, 3, 5, 7, 9].indexOf(step) > -1) {
        $tick.addClass('tickMinor');
        if (step == 9) {
            step = -1;
        }
      } else {
        $tick.addClass('tickMajor');
      }
      $ruler.append($tick);
    }
  }
  function rgb2hex(rgb) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
     return (rgb && rgb.length === 4) ? "#" +
    ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
       ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
  }
  function format() {
    var totalLines = editor.lineCount();  
    editor.autoFormatRange({line:0, ch:0}, {line:totalLines});
  }
  function createCustomMenu() {
    if ( $("#select-tool.myfukentoolisactivebiotch").is(':visible') ) {
      $(".canves *").bind("contextmenu", function(e) {
        // Avoid the real one
        e.preventDefault();
        $("#custom-menu").show(100).css({
          top: e.pageY + "px",
          left: e.pageX + "px"
        });
      });

      // If the document is clicked somewhere
      $(document).bind("mousedown", function () {
        $("#custom-menu").hide(100);
      });
      $(".canves *").bind("mousedown", function () {
        $("#custom-menu").hide(100);
      });
      
      $(document).on('click mousedown','#custom-menu #duplicate', function() {
        DuplicateSelectedElm();
        $("#custom-menu").hide(100);
      });
      $(document).on('click mousedown','#custom-menu #remove', function() {
        DelSelectedElm();
        $("#custom-menu").hide(100);
      });
      $(document).on('click mousedown','#custom-menu #addelements', function() {
        $("#custom-menu").hide(100);
        if ( $("#edit-mode").is(":visible") ) {
          $("#exit-edit-mode").trigger('click');
        }
        $("#search-app").val("elements").trigger('change').val("");
      });
      $(document).on('click mousedown','#custom-menu #deselect', function() {
        DeselectSelectedElm();
        $("#custom-menu").hide(100);
      });
      $(document).on('click mousedown','#custom-menu #close', function() {
        $("#custom-menu").hide(100);
      });
    }
  }
  var GrabsAddedSelectors = function() {
    $(".list-of-your-global-css-selectors-container").find("button").on('click', function(e) {
      $("#select-properties #drop").find("input[type=text], input[type=number], select").val("");
      $("#select-properties #drop").find("a").removeClass("imanactiveachornowyay");
      $("#grabelmvalz .testsyourglobalcss:first-of-type").val($(e.target).next().val());
      $("#yourselector .inputs-your-css-selector:first-of-type").val($(e.target).text());
      $("#drop .adds-your-position:first-of-type").val($(e.target).nextAll(".adds-your-position").text());
      $("#drop a[title="+ $(e.target).nextAll(".adds-your-position").text() +"]").addClass("imanactiveachornowyay");
      $("#posvalz").find("a#dontshowselectiononme").removeClass("imanactiveachornowyay");
      $("#drop .adds-your-position-top:first-of-type").val($(e.target).nextAll(".adds-your-position-top").text());
      $("#drop .adds-your-position-left:first-of-type").val($(e.target).nextAll(".adds-your-position-left").text());
      $("#drop .adds-your-position-right:first-of-type").val($(e.target).nextAll(".adds-your-position-right").text());
      $("#drop .adds-your-position-bottom:first-of-type").val($(e.target).nextAll(".adds-your-position-bottom").text());
      $("#drop .adds-your-width:first-of-type").val($(e.target).nextAll(".adds-your-width").text());
      $("#drop .adds-your-height:first-of-type").val($(e.target).nextAll(".adds-your-height").text());
      $("#drop .adds-your-margin:first-of-type").val($(e.target).nextAll(".adds-your-margin").text());
      $("#drop .adds-your-margin-top:first-of-type").val($(e.target).nextAll(".adds-your-margin-top").text());
      $("#drop .adds-your-margin-right:first-of-type").val($(e.target).nextAll(".adds-your-margin-right").text());
      $("#drop .adds-your-margin-bottom:first-of-type").val($(e.target).nextAll(".adds-your-margin-bottom").text());
      $("#drop .adds-your-margin-left:first-of-type").val($(e.target).nextAll(".adds-your-margin-left").text());
      $("#drop .adds-your-padding:first-of-type").val($(e.target).nextAll(".adds-your-padding").text());
      $("#drop .adds-your-padding-top:first-of-type").val($(e.target).nextAll(".adds-your-padding-top").text());
      $("#drop .adds-your-padding-right:first-of-type").val($(e.target).nextAll(".adds-your-padding-right").text());
      $("#drop .adds-your-padding-bottom:first-of-type").val($(e.target).nextAll(".adds-your-padding-bottom").text());
      $("#drop .adds-your-padding-left:first-of-type").val($(e.target).nextAll(".adds-your-padding-left").text());
      $("#drop .adds-your-background-image:first-of-type").val($(e.target).nextAll(".adds-your-background-image").text());
      $("#drop .adds-your-background-position:first-of-type").val($(e.target).nextAll(".adds-your-background-position").val());
      $("#drop .adds-your-background-repeat:first-of-type").val($(e.target).nextAll(".adds-your-background-repeat").val());
      $("#drop .adds-your-background-attachment:first-of-type").val($(e.target).nextAll(".adds-your-background-attachment").val());
      $("#drop .adds-your-background-size:first-of-type").val($(e.target).nextAll(".adds-your-background-size").text());
      $("#drop .adds-your-background-color:first-of-type").val($(e.target).nextAll(".adds-your-background-color").text());
      $("#drop .adds-your-box-shadow:first-of-type").val($(e.target).nextAll(".adds-your-box-shadow").text());
      $("#drop .adds-your-border-top:first-of-type").val($(e.target).nextAll(".adds-your-border-top").text());
      $("#drop .adds-your-border-left:first-of-type").val($(e.target).nextAll(".adds-your-border-left").text());
      $("#drop .adds-your-border-right:first-of-type").val($(e.target).nextAll(".adds-your-border-right").text());
      $("#drop .adds-your-border-bottom:first-of-type").val($(e.target).nextAll(".adds-your-border-bottom").text());
      $("#drop .adds-your-border-radius-top-left:first-of-type").val($(e.target).nextAll(".adds-your-border-radius-top-left").text());
      $("#drop .adds-your-border-radius-top-right:first-of-type").val($(e.target).nextAll(".adds-your-border-radius-top-right").text());
      $("#drop .adds-your-border-radius-bottom-left:first-of-type").val($(e.target).nextAll(".adds-your-border-radius-bottom-left").text());
      $("#drop .adds-your-border-radius-bottom-right:first-of-type").val($(e.target).nextAll(".adds-your-border-radius-bottom-right").text());
      $("#drop .adds-your-font-size:first-of-type").val($(e.target).nextAll(".adds-your-font-size").text());
      $("#drop .adds-your-font-color:first-of-type").val($(e.target).nextAll(".adds-your-font-color").text());
      $("#drop .adds-your-font-family:first-of-type").val($(e.target).nextAll(".adds-your-font-family").text());
      $("#drop a[title="+ $(e.target).nextAll(".adds-your-font-family").text() +"]").addClass("imanactiveachornowyay");
      $("#drop .adds-your-font-varient:first-of-type").val($(e.target).nextAll(".adds-your-font-varient").val());
      $("#drop .adds-your-font-style:first-of-type").val($(e.target).nextAll(".adds-your-font-style").val());
      $("#drop .adds-your-font-weight:first-of-type").val($(e.target).nextAll(".adds-your-font-weight").text());
      $("#drop .adds-your-line-height:first-of-type").val($(e.target).nextAll(".adds-your-line-height").text());
      $("#drop .adds-your-letter-spacing:first-of-type").val($(e.target).nextAll(".adds-your-letter-spacing").text());
      $("#drop .adds-your-word-spacing:first-of-type").val($(e.target).nextAll(".adds-your-word-spacing").text());
      $("#drop .adds-your-text-transform:first-of-type").val($(e.target).nextAll(".adds-your-text-transform").val());
      $("#drop .adds-your-text-decoration:first-of-type").val($(e.target).nextAll(".adds-your-text-decoration").text());
      $("#drop .adds-your-text-align:first-of-type").val($(e.target).nextAll(".adds-your-text-align").val());
      $("#drop a[title="+ $(e.target).nextAll(".adds-your-text-align").val() +"]").addClass("imanactiveachornowyay");
      $("#drop .adds-your-word-wrap:first-of-type").val($(e.target).nextAll(".adds-your-word-wrap").val());
      $("#drop .adds-your-white-space:first-of-type").val($(e.target).nextAll(".adds-your-white-space").val());
      $("#drop .adds-your-text-shadow:first-of-type").val($(e.target).nextAll(".adds-your-text-shadow").text());
      $("#drop .adds-your-display:first-of-type").val($(e.target).nextAll(".adds-your-display").val());
      $("#drop .adds-your-overflow-x:first-of-type").val($(e.target).nextAll(".adds-your-overflow-x").val());
      $("#drop .adds-your-overflow-y:first-of-type").val($(e.target).nextAll(".adds-your-overflow-y").val());
      $("#drop .adds-your-opacity:first-of-type").val($(e.target).nextAll(".adds-your-opacity").text());
      $("#drop .adds-your-outline:first-of-type").val($(e.target).nextAll(".adds-your-outline").text());
      $("#drop .adds-your-resize:first-of-type").val($(e.target).nextAll(".adds-your-resize").val());
      $("#drop .adds-your-float:first-of-type").val($(e.target).nextAll(".adds-your-float").val());
      $("#drop .adds-your-z-index:first-of-type").val($(e.target).nextAll(".adds-your-z-index").text());
      $("#drop .adds-your-cursor:first-of-type").val($(e.target).nextAll(".adds-your-cursor").val());
      $("#drop .adds-your-list-style:first-of-type").val($(e.target).nextAll(".adds-your-list-style").val());
      $("#drop .adds-your-content:first-of-type").val($(e.target).nextAll(".adds-your-content").text());
      $("#drop .adds-your-vertical-align:first-of-type").val($(e.target).nextAll(".adds-your-vertical-align").val());
      $("#drop .adds-your-transition:first-of-type").val($(e.target).nextAll(".adds-your-transition").text());
      $("#drop .adds-your-transform:first-of-type").val($(e.target).nextAll(".adds-your-transform").text());
      $("#drop .adds-your-filter:first-of-type").val($(e.target).nextAll(".adds-your-filter").text());
      
      $("#apply-test-code").html("<style type='text/css'>"+ $("#grabelmvalz .testsyourglobalcss:first-of-type").val() +"</style>");
      PrevStyles();
      localStorage.setItem('CSSSelectorsHTML', $("#to-global-css").html());
      localStorage.setItem('CSSSelectors', $("#fullrencode").val());
    });
  };
  var RemovesAddedSelectors = function() {
    $(".list-of-your-global-css-selectors-container").find("a").on('click', function() {
      $(this).parent().find("input[type=text], input[type=number], button, select, textarea").remove();
      $(this).parent().remove();
    
      $("#fullrencode").val(function() {
        return $.map($("#to-global-css textarea"), function (el) {
          return el.value;
        }).join('\n');
      });
      $("#apply-full-code").html("<style type='text/css'>"+ $("#fullrencode").val() +"</style>");
      
      FinalizePrev();
      MoveSelectedElement();
      PrevStyles();
      localStorage.setItem('CSSSelectorsHTML', $("#to-global-css").html());
      localStorage.setItem('CSSSelectors', $("#fullrencode").val());
    });
  };
  var GrabsQueryOnclick = function() {
    $(".listing-of-your-media-queries-container button").on('click', function() {
      $(".canves").html("").append($(this).parent().prev().prev().val()).trigger('change');
      $("#to-global-css").html("").append($(this).parent().prev().val()).trigger('change');
      $("#yourselector .testsyourglobalcss:first-of-type").val($(this).parent().next().val());
      $("#cwidth").val( $(this).text().replace(/px/g,'') ).trigger('change');
      FinalizePrev();
      localStorage.setItem('MQuery', $("#hold-media-queries").html());
      localStorage.setItem('CSSSelectorsHTML', $("#to-global-css").html());
      localStorage.setItem('CSSSelectors', $("#fullrencode").val());
      localStorage.setItem('CanvesContent', $(".canves").html());
      GrabsAddedSelectors();
      RemovesAddedSelectors();
      $("#fullrencode").val(function() {
        return $.map($("#to-global-css textarea"), function (el) {
          return el.value;
        }).join('\n');
      });
      $("#apply-full-code").html("<style type='text/css'>"+ $("#fullrencode").val() +"</style>");
    });
  };
  var DelQueryOnclick = function() {
    $(".listing-of-your-media-queries-container a").on('click', function() {
      $(this).parent().prev().prev().remove();
      $(this).parent().prev().remove();
      $(this).parent().next().remove();
      $(this).parent().remove();
      
      FinalizePrev();
      localStorage.setItem('MQuery', $("#hold-media-queries").html());
      localStorage.setItem('CSSReferencesList', $(".list-of-css-references").html());
    });
  };
  var MarPadCode = function() {
    var mtop = $("#drop .adds-your-margin-top").val(),
        mbottom = $("#drop .adds-your-margin-bottom").val(),
        mleft = $("#drop .adds-your-margin-left").val(),
        mright = $("#drop .adds-your-margin-right").val(),
        mresult = $("#drop .adds-your-margin-final"),
        mresultints = $("#drop .adds-your-margin-final-ints"),
        ptop = $("#drop .adds-your-padding-top").val(),
        pbottom = $("#drop .adds-your-padding-bottom").val(),
        pleft = $("#drop .adds-your-padding-left").val(),
        pright = $("#drop .adds-your-padding-right").val(),
        presult = $("#drop .adds-your-padding-final"),
        presultints = $("#drop .adds-your-padding-final-ints");
    
    if ((mtop === "") && (mright === "") && (mbottom === "") && (mleft === "")) {
      // Check if all are empty
      mresult.val("");
      mresultints.val("");
    } else if ((mtop === mright) && (mbottom === mleft)) {
      // If all are same
      mresult.val("margin: " + mtop + "px;");
      mresultints.val(mtop + "px");
    } else if ((mtop === mbottom) && (mleft === mright)) {
      // Check if first two values are same
      mresult.val("margin: " + mtop + "px " + mleft + "px;");
      mresultints.val(mtop + "px " + mleft + "px");
    } else {
      mresult.val("margin: " + mtop + "px " + mright + "px " + mbottom + "px " + mleft + "px;");
      mresultints.val(mtop + "px " + mright + "px " + mbottom + "px " + mleft + "px");
    }

    if ((ptop === "") && (pright === "") && (pbottom === "") && (pleft === "")) {
      // Check if all are empty
      presult.val("");
      presultints.val("");
    } else if ((ptop === pright) && (pbottom === pleft)) {
      // If all are same
      presult.val("padding: " + ptop + "px;");
      presultints.val(ptop + "px");
    } else if ((ptop === pbottom) && (pleft === mright)) {
      // Check if first two values are same
      presult.val("padding: " + ptop + "px " + pleft + "px;");
      presultints.val(ptop + "px " + pleft + "px");
    } else {
      presult.val("padding: " + ptop + "px " + pright + "px " + pbottom + "px " + pleft + "px;");
      presultints.val(ptop + "px " + pright + "px " + pbottom + "px " + pleft + "px");
    }
  };
  var BorderCode = function() {
    var btop = $("#bordervalz .adds-your-border-top").val(),
        bleft = $("#bordervalz .adds-your-border-left").val(),
        bbottom = $("#bordervalz .adds-your-border-bottom").val(),
        bright = $("#bordervalz .adds-your-border-right").val(),
        bresult = $("#bordervalz .adds-your-border-final");
    
    if ((btop === "") && (bright === "") && (bbottom === "") && (bleft === "")) {
      // Check if all are empty
      bresult.val("");
    } else if ((btop === bleft) && (bleft === bbottom) && (bbottom === bright)) {
      // If all are same
      bresult.val("border: " + btop + ";");
    } else {
      bresult.val("border-top: " + btop + ";\n  " + "border-left: " + bleft + ";\n  " + "border-bottom: " + pbottom + ";\n  " + "border-right: " + bright + ";\n  ");
    }
  };
  var BorderRadiusCode = function() {
    var brtl = $("#bordervalz .adds-your-border-radius-top-left").val(),
        brbr = $("#bordervalz .adds-your-border-radius-top-right").val(),
        brbl = $("#bordervalz .adds-your-border-radius-bottom-left").val(),
        brbr = $("#bordervalz .adds-your-border-radius-bottom-right").val(),
        brbrresult = $("#bordervalz .adds-your-border-final"),
        brbrintsresult = $("#bordervalz .adds-your-border-final-ints");
    

    if ((brtl === "") && (brtr === "") && (brbl === "") && (brbr === "")) {
      // Check if all are empty
      brbrresult.val("");
    } else if ((brtl === brtr) && (brtr === brbr) && (brtl === brbl)) {
      // If all are same
      brbrresult.val("border-radius: " + brtl + "px;");
      brbrintsresult.val(brtl + "px");
    } else {
      brbrresult.val("border-radius: " + brtl + "px " + brtr + "px " + brbr + "px " + brbl + "px;");
      brbrintsresult.val(brtl + "px " + brtr + "px " + brbr + "px " + brbl + "px");
    }
  };
  function CheckDrawOptions() {
    if ($("#div").is(":checked")) {
      $(".draw-opt-props div").hide();
    } else if ($("#h1").is(":checked")) {
      $(".draw-opt-props div").hide();
    }
  }
  var BoxOptions =  function() {
    if ($("#div").is(":checked")) {
        dBox = $("<" + $('.draw-elements input[type=radio]:checked').val() + " class='box' style='' />");
    }
    else if ($("#h1").is(":checked")) {
        dBox = $("<" + $('.draw-elements input[type=radio]:checked').val() + " class='box' style=''/>")
                 .html("Hello world");
    }
  };
  var RefreshCanvas = function() {
    $("#code").val($(".canves").html());
    $(".canves").html($("#code").val());
  };
  var BackupCanvas = function() {
    $("#orightml").html( $(".canves").html() );
    $(".canves").html( $("#orightml").html() );
  };
  
  // Mirror code
  $(window).on('load', function() {
    document.title = $(".thisisyourdocumenttitle").val();
    localStorage.setItem('SiteTitle', $(".thisisyourdocumenttitle").val());
    
    $("div.handle").remove();
    $("#sel-css, #browseweb").val("");
    $("#clearinputs").trigger("click");
    $("#toggle-workflow-visibility, #ljavascript").prop('checked', false);
    $("#ljavascript").trigger('change');
    $('.canves *').removeAttr('id').prop('contenteditable', false).removeAttr('contenteditable');
    $("#grabelmvalz .testsyourglobalcss:first-of-type, #setup-elm-parent").val("");
    $("#apply-active-css").html("<style type='text/css'>"+ $("#grabelmvalz .testsyourglobalcss:first-of-type").val() +"</style>");
    PrevStyles();
    
    // Add & Remove Locally Stored CSS References
    $(".dadamcssreflist").val("");
    $(".dadamcssrefhtml").html("").html( $(".list-of-css-references").html() );
    $(".dadamcssrefhtml textarea, .dadamcssrefhtml a, .dadamcssrefhtml button").remove();
    $(".dadamcssreflist").val( $('.dadamcssrefhtml').html().replace(/<\/?/g,'').replace(/div class="dadamcssrefhtml hide">/g,'').replace(/div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/pre>div>/g,'').replace(/ }div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/ }/g,'').replace(/pre>/g,'').replace(/div>/g,'').replace(/link href="/g,'<link href="').replace(/css">/g,'css">\n') );
    $(".list-of-css-references-container button").on('click', function() {
      $(".add-css-refer-val").val($(this).text()).trigger('change');
    });
    $(".list-of-css-references-container a").on('click', function() {
      $(this).parent().remove();
      $(".dadamcssreflist").val("");
      $(".dadamcssrefhtml").html("").html( $(".list-of-css-references").html() );
      $(".dadamcssrefhtml textarea, .dadamcssrefhtml a, .dadamcssrefhtml button").remove();
      $(".dadamcssreflist").val( $('.dadamcssrefhtml').html().replace(/<\/?/g,'').replace(/div class="dadamcssrefhtml hide">/g,'').replace(/div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/pre>div>/g,'').replace(/ }div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/ }/g,'').replace(/pre>/g,'').replace(/div>/g,'').replace(/link href="/g,'<link href="').replace(/css">/g,'css">\n') );
      FinalizePrev();
      localStorage.setItem('CSSReferencesList', $(".list-of-css-references").html());
    });
    
    // Add & Remove Global Styles
    GrabsAddedSelectors();
    RemovesAddedSelectors();
    
    $("#fullrencode").val(function() {
      return $.map($("#to-global-css textarea"), function (el) {
        return el.value;
      }).join('\n');
    });
    $("#apply-full-code").html("<style type='text/css'>"+ $("#fullrencode").val() +"</style>");
    
    // Add & Remove Media Queries
    GrabsQueryOnclick();
    DelQueryOnclick();
    
    // Add & Remove JS Styles
    $(".list-of-js-sources-container").find("button").on('click', function() {
      $(".add-js-source-val").val("").val($(this).text()).trigger('change');
    });
    $(".list-of-js-sources-container").find("a").on('click', function() {
      $(this).parent().remove();
      FinalizePrev();
      localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
    });
    
    $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
    
    // Check if Javascript is enabled or not
    if ( $("#ljavascript").prop('checked') === true ) {
      if ( $("#debug-indicator").text() === "off" ) {
        // we leave this blank so live debug only works when button says on...
        $("#js-yes-no").html('\n' + $("#allyourjssources").val() + '\n&lt;script type="text/javascript"&gt;\n' + $("#js-code").val() + '\n&lt;/script&gt;');
      } else {
        $("#js-yes-no").html('\n' + $("#allyourjssources").val() + '\n&lt;script type="text/javascript"&gt;\n' + $("#js-code").val() + '\n&lt;/script&gt;');
        $("#yourjs").html("<script type='text/javascript'>" + $("#js-code").val() + "</script>");
      }
      $("#js-code").removeAttr("disabled");
    }
    if ( $('#ljavascript').prop('checked') === false ) {
      $('#js-yes-no, #yourjs').html("");
      $('#js-code').attr('disabled', true);
    }
    
    // Handle Design/Preview Onload
    if ($('#toggle-workflow-visibility').prop('checked') === true ) {
      $("#preview-pane, #starter-properties").show();
      $(".canves, #select-properties").hide();

      if ($('.myfukentoolisactivebiotch').is(':visible')) {
        $('.myfukentoolisactivebiotch').trigger('click');
      }
      
      FinalizePrev();
    }
    if ($('#toggle-workflow-visibility').prop('checked') === false ) {
      $(".canves, #starter-properties").show();
      $("#preview-pane, #select-properties").hide();
      FinalizePrev();
    }
  }).on('load resize', function() {
    $('#ruler').empty();
    createRuler();
    
    // Set & Adjust Canvas Size
    $('#cwidth').attr('max', $('#itsthecavnescontainerbro').width()).val($('#itsthecavnescontainerbro').width());
    $('#cwidth').on('mousedown touchstart', function(e) {
      $('body').append('<span id="media-query-slider"></span>');
      $('#media-query-slider').show().text( $('#cwidth').val() + "px" ).css({
        left: e.pageX - $('#media-query-slider').width() / 1.25 + "px"
      });
      $('#cwidth').on('mouseup touchend', function(e) {
        $('#media-query-slider').hide().removeAttr("style");
      });
    });
    $("#cwidth").on('change', function() {
      $(".canves, #workflow").css({
        'width' : $("#cwidth").val() + 'px'
      });
      $("#resolutionoptimzer").val($(this).val() + "px");
    });
    $(document).on('mousemove touchmove change', function(e) {
      if ($('#media-query-slider').is(":visible")) {
        $('#media-query-slider').text( $('#cwidth').val() + "px" ).css({
          left: e.pageX - $('#media-query-slider').width() / 1.25 + "px"
        });
      }
    });
    
    // Handles Res Optimizers Value
    $("#resolutionoptimzer").val($('#cwidth').width() + "px").trigger("change");
  });
  
  // Handles Hotkeys
  $(function() {
    // Export layout
    shortcut.add("Ctrl+S", function() {
      $("#export-your-html").trigger('click');
    });
    // Shortcut for select tool
    shortcut.add("Ctrl+1", function() {
      $("#select-tool").trigger('click');
    });
    // Shortcut for draw tool
    shortcut.add("Ctrl+2", function() {
      $("#draw-tool").trigger('click');
    });
    // Shortcut for new document
    shortcut.add("Ctrl+N", function() {
      $("#new-doc").trigger('click');
    });
    
    // Shortcut to add elements to canvas
    shortcut.add("Ctrl+Shift+H", function() {
      if ( $("#starter-properties").is(":visible") ) {
        $(".elms-4-stage button:contains(header)").trigger("click");
      }
    });
    shortcut.add("Ctrl+Shift+D", function() {
      if ( $("#starter-properties").is(":visible") ) {
        $(".elms-4-stage button:contains(div)").trigger("click");
      }
    });
    shortcut.add("Ctrl+Shift+S", function() {
      if ( $("#starter-properties").is(":visible") ) {
        $(".elms-4-stage button:contains(span)").trigger("click");
      }
    });
    shortcut.add("Ctrl+Shift+F", function() {
      if ( $("#starter-properties").is(":visible") ) {
        $(".elms-4-stage button:contains(footer)").trigger("click");
      }
    });
    
    // Shortcut to preview project
    shortcut.add("Alt+P", function() {
      $('#toggle-workflow-visibility').trigger('click');
    });
    // Shortcut to add media query
    shortcut.add("Alt+Q", function() {
      $('#add-media-query').trigger('click');
    });
    // Shortcut to enable/disable javascript
    shortcut.add("Alt+J", function() {
      $('#ljavascript').trigger('click');
    });
    // Shortcut to focus javascript
    shortcut.add("Ctrl+J", function() {
      if ( $("#select-tool.myfukentoolisactivebiotch").is(":visible") ) {
        $("#select-tool").trigger("click");
      }
      if ( $("#ljavascript").is(":checked") ) {
        $("#js-code").focus();
      } else {
        $("#ljavascript").prop('checked', false).trigger('click');
        $("#js-code").focus();
      }
    });
    
    // Shortcut to search element
    shortcut.add("insert", function() {
      if ($('#select-tool.myfukentoolisactivebiotch').is(':visible')) {
        $("#search-app").val("none").trigger('change').val("").focus();
      } else {
        $("#select-tool").trigger('click');
        $("#search-app").val("none").trigger('change').val("").focus();
      }
    });
    // Shortcut to editable element(s)
    shortcut.add("Ctrl+E", function() {
      if ( $("#select-mode").is(":visible") ) {
        EditableStylez();
      }
    });
    // Shortcut to duplicate element (select)
    shortcut.add("Ctrl+D", function() {
      if ( $("#stylethis").is(":visible") ) {
        DuplicateSelectedElm();
        if ( $("#custom-menu").is(":visible") ) {
          $("#custom-menu").hide(100);
        };
      };
    });
    // Shortcut to remove selected element (select)
    $(document).bind('keydown', 'del', function() {
      if ( $("#stylethis").is(":visible") ) {
        DelSelectedElm();
        if ( $("#custom-menu").is(":visible") ) {
          $("#custom-menu").hide(100);
        };
      };
    });
    // Shortcut to deselect element (select)
    shortcut.add("Esc", function() {
      if ($("#select-mode").is(":visible")) {
        if ( $("#stylethis").is(":visible") ) {
          DeselectSelectedElm();
          if ( $("#custom-menu").is(":visible") ) {
            $("#custom-menu").hide(100);
          };
        } else {
          $("#select-tool").trigger('click');
        }
      } else if ($("#edit-mode").is(":visible")) {
        $("#exit-edit-mode").trigger("click");
      } else if ($("#search-app").is(":focus")) {
        $("#search-app").blur();
      } else if ($(".inputs-your-css-selector").is(":focus")) {
        $(".inputs-your-css-selector").blur();
      }
    });
    // Shortcut to close right click menu
    $(document).bind('keydown', 'space', function() {
      if ( $("#custom-menu").is(":visible") ) {
        $("#custom-menu").hide(100);
      };
    });
    // Shortcut to parent selection
    shortcut.add("Ctrl+P", function() {
      if ($("#select-mode").is(":visible")) {
        $("#custom-menu .add-parent-confirm").trigger('click');
      }
    });
    // Shortcut to child selection
    shortcut.add("Ctrl+K", function() {
      if ($("#select-mode").is(":visible")) {
        $("#custom-menu .add-child-confirm").trigger('click');
      }
    });
    
    // Shortcut to add linked css & a selector
    shortcut.add("Alt+=", function() {
      if ( $("#starter-properties").is(":visible") ) {
        $(".add-css-refer").trigger('click');
      }
      if ( $("#select-mode").is(":visible") ) {
        $(".adds-your-css-selector").trigger('click');
      }
    });
    // Shortcut to clear inputs
    $(document).bind('keydown', 'alt+-', function() {
      if ( $("#select-mode").is(":visible") ) {
        $("#clearinputs").trigger('click');
      }
    });
    // Shortcut to clear all your css selectors
    shortcut.add("Ctrl+,", function() {
      if ( $("#select-mode").is(":visible") ) {
        $(".imaclearallyourcss").trigger('click');
      }
    });
    // Shortcut to clear data in selected element
    shortcut.add("Ctrl+.", function() {
      if ( $("#stylethis").is(":visible") ) {
        $(".imaclearyourselectedelm").trigger('click');
      }
    });
    // Shortcut to clear canvas
    $(document).bind('keydown', 'ctrl+del', function() {
      $(".clear-canves-properz .imaclearyourcanvas").trigger('click');
    });
  });
  
  // Handles Select Tool, Global Styles, & Editable Operations
  $("#select-tool").on('click', function() {
    $("#draw-tool").removeClass("myfukentoolisactivebiotch");
    $(this).toggleClass("myfukentoolisactivebiotch");
    if ($("#select-tool.myfukentoolisactivebiotch").is(':visible')) {
      $("#toggle-workflow-visibility").prop('checked', false);
      $(".canves").addClass("designer").show();
      $("#starter-properties, #draw-properties, #preview-pane").hide();
      $("#select-properties").show();
      elmstyle = 1;
      drawable = false;
      
      if(elmstyle) {
        MoveSelectedElement();
        PrevStyles();
        createCustomMenu();
        
        if ( $($("#posvalz .adds-your-position")).val() === "" ) {
          $($("#posvalz .adds-your-position")).val("placer");
        }
      }
    } else {
      if ($("#stylethis").is(":visible")) {
        $(".deselectselectedelm").trigger("click");
      }
      elmstyle = false;
      $(document).unbind("contextmenu");
      $("div.handle").remove();
      $("#select-properties, #edit-mode").hide();
      if (($("#select-properties").is(":hidden")) && ($("#draw-properties").is(":hidden"))) {
        $("#starter-properties, #select-mode").show();
      }
      $("#select-mode #drop").find("input[type=text], input[type=number], select").val("").trigger('change');
      $("#select-mode #drop").find("a").removeClass("imanactiveachornowyay");
      $("#sel-css").val("");
      $("#known-class").text("");
      $(".canves *").prop('contenteditable', false).removeAttr('contenteditable').removeAttr("id");
      $(".canves").removeClass("designer");
      // Deactivates interactive design and right click menu when tool closes
      $("#current-canvas").val($(".canves").parent().html());
      $(".imcontainingcanves").html($("#current-canvas").val());

      $('#select-elm-options').hide();
      FinalizePrev();
      if( $("#edit-mode").is(":visible") ) {
        $("#exit-edit-mode, #undo, #redo").show();
      } else {
        $("#exit-edit-mode, #undo, #redo").hide();
      }
    }
  });
  $(function() {
    // Handles Basic Operations (Dropdown, Tool Opts, Elm Appends, Custom HTML)
    $(function() {
      // Sets elements class name
      $("#sel-css").on('keyup', function() {
        $("#stylethis").prop('class', $(this).val());
        $("#known-class").text($(this).val());
      });
      
      // Clear all inputs inside of select mode
      $("#clearinputs").on('click', function() {
        if ($("#stylethis").is(":visible")) {
          $("#stylethis").attr("style", "");
        }
        $("#select-mode #drop").find("input[type=text], input[type=number], select").val("").trigger('change');
        $("#select-mode #drop").find("a").removeClass("imanactiveachornowyay");
        $(".inputs-your-css-selector").val("").trigger('change');
        PrevStyles();
        if ($("#stylethis").is(":visible")) {
          $("#stylethis").attr("style", "");
        }
      });
      
      // Duplicate Remove Deselect options in select tool
      $(".editselectedelm").on('click', function() {
        EditableStylez();
      });
      $(".duplicateselectedelm").on('click', function() {
        DuplicateSelectedElm();
      });
      $(".removeselectedelm").on('click', function() {
        DelSelectedElm();
      });
      $(".deselectselectedelm").on('click', function() {
        DeselectSelectedElm();
      });
      
      // Append extra elements in selected element
      $("#add-button").on('click', function() {
        $(this).toggleClass('thisisanactivebutton');
        if ($('.thisisanactivebutton').is(':visible')) {
          $("#add-textbox, #add-parent, #add-child, #clear-canves").removeClass('thisisanactivebutton');
          $(".add-button-properz").show();
          $(".add-textbox-properz, .add-parent-properz, .add-child-properz, .clear-canves-properz").hide();
        } else {
          $(".add-button-properz").hide();
        }
      });
      $("#add-textbox").on('click', function() {
        $(this).toggleClass('thisisanactivebutton');
        if ($('.thisisanactivebutton').is(':visible')) {
          $("#add-button, #add-parent, #add-child, #clear-canves").removeClass('thisisanactivebutton');
          $(".add-textbox-properz").show();
          $(".add-button-properz, .add-parent-properz, .add-child-properz, .clear-canves-properz").hide();
        } else {
          $(".add-textbox-properz").hide();
        }
      });
      $("#add-parent").on('click', function() {
        $(this).toggleClass('thisisanactivebutton');
        if ($('.thisisanactivebutton').is(':visible')) {
          $("#add-button, #add-textbox, #add-child, #clear-canves").removeClass('thisisanactivebutton');
          $(".add-parent-properz").show();
          $(".add-button-properz, .add-textbox-properz, .add-child-properz, .clear-canves-properz").hide();
        } else {
          $(".add-parent-properz").hide();
        }
      });
      $("#add-child").on('click', function() {
        $(this).toggleClass('thisisanactivebutton');
        if ($('.thisisanactivebutton').is(':visible')) {
          $("#add-button, #add-textbox, #add-parent, #clear-canves").removeClass('thisisanactivebutton');
          $(".add-child-properz").show();
          $(".add-button-properz, .add-textbox-properz, .add-parent-properz, .clear-canves-properz").hide();
        } else {
          $(".add-child-properz").hide();
        }
      });
      $("#clear-canves").on('click', function() {
        $(this).toggleClass('thisisanactivebutton');
        if ($('.thisisanactivebutton').is(':visible')) {
          $("#add-button, #add-textbox, #add-parent, #add-child").removeClass('thisisanactivebutton');
          $(".clear-canves-properz").show();
          $(".add-button-properz, .add-textbox-properz, .add-parent-properz, .add-child-properz").hide();
        } else {
          $(".clear-canves-properz").hide();
        }
      });
      $(".clear-canves-properz .imaclearyourcanvas").on('click', function() {
        var x = window.confirm("Are you sure you want to clear all elements from your canvas? This can not be undone.")
        if (x) {
          if ($(".canves").html() === "")
            alert("Your canvas is already cleared.");
          else
            $(".canves").html("");
            $("#insert-your-own-html").val("");
            if ($('#select-tool.myfukentoolisactivebiotch').is(':visible')) {
              $("#select-tool").trigger('click');
            }
            return false;
        }
      });
      $(".clear-canves-properz .imaclearyourselectedelm").on('click', function() {
        if ($("#insert-your-own-html").val() === "") {
          alert("Either element is selected or element's html is already empty");
        } else {
          var x = window.confirm("Are you sure you want to clear all HTML inside your selected element?")
          if (x) {
            $("#insert-your-own-html").val("").trigger('change').focus();
            return false;
          }
        }
      });
      $(".clear-canves-properz .imaclearallyourcss").on('click', function() {
        if ( $("#to-global-css").html() === "" ) {
          alert("Your global styles are already empty");
        } else {
          var x = window.confirm("Are you sure you want to clear all your global styles?")
          if (x) {
            $("#to-global-css").html("").trigger('change');
            $("#fullrencode").val("").trigger('change');
            localStorage.setItem('CSSSelectors', $("#fullrencode").val());
            localStorage.setItem('CSSSelectorsHTML', $("#to-global-css").html());
            return false;
          }
        }
      });
      $(".add-button-properz .add-button-confirm").on('click', function() {
        if ($('#stylethis').is(":visible")) {
          if ($('.newbtntxt').val() === "") {
            alert("Operation failed: Button text is empty");
          } else {
            var $ctrl = $('<button/>').html($('.newbtntxt').val());
            var cssClass = $('.newbtnclassname').val();
            if (cssClass !== "") {
                $ctrl.addClass(cssClass);
            }
            $("#stylethis").append($ctrl);
            $('#insert-your-own-html').val($("#stylethis").html());
            localStorage.setItem('CanvesContent', $(".canves").html());
          }
        } else {
          alert("Operation cancelled: No current element selected!");
        }
      });
      $(".add-textbox-properz .add-textbox-confirm").on('click', function() {
        if ($('#stylethis').is(":visible")) {
          if ($('.newtxttype option').is(":selected")) {
            var klass = $('.newtxtclassname').val(),
                tieype  = $('.newtxttype').val(),
                valz  = $('.newtxtval').val(),
                obj   = {};

            if (klass) obj['class'] = klass;
            if (tieype)  obj['type']  = tieype;
            if (valz)  obj['value']  = valz;

            $("#stylethis").append( $('<input/>', obj) );
            $('#insert-your-own-html').val($("#stylethis").html());
            localStorage.setItem('CanvesContent', $(".canves").html());
          } else {
            alert("Operation cancelled: No input[type] defined!");
          }
        } else {
          alert("Operation cancelled: No current element selected!");
        }
      });
      $(".add-child-properz .add-child-confirm, #custom-menu .add-child-confirm").on('click', function() {
        if ( $("#stylethis").is(":visible") ) {
          if ( $("#stylethis").html() === "" ) {
            alert("Selected element has no current HTML. No children to detect.");
          } else {
            $("#setup-elm-parent").val($("#stylethis").children().html());
            $("#insert-your-own-html").val($("#setup-elm-parent").val()).trigger("change");
            $("#setup-elm-parent").val("");
            $("#stylethis").append('<div class="handle NE"></div><div class="handle NN"></div><div class="handle NW"></div><div class="handle WW"></div><div class="handle EE"></div><div class="handle SW"></div><div class="handle SS"></div><div class="handle SE"></div>');
            localStorage.setItem('CanvesContent', $(".canves").html());
          }
        } else {
         alert("Parent Child Operation cancelled: No element is selected!");
        }
      });
      $(".add-parent-properz .add-parent-confirm, #custom-menu .add-parent-confirm").on('click', function() {
        if ( $("#stylethis").is(":visible") ) {
          if ( $("#stylethis").html() === "" ) {
            var x = window.confirm("Selected element has no current HTML.\n\n Are you sure you want to parent a blank element?");
            if (x) {
              if ( $(".newparentclassname").val() === "" ) {
                $("#setup-elm-child").val("<div>\n" + $("#insert-your-own-html").val() + "\n</div>");
                $("#insert-your-own-html").val($("#setup-elm-child").val()).trigger("change");
                $("#setup-elm-child").val("");
                localStorage.setItem('CanvesContent', $(".canves").html());
              } else {
                $("#setup-elm-child").val('<div class="'+ $(".newchildclassname").val() +'">\n' + $("#insert-your-own-html").val() + '\n</div>');
                $("#insert-your-own-html").val($("#setup-elm-child").val()).trigger('change');
                $("#setup-elm-child").val("");
                localStorage.setItem('CanvesContent', $(".canves").html());
              }
            } else {
              return false;
            }
          } else {
            if ( $(".newparentclassname").val() === "" ) {
              $("#setup-elm-child").val("<div>\n" + $("#insert-your-own-html").val() + "\n</div>");
              $("#insert-your-own-html").val($("#setup-elm-child").val()).trigger("change");
              $("#setup-elm-child").val("");
              $("#stylethis").append('<div class="handle NE"></div><div class="handle NN"></div><div class="handle NW"></div><div class="handle WW"></div><div class="handle EE"></div><div class="handle SW"></div><div class="handle SS"></div><div class="handle SE"></div>');
              localStorage.setItem('CanvesContent', $(".canves").html());
            } else {
              $("#setup-elm-child").val('<div class="'+ $(".newchildclassname").val() +'">\n' + $("#insert-your-own-html").val() + '\n</div>');
              $("#insert-your-own-html").val($("#setup-elm-child").val()).trigger('change');
              $("#setup-elm-child").val("");
              $("#stylethis").append('<div class="handle NE"></div><div class="handle NN"></div><div class="handle NW"></div><div class="handle WW"></div><div class="handle EE"></div><div class="handle SW"></div><div class="handle SS"></div><div class="handle SE"></div>');
              localStorage.setItem('CanvesContent', $(".canves").html());
            }
          }
        } else {
          alert("Parent Operation cancelled: No element is selected!");
        }
      });
      
      // Update inner html from custom textarea
      $('#insert-your-own-html').on('keyup change', function() {
        $("#stylethis").html($(this).val());
        localStorage.setItem('CanvesContent', $(".canves").html());
      });
      
      // Handles Global Styles Preview
      $("#yourselector .inputs-your-css-selector").on('keyup change', function() {
        PrevStyles();
      });
      
      $("#fullrencode").on('change', function() {
        $("#checkforstyle").html('&lt;style type="text/css"&gt;'+ $("#style-sheet").val() + $(this).val() +'&lt;/style&gt;');
      });
    });
    
    // Handles Position
    $(function() {
      // Handles Margin & Padding
      $(function() {
        $("#drop .adds-your-margin").bind('keyup change', function() {
          MarPadCode();   
          $("#drop .adds-your-margin-top, #drop .adds-your-margin-right, #drop .adds-your-margin-bottom, #drop .adds-your-margin-left").val($(this).val());
          $("#stylethis").css({
            "margin": $("#drop .adds-your-margin").val() + "px"
          });
        });
        $("#drop .adds-your-margin-top, #drop .adds-your-margin-right, #drop .adds-your-margin-bottom, #drop .adds-your-margin-left").on('keyup change', function() {
          MarPadCode();
          $("#drop .adds-your-margin").val("");
          $("#stylethis").css({
            "margin-top": $("#drop .adds-your-margin-top").val() + "px",
            "margin-right": $("#drop .adds-your-margin-right").val() + "px",
            "margin-bottom": $("#drop .adds-your-margin-bottom").val() + "px",
            "margin-left": $("#drop .adds-your-margin-left").val() + "px"
          });
        });
        
        $("#drop .adds-your-padding").bind('keyup change', function() {
          MarPadCode();
          $("#drop .adds-your-padding-top, #drop .adds-your-padding-right, #drop .adds-your-padding-bottom, #drop .adds-your-padding-left").val($(this).val());
          $("#stylethis").css({
            "padding": $("#drop .adds-your-padding").val() + "px",
          });
        });
        $("#drop .adds-your-padding-top, #drop .adds-your-padding-right, #drop .adds-your-padding-bottom, #drop .adds-your-padding-left").on('keyup change', function() {
          MarPadCode();
          $("#drop .adds-your-padding").val("");
          $("#stylethis").css({
            "padding-top": $("#drop .adds-your-padding-top").val() + "px",
            "padding-right": $("#drop .adds-your-padding-right").val() + "px",
            "padding-bottom": $("#drop .adds-your-padding-bottom").val() + "px",
            "padding-left": $("#drop .adds-your-padding-left").val() + "px"
          });
        });
      });
      
      // Handles Position & Reflection
      $(".ancordaposvalz a").on('click', function() {
        $("#posvalz a").removeClass("imanactiveachornowyay");
        $(this).addClass("imanactiveachornowyay");
        $("#drop .adds-your-position").val($(this).prop('title')).change();
        if ($(this).prop("title") === "placer") {
          $("#posvalz a").removeClass("imanactiveachornowyay");
        }
        PrevStyles();
        $("#stylethis").css({
          "position": $("#drop .adds-your-position-top").val()
        });
        if ( $(this).val() === "placer" ) {
          $("#stylethis").css({
            "position": ""
          });
          localStorage.setItem('CanvesContent', $(".canves").html());
        }
        localStorage.setItem('CanvesContent', $(".canves").html());
      });
      $("#posvalz .adds-your-position").on('change', function() {
        if ( $(this).val() === "" ) {
          $(this).val("placer");
        }
      });
      
      $("#width-identifier").on('click', function() {
        if ( $(this).text() === "%" ) {
          $(this).text("px");
        } else if ( $(this).text() === "px" ) {
          $(this).text("%");
        }
        PrevStyles();
      });
      $("#height-identifier").on('click', function() {
        if ( $(this).text() === "%" ) {
          $(this).text("px");
        } else if ( $(this).text() === "px" ) {
          $(this).text("%");
        }
        PrevStyles();
      });
      
      // Handles Style Preview
      $("#posvalz input[type=text], #posvalz input[type=number]").on('keyup change', function() {
        $("#stylethis").css({
          "top": $("#drop .adds-your-position-top").val(),
          "left": $("#drop .adds-your-position-left").val(),
          "right": $("#drop .adds-your-position-right").val(),
          "bottom": $("#drop .adds-your-position-bottom").val(),
          "width": $("#drop .adds-your-width").val() + $("#width-identifier").text(),
          "height": $("#drop .adds-your-height").val() + $("#height-identifier").text(),
          "margin-top": $("#drop .adds-your-margin-top").val() + "px",
          "margin-right": $("#drop .adds-your-margin-right").val() + "px",
          "margin-bottom": $("#drop .adds-your-margin-bottom").val() + "px",
          "margin-left": $("#drop .adds-your-margin-left").val() + "px",
          "padding-top": $("#drop .adds-your-padding-top").val() + "px",
          "padding-right": $("#drop .adds-your-padding-right").val() + "px",
          "padding-bottom": $("#drop .adds-your-padding-bottom").val() + "px",
          "padding-left": $("#drop .adds-your-padding-left").val() + "px"
        });
        localStorage.setItem('CanvesContent', $(".canves").html());
        PrevStyles();
      });
    });
    
    // Handles Background
    $(function() {
      $("#bgvalz").find("input[type=text], select").on('keyup change', function() {
        $("#stylethis").css({
          "background-position": $("#drop .adds-your-background-position").val(),
          "background-repeat": $("#drop .adds-your-background-repeat").val(),
          "background-attachment": $("#drop .adds-your-background-attachment").val(),
          "background-size": $("#drop .adds-your-background-size").val(),
          "background-color": $("#drop .adds-your-background-color").val(),
          "box-shadow": $("#drop .adds-your-box-shadow").val()
        });
        if ($("#drop .adds-your-background-image:first-of-type").val() === "") {
          $("#stylethis").css({
            "background-image": ""
          });
          localStorage.setItem('CanvesContent', $(".canves").html());
        } else {
          $("#stylethis").css({
            "background-image": "url('" + $("#drop .adds-your-background-image").val() + "')"
          });
          localStorage.setItem('CanvesContent', $(".canves").html());
        }
        localStorage.setItem('CanvesContent', $(".canves").html());
        PrevStyles();
      });
    });

    // Handles Border
    $(function() {
      $("#bordervalz, .ooobubblezbourder").find("input[type=text], input[type=number], select").on('mousedown keyup change', function() {
        $("#stylethis").css({
          "border-top": $("#drop .adds-your-border-top").val(),
          "border-left": $("#drop .adds-your-border-left").val(),
          "border-right": $("#drop .adds-your-border-right").val(),
          "border-bottom": $("#drop .adds-your-border-bottom").val()
        });
        localStorage.setItem('CanvesContent', $(".canves").html());
        PrevStyles();
      });
      $("#drop .adds-your-border-radius").on('mousedown keyup change', function() {
        $("#drop .adds-your-border-radius-top-left, #drop .adds-your-border-radius-top-right, #drop .adds-your-border-radius-bottom-left, #drop .adds-your-border-radius-bottom-right").val($(this).val());
        $("#stylethis").css({
          "border-top-left-radius": $("#drop .adds-your-border-radius-top-left").val() + "px",
          "border-top-right-radius": $("#drop .adds-your-border-radius-top-right").val() + "px",
          "border-bottom-left-radius": $("#drop .adds-your-border-radius-bottom-left").val() + "px",
          "border-bottom-right-radius": $("#drop .adds-your-border-radius-bottom-right").val() + "px"
        });
        localStorage.setItem('CanvesContent', $(".canves").html());
        PrevStyles();
      });
      $("#drop .adds-your-border-radius-top-left, #drop .adds-your-border-radius-top-right, #drop .adds-your-border-radius-bottom-left, #drop .adds-your-border-radius-bottom-right").on('mousedown keyup change', function() {
        $("#stylethis").css({
          "border-top-left-radius": $("#drop .adds-your-border-radius-top-left").val() + "px",
          "border-top-right-radius": $("#drop .adds-your-border-radius-top-right").val() + "px",
          "border-bottom-left-radius": $("#drop .adds-your-border-radius-bottom-left").val() + "px",
          "border-bottom-right-radius": $("#drop .adds-your-border-radius-bottom-right").val() + "px"
        });
        localStorage.setItem('CanvesContent', $(".canves").html());
        PrevStyles();
      });
    });
    
    // Handles Typography
    $(function() {
      // Set's font-family & size
      $(".grab-default-typography, #editable-font-type").find("a").each(function() {
        $(this).css('font-family', $(this).text());
      });
      $("#drop #points-input").on("change", function() {
        $("#drop .adds-your-font-size").val($(this).val());
        $("#stylethis").css({
          "font-size": $("#drop .adds-your-font-size").val() + "px"
        });
        localStorage.setItem('CanvesContent', $(".canves").html());
        PrevStyles();
      });
      $("#typographyvalz1, #typographyvalz2").find("input[type=text], input[type=number], select").on("keyup change", function() {
        $("#stylethis").css({
          "color": $("#drop .adds-your-font-color").val(),
          "font-varient": $("#drop .adds-your-font-varient").val(),
          "font-style": $("#drop .adds-your-font-style").val(),
          "font-weight": $("#drop .adds-your-font-weight").val(),
          "line-height": $("#drop .adds-your-line-height").val() + "px",
          "letter-spacing": $("#drop .adds-your-letter-spacing").val() + "px",
          "word-spacing": $("#drop .adds-your-word-spacing").val() + "px",
          "text-transform": $("#drop .adds-your-text-transform").val(),
          "text-decoration": $("#drop .adds-your-text-decoration").val(),
          "word-wrap": $("#drop .adds-your-word-wrap").val(),
          "white-space": $("#drop .adds-your-white-space").val(),
          "text-shadow": $("#drop .adds-your-text-shadow").val()
        });
        localStorage.setItem('CanvesContent', $(".canves").html());
        PrevStyles();
      });
      
      // When anchor's click update textbox
      $("#grab-txt-align a").on('click', function() {
        $("#grab-txt-align a").removeClass("imanactiveachornowyay");
        $(this).addClass("imanactiveachornowyay");
        $("#drop .adds-your-text-align").val($(this).prop('title'));
        if ($(this).prop("title") === "") {
          $("#grab-txt-align a").removeClass("imanactiveachornowyay");
        }
        PrevStyles();
        $("#stylethis").css({
          "text-align": $("#drop .adds-your-text-align").val()
        });
        localStorage.setItem('CanvesContent', $(".canves").html());
      });
      $(".grab-default-typography a").on('click', function() {
        $(".grab-default-typography a").removeClass("imanactiveachornowyay");
        $(this).addClass("imanactiveachornowyay");
        $("#drop .adds-your-font-family").val($(this).text());
        if ($(this).prop("title") === "") {
          $(".grab-default-typography a").removeClass("imanactiveachornowyay");
        }
        PrevStyles();
        $("#stylethis").css({
          "font-family": $("#drop .adds-your-font-family").val()
        });
        localStorage.setItem('CanvesContent', $(".canves").html());
      });
      
      // Update anchor style when value changed
      $("#drop .adds-your-text-align").on('change', function() {
        $("#stylethis").css({
          "color": $("#drop .adds-your-font-color").val(),
          "font-family": $("#drop .adds-your-font-family").val(),
          "font-varient": $("#drop .adds-your-font-varient").val(),
          "font-style": $("#drop .adds-your-font-style").val(),
          "font-weight": $("#drop .adds-your-font-weight").val(),
          "line-height": $("#drop .adds-your-line-height").val() + "px",
          "letter-spacing": $("#drop .adds-your-letter-spacing").val() + "px",
          "word-spacing": $("#drop .adds-your-word-spacing").val() + "px",
          "text-transform": $("#drop .adds-your-text-transform").val(),
          "text-decoration": $("#drop .adds-your-text-decoration").val(),
          "text-align": $("#drop .adds-your-text-align").val(),
          "word-wrap": $("#drop .adds-your-word-wrap").val(),
          "white-space": $("#drop .adds-your-white-space").val(),
          "text-shadow": $("#drop .adds-your-text-shadow").val()
        });
        $("#grab-txt-align a").removeClass("imanactiveachornowyay");
        var txtalign = this.value;
        $("#grab-txt-align a").filter(function() {
           return this.title === txtalign; /* return ones that match text-align */
        }).prop('title', txtalign).addClass("imanactiveachornowyay");
        if ($(this).val() === "") {
          $("#grab-txt-align a").removeClass("imanactiveachornowyay");
        }
        localStorage.setItem('CanvesContent', $(".canves").html());
      });
      $("#drop .adds-your-font-family").on('keyup change', function() {
        $("#stylethis").css({
          "color": $("#drop .adds-your-font-color").val(),
          "font-family": $("#drop .adds-your-font-family").val(),
          "font-varient": $("#drop .adds-your-font-varient").val(),
          "font-style": $("#drop .adds-your-font-style").val(),
          "font-weight": $("#drop .adds-your-font-weight").val(),
          "line-height": $("#drop .adds-your-line-height").val() + "px",
          "letter-spacing": $("#drop .adds-your-letter-spacing").val() + "px",
          "word-spacing": $("#drop .adds-your-word-spacing").val() + "px",
          "text-transform": $("#drop .adds-your-text-transform").val(),
          "text-decoration": $("#drop .adds-your-text-decoration").val(),
          "text-align": $("#drop .adds-your-text-align").val(),
          "word-wrap": $("#drop .adds-your-word-wrap").val(),
          "white-space": $("#drop .adds-your-white-space").val(),
          "text-shadow": $("#drop .adds-your-text-shadow").val()
        });
        $(".grab-default-typography a").removeClass("imanactiveachornowyay");
        var font = this.value;
        $(".grab-default-typography a").filter(function() {
           return this.title === font; /* return ones that match font */
        }).css({
          'font-family': '"' + font + '"'
        }).addClass("imanactiveachornowyay");
        if ($(this).val() === "") {
          $(".grab-default-typography a").removeClass("imanactiveachornowyay");
        }
        localStorage.setItem('CanvesContent', $(".canves").html());
      });
    });
    
    // Handles Advanced
    $(function() {
      $("#advancedvalz").find("input[type=text], input[type=number], select").on('keyup change', function() {
        $("#stylethis").css({
          "display": $("#drop .adds-your-display").val(),
          "overflow-x": $("#drop .adds-your-overflow-x").val(),
          "overflow-y": $("#drop .adds-your-overflow-y").val(),
          "opacity": $("#drop .adds-your-opacity").val(),
          "outline": $("#drop .adds-your-outline").val(),
          "resize": $("#drop .adds-your-resize").val(),
          "float": $("#drop .adds-your-float").val(),
          "z-index": $("#drop .adds-your-z-index").val(),
          "cursor": $("#drop .adds-your-cursor").val(),
          "list-style": $("#drop .adds-your-list-style").val(),
          "content": $("#drop .adds-your-content").val(),
          "vertical-align": $("#drop .adds-your-vertical-align").val(),
          "transition": $("#drop .adds-your-transition").val(),
          "transform": $("#drop .adds-your-transform").val(),
          "filter": $("#drop .adds-your-filter").val()
        });
        localStorage.setItem('CanvesContent', $(".canves").html());
        PrevStyles();
      });
    });
  });
  $(function() {
    $("#exit-edit-mode").on('click', function() {
      $(".canves *").prop('contenteditable', false).removeAttr('contenteditable');
      $("#edit-mode, #undo, #redo").hide();
      $(this).hide();
      $("#select-mode").show();
      $(".canves").addClass("designer");
      MoveSelectedElement();
      PrevStyles();
      createCustomMenu();
      localStorage.setItem('CanvesContent', $(".canves").html());
    });
    
    // Handles Heading
    $('#editable-heading-elms a').on('click', function() {
      document.execCommand('formatBlock', false, $(this).text());
      $("#show-editable-elms-code").val($(editableElm).html());
      localStorage.setItem('CanvesContent', $(".canves").html());
    });
    $('#editable-elms a').on('click', function() {
      $("#show-editable-elms-code").val($(editableElm).html());
      localStorage.setItem('CanvesContent', $(".canves").html());
    });
    
    // Handles Typography
    $(function() {
      $('#editable-font-type a').on('click', function() {
        document.execCommand('FontName', false, $(this).text());
        $("#show-editable-elms-code").val($(editableElm).html());
        localStorage.setItem('CanvesContent', $(".canves").html());
      });
      $('#editable-txt-align a').on('click', function() {
        $("#set-txt-align").val($(this).prop('title'));
        $("#show-editable-elms-code").val($(editableElm).html());
        if ($('#set-txt-align').val() === "justifyLeft") {
          document.execCommand("justifyLeft",false,null);
        } else if ($('#set-txt-align').val() === "justifyCenter") {
          document.execCommand("justifyCenter",false,null);
        } else if ($('#set-txt-align').val() === "justifyRight") {
          document.execCommand("justifyRight",false,null);
        }
        localStorage.setItem('CanvesContent', $(".canves").html());
      });
      
      // Setup Code
      $("#editable-text-color-picker input[type=range]").on('change keyup', function() {
        $("#editable-txt-cpick-s-bg").css({
          "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $("#editable-txt-cpick-hue").val() + "," + $("#editable-txt-cpick-s").val() + "%," + $("#editable-txt-cpick-l").val() + "%)" + " 100%)"
        });
        $("#editable-txt-cpick-l-bg").css({
          "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $("#editable-txt-cpick-hue").val() + "," + $("#editable-txt-cpick-s").val() + "%,50%) 50%,#ffffff 100%)"
        });
        $("#editable-txt-cpick-a-bg").css({
          "background": "linear-gradient(to right, rgba(255,255,255,0) 0%," + "hsl(" + $("#editable-txt-cpick-hue").val() + "," + $("#editable-txt-cpick-s").val() + "%," + $("#editable-txt-cpick-l").val() + "%)" + " 100%)"
        });
        
        // Initiates preview
        $("#grab-editable-txt-color").css({
          "background": "hsla(" + $("#editable-txt-cpick-hue").val() + ", " + $("#editable-txt-cpick-s").val() + "%, " + $("#editable-txt-cpick-l").val() + "%, " + $("#editable-txt-cpick-a").val() + ")",
          "border-color": "hsla(" + $("#editable-txt-cpick-hue").val() + ", " + $("#editable-txt-cpick-s").val() + "%, " + $("#editable-txt-cpick-l").val() + "%, " + $("#editable-txt-cpick-a").val() + ")"
        });
        
        var hex = rgb2hex( $("#grab-editable-txt-color").css('background-color') );
        $("#editable-txt-cpick-code-hsl").val(hex);
        var color = $("#editable-txt-cpick-code-hsl").val();
        document.execCommand('ForeColor',false,color);
        $("#show-editable-elms-code").val($(editableElm).html());
        localStorage.setItem('CanvesContent', $(".canves").html());
      });
      $("#editable-txt-cpick-code-hsl").on('change keyup', function() {
        // Initiates preview
        $("#grab-txt-color").css({
          "background": $(this).val(),
          "border-color": $(this).val()
        });
      });
      
      $("#editable-txt-cpick-s-bg").css({
        "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $("#editable-txt-cpick-hue").val() + "," + $("#editable-txt-cpick-s").val() + "%," + $("#editable-txt-cpick-l").val() + "%)" + " 100%)"
      });
      $("#editable-txt-cpick-l-bg").css({
        "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $("#editable-txt-cpick-hue").val() + "," + $("#editable-txt-cpick-s").val() + "%,50%) 50%,#ffffff 100%)"
      });
      $("#editable-txt-cpick-a-bg").css({
        "background": "linear-gradient(to right, rgba(255,255,255,0) 0%," + "hsl(" + $("#editable-txt-cpick-hue").val() + "," + $("#editable-txt-cpick-s").val() + "%," + $("#editable-txt-cpick-l").val() + "%)" + " 100%)"
      });

      $("#grab-editable-txt-color").on('click', function() {
        $("#editable-text-color-picker").toggle();
      });
      
      // Handles font size
      $('#editable-font-size').on('change', function() {
        document.execCommand('FontSize', false, $(this).val());
        $("#editable-font-size-output").text($("#editable-font-size").val());
        $("#show-editable-elms-code").val($(editableElm).html());
        localStorage.setItem('CanvesContent', $(".canves").html());
      });
    });
  });
  
  // Handles Draw Tool
  $("#draw-tool").on('click', function() {
    $("#select-tool").removeClass("myfukentoolisactivebiotch");
    $(this).toggleClass("myfukentoolisactivebiotch");
    RefreshCanvas();
    if ($("#draw-tool.myfukentoolisactivebiotch").is(":visible")) {
      elmstyle = false;
      drawable = 1;
      $("#draw-properties").show();
      $("#select-properties, #starter-properties").hide();
      
      // Remove all ids from previously selected elements
      $(".canves *").removeAttr('id').removeAttr('contenteditable');
      $(".handle").remove();
      
      // Handles Draw Options
      $(".draw-elements input[type=radio]").on('change', function() {
        CheckDrawOptions();
      });
      $(".draw-opt-props > div input").on('change', function() {
        BoxOptions();
      });
    }
    else {
      drawable = false;
      $("#draw-properties").hide();
      if (($("#select-properties").is(":hidden")) && ($("#draw-properties").is(":hidden"))) {
        $("#starter-properties").show();
      }
    }
  });
  
  // Handles Drawable Elements
  $(".canves").on('mousedown touchstart', function(e) {
    if ($("#draw-tool.myfukentoolisactivebiotch").is(':visible')) {
      drawable = 1;
      if(drawable) {
        drawing = true;
        mS.x = e.pageX;
        mS.y = e.pageY - 24;
        BoxOptions();
        $(this).append(dBox);
        
        // Do not select text when drawing
        return false;
      }
    }
  });
  $(document).on('mousemove touchmove', function(e) {
    if ($("#draw-tool.myfukentoolisactivebiotch").is(':visible')) {
      if(drawing && drawable){
        var mPos = {x:e.pageX, y:e.pageY - 24};
        var css = {};
          css.position   = 'absolute';
          css.left       = (mPos.x > mS.x) ? mS.x : mPos.x;
          css.top        = (mPos.y > mS.y) ? mS.y : mPos.y;
          css.width      = Math.abs(mPos.x - mS.x);
          css.height     = Math.abs(mPos.y - mS.y);
          css.border = '1px dotted rgb(0, 34, 102)';
          dBox.css(css);
        
        // Do not select text when drawing
        return false;
      }
    }
  }).on('mouseup touchend', function(e) {
    drawing  = false;
    localStorage.setItem('CanvesContent', $(".canves").html());
  });
  
  $("#open-menu").on('click', function() {
    $("#menu").show();
    
    $("#tools, #tools a:not(#open-menu), #starter-properties, #select-properties, #ruler-container, #cwidth-containment, #itsthecavnescontainerbro, .canves, .canves *").on('mousedown touchstart', function() {
      if ( $("#menu").is(":visible") ) {
        $("#menu").hide();
      }
    });
  });
  $("#css-tips").on('click', function() {
    $(this).toggleClass("myfukentoolisactivebiotch");
    if ($("#css-tips.myfukentoolisactivebiotch").is(':visible')) {
      $("#menu").hide();
      $("#mmd-instruction-dialog-bg, #mmd-instruction-dialog").fadeIn();
    } else {
      $("#menu").hide();
      $("#mmd-instruction-dialog-bg, #mmd-instruction-dialog").fadeOut();
    }
  });
  $("#mmd-instruction-dialog-bg").on('mousedown touchstart', function() {
    $("#mmd-instruction-dialog-bg, #mmd-instruction-dialog").fadeOut();
    $("#css-tips").removeClass("myfukentoolisactivebiotch");
  });
  $("#toggle-themes").on('click', function() {
    if ($(this).text() === "Light Theme") {
      $('link[href="assets/theme.css"]').attr('href','assets/theme-light.css');
      $(this).text("Dark Theme");
      localStorage.setItem('ActiveTheme', $('head').html());
      localStorage.setItem('ThemeText', $('#toggle-themes').html());
    } else {
      $('link[href="assets/theme-light.css"]').attr('href','assets/theme.css');
      $(this).text("Light Theme");
      localStorage.setItem('ActiveTheme', $('head').html());
      localStorage.setItem('ThemeText', $('#toggle-themes').html());
    }
  });
  
  // Adds your CSS Selector
  $(".adds-your-css-selector").on('click', function() {
    if ( $("#yourselector .inputs-your-css-selector:first-of-type").val() === "" ) {
      alert("Can't add class because value is blank.");
    } else {
      // Append the styles
      $(function() {
        $("#to-global-css").append($("<div class='list-of-your-global-css-selectors-container'>")
          .append("<a href='javascript:void(0)'><span class='fa fa-times'></span></a>")
          .append("<button>"+ $("#yourselector .inputs-your-css-selector:first-of-type").val() +"</button>")
          .append("<textarea>"+ $("#grabelmvalz .testsyourglobalcss:first-of-type").val() +"</textarea>")
          .append($("#yourselector .inputs-your-css-selector:first-of-type").clone())
          .append('<button class="adds-your-position" style="display:none;">'+ $("#drop .adds-your-position:first-of-type").val() +'</button>')
          .append('<button class="adds-your-position-top" style="display:none;">'+ $("#drop .adds-your-position-top:first-of-type").val() +'</button>')
          .append('<button class="adds-your-position-left" style="display:none;">'+ $("#drop .adds-your-position-left:first-of-type").val() +'</button>')
          .append('<button class="adds-your-position-right" style="display:none;">'+ $("#drop .adds-your-position-right:first-of-type").val() +'</button>')
          .append('<button class="adds-your-position-bottom" style="display:none;">'+ $("#drop .adds-your-position-bottom:first-of-type").val() +'</button>')
          .append('<button class="adds-your-width" style="display:none;">'+ $("#drop .adds-your-width:first-of-type").val() +'</button>')
          .append('<button class="adds-your-height" style="display:none;">'+ $("#drop .adds-your-height:first-of-type").val() +'</button>')
          .append('<button class="adds-your-margin" style="display:none;">'+ $("#drop .adds-your-margin-top:first-of-type").val() +'</button>')
          .append('<button class="adds-your-margin-top" style="display:none;">'+ $("#drop .adds-your-margin-top:first-of-type").val() +'</button>')
          .append('<button class="adds-your-margin-right" style="display:none;">'+ $("#drop .adds-your-margin-right:first-of-type").val() +'</button>')
          .append('<button class="adds-your-margin-bottom" style="display:none;">'+ $("#drop .adds-your-margin-bottom:first-of-type").val() +'</button>')
          .append('<button class="adds-your-margin-left" style="display:none;">'+ $("#drop .adds-your-margin-left:first-of-type").val() +'</button>')
          .append('<button class="adds-your-padding" style="display:none;">'+ $("#drop .adds-your-padding-top:first-of-type").val() +'</button>')
          .append('<button class="adds-your-padding-top" style="display:none;">'+ $("#drop .adds-your-padding-top:first-of-type").val() +'</button>')
          .append('<button class="adds-your-padding-right" style="display:none;">'+ $("#drop .adds-your-padding-right:first-of-type").val() +'</button>')
          .append('<button class="adds-your-padding-bottom" style="display:none;">'+ $("#drop .adds-your-padding-bottom:first-of-type").val() +'</button>')
          .append('<button class="adds-your-padding-left" style="display:none;">'+ $("#drop .adds-your-padding-left:first-of-type").val() +'</button>')
          
          .append('<button class="adds-your-background-image" style="display:none;">'+ $("#drop .adds-your-background-image:first-of-type").val() +'</button>')
          .append('<input type="text" class="adds-your-background-position" value="'+ $("#drop .adds-your-background-position:first-of-type").val() +'">')
          .append('<input type="text" class="adds-your-background-repeat" value="'+ $("#drop .adds-your-background-repeat:first-of-type").val() +'">')
          .append('<button class="adds-your-background-attachment" style="display:none;">'+ $("#drop .adds-your-background-attachment:first-of-type").val() +'</button>')
          .append('<button class="adds-your-background-size" style="display:none;">'+ $("#drop .adds-your-background-size:first-of-type").val() +'</button>')
          .append('<button class="adds-your-background-color" style="display:none;">'+ $("#drop .adds-your-background-color:first-of-type").val() +'</button>')
          .append('<button class="adds-your-box-shadow" style="display:none;">'+ $("#drop .adds-your-box-shadow:first-of-type").val() +'</button>')
          
          .append('<button class="adds-your-border-top" style="display:none;">'+ $("#drop .adds-your-border-top:first-of-type").val() +'</button>')
          .append('<button class="adds-your-border-left" style="display:none;">'+ $("#drop .adds-your-border-left:first-of-type").val() +'</button>')
          .append('<button class="adds-your-border-right" style="display:none;">'+ $("#drop .adds-your-border-right:first-of-type").val() +'</button>')
          .append('<button class="adds-your-border-bottom" style="display:none;">'+ $("#drop .adds-your-border-bottom:first-of-type").val() +'</button>')
          .append('<button class="adds-your-border-radius-top-left" style="display:none;">'+ $("#drop .adds-your-border-radius-top-left:first-of-type").val() +'</button>')
          .append('<button class="adds-your-border-radius-top-right" style="display:none;">'+ $("#drop .adds-your-border-radius-top-right:first-of-type").val() +'</button>')
          .append('<button class="adds-your-border-radius-bottom-left" style="display:none;">'+ $("#drop .adds-your-border-radius-bottom-left:first-of-type").val() +'</button>')
          .append('<button class="adds-your-border-radius-bottom-right" style="display:none;">'+ $("#drop .adds-your-border-radius-bottom-right:first-of-type").val() +'</button>')
          
          .append('<button class="adds-your-font-size" style="display:none;">'+ $("#drop .adds-your-font-size:first-of-type").val() +'</button>')
          .append('<button class="adds-your-font-color" style="display:none;">'+ $("#drop .adds-your-font-color:first-of-type").val() +'</button>')
          .append('<button class="adds-your-font-family" style="display:none;">'+ $("#drop .adds-your-font-family:first-of-type").val() +'</button>')
          .append('<input type="text" class="adds-your-font-varient" value="'+ $("#drop .adds-your-font-varient:first-of-type").val() +'">')
          .append('<input type="text" class="adds-your-font-style" value="'+ $("#drop .adds-your-font-style:first-of-type").val() +'">')
          .append('<button class="adds-your-font-weight" style="display:none;">'+ $("#drop .adds-your-font-weight:first-of-type").val() +'</button>')
          .append('<button class="adds-your-line-height" style="display:none;">'+ $("#drop .adds-your-line-height:first-of-type").val() +'</button>')
          .append('<button class="adds-your-letter-spacing" style="display:none;">'+ $("#drop .adds-your-letter-spacing:first-of-type").val() +'</button>')
          .append('<button class="adds-your-word-spacing" style="display:none;">'+ $("#drop .adds-your-word-spacing:first-of-type").val() +'</button>')
          .append('<input type="text" class="adds-your-text-transform" value="'+ $("#drop .adds-your-text-transform:first-of-type").val() +'">')
          .append('<button class="adds-your-text-decoration" style="display:none;">'+ $("#drop .adds-your-text-decoration:first-of-type").val() +'</button>')
          .append('<input type="text" class="adds-your-text-align" value="'+ $("#drop .adds-your-text-align:first-of-type").val() +'">')
          .append('<input type="text" class="adds-your-word-wrap" value="'+ $("#drop .adds-your-word-wrap:first-of-type").val() +'">')
          .append('<input type="text" class="adds-your-white-space" value="'+ $("#drop .adds-your-white-space:first-of-type").val() +'">')
          .append('<button class="adds-your-text-shadow" style="display:none;">'+ $("#drop .adds-your-text-shadow:first-of-type").val() +'</button>')
          
          .append('<input type="text" class="adds-your-display" value="'+ $("#drop .adds-your-display:first-of-type").val() +'">')
          .append('<input type="text" class="adds-your-overflow-x" value="'+ $("#drop .adds-your-overflow-x:first-of-type").val() +'">')
          .append('<input type="text" class="adds-your-overflow-y" value="'+ $("#drop .adds-your-overflow-y:first-of-type").val() +'">')
          .append('<button class="adds-your-opacity" style="display:none;">'+ $("#drop .adds-your-opacity:first-of-type").val() +'</button>')
          .append('<button class="adds-your-outline" style="display:none;">'+ $("#drop .adds-your-outline:first-of-type").val() +'</button>')
          .append('<input type="text" class="adds-your-resize" value="'+ $("#drop .adds-your-resize:first-of-type").val() +'">')
          .append('<input type="text" class="adds-your-float" value="'+ $("#drop .adds-your-float:first-of-type").val() +'">')
          .append('<button class="adds-your-z-index" style="display:none;">'+ $("#drop .adds-your-z-index:first-of-type").val() +'</button>')
          .append('<input type="text" class="adds-your-cursor" value="'+ $("#drop .adds-your-cursor:first-of-type").val() +'">')
          .append('<input type="text" class="adds-your-list-style" value="'+ $("#drop .adds-your-list-style:first-of-type").val() +'">')
          .append('<button class="adds-your-content-prop" style="display:none;">'+ $("#drop .adds-your-content-prop:first-of-type").val() +'</button>')
          .append('<input type="text" class="adds-your-vertical-align" value="'+ $("#drop .adds-your-vertical-align:first-of-type").val() +'">')
          .append('<button class="adds-your-transition" style="display:none;">'+ $("#drop .adds-your-transition:first-of-type").val() +'</button>')
          .append('<button class="adds-your-transform" style="display:none;">'+ $("#drop .adds-your-transform:first-of-type").val() +'</button>')
          .append('<button class="adds-your-filter" style="display:none;">'+ $("#drop .adds-your-filter:first-of-type").val() +'</button>')
        );
	  });
      
      // Can't add same value twice. Replace?
      var $cssselbtn = $("#to-global-css > .list-of-your-global-css-selectors-container button:contains(" + $("#yourselector .inputs-your-css-selector:first-of-type").val() + ")");
      if($cssselbtn.length > 1) {
        var x = window.confirm("Selector already exists. Want to replace it?");
        if (x) {
          $cssselbtn.first().parent().remove();
        } else {
          $cssselbtn.last().parent().remove();
          return false;
        }
      }
      
      // Grabs selector value
      GrabsAddedSelectors();
      
      $("#apply-test-code").html("<style type='text/css'>"+ $("#grabelmvalz .testsyourglobalcss:first-of-type").val() +"</style>");
      
      $("#fullrencode").val(function() {
        return $.map($("#to-global-css textarea"), function (el) {
          return el.value;
        }).join('\n');
      });
      $("#apply-full-code").html("<style type='text/css'>"+ $("#fullrencode").val() +"</style>");
      
      // Delete an added selector
      RemovesAddedSelectors();
      
      // Clear element values after add
      $("#yourselector .inputs-your-css-selector").val("");
      $("#select-mode #drop").find("input[type=text], input[type=number], select").val("");
      $("#select-mode #drop").find("a").removeClass("imanactiveachornowyay");

      PrevStyles();
      FinalizePrev();
      MoveSelectedElement();
      localStorage.setItem('CSSSelectorsHTML', $("#to-global-css").html());
      localStorage.setItem('CSSSelectors', $("#fullrencode").val());
    }
  });
  $("#yourselector .inputs-your-css-selector").on('keydown', function(e) {
    // If selector textbox is focused. We trigger [Enter] to add the selector
    if ( e.which === 13 ) {
      $(".adds-your-css-selector").trigger('click');
    }
  });
  
  // Adds Media Queries
  $("#add-media-query").on('click', function() {
    FinalizePrev();
    
    // Append the styles
    if ($("#select-tool.myfukentoolisactivebiotch").is(':visible')) {
      $("#hold-media-queries").append($("<textarea class='canvesquery'>")
                                .val($(".canves").children().removeAttr("id").parent().html())
                              ).append($("<textarea class='globalcssquery'>")
                                .val($("#to-global-css").html())
                              )
      .append("<div class='listing-of-your-media-queries-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a><button>"+ $("#cwidth").val() +"px</button></div>").append("<textarea class='"+ $("#cwidth").val() +"-addedcss yournewlyaddedmediaquery'>"+ "@media all and (max-width:"+ $("#cwidth").val() +"px) {\n" + $("#style-sheet").val().replace(/id=stylethis /g,'') + "\n\n" + $("#fullrencode").val() +"}\n</textarea>");
    } else {
      $("#hold-media-queries").append($("<textarea class='canvesquery'>")
                                .val($(".canves").children().removeAttr("id").parent().html())
                              ).append($("<textarea class='globalcssquery'>")
                                .val($("#to-global-css").html())
                              )
      .append("<div class='listing-of-your-media-queries-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a><button>"+ $("#cwidth").val() +"px</button></div>").append("<textarea class='"+ $("#cwidth").val() +"-addedcss yournewlyaddedmediaquery'>"+ "@media all and (max-width:"+ $("#cwidth").val() +"px) {\n" + $("#style-sheet").val() + "\n\n" + $("#fullrencode").val() +"}\n</textarea>");
    }
    
    var $button = $("#hold-media-queries > .listing-of-your-media-queries-container button:contains(" + $("#cwidth").val() + ")");
    if($button.length > 1) {
      var x = window.confirm("Query already exists. Want to replace it?");
      if (x) {
        $button.first().parent().remove();
      } else {
        $button.last().parent().remove();
        return false;
      }
    }
    
    // Join other queries
    $("#youraddedmediaqueries").val(function() {
      return $.map($('#hold-media-queries textarea.yournewlyaddedmediaquery'), function (el) {
        return el.value;
      }).join('\n');
    });
    
    FinalizePrev();
    localStorage.setItem('MQuery', $("#hold-media-queries").html());
    localStorage.setItem('MQueryHTMLGlobalVALS', $("#hold-media-queries textarea.globalcssquery").val());
    localStorage.setItem('MQueryHTMLVALS', $("#hold-media-queries textarea.canvesquery").val());
    localStorage.setItem('CSSSelectorsHTML', $("#to-global-css").html());
    localStorage.setItem('CSSSelectors', $("#fullrencode").val());
    
    // Grab/Delete Media Queries
    GrabsQueryOnclick();
    DelQueryOnclick();
    // Handles Global Styles
    GrabsAddedSelectors();
    RemovesAddedSelectors();
    if ($("#select-tool.myfukentoolisactivebiotch").is(':visible')) {
      $("#select-tool.myfukentoolisactivebiotch").trigger("click");
    }
  });
  
  // Handles New and Save Documents
  $("#new-doc").on('click', function() {
    $("#menu").hide();
    var x = window.confirm("Are you sure you wish to start a new project?\nAll your changes will not be saved. ")
    if (x) {
      ClearInputs();
      $("#apply-test-code, #apply-full-code, #to-global-css, .dadamcssreflist, .dadamcssrefhtml, .list-of-css-references, .canves, #apply-js-sources, .list-of-js-source").html("");
      $("#hold-media-queries").html('<div class="dadammediaqueryshtml hide"></div>');
      $(".testsyourglobalcss, #fullrencode, #resolutionoptimzer, #allyourjssources, .add-js-source-val, #js-code").val("");
      $(".thisisyourdocumenttitle").val("new document");
      $("#ljavascript").prop('checked', false).trigger('change');
      $("#cwidth").attr('max', $("#itsthecavnescontainerbro").width()).val($("#itsthecavnescontainerbro").width());
      $("#resolutionoptimzer").val($("#cwidth").width() + "px").trigger("change");
      if ($(".myfukentoolisactivebiotch").is(":visible")) {
        $("#select-tool").trigger('click');
      }

      localStorage.setItem('SiteTitle', $(".thisisyourdocumenttitle").val());
      localStorage.setItem('CSSRefer', $(".add-css-refer-val").val());
      localStorage.setItem('JSCode', $("#js-code").val());
      localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      localStorage.setItem('CSSReferencesList', $(".list-of-css-references").html());
      localStorage.setItem('CSSSelectors', $("#fullrencode").val());
      localStorage.setItem('CSSSelectorsHTML', $("#to-global-css").html());
      localStorage.setItem('MQuery', $("#hold-media-queries").html());
      localStorage.setItem('CanvesContent', $(".canves").html());
    } else {
      return false;
    }
  });
  $("#export-your-html").on('click', function() {
    $("#menu").hide();
    FinalizePrev();
    if ($("#select-tool.myfukentoolisactivebiotch").is(':visible')) {
      $("#select-tool.myfukentoolisactivebiotch").trigger("click;");
      var x = window.confirm("Are you sure you wish to save?")
      if (x) {
        saveTextAsHTML();
      } else {
        return false;
      }
    } else {
      var x = window.confirm("Are you sure you wish to save?")
      if (x) {
        saveTextAsHTML();
      } else {
        return false;
      }
    }
  });
  
  // Handles starter properties
  $(function() {
    // Updates Page Title to Document Name
    $(".thisisyourdocumenttitle").on('keyup', function() {
      document.title = $(this).val();
      $('#mirror-title').text( $(this).val() );
      localStorage.setItem('SiteTitle', $(this).val());
    });

    // Resolution Optimizer
    $("#resolutionoptimzer").on('keyup', function() {
      $(".canves").css({ 'width': $(this).val() });
      $("#cwidth").attr('max', $(".canves").width()).val($(".canves").width());
      if ( $(this).val() === "" ) {
        $(".canves").css({ 'width': $("#itsthecavnescontainerbro").width() });
        $('#cwidth').attr('max', $('.canves').width()).val($('.canves, #workflow').width());
      }
    });
    
    // Web Browser
    $(function() {
      $("#browseweb-back").on('click', function() {
        history.back();
      });
      $("#browseweb-forward").on('click', function() {
        history.forward();
      });
      $("#browseweb").on('keyup', function() {
        if ($(this).val() === "") {
          $("#toggle-workflow-visibility").prop('checked', false).trigger('click');
          $("#workflow").removeAttr('src');
          FinalizePrev();
        } else {
          $("#toggle-workflow-visibility").prop('checked', false).trigger('click');
          $("#workflow").prop('src', "http://" + $(this).val());
        }
      });
    });
    
    // Adds CSS Link References
    $(".add-css-refer-val").on('keyup change', function() {
      localStorage.setItem('CSSRefer', $(this).val());
    });
    $(".add-css-refer").on('click', function() {
      var $val = $(".add-css-refer-val").val();
      
      if ( $val === "" ) {
        alert("Add reference denied because value is blank.");
      } else if ($.inArray($val.toLowerCase(), ["normalize"]) > -1) {
        $(".list-of-css-references").append("<div class='list-of-css-references-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://necolas.github.io/normalize.css/3.0.1/normalize.css</button>"+ "<pre style='text-align:left; padding-top:5px; overflow:auto;'>"+ "<link href='http://necolas.github.io/normalize.css/3.0.1/normalize.css' rel='stylesheet' type='text/css'></pre>" +"</div>");
      
        $(".dadamcssreflist").val("");
        $(".dadamcssrefhtml").html("").html( $(".list-of-css-references").html() );
        $(".dadamcssrefhtml textarea, .dadamcssrefhtml a, .dadamcssrefhtml button").remove();
        $(".dadamcssreflist").val( $('.dadamcssrefhtml').html().replace(/<\/?/g,'').replace(/div class="dadamcssrefhtml hide">/g,'').replace(/div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/pre>div>/g,'').replace(/ }div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/ }/g,'').replace(/pre>/g,'').replace(/div>/g,'').replace(/link href="/g,'<link href="').replace(/css">/g,'css">\n') );
        $(".add-css-refer-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('CSSReferencesList', $(".list-of-css-references").html());
      } else if ($.inArray($val.toLowerCase(), ["purecss"]) > -1) {
        $(".list-of-css-references").append("<div class='list-of-css-references-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://yui.yahooapis.com/pure/0.3.0/pure-min.css</button>"+ "<pre style='text-align:left; padding-top:5px; overflow:auto;'>"+ "<link href='http://yui.yahooapis.com/pure/0.3.0/pure-min.css' rel='stylesheet' type='text/css'></pre>" +"</div>");
      
        $(".dadamcssreflist").val("");
        $(".dadamcssrefhtml").html("").html( $(".list-of-css-references").html() );
        $(".dadamcssrefhtml textarea, .dadamcssrefhtml a, .dadamcssrefhtml button").remove();
        $(".dadamcssreflist").val( $('.dadamcssrefhtml').html().replace(/<\/?/g,'').replace(/div class="dadamcssrefhtml hide">/g,'').replace(/div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/pre>div>/g,'').replace(/ }div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/ }/g,'').replace(/pre>/g,'').replace(/div>/g,'').replace(/link href="/g,'<link href="').replace(/css">/g,'css">\n') );
        $(".add-css-refer-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('CSSReferencesList', $(".list-of-css-references").html());
      } else if ($.inArray($val.toLowerCase(), ["semantic ui", "semanticui"]) > -1) {
        $(".list-of-css-references").append("<div class='list-of-css-references-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://semantic-ui.com/build/packaged/css/semantic.min.css</button>"+ "<pre style='text-align:left; padding-top:5px; overflow:auto;'>"+ "<link href='http://semantic-ui.com/build/packaged/css/semantic.min.css' rel='stylesheet' type='text/css'></pre>" +"</div>");
      
        $(".dadamcssreflist").val("");
        $(".dadamcssrefhtml").html("").html( $(".list-of-css-references").html() );
        $(".dadamcssrefhtml textarea, .dadamcssrefhtml a, .dadamcssrefhtml button").remove();
        $(".dadamcssreflist").val( $('.dadamcssrefhtml').html().replace(/<\/?/g,'').replace(/div class="dadamcssrefhtml hide">/g,'').replace(/div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/pre>div>/g,'').replace(/ }div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/ }/g,'').replace(/pre>/g,'').replace(/div>/g,'').replace(/link href="/g,'<link href="').replace(/css">/g,'css">\n') );
        $(".add-css-refer-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('CSSReferencesList', $(".list-of-css-references").html());
      } else if ($.inArray($val.toLowerCase(), ["hover.css", "hover"]) > -1) {
        $(".list-of-css-references").append("<div class='list-of-css-references-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://ianlunn.github.io/Hover/css/hover.css</button>"+ "<pre style='text-align:left; padding-top:5px; overflow:auto;'>"+ "<link href='http://ianlunn.github.io/Hover/css/hover.css' rel='stylesheet' type='text/css'></pre>" +"</div>");
      
        $(".dadamcssreflist").val("");
        $(".dadamcssrefhtml").html("").html( $(".list-of-css-references").html() );
        $(".dadamcssrefhtml textarea, .dadamcssrefhtml a, .dadamcssrefhtml button").remove();
        $(".dadamcssreflist").val( $('.dadamcssrefhtml').html().replace(/<\/?/g,'').replace(/div class="dadamcssrefhtml hide">/g,'').replace(/div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/pre>div>/g,'').replace(/ }div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/ }/g,'').replace(/pre>/g,'').replace(/div>/g,'').replace(/link href="/g,'<link href="').replace(/css">/g,'css">\n') );
        $(".add-css-refer-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('CSSReferencesList', $(".list-of-css-references").html());
      } else if ($.inArray($val.toLowerCase(), ["animate.css", "animate"]) > -1) {
        $(".list-of-css-references").append("<div class='list-of-css-references-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>https://raw.github.com/daneden/animate.css/master/animate.css</button>"+ "<pre style='text-align:left; padding-top:5px; overflow:auto;'>"+ "<link href='https://raw.github.com/daneden/animate.css/master/animate.css' rel='stylesheet' type='text/css'></pre>" +"</div>");
      
        $(".dadamcssreflist").val("");
        $(".dadamcssrefhtml").html("").html( $(".list-of-css-references").html() );
        $(".dadamcssrefhtml textarea, .dadamcssrefhtml a, .dadamcssrefhtml button").remove();
        $(".dadamcssreflist").val( $('.dadamcssrefhtml').html().replace(/<\/?/g,'').replace(/div class="dadamcssrefhtml hide">/g,'').replace(/div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/pre>div>/g,'').replace(/ }div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/ }/g,'').replace(/pre>/g,'').replace(/div>/g,'').replace(/link href="/g,'<link href="').replace(/css">/g,'css">\n') );
        $(".add-css-refer-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('CSSReferencesList', $(".list-of-css-references").html());
      } else {
        $(".list-of-css-references").append("<div class='list-of-css-references-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>"+ $(".add-css-refer-val").val() +"</button>"+ "<pre style='text-align:left; padding-top:5px; overflow:auto;'>"+ "<link href='"+ $(".add-css-refer-val").val() +"' rel='stylesheet' type='text/css'></pre>" +"</div>");
      
        $(".dadamcssreflist").val("");
        $(".dadamcssrefhtml").html("").html( $(".list-of-css-references").html() );
        $(".dadamcssrefhtml textarea, .dadamcssrefhtml a, .dadamcssrefhtml button").remove();
        $(".dadamcssreflist").val( $('.dadamcssrefhtml').html().replace(/<\/?/g,'').replace(/div class="dadamcssrefhtml hide">/g,'').replace(/div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/pre>div>/g,'').replace(/ }div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/ }/g,'').replace(/pre>/g,'').replace(/div>/g,'').replace(/link href="/g,'<link href="').replace(/css">/g,'css">\n') );
        $(".add-css-refer-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('CSSReferencesList', $(".list-of-css-references").html());
      }
      
      $(".list-of-css-references-container button").on('click', function() {
        $(".add-css-refer-val").val($(this).text()).trigger('change');
      });
      $(".list-of-css-references-container a").on('click', function() {
        $(this).parent().remove();
        $(".dadamcssreflist").val("");
        $(".dadamcssrefhtml").html("").html( $(".list-of-css-references").html() );
        $(".dadamcssrefhtml textarea, .dadamcssrefhtml a, .dadamcssrefhtml button").remove();
        $(".dadamcssreflist").val( $('.dadamcssrefhtml').html().replace(/<\/?/g,'').replace(/div class="dadamcssrefhtml hide">/g,'').replace(/div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/pre>div>/g,'').replace(/ }div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/ }/g,'').replace(/pre>/g,'').replace(/div>/g,'').replace(/link href="/g,'<link href="').replace(/css">/g,'css">\n') );
        FinalizePrev();
        localStorage.setItem('CSSReferencesList', $(".list-of-css-references").html());
      });
    });
    
    // Adds JS Sources
    $(".add-js-source-val").on('keyup change', function() {
      localStorage.setItem('JSSource', $(this).val());
    });
    $(".add-js-source").on('click', function() {
      var $val = $(".add-js-source-val").val();
      
      if ( $val === "" ) {
        alert("Add source denied because value is blank.");
      } else if ($.inArray($val.toLowerCase(), ["angularjs"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["backbone", "backbonejs"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://documentcloud.github.io/backbone/backbone-min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://documentcloud.github.io/backbone/backbone-min.js'&gt;&lt;/script&gt;</pre>" +"</div>").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://documentcloud.github.io/underscore/underscore-min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://documentcloud.github.io/underscore/underscore-min.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["bootstrap"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://code.jquery.com/jquery.min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://code.jquery.com/jquery.min.js'&gt;&lt;/script&gt;</pre>" +"</div>").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://getbootstrap.com/dist/js/bootstrap.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://getbootstrap.com/dist/js/bootstrap.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $(".add-css-refer-val").val("http://getbootstrap.com/dist/css/bootstrap.css");
        $(".add-css-refer").trigger('click');
        $(".add-js-source-val").val("").trigger('change');
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["createjs"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://code.createjs.com/createjs-2013.09.25.min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://code.createjs.com/createjs-2013.09.25.min.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["chartjs"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://cdnjs.cloudflare.com/ajax/libs/Chart.js/0.2.0/Chart.min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://cdnjs.cloudflare.com/ajax/libs/Chart.js/0.2.0/Chart.min.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["d3"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://d3js.org/d3.v3.min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://d3js.org/d3.v3.min.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["dojo"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://ajax.googleapis.com/ajax/libs/dojo/1/dojo/dojo.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/dojo/1/dojo/dojo.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["ember"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://builds.emberjs.com/tags/v1.1.2/ember.min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://builds.emberjs.com/tags/v1.1.2/ember.min.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["enyojs"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://nightly.enyojs.com/latest/enyo/enyo.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://nightly.enyojs.com/latest/enyo/enyo.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["extjs"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://cdn.sencha.io/ext-4.2.0-gpl/ext-all.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://cdn.sencha.io/ext-4.2.0-gpl/ext-all.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["fabricjs"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.3.0/fabric.min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.3.0/fabric.min.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["jquery"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://code.jquery.com/jquery-latest.min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://code.jquery.com/jquery-latest.min.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["jqui"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://code.jquery.com/jquery-latest.min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://code.jquery.com/jquery-latest.min.js'&gt;&lt;/script&gt;</pre>" +"</div>").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.min.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $(".add-css-refer-val").val("http://ajax.googleapis.com/ajax/libs/jqueryui/1/themes/smoothness/jquery-ui.css");
        $(".add-css-refer").trigger('click');
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["jqtools"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://cdn.jquerytools.org/1.2.7/full/jquery.tools.min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://cdn.jquerytools.org/1.2.7/full/jquery.tools.min.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["kineticjs"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v4.7.3.min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://d3lp1msu2r81bx.cloudfront.net/kjs/js/lib/kinetic-v4.7.3.min.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["knockoutjs"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://knockoutjs.com/downloads/knockout-3.0.0.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://knockoutjs.com/downloads/knockout-3.0.0.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["modernizr"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://modernizr.com/downloads/modernizr-latest.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://modernizr.com/downloads/modernizr-latest.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["mootools"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://ajax.googleapis.com/ajax/libs/mootools/1/mootools-yui-compressed.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/mootools/1/mootools-yui-compressed.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["paperjs"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://cdnjs.cloudflare.com/ajax/libs/paper.js/0.9.9/paper.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://cdnjs.cloudflare.com/ajax/libs/paper.js/0.9.9/paper.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["processingjs"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://cloud.github.com/downloads/processing-js/processing-js/processing-1.4.1.min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://cloud.github.com/downloads/processing-js/processing-js/processing-1.4.1.min.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["prototypejs"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://ajax.googleapis.com/ajax/libs/prototype/1/prototype.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/prototype/1/prototype.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["qooxdoo"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://demo.qooxdoo.org/3.0.1/framework/q-3.0.1.min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://demo.qooxdoo.org/3.0.1/framework/q-3.0.1.min.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["raphaeljs"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["script.aculo.us", "script aculous", "scriptaculous"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://ajax.googleapis.com/ajax/libs/scriptaculous/1/scriptaculous.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/scriptaculous/1/scriptaculous.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["snapsvg"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://snapsvg.io/assets/js/snap.svg-min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://snapsvg.io/assets/js/snap.svg-min.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["svgjs"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>https://raw.github.com/wout/svg.js/master/dist/svg.min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='https://raw.github.com/wout/svg.js/master/dist/svg.min.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["threejs"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://threejs.org/build/three.min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://threejs.org/build/three.min.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["underscorejs"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://underscorejs.org/underscore-min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://underscorejs.org/underscore-min.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["webfontloader"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://ajax.googleapis.com/ajax/libs/webfont/1.4.10/webfont.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://ajax.googleapis.com/ajax/libs/webfont/1.4.10/webfont.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["yui"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://yui.yahooapis.com/3.13.0/build/yui/yui-min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://yui.yahooapis.com/3.13.0/build/yui/yui-min.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else if ($.inArray($val.toLowerCase(), ["zepto"]) > -1) {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>http://zeptojs.com/zepto.min.js</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='http://zeptojs.com/zepto.min.js'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      } else {
        $(".list-of-js-source").append("<div class='list-of-js-sources-container'><a href='javascript:void(0)'><span class='fa fa-times'></span></a> <button>"+ $val +"</button>"+ "<pre>"+ "&lt;script type='text/javascript' src='"+ $val +"'&gt;&lt;/script&gt;</pre>" +"</div>");
        
        $("#apply-js-sources").html($("#allyourjssources").val());
        $("#allyourjssources").val($(".list-of-js-source pre").text().replace(/<\/?/g,'').replace(/script /g,'&lt;script ').replace(/script>/g,'&lt;/script&gt;\n').replace(/'>/g,"'&gt;"));
        
        $(".add-js-source-val").val("").trigger('change');
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      }
      
      $(".list-of-js-sources-container button").on('click', function() {
        $(".add-js-source-val").val("").val($(this).text()).trigger('change');
      });
      $(".list-of-js-sources-container a").on('click', function() {
        $(this).parent().remove();
        FinalizePrev();
        localStorage.setItem('JSSourceList', $(".list-of-js-source").html());
      });
    });
    
    // Handles JS Debugger
    $("#ljavascript").on('change', function() {
      if ( $("#ljavascript").prop('checked') === true ) {
        if ( $("#debug-indicator").text() === "off" ) {
          // we leave this blank so live debug only works when button says on...
          $("#js-yes-no").html('\n' + $("#allyourjssources").val() + '\n&lt;script type="text/javascript"&gt;\n' + $("#js-code").val() + '\n&lt;/script&gt;');
          FinalizePrev();
        } else {
          $("#js-yes-no").html('\n' + $("#allyourjssources").val() + '\n&lt;script type="text/javascript"&gt;\n' + $("#js-code").val() + '\n&lt;/script&gt;');
          $("#yourjs").html("<script type='text/javascript'>" + $("#js-code").val() + "</script>");
          FinalizePrev();
        }
        $("#js-code").removeAttr("disabled");
        FinalizePrev();
      }
      if ( $('#ljavascript').prop('checked') === false ) {
        $('#js-yes-no, #yourjs').html("");
        $('#js-code').attr('disabled', true);
        FinalizePrev();
      }
    });
    $("#jscodeautodebug").on('click', function() {
      if ( $("#debug-indicator").text() === "on" ) {
        if ( $("#ljavascript").prop('checked') === false ) {
          $("#ljavascript").trigger('click');
        }
        $("#debug-indicator").removeClass("dadebugindicatoron").addClass("dadebugindicatoroff").text("off");
      } else {
        if ( $("#ljavascript").prop('checked') === false ) {
          $("#ljavascript").trigger('click');
        }
        $("#debug-indicator").removeClass("dadebugindicatoroff").addClass("dadebugindicatoron").text("on");
        $("#js-yes-no").html('\n' + $("#allyourjssources").val() + '\n&lt;script type="text/javascript"&gt;\n' + $("#js-code").val() + '\n&lt;/script&gt;');
        $("#yourjs").html("<script type='text/javascript'>" + $("#js-code").val() + "</script>");
      }
    });
    $("#js-code").on('keyup change', function() {
      if ( $("#debug-indicator").text() === "off" ) {
        // we leave this blank so live debug only works when button says on...
        $("#js-yes-no").html('\n' + $("#allyourjssources").val() + '\n&lt;script type="text/javascript"&gt;\n' + $("#js-code").val() + '\n&lt;/script&gt;');
        FinalizePrev();
        localStorage.setItem('JSCode', $("#js-code").val());
      } else {
        if ( $("#ljavascript").prop('checked') === true ) {
          if ( $("#debug-indicator").text() === "off" ) {
            // we leave this blank so live debug only works when button says on...
            $("#js-yes-no").html('\n' + $("#allyourjssources").val() + '\n&lt;script type="text/javascript"&gt;\n' + $("#js-code").val() + '\n&lt;/script&gt;');
            FinalizePrev();
          } else {
            $("#js-yes-no").html('\n' + $("#allyourjssources").val() + '\n&lt;script type="text/javascript"&gt;\n' + $("#js-code").val() + '\n&lt;/script&gt;');
            $("#yourjs").html("<script type='text/javascript'>" + $("#js-code").val() + "</script>");
            FinalizePrev();
          }
          $("#js-code").removeAttr("disabled");
          FinalizePrev();
        }
        if ( $('#ljavascript').prop('checked') === false ) {
          $('#js-yes-no, #yourjs').html("");
          $('#js-code').attr('disabled', true);
          FinalizePrev();
        }
      }
    });
    // Handles Characters Click To Go To Text Editor
    $(function() {
      $('#tabindent').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "  " + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 2;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym1').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "<" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym2').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + ">" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym3').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "{" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym4').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "}" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym5').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + '"' + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym6').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "'" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym7').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "." + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym8').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "," + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym9').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "+" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym10').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "-" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym11').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "(" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym12').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + ")" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym13').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + ":" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym14').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + ";" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym15').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "_" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym16').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "[" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym17').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "]" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym18').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "|" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym19').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "/" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym20').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "?" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym21').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "*" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym22').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "&" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym23').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "%" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym24').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "$" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym25').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "&cent;" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 6;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym26').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "&pound;" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 7;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym27').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "&yen;" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 5;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym28').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "&euro;" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 6;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym29').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "@" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym30').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "=" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym31').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "#" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym32').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "!" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym33').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "^" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 1;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym34').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "$copy;" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 6;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym35').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "&reg;" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 5;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#charsym36').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "&trade;" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 7;
        $('#js-code').trigger('change').focus();
        return false;
      });
      $('#addyourfunctiontxt').click(function() {	
        var start = $('#js-code').get(0).selectionStart;
        $('#js-code').val($('#js-code').val().substring(0, start) + "function() {}" + $('#js-code').val().substring($('#js-code').get(0).selectionEnd));
        $('#js-code').get(0).selectionStart = $('#js-code').get(0).selectionEnd = start + 13;
        $('#js-code').trigger('change').focus();
        return false;
      });
    });
    // Using <TAB> Spaces
    $("#js-code").keydown(function(e) {
      if(e.keyCode == 9) {
        var start = $(this).get(0).selectionStart;
        $(this).val($(this).val().substring(0, start) + "  " + $(this).val().substring($(this).get(0).selectionEnd));
        $(this).get(0).selectionStart = $(this).get(0).selectionEnd = start + 2;
        return false;
      }
    });
    $("#notepad").on('keyup', function() {
      localStorage.setItem('Notepad', $("#notepad").val());
    });
    
    // Handles Dropdowns
    $("#toolbox header").on('click', function(e) {
      if(e.target === this) {
        $(this).toggleClass("activedrop").next().toggle();
      }
    });

  });
  
  // Toggle Design & Option Panel Visibility
  $('#toggle-workflow-visibility').on('change', function(){
    if ($(this).prop('checked') === true ) {
      $("#preview-pane, #starter-properties").show();
      $(".canves, #select-properties").hide();
    
      if ($('.myfukentoolisactivebiotch').is(':visible')) {
        $('.myfukentoolisactivebiotch').trigger('click');
      }
      
      FinalizePrev();
    }
    if ($(this).prop('checked') === false ) {
      $(".canves, #starter-properties").show();
      $("#preview-pane, #select-properties").hide();
      
      FinalizePrev();
    }
  });
  
  // Handles Color Pickers
  $(function() {
    // Color Picker
    $(function() {
      var FontColorPick = function() {
        if ( $(".colorpick-a-text").val() === "1" ) {
          $(".adds-your-font-color").val( "hsl(" + $(".colorpick-hue-text").val() + ", " + $(".colorpick-s-text").val() + ", " + $(".colorpick-l-text").val() + ")");
        } else {
          $(".adds-your-font-color").val( "hsla(" + $(".colorpick-hue-text").val() + ", " + $(".colorpick-s-text").val() + ", " + $(".colorpick-l-text").val() + ", " + $(".colorpick-a-text").val() + ")");
        }
        if ( $(".colorpick-a-text").val() === "0" ) {
          $(".adds-your-font-color").val("transparent");
        }
        
        // Alpha Saturation
        $(".colorpick-s-bg").css({
          "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".colorpick-hue").val() + "," + $(".colorpick-s").val() + "%," + $(".colorpick-l").val() + "%)" + " 100%)"
        });
        // Alpha Lightness
        $(".colorpick-l-bg").css({
          "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".colorpick-hue").val() + "," + $(".colorpick-s").val() + "%,50%) 50%,#ffffff 100%)"
        });
        // Alpha Preview
        $(".colorpick-a-bg").css({
          "background": "linear-gradient(to right, rgba(255,255,255,0) 0%," + "hsl(" + $(".colorpick-hue").val() + "," + $(".colorpick-s").val() + "%," + $(".colorpick-l").val() + "%)" + " 100%)"
        });
        PrevStyles();
        $("#stylethis").css({
          "color": $("#drop .adds-your-font-color").val()
        });
        localStorage.setItem('CanvesContent', $(".canves").html());
      };
      
      $(".adds-your-font-color").on('mousedown touchstart focus', function(e) {
        $("#yourcolor-properties").show();
        $(".yourcolor-properties").css({
          'position': 'absolute',
          'margin-top': "-" + $(".yourcolor-properties").height(),
          'left': "auto",
          'right': "20px",
          'width': "80%"
        }).show();
      });
      
      // Setup Hue
      $(".colorpick-hue-text").val( $(".colorpick-hue").val() );
      $(".colorpick-hue").on('change', function() {
        $(".colorpick-hue-text").val( $(this).val() );
        FontColorPick();
      });
      $(".colorpick-hue-text").on('keyup change', function() {
        $(".colorpick-hue").val( $(this).val() );
      });
      // Setup Saturation
      $(".colorpick-s-text").val( $(".colorpick-s").val() + "%" );
      $(".colorpick-s").on('change', function() {
        $(".colorpick-s-text").val( $(this).val() + "%" );
        FontColorPick();
      });
      $(".colorpick-s-text").on('keyup change', function() {
        $(".colorpick-s").val( $(this).val() );
      });
      // Setup Lightness
      $(".colorpick-l-text").val( $(".colorpick-l").val() + "%" );
      $(".colorpick-l").on('change', function() {
        $(".colorpick-l-text").val( $(this).val() + "%" );
        FontColorPick();
      });
      $(".colorpick-l-text").on('keyup change', function() {
        $(".colorpick-l").val( $(this).val() );
      });
      // Setup Alpha
      $(".colorpick-a-text").val( $(".colorpick-a").val() );
      $(".colorpick-a").on('change', function() {
        $(".colorpick-a-text").val( $(this).val() );
        FontColorPick();
      });
      // Alpha Saturation
      $(".colorpick-s-bg").css({
        "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".colorpick-hue").val() + "," + $(".colorpick-s").val() + "%," + $(".colorpick-l").val() + "%)" + " 100%)"
      });
      // Alpha Lightness
      $(".colorpick-l-bg").css({
        "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".colorpick-hue").val() + "," + $(".colorpick-s").val() + "%,50%) 50%,#ffffff 100%)"
      });
      // Alpha Preview
      $(".colorpick-a-bg").css({
        "background": "linear-gradient(to right, rgba(255,255,255,0) 0%," + "hsl(" + $(".colorpick-hue").val() + "," + $(".colorpick-s").val() + "%," + $(".colorpick-l").val() + "%)" + " 100%)"
      });
      $(".colorpick-a-text").on('keyup change', function() {
        $(".colorpick-a").val( $(this).val() );
      });
    });
    // Background Color Picker
    $(function() {
      var BGColorPick = function() {
        if ( $(".bgcolorpick-a-text").val() === "1" ) {
          $(".adds-your-background-color").val( "hsl(" + $(".bgcolorpick-hue-text").val() + ", " + $(".bgcolorpick-s-text").val() + ", " + $(".bgcolorpick-l-text").val() + ")");
        } else {
          $(".adds-your-background-color").val( "hsla(" + $(".bgcolorpick-hue-text").val() + ", " + $(".bgcolorpick-s-text").val() + ", " + $(".bgcolorpick-l-text").val() + ", " + $(".bgcolorpick-a-text").val() + ")");
        }
        if ( $(".bgcolorpick-a-text").val() === "0" ) {
          $(".adds-your-background-color").val("transparent");
        }
        
        // Alpha Saturation
        $(".bgcolorpick-s-bg").css({
          "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".bgcolorpick-hue").val() + "," + $(".bgcolorpick-s").val() + "%," + $(".bgcolorpick-l").val() + "%)" + " 100%)"
        });
        // Alpha Lightness
        $(".bgcolorpick-l-bg").css({
          "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".bgcolorpick-hue").val() + "," + $(".bgcolorpick-s").val() + "%,50%) 50%,#ffffff 100%)"
        });
        // Alpha Preview
        $(".bgcolorpick-a-bg").css({
          "background": "linear-gradient(to right, rgba(255,255,255,0) 0%," + "hsl(" + $(".bgcolorpick-hue").val() + "," + $(".bgcolorpick-s").val() + "%," + $(".bgcolorpick-l").val() + "%)" + " 100%)"
        });
        PrevStyles();
        $("#stylethis").css({
          "background-color": $("#drop .adds-your-background-color").val()
        });
        localStorage.setItem('CanvesContent', $(".canves").html());
      };
      
      $(".adds-your-background-color").on('mousedown touchstart focus', function(e) {
        $("#yourbgcolor-properties").show();
        $(".yourbgcolor-properties").css({
          'position': 'absolute',
          'margin-top': "-" + $(".yourbgcolor-properties").height(),
          'left': "auto",
          'right': "20px",
          'width': "80%"
        }).show();
      });
      
      // Setup Hue
      $(".bgcolorpick-hue-text").val( $(".bgcolorpick-hue").val() );
      $(".bgcolorpick-hue").on('change', function() {
        $(".bgcolorpick-hue-text").val( $(this).val() );
        BGColorPick();
      });
      $(".bgcolorpick-hue-text").on('keyup change', function() {
        $(".bgcolorpick-hue").val( $(this).val() );
      });
      // Setup Saturation
      $(".bgcolorpick-s-text").val( $(".bgcolorpick-s").val() + "%" );
      $(".bgcolorpick-s").on('change', function() {
        $(".bgcolorpick-s-text").val( $(this).val() + "%" );
        BGColorPick();
      });
      $(".bgcolorpick-s-text").on('keyup change', function() {
        $(".bgcolorpick-s").val( $(this).val() );
      });
      // Setup Lightness
      $(".bgcolorpick-l-text").val( $(".bgcolorpick-l").val() + "%" );
      $(".bgcolorpick-l").on('change', function() {
        $(".bgcolorpick-l-text").val( $(this).val() + "%" );
        BGColorPick();
      });
      $(".bgcolorpick-l-text").on('keyup change', function() {
        $(".bgcolorpick-l").val( $(this).val() );
      });
      // Setup Alpha
      $(".bgcolorpick-a-text").val( $(".bgcolorpick-a").val() );
      $(".bgcolorpick-a").on('change', function() {
        $(".bgcolorpick-a-text").val( $(this).val() );
        BGColorPick();
      });
      // Alpha Saturation
      $(".bgcolorpick-s-bg").css({
        "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".bgcolorpick-hue").val() + "," + $(".bgcolorpick-s").val() + "%," + $(".bgcolorpick-l").val() + "%)" + " 100%)"
      });
      // Alpha Lightness
      $(".bgcolorpick-l-bg").css({
        "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".bgcolorpick-hue").val() + "," + $(".bgcolorpick-s").val() + "%,50%) 50%,#ffffff 100%)"
      });
      // Alpha Preview
      $(".bgcolorpick-a-bg").css({
        "background": "linear-gradient(to right, rgba(255,255,255,0) 0%," + "hsl(" + $(".bgcolorpick-hue").val() + "," + $(".bgcolorpick-s").val() + "%," + $(".bgcolorpick-l").val() + "%)" + " 100%)"
      });
      $(".bgcolorpick-a-text").on('keyup change', function() {
        $(".bgcolorpick-a").val( $(this).val() );
      });
    });
    // Border-Top Color Picker
    $(function() {
      var CallBorderTopColor = function() {
        if ( $(".bordertopcolorpick-a-text").val() === "1" ) {
          $(".bordertopcolor").val( "hsl(" + $(".bordertopcolorpick-hue-text").val() + ", " + $(".bordertopcolorpick-s-text").val() + ", " + $(".bordertopcolorpick-l-text").val() + ")");
        } else {
          $(".bordertopcolor").val( "hsla(" + $(".bordertopcolorpick-hue-text").val() + ", " + $(".bordertopcolorpick-s-text").val() + ", " + $(".bordertopcolorpick-l-text").val() + ", " + $(".bordertopcolorpick-a-text").val() + ")");
        }
        if ( $(".bordertopcolorpick-a-text").val() === "0" ) {
          $(".bordertopcolor").val("transparent");
        }
        
        // Alpha Saturation
        $(".bordertopcolorpick-s-bg").css({
          "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".bordertopcolorpick-hue").val() + "," + $(".bordertopcolorpick-s").val() + "%," + $(".bordertopcolorpick-l").val() + "%)" + " 100%)"
        });
        // Alpha Lightness
        $(".bordertopcolorpick-l-bg").css({
          "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".bordertopcolorpick-hue").val() + "," + $(".bordertopcolorpick-s").val() + "%,50%) 50%,#ffffff 100%)"
        });
        // Alpha Preview
        $(".bordertopcolorpick-a-bg").css({
          "background": "linear-gradient(to right, rgba(255,255,255,0) 0%," + "hsl(" + $(".bordertopcolorpick-hue").val() + "," + $(".bordertopcolorpick-s").val() + "%," + $(".bordertopcolorpick-l").val() + "%)" + " 100%)"
        });
        $(".bordertopcolor").trigger("change");
        $("#stylethis").css({
          "border-top": $("#drop .adds-your-border-top").val()
        });
        localStorage.setItem('CanvesContent', $(".canves").html());
        PrevStyles();
      };
      
      $(".bordertopsize, .bordertopstyle, .bordertopcolor, .yourbordertopcolor-properties input[type=range]").on('keyup change', function() {
        if ( $(".bordertopsize").val() === "" ) {
          $(".adds-your-border-top").val("").trigger("change");
        } else if ( $(".bordertopstyle").val() === "" ) {
          $(".adds-your-border-top").val("").trigger("change");
        } else if ( $(".bordertopcolor").val() === "" ) {
          $(".adds-your-border-top").val("").trigger("change");
        } else {
          $(".adds-your-border-top").val( ( $(".bordertopsize").val() === "" ? "" : $(".bordertopsize").val() + "px " ) + ( $(".bordertopstyle").val() === "" ? "" : $(".bordertopstyle").val() + " " ) + ( $(".bordertopcolor").val() === "" ? "" : $(".bordertopcolor").val() + " " ) ).trigger("change");
        }
        CallBorderTopColor();
      });
      $(".bordertopsize").on('keyup change', function() {
        if ( $(this).val() === "0" ) {
          $(".adds-your-border-top").val("0").trigger("change");
        }
        CallBorderTopColor();
      });
      
      $(".adds-your-border-top").on('mousedown touchstart focus', function(e) {
        $(".yourbordertopcolor-properties").css({
          'position': 'absolute',
          'margin-top': "-175px",
          'left': "auto",
          'right': "20px",
          'width': "80%"
        }).show();
      });
      
      // Setup Hue
      $(".bordertopcolorpick-hue-text").val( $(".bordertopcolorpick-hue").val() );
      $(".bordertopcolorpick-hue").on('change', function() {
        $(".bordertopcolorpick-hue-text").val( $(this).val() );
        CallBorderTopColor();
      });
      $(".bordertopcolorpick-hue-text").on('keyup change', function() {
        $(".bordertopcolorpick-hue").val( $(this).val() );
      });
      // Setup Saturation
      $(".bordertopcolorpick-s-text").val( $(".bordertopcolorpick-s").val() + "%" );
      $(".bordertopcolorpick-s").on('change', function() {
        $(".bordertopcolorpick-s-text").val( $(this).val() + "%" );
        CallBorderTopColor();
      });
      $(".bordertopcolorpick-s-text").on('keyup change', function() {
        $(".bordertopcolorpick-s").val( $(this).val() );
      });
      // Setup Lightness
      $(".bordertopcolorpick-l-text").val( $(".bordertopcolorpick-l").val() + "%" );
      $(".bordertopcolorpick-l").on('change', function() {
        $(".bordertopcolorpick-l-text").val( $(this).val() + "%" );
        CallBorderTopColor();
      });
      $(".bordertopcolorpick-l-text").on('keyup change', function() {
        $(".bordertopcolorpick-l").val( $(this).val() );
      });
      // Setup Alpha
      $(".bordertopcolorpick-a-text").val( $(".bordertopcolorpick-a").val() );
      $(".bordertopcolorpick-a").on('change', function() {
        $(".bordertopcolorpick-a-text").val( $(this).val() );
        CallBorderTopColor();
      });
      // Alpha Saturation
      $(".bordertopcolorpick-s-bg").css({
        "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".bordertopcolorpick-hue").val() + "," + $(".bordertopcolorpick-s").val() + "%," + $(".bordertopcolorpick-l").val() + "%)" + " 100%)"
      });
      // Alpha Lightness
      $(".bordertopcolorpick-l-bg").css({
        "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".bordertopcolorpick-hue").val() + "," + $(".bordertopcolorpick-s").val() + "%,50%) 50%,#ffffff 100%)"
      });
      // Alpha Preview
      $(".bordertopcolorpick-a-bg").css({
        "background": "linear-gradient(to right, rgba(255,255,255,0) 0%," + "hsl(" + $(".bordertopcolorpick-hue").val() + "," + $(".bordertopcolorpick-s").val() + "%," + $(".bordertopcolorpick-l").val() + "%)" + " 100%)"
      });
      $(".bordertopcolorpick-a-text").on('keyup change', function() {
        $(".bordertopcolorpick-a").val( $(this).val() );
      });
    });
    // Border-Left Color Picker
    $(function() {
      var CallBorderLeftColor = function() {
        if ( $(".borderleftcolorpick-a-text").val() === "1" ) {
          $(".borderleftcolor").val( "hsl(" + $(".borderleftcolorpick-hue-text").val() + ", " + $(".borderleftcolorpick-s-text").val() + ", " + $(".borderleftcolorpick-l-text").val() + ")");
        } else {
          $(".borderleftcolor").val( "hsla(" + $(".borderleftcolorpick-hue-text").val() + ", " + $(".borderleftcolorpick-s-text").val() + ", " + $(".borderleftcolorpick-l-text").val() + ", " + $(".borderleftcolorpick-a-text").val() + ")");
        }
        if ( $(".borderleftcolorpick-a-text").val() === "0" ) {
          $(".borderleftcolor").val("transparent");
        }
        
        // Alpha Saturation
        $(".borderleftcolorpick-s-bg").css({
          "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".borderleftcolorpick-hue").val() + "," + $(".borderleftcolorpick-s").val() + "%," + $(".borderleftcolorpick-l").val() + "%)" + " 100%)"
        });
        // Alpha Lightness
        $(".borderleftcolorpick-l-bg").css({
          "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".borderleftcolorpick-hue").val() + "," + $(".borderleftcolorpick-s").val() + "%,50%) 50%,#ffffff 100%)"
        });
        // Alpha Preview
        $(".borderleftcolorpick-a-bg").css({
          "background": "linear-gradient(to right, rgba(255,255,255,0) 0%," + "hsl(" + $(".borderleftcolorpick-hue").val() + "," + $(".borderleftcolorpick-s").val() + "%," + $(".borderleftcolorpick-l").val() + "%)" + " 100%)"
        });
        $(".borderleftcolor").trigger("change");
        $("#stylethis").css({
          "border-left": $("#drop .adds-your-border-left").val()
        });
        localStorage.setItem('CanvesContent', $(".canves").html());
        PrevStyles();
      };
      
      $(".adds-your-border-left").on('mousedown touchstart focus', function(e) {
        $(".yourborderleftcolor-properties").css({
          'position': 'absolute',
          'margin-top': "-160px",
          'left': "auto",
          'right': "20px",
          'width': "80%"
        }).show();
      });
      
      $(".borderleftsize, .borderleftstyle, .borderleftcolor, .yourborderleftcolor-properties input[type=range]").on('keyup change', function() {
        if ( $(".borderleftsize").val() === "" ) {
          $(".adds-your-border-left").val("").trigger("change");
        } else if ( $(".borderleftstyle").val() === "" ) {
          $(".adds-your-border-left").val("").trigger("change");
        } else if ( $(".borderleftcolor").val() === "" ) {
          $(".adds-your-border-left").val("").trigger("change");
        } else {
          $(".adds-your-border-left").val( ( $(".borderleftsize").val() === "" ? "" : $(".borderleftsize").val() + "px " ) + ( $(".borderleftstyle").val() === "" ? "" : $(".borderleftstyle").val() + " " ) + ( $(".borderleftcolor").val() === "" ? "" : $(".borderleftcolor").val() + " " ).trigger("change") );
        }
        CallBorderLeftColor();
      });
      $(".borderleftsize").on('keyup change', function() {
        if ( $(this).val() === "0" ) {
          $(".adds-your-border-left").val("0").trigger("change");
        }
        CallBorderLeftColor();
      });
      
      // Setup Hue
      $(".borderleftcolorpick-hue-text").val( $(".borderleftcolorpick-hue").val() );
      $(".borderleftcolorpick-hue").on('change', function() {
        $(".borderleftcolorpick-hue-text").val( $(this).val() );
        CallBorderLeftColor();
      });
      $(".borderleftcolorpick-hue-text").on('keyup change', function() {
        $(".borderleftcolorpick-hue").val( $(this).val() );
      });
      // Setup Saturation
      $(".borderleftcolorpick-s-text").val( $(".borderleftcolorpick-s").val() + "%" );
      $(".borderleftcolorpick-s").on('change', function() {
        $(".borderleftcolorpick-s-text").val( $(this).val() + "%" );
        CallBorderLeftColor();
      });
      $(".borderleftcolorpick-s-text").on('keyup change', function() {
        $(".borderleftcolorpick-s").val( $(this).val() );
      });
      // Setup Lightness
      $(".borderleftcolorpick-l-text").val( $(".borderleftcolorpick-l").val() + "%" );
      $(".borderleftcolorpick-l").on('change', function() {
        $(".borderleftcolorpick-l-text").val( $(this).val() + "%" );
        CallBorderLeftColor();
      });
      $(".borderleftcolorpick-l-text").on('keyup change', function() {
        $(".borderleftcolorpick-l").val( $(this).val() );
      });
      // Setup Alpha
      $(".borderleftcolorpick-a-text").val( $(".borderleftcolorpick-a").val() );
      $(".borderleftcolorpick-a").on('change', function() {
        $(".borderleftcolorpick-a-text").val( $(this).val() );
        CallBorderLeftColor();
      });
      // Alpha Saturation
      $(".borderleftcolorpick-s-bg").css({
        "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".borderleftcolorpick-hue").val() + "," + $(".borderleftcolorpick-s").val() + "%," + $(".borderleftcolorpick-l").val() + "%)" + " 100%)"
      });
      // Alpha Lightness
      $(".borderleftcolorpick-l-bg").css({
        "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".borderleftcolorpick-hue").val() + "," + $(".borderleftcolorpick-s").val() + "%,50%) 50%,#ffffff 100%)"
      });
      // Alpha Preview
      $(".borderleftcolorpick-a-bg").css({
        "background": "linear-gradient(to right, rgba(255,255,255,0) 0%," + "hsl(" + $(".borderleftcolorpick-hue").val() + "," + $(".borderleftcolorpick-s").val() + "%," + $(".borderleftcolorpick-l").val() + "%)" + " 100%)"
      });
      $(".borderleftcolorpick-a-text").on('keyup change', function() {
        $(".borderleftcolorpick-a").val( $(this).val() );
      });
    });
    // Border-Right Color Picker
    $(function() {
      var CallBorderRightColor = function() {
        if ( $(".borderrightcolorpick-a-text").val() === "1" ) {
          $(".borderrightcolor").val( "hsl(" + $(".borderrightcolorpick-hue-text").val() + ", " + $(".borderrightcolorpick-s-text").val() + ", " + $(".borderrightcolorpick-l-text").val() + ")");
        } else {
          $(".borderrightcolor").val( "hsla(" + $(".borderrightcolorpick-hue-text").val() + ", " + $(".borderrightcolorpick-s-text").val() + ", " + $(".borderrightcolorpick-l-text").val() + ", " + $(".borderrightcolorpick-a-text").val() + ")");
        }
        if ( $(".borderrightcolorpick-a-text").val() === "0" ) {
          $(".borderrightcolor").val("transparent");
        }
        
        // Alpha Saturation
        $(".borderrightcolorpick-s-bg").css({
          "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".borderrightcolorpick-hue").val() + "," + $(".borderrightcolorpick-s").val() + "%," + $(".borderrightcolorpick-l").val() + "%)" + " 100%)"
        });
        // Alpha Lightness
        $(".borderrightcolorpick-l-bg").css({
          "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".borderrightcolorpick-hue").val() + "," + $(".borderrightcolorpick-s").val() + "%,50%) 50%,#ffffff 100%)"
        });
        // Alpha Preview
        $(".borderrightcolorpick-a-bg").css({
          "background": "linear-gradient(to right, rgba(255,255,255,0) 0%," + "hsl(" + $(".borderrightcolorpick-hue").val() + "," + $(".borderrightcolorpick-s").val() + "%," + $(".borderrightcolorpick-l").val() + "%)" + " 100%)"
        });
        $(".borderrightcolor").trigger("change");
        $("#stylethis").css({
          "border-right": $("#drop .adds-your-border-right").val()
        });
        localStorage.setItem('CanvesContent', $(".canves").html());
        PrevStyles();
      };
      
      $(".adds-your-border-right").on('mousedown touchstart focus', function(e) {
        $(".yourborderrightcolor-properties").css({
          'position': 'absolute',
          'margin-top': "-145px",
          'left': "auto",
          'right': "20px",
          'width': "80%"
        }).show();
      });
      
      $(".borderrightsize, .borderrightstyle, .borderrightcolor, .yourborderrightcolor-properties input[type=range]").on('keyup change', function() {
        if ( $(".borderrightsize").val() === "" ) {
          $(".adds-your-border-right").val("").trigger("change");
        } else if ( $(".borderrightstyle").val() === "" ) {
          $(".adds-your-border-right").val("").trigger("change");
        } else if ( $(".borderrightcolor").val() === "" ) {
          $(".adds-your-border-right").val("").trigger("change");
        } else {
          $(".adds-your-border-right").val( ( $(".borderrightsize").val() === "" ? "" : $(".borderrightsize").val() + "px " ) + ( $(".borderrightstyle").val() === "" ? "" : $(".borderrightstyle").val() + " " ) + ( $(".borderrightcolor").val() === "" ? "" : $(".borderrightcolor").val() + " " ).trigger("change") );
        }
        CallBorderRightColor();
      });
      $(".borderrightsize").on('keyup change', function() {
        if ( $(this).val() === "0" ) {
          $(".adds-your-border-right").val("0").trigger("change");
        }
        CallBorderRightColor();
      });
      
      // Setup Hue
      $(".borderrightcolorpick-hue-text").val( $(".borderrightcolorpick-hue").val() );
      $(".borderrightcolorpick-hue").on('change', function() {
        $(".borderrightcolorpick-hue-text").val( $(this).val() );
        CallBorderRightColor();
      });
      $(".borderrightcolorpick-hue-text").on('keyup change', function() {
        $(".borderrightcolorpick-hue").val( $(this).val() );
      });
      // Setup Saturation
      $(".borderrightcolorpick-s-text").val( $(".borderrightcolorpick-s").val() + "%" );
      $(".borderrightcolorpick-s").on('change', function() {
        $(".borderrightcolorpick-s-text").val( $(this).val() + "%" );
        CallBorderRightColor();
      });
      $(".borderrightcolorpick-s-text").on('keyup change', function() {
        $(".borderrightcolorpick-s").val( $(this).val() );
      });
      // Setup Lightness
      $(".borderrightcolorpick-l-text").val( $(".borderrightcolorpick-l").val() + "%" );
      $(".borderrightcolorpick-l").on('change', function() {
        $(".borderrightcolorpick-l-text").val( $(this).val() + "%" );
        CallBorderRightColor();
      });
      $(".borderrightcolorpick-l-text").on('keyup change', function() {
        $(".borderrightcolorpick-l").val( $(this).val() );
      });
      // Setup Alpha
      $(".borderrightcolorpick-a-text").val( $(".borderrightcolorpick-a").val() );
      $(".borderrightcolorpick-a").on('change', function() {
        $(".borderrightcolorpick-a-text").val( $(this).val() );
        CallBorderRightColor();
      });
      // Alpha Saturation
      $(".borderrightcolorpick-s-bg").css({
        "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".borderrightcolorpick-hue").val() + "," + $(".borderrightcolorpick-s").val() + "%," + $(".borderrightcolorpick-l").val() + "%)" + " 100%)"
      });
      // Alpha Lightness
      $(".borderrightcolorpick-l-bg").css({
        "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".borderrightcolorpick-hue").val() + "," + $(".borderrightcolorpick-s").val() + "%,50%) 50%,#ffffff 100%)"
      });
      // Alpha Preview
      $(".borderrightcolorpick-a-bg").css({
        "background": "linear-gradient(to right, rgba(255,255,255,0) 0%," + "hsl(" + $(".borderrightcolorpick-hue").val() + "," + $(".borderrightcolorpick-s").val() + "%," + $(".borderrightcolorpick-l").val() + "%)" + " 100%)"
      });
      $(".borderrightcolorpick-a-text").on('keyup change', function() {
        $(".borderrightcolorpick-a").val( $(this).val() );
      });
    });
    // Border-Bottom Color Picker
    $(function() {
      var CallBorderBottomColor = function() {
        if ( $(".borderbottomcolorpick-a-text").val() === "1" ) {
          $(".borderbottomcolor").val( "hsl(" + $(".borderbottomcolorpick-hue-text").val() + ", " + $(".borderbottomcolorpick-s-text").val() + ", " + $(".borderbottomcolorpick-l-text").val() + ")");
        } else {
          $(".borderbottomcolor").val( "hsla(" + $(".borderbottomcolorpick-hue-text").val() + ", " + $(".borderbottomcolorpick-s-text").val() + ", " + $(".borderbottomcolorpick-l-text").val() + ", " + $(".borderbottomcolorpick-a-text").val() + ")");
        }
        if ( $(".borderbottomcolorpick-a-text").val() === "0" ) {
          $(".borderbottomcolor").val("transparent");
        }
        
        // Alpha Saturation
        $(".borderbottomcolorpick-s-bg").css({
          "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".borderbottomcolorpick-hue").val() + "," + $(".borderbottomcolorpick-s").val() + "%," + $(".borderbottomcolorpick-l").val() + "%)" + " 100%)"
        });
        // Alpha Lightness
        $(".borderbottomcolorpick-l-bg").css({
          "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".borderbottomcolorpick-hue").val() + "," + $(".borderbottomcolorpick-s").val() + "%,50%) 50%,#ffffff 100%)"
        });
        // Alpha Preview
        $(".borderbottomcolorpick-a-bg").css({
          "background": "linear-gradient(to right, rgba(255,255,255,0) 0%," + "hsl(" + $(".borderbottomcolorpick-hue").val() + "," + $(".borderbottomcolorpick-s").val() + "%," + $(".borderbottomcolorpick-l").val() + "%)" + " 100%)"
        });
        $(".borderbottomcolor").trigger("change");
        $("#stylethis").css({
          "border-bottom": $("#drop .adds-your-border-bottom").val()
        });
        localStorage.setItem('CanvesContent', $(".canves").html());
        PrevStyles();
      };
      
      $(".adds-your-border-bottom").on('mousedown touchstart focus', function(e) {
        $(".yourborderbottomcolor-properties").css({
          'position': 'absolute',
          'margin-top': "-130px",
          'left': "auto",
          'right': "20px",
          'width': "80%"
        }).show();
      });
      
      $(".borderbottomsize, .borderbottomstyle, .borderbottomcolor, .yourborderbottomcolor-properties input[type=range]").on('keyup change', function() {
        if ( $(".borderbottomsize").val() === "" ) {
          $(".adds-your-border-bottom").val("").trigger("change");
        } else if ( $(".borderbottomstyle").val() === "" ) {
          $(".adds-your-border-bottom").val("").trigger("change");
        } else if ( $(".borderbottomcolor").val() === "" ) {
          $(".adds-your-border-bottom").val("").trigger("change");
        } else {
          $(".adds-your-border-bottom").val( ( $(".borderbottomsize").val() === "" ? "" : $(".borderbottomsize").val() + "px " ) + ( $(".borderbottomstyle").val() === "" ? "" : $(".borderbottomstyle").val() + " " ) + ( $(".borderbottomcolor").val() === "" ? "" : $(".borderbottomcolor").val() + " " ).trigger("change") );
        }
        CallBorderBottomColor();
      });
      $(".borderbottomsize").on('keyup change', function() {
        if ( $(this).val() === "0" ) {
          $(".adds-your-border-bottom").val("0").trigger("change");
        }
        CallBorderBottomColor();
      });
      
      // Setup Hue
      $(".borderbottomcolorpick-hue-text").val( $(".borderbottomcolorpick-hue").val() );
      $(".borderbottomcolorpick-hue").on('change', function() {
        $(".borderbottomcolorpick-hue-text").val( $(this).val() );
        CallBorderBottomColor();
      });
      $(".borderbottomcolorpick-hue-text").on('keyup change', function() {
        $(".borderbottomcolorpick-hue").val( $(this).val() );
      });
      // Setup Saturation
      $(".borderbottomcolorpick-s-text").val( $(".borderbottomcolorpick-s").val() + "%" );
      $(".borderbottomcolorpick-s").on('change', function() {
        $(".borderbottomcolorpick-s-text").val( $(this).val() + "%" );
        CallBorderBottomColor();
      });
      $(".borderbottomcolorpick-s-text").on('keyup change', function() {
        $(".borderbottomcolorpick-s").val( $(this).val() );
      });
      // Setup Lightness
      $(".borderbottomcolorpick-l-text").val( $(".borderbottomcolorpick-l").val() + "%" );
      $(".borderbottomcolorpick-l").on('change', function() {
        $(".borderbottomcolorpick-l-text").val( $(this).val() + "%" );
        CallBorderBottomColor();
      });
      $(".borderbottomcolorpick-l-text").on('keyup change', function() {
        $(".borderbottomcolorpick-l").val( $(this).val() );
      });
      // Setup Alpha
      $(".borderbottomcolorpick-a-text").val( $(".borderbottomcolorpick-a").val() );
      $(".borderbottomcolorpick-a").on('change', function() {
        $(".borderbottomcolorpick-a-text").val( $(this).val() );
        CallBorderBottomColor();
      });
      // Alpha Saturation
      $(".borderbottomcolorpick-s-bg").css({
        "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".borderbottomcolorpick-hue").val() + "," + $(".borderbottomcolorpick-s").val() + "%," + $(".borderbottomcolorpick-l").val() + "%)" + " 100%)"
      });
      // Alpha Lightness
      $(".borderbottomcolorpick-l-bg").css({
        "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".borderbottomcolorpick-hue").val() + "," + $(".borderbottomcolorpick-s").val() + "%,50%) 50%,#ffffff 100%)"
      });
      // Alpha Preview
      $(".borderbottomcolorpick-a-bg").css({
        "background": "linear-gradient(to right, rgba(255,255,255,0) 0%," + "hsl(" + $(".borderbottomcolorpick-hue").val() + "," + $(".borderbottomcolorpick-s").val() + "%," + $(".borderbottomcolorpick-l").val() + "%)" + " 100%)"
      });
      $(".borderbottomcolorpick-a-text").on('keyup change', function() {
        $(".borderbottomcolorpick-a").val( $(this).val() );
      });
    });
  });

  // Closes Color Picker(s)
  $("#toolbox").on('mousedown touchstart', function(e) {
    if ($("#yourcolor-properties").is(':visible')) {
      if (!$(e.target).hasClass('keepscolorbuubleabove')) {
        $(".yourcolor-properties").hide();
      }
    }
    if ($("#yourbgcolor-properties").is(':visible')) {
      if (!$(e.target).hasClass('keepscolorbuubleabove')) {
        $(".yourbgcolor-properties").hide();
      }
    }
    if ($("#yourbordertopcolor-properties").is(':visible')) {
      if (!$(e.target).hasClass('keepscolorbuubleabove')) {
        $(".yourbordertopcolor-properties").hide();
      }
    }
    if ($("#yourborderleftcolor-properties").is(':visible')) {
      if (!$(e.target).hasClass('keepscolorbuubleabove')) {
        $(".yourborderleftcolor-properties").hide();
      }
    }
    if ($("#yourborderrightcolor-properties").is(':visible')) {
      if (!$(e.target).hasClass('keepscolorbuubleabove')) {
        $(".yourborderrightcolor-properties").hide();
      }
    }
    if ($("#yourborderbottomcolor-properties").is(':visible')) {
      if (!$(e.target).hasClass('keepscolorbuubleabove')) {
        $(".yourborderbottomcolor-properties").hide();
      }
    }
  });

  // Search through application
  $("#search-app").on('keyup change', function() {
    var $val = $(this).val();
    
    if ($val.toLowerCase() === "all") {
      $("#select-mode header").removeClass('activedrop').next().show();
    } else if ($val.toLowerCase() === "none") {
      $("#select-mode header").removeClass('activedrop').addClass('activedrop').next().hide();
      
    } else if ($.inArray($val.toLowerCase(), ["position", "background", "border", "typography", "advanced", "elements", "custom"]) > -1) {
      $("#select-mode header").removeClass('activedrop').addClass('activedrop').next().hide();
      $("#select-mode header:contains("+ $val.toLowerCase() + ":)").removeClass('activedrop').next().show();
    } else if ($.inArray($val.toLowerCase(), ["top", "left", "bottom", "right"]) > -1) {
      $("#select-mode header").removeClass('activedrop').addClass('activedrop').next().hide();
      $("#select-mode header:contains(position:)").next().show();
      $("#posvalz").parent().prev().removeClass('activedrop');
      $("#posvalz *").find(".adds-your-position-"+ $val.toLowerCase() +"").focus();
      $(this).val("");
    } else if ($.inArray($val.toLowerCase(), ["width", "height"]) > -1) {
      $("#select-mode header").removeClass('activedrop').addClass('activedrop').next().hide();
      $("#select-mode header:contains(position:)").next().show();
      $("#posvalz").parent().prev().removeClass('activedrop');
      $("#posvalz *").find(".adds-your-"+ $val.toLowerCase() +"").focus();
      $(this).val("");
    } else if ($.inArray($val.toLowerCase(), ["padding-all", "padding-top", "padding-left", "padding-bottom", "padding-right", "margin-all", "margin-top", "margin-left", "margin-bottom", "margin-right"]) > -1) {
      $("#select-mode header").removeClass('activedrop').addClass('activedrop').next().hide();
      $("#select-mode header:contains(position:)").next().show();
      $("#posvalz").parent().prev().removeClass('activedrop');
      $("#posvalz *").find(".adds-your-"+ $val.toLowerCase().replace(/-all/g,'') +"").focus();
      $(this).val("");
    } else if ($.inArray($val.toLowerCase(), ["background-image", "background-position", "background-repeat", "background-attachment", "background-size", "background-color", "box-shadow"]) > -1) {
      $("#select-mode header").removeClass('activedrop').addClass('activedrop').next().hide();
      $("#select-mode header:contains(background:)").next().show();
      $("#bgvalz").parent().prev().removeClass('activedrop');
      $("#bgvalz").find(".adds-your-"+ $val.toLowerCase() +"").focus();
      $(this).val("");
    } else if ($.inArray($val.toLowerCase(), ["font-size", "color", "font-family", "font-varient", "font-style", "font-weight", "line-height", "letter-spacing", "word-spacing", "text-transform", "text-decoration", "text-align", "word-wrap", "white-space", "text-shadow"]) > -1) {
      $("#select-mode header").removeClass('activedrop').addClass('activedrop').next().hide();
      $("#select-mode header:contains(typography:)").next().show();
      $("#typographyvalz1").parent().prev().removeClass('activedrop');
      $("#typographyvalz1, #typographyvalz2").find(".adds-your-"+ $val.toLowerCase().replace(/color/g,'font-color') +"").focus();
      $(this).val("");
    } else if ($.inArray($val.toLowerCase(), ["display", "overflow-x", "overflow-y", "opacity", "outline", "resize", "float", "z-index", "cursor", "list-style", "content", "vertical-align", "transition", "transform", "resize"]) > -1) {
      $("#select-mode header").removeClass('activedrop').addClass('activedrop').next().hide();
      $("#select-mode header:contains(advanced:)").next().show();
      $("#advancedvalz").parent().prev().removeClass('activedrop');
      $("#advancedvalz").find(".adds-your-"+ $val.toLowerCase().replace(/content/g,'content-prop') +"").focus();
      $(this).val("");
    } else if ($.inArray($val.toLowerCase(), ["button", "textbox", "parent", "child"]) > -1) {
      $("#add-button, #add-textbox, #add-child, #add-parent, #clear-canves").removeClass('thisisanactivebutton');
      $(".add-button-properz, .add-textbox-properz, .add-parent-properz, .add-child-properz, .clear-canves-properz").hide();
      $("#select-mode header:contains(elements:)").removeClass('activedrop').next().show();
      $("#add-" + $val).trigger("click");
      if ($this === "child") {
        $(".add-child-confirm").trigger("click");
      }
    } else if ($val.toLowerCase() === "clear") {
      $("#add-button, #add-textbox, #add-child, #add-parent, #clear-canves").removeClass('thisisanactivebutton');
      $(".add-button-properz, .add-textbox-properz, .add-parent-properz, .add-child-properz, .clear-canves-properz").hide();
      $("#select-mode header:contains(elements:)").removeClass('activedrop').next().show();
      $("#clear-canves").trigger("click");
    } else if ($val.toLowerCase() === "clear css") {
      $(this).val("");
      $(".imaclearallyourcss").trigger("click");
    } else if ($val.toLowerCase() === "clear element") {
      $(this).val("");
      $(".imaclearyourselectedelm").trigger("click");
    } else if ($val.toLowerCase() === "clear canvas") {
      $(this).val("");
      $(".imaclearyourcanvas").trigger("click");
    }
  });
  $("#search-mmd").on('click', function() {
    if ($('#select-tool.myfukentoolisactivebiotch').is(':visible')) {
      $("#search-app").val("none").trigger('change').val("").focus();
    } else {
      $("#select-tool").trigger('click');
      $("#search-app").val("none").trigger('change').val("").focus();
    }
  });
  CheckDrawOptions();
  $('#ruler').empty();
  createRuler();
});
