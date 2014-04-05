// Call our functions when the page is ready.
$(document).ready(function() {
  // Defines our variables
  var enabled = false,
    drawable = false,
    drawing  = false,
    elmstyle = false,
    editable = false,
    removediv = false,
    code = $("#canves-code"),
    preview = $(".canves"),
    mS = {}, // mouse start 
    dBox;
    
  // Updates preview
  var FinalizePrev = function() {
    $('.yourcss').html($('.canves').html());
    $('.yourcss').children("*").html("");
    $(".yourcss *").removeAttr('id').removeAttr('contenteditable');
    $(".css-sheet").val($(".yourcss").html().replace(/<\/?/g,'').replace(/h1 /g,'').replace(/div /g,'').replace(/header /g,'').replace(/footer /g,'').replace(/class="/g,'.').replace(/div/g,'').replace(/header/g,'').replace(/style="/g,'{\n  ').replace(/;/g,';\n ').replace(/"/g,'').replace(/ >>/g,'}').replace(/>>/g,' {}'));
    
    $(".yourhtml").html($(".canves").html());
    $(".yourhtml *").removeAttr('style').removeAttr('contenteditable');
    $(".html-sheet").val($(".yourhtml").html().replace(/>/g,'>\n    ').replace(/</g,'\n  <'));
    $('.mirror-title').text( $('.website-title').val() );
    if( $('.dadamcssreflist').val() === "div>" ) {
      $('.dadamcssrefhtml').html("");
      $('.dadamcssreflist').val("");
    }
    $(".c-css-sheet").html("<style type='text/css'>" + $('.custom-css-sheet').val() + "</style>");
    $('.mirror-css-link-refs').text( $('.dadamcssreflist').val() );
    $(".mirror-css").text( $(".custom-css-sheet").val() + "\n" + $(".css-sheet").val() + "\n" + $('.dadammediaquerylist').val() );
    $(".mirror-html").text( $(".html-sheet").val() );
    $('#code').val( $('.mirror-code').text() );
    editor.setValue( $("#code").val() );
  };
    
  // Creates Ruler
  function createRuler() {
    var $ruler = $('.ruler');
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

  // Mirror code
  $(window).on('load change keyup', function() {
    $('.mirror-title').text( $('.website-title').val() );
  }).on('load resize', function() {
    $('.ruler').empty();
    createRuler();
    
      // Updates preview
      $('.yourcss').html($('.canves').html());
      $('.yourcss').children("*").html("");
      $(".yourcss *").removeAttr('id').removeAttr('contenteditable');
      $(".css-sheet").val($(".yourcss").html().replace(/<\/?/g,'').replace(/h1 /g,'').replace(/div /g,'').replace(/header /g,'').replace(/footer /g,'').replace(/class="/g,'.').replace(/div/g,'').replace(/header/g,'').replace(/style="/g,'{\n  ').replace(/;/g,';\n ').replace(/"/g,'').replace(/ >>/g,'}').replace(/>>/g,' {}'));
      
      $(".yourhtml").html($(".canves").html());
      $(".yourhtml *").removeAttr('style').removeAttr('contenteditable');
      $(".html-sheet").val($(".yourhtml").html().replace(/>/g,'>\n    ').replace(/</g,'\n  <'));
      $('.mirror-title').text( $('.website-title').val() );
      $(".mirror-css").text( $(".css-sheet").val() + "\n" + $('.dadammediaquerylist').val() );
      $(".mirror-html").text( $(".html-sheet").val() );
      $('#code').val( $('.mirror-code').text() );
      editor.setValue( $("#code").val() );
  });
  
  // Select Tool
  $('.select-tool').click(function() {
    $(".inspector").trigger('click');
    FinalizePrev();
    $(this).toggleClass('select-active');
    if ($('.select-active').is(':visible')) {
      $('.dialogs').val('select-properties').trigger('change');
      elmstyle = 1;
      drawable = false;
      editable = false,
      removediv = false;
      
      // If other tools are visible hide them
      if ($('.edit-active, .remove-active').is(':visible')) {
        $('.edit-active, .remove-active').trigger('click');
      }
      
      if(elmstyle) {
        $('.canves *').drag("start",function( ev, dd ){
          dd.attrc = $( ev.target ).prop("className");
          dd.attrd = $( ev.target ).prop("id");
          dd.width = $( this ).width();
          dd.height = $( this ).height();
        })
        .drag(function( ev, dd ){
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
        }, {relative:true});
        
        $('.canves *').on('mousedown touchstart', function(e) {
          if(elmstyle) {
            // Add stylethis class
            $('div.handle').remove();
            $(".sel-css").val("");
            $(".known-class").text($(this).prop('class'));
            $('.canves, .canves *').removeAttr('id');
            $(this).attr('id', 'stylethis').append('<div class="handle NE"></div><div class="handle NN"></div><div class="handle NW"></div><div class="handle WW"></div><div class="handle EE"></div><div class="handle SW"></div><div class="handle SS"></div><div class="handle SE"></div>');
            $('.select-properties input[type=text]').val("");
            $('.select-properties input[type=checkbox]').prop('checked', '');
            $('.grabmy-typography a, .grab-txt-align a, .grabmy-position a').css('backgroundColor', '#444');
            $('.grab-elm-border input[type=text]').prop('disabled', true);
            $('.borders a').removeClass('border-active').css({
              'border-color': '#a9a9a9',
              'background-color': '#444'
            });
            $('.none').css('border-color', '#444');
          }
        });
        
        $(".sel-css").on('keyup change', function() {
          $('#stylethis').prop('class', $(this).val());
          $(".known-class").text( $(this).val() );
          var $val = $(this).val();
            
          if($.inArray($val.toLowerCase(), ["header", "div", "span", "footer"]) > -1) {
            $(".sel-css").val("box");
            $(".known-class").text( $(this).val() );
            $('#stylethis').prop('class', $(this).val());
            alert("My Mobile Design forbids the use of tag names as class names.");
          }
            
          if($.inArray($val.toLowerCase(), ["cwidth", "starter-properties", "select-properties", "show", "hide", "ruler-container", "ruler", "add-media-query", "tools", "select-tool", "remove-tool", "new-doc", "open-save-dialog", "preview-workflow", "workflow", "link-to-svgedit", "hide-options", "media-query-slider", "toggle-options", "show-options", "inspection", "inspector", "mirror-code", "canves", "canves-html", "mirror-title", "mirror-css-selectors", "mirror-css", "mirror-html", "section-dropper", "horizontal-bar", "drop", "table-in", "fill", "left", "center", "right", "half", "drop-section", "text-color-picker", "colorwheel", "txt-cpick-hue", "txt-cpick-s", "txt-cpick-l", "txt-cpick-a", "txt-cpick-code-hsl", "txt-cpick-code-rgb", "bg-color-picker", "bg-cpick-hue", "bg-cpick-s", "bg-cpick-l", "bg-cpick-a", "bg-cpick-code-hsl", "bg-cpick-code-rgb", "border-color-picker", "border-cpick-hue", "border-cpick-s", "border-cpick-l", "border-cpick-a", "border-cpick-code-hsl", "border-cpick-code-rgb", " color-picker", " cpick-hue", " cpick-s", " cpick-l", " cpick-a", " cpick-code-hsl", " cpick-code-rgb", "tickLabel", "tickMajor", "tickMinor", "scroll", "solid", "dotted", "dashed", "double", "ridge", "groove", "inset", "outset", "border-active", "drop-active"]) > -1) {
            $(".sel-css").val("box");
            alert("Sorry this class name can not be used.");
          }
        });
        
        $('.search4urdamelms, .sel-css').prop('disabled', false);
        $('.select-properties input[type=checkbox]').prop('checked', false);
        $('.select-properties input[type=text], .your-border-code, .your-border-radius-code').val("");
        
        $('.borders a').removeClass('border-active').css({
          'border-color': '#a9a9a9',
          'background-color': '#444'
        }); $('.none').css('border-color', '#444').css('border-color', '#444');
        
        // Enable/Disable Styles
        $(function() {
          $('#lpos').on('change', function() {
            if ( $('#lpos').prop('checked') === true ) {
              $('.grab-elm-pos input[type=text]').prop('disabled', false);
            }
            if ( $('#lpos').prop('checked') === false) {
              $('.grabmy-position a').css('backgroundColor', '#444');
              $('.grab-elm-pos input[type=text]').prop('disabled', true).val("");
              $("#stylethis").css({
                'position': "",
                'top': "",
                'left': "",
                'right': "",
                'bottom': ""
              });
            }
          });
          $('#lsize').on('change', function() {
            if ( $('#lsize').prop('checked') === true  ) {
              $('.grab-elm-size input[type=text]').prop('disabled', false);
            }
            if ( $('#lsize').prop('checked') === false ) {
              $('.grab-elm-size input[type=text]').prop('disabled', true).val("");
              $("#stylethis").css({
                'width': "",
                'height': ""
              });
            }
          });
          $('#lbg').on('change', function() {
            if ( $('#lbg').prop('checked') === true ) {
              $('.grab-elm-bg input[type=text]').prop('disabled', false);
            }
            if ( $('#lbg').prop('checked') === false ) {
              $('.grab-elm-bg input[type=text]').prop('disabled', true).val("");
              $("#stylethis").css({
                'background-image': "",
                'background-position': "",
                'background-repeat': "",
                'background-attachment': "",
                'background-size': "",
                'background-color': ""
              });
            }
          });
          $('#lborder').on('change', function() {
            if ( $('#lborder').prop('checked') === true ) {
              $('.grab-elm-border input[type=text]').val("").prop('disabled', false);
            }
            if ( $('#lborder').prop('checked') === false ) {
              $('.grab-elm-border input[type=text]').prop('disabled', true);
              $('.borders a').removeClass('border-active').css({
                'border-color': '#a9a9a9',
                'background-color': '#444'
              });
              $('.none').css('border-color', '#444');
            }
          });
          $('#ltypography').on('change', function() {
            if ( $('#ltypography').prop('checked') === true ) {
              $('.grabmy-typography a').css('backgroundColor', '#444');
              $('.grab-elm-typography input[type=text]').prop('disabled', false).val("");
            }
            if ( $('#ltypography').prop('checked') === false ) {
              $('.grabmy-typography a').css('backgroundColor', '#444');
              $('.grab-elm-typography input[type=text]').prop('disabled', true);
              $("#stylethis").css({
                'color': "",
                'text-align': "",
                'font-family': "",
                'font-weight': "",
                'font-size': "",
                'line-height': "",
                'letter-spacing': "",
                'word-spacing': "",
                'text-transform': "",
                'word-wrap': "",
                'white-space': ""
              });
            }
          });
          $('#ladvanced').on('change', function() {
            if ( $('#ladvanced').prop('checked') === true ) {
              $('.grab-elm-advanced-opt input[type=text]').prop('disabled', false);
            }
            if ( $('#ladvanced').prop('checked') === false ) {
              $('.grab-elm-advanced-opt input[type=text]').prop('disabled', true);
              $("#stylethis").css({
                'display': "",
                'padding': "",
                'margin': "",
                'overflow': "",
                'opacity': "",
                'outline': "",
                'transition': "",
                'resize': "",
                'float': "",
                'z-index': ""
              });
            }
          });
        });
        
        // Sets Position
        $(function() {
          if ( $('#lpos').prop('checked') === true ) {
            $('.grab-elm-pos input[type=text]').prop('disabled', false);
          }
          if ( $('#lpos').prop('checked') === false ) {
            $('.grabmy-position a').css('backgroundColor', '#444');
            $('.grab-elm-pos input[type=text]').prop('disabled', true);
          }
          $('.grab-elm-pos a').click(function() {
            $("#stylethis").css({
              'position': $(this).attr('title')
            });
            $('.grab-elm-pos a').css('backgroundColor', '#444');
            $(this).css('backgroundColor', '#1c1c1c');
            $('.grab-pos-val').val($(this).attr('title'));
            $("#lpos").prop('checked', true);
            $('.grab-elm-pos input[type=text]').prop('disabled', false);
          });
          $('.grab-postop').on('keyup change', function() {
            $("#stylethis").css({
              'top': $(this).val()
            });
          });
          $('.grab-posleft').on('keyup change', function() {
            $("#stylethis").css({
              'left': $(this).val()
            });
          });
          $('.grab-posbottom').on('keyup change', function() {
            $("#stylethis").css({
              'bottom': $(this).val()
            });
          });
          $('.grab-posright').on('keyup change', function() {
            $("#stylethis").css({
              'right': $(this).val()
            });
          });
        });
        
        // Sets width & height
        $(function() {
          if ( $('#lsize').prop('checked') === true ) {
            $('.grab-elm-size input[type=text]').prop('disabled', false);
          }
          if ( $('#lsize').prop('checked') === false ) {
            $('.grab-elm-size input[type=text]').prop('disabled', true);
          }
          $('.grab-width').on('keyup change', function() {
            $("#stylethis").css({
              'width': $(this).val()
            });
          });
          $('.grab-height').on('keyup change', function() {
            $("#stylethis").css({
              'height': $(this).val()
            });
          });
        });
        
        // Sets Background
        $(function() {
          if ( $('#lbg').prop('checked') === true ) {
            $('.grab-elm-bg input[type=text]').prop('disabled', false);
          }
          if ( $('#lbg').prop('checked') === false ) {
            $('.grab-elm-bg input[type=text]').prop('disabled', true);
          }
          $('.grab-bg-url').on('keyup change', function() {
            $("#stylethis").css({
              'background-image': 'url(' + $(this).val() + ')'
            });
          });
          $('.grab-bg-position').on('keyup change', function() {
            $("#stylethis").css({
              'background-position': $(this).val()
            });
          });
          $('.grab-bg-repeat').on('keyup change', function() {
            $("#stylethis").css({
              'background-repeat': $(this).val()
            });
          });
          $('.grab-bg-size').on('keyup change', function() {
            $("#stylethis").css({
              'background-size': $(this).val()
            });
          });
          $('.grab-bg-attachment').on('keyup change', function() {
            if ($(this).prop('checked') === true) {
              $("#stylethis").css({
                'background-attachment': "fixed"
              });
              $(".grab-bg-attach-val").val("fixed");
            }
            
            if ($(this).prop('checked') === false) {
              $("#stylethis").css({
                'background-attachment': ""
              });
              $(".grab-bg-attach-val").val("");
            }
          });
          
          // BG Color Picker - Setup Hue Saturation Value & Alpha
          $(".bg-cpick-hue, .bg-cpick-s, .bg-cpick-l, .bg-cpick-a").on('change', function() {
            $(".bg-cpick-code-hsl").trigger('change');
          });
          $(".bg-cpick-s-bg").css({
            "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".bg-cpick-hue").val() + ",50%," + $(".bg-cpick-l").val() + "%)" + " 100%)"
          });
          $(".bg-cpick-l-bg").css({
            "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".bg-cpick-hue").val() + "," + $(".bg-cpick-s").val() + "%,50%) 50%,#ffffff 100%)"
          });
          $(".bg-cpick-a-bg").css({
            "background": "linear-gradient(to right, rgba(51,51,51,0) 0%," + "hsl(" + $(".bg-cpick-hue").val() + "," + $(".bg-cpick-s").val() + "%," + $(".bg-cpick-l").val() + "%)" + " 100%)"
          });
          
          // Setup Color Picker Code
          $(".bg-cpick-code-hsl").on('change keyup', function() {
            $(this).val( "hsla(" + $(".bg-cpick-hue").val() + ", " + $(".bg-cpick-s").val() + "%, " + $(".bg-cpick-l").val() + "%, " + $(".bg-cpick-a").val() + ")");
            $('#lbg').prop('checked', true);
            $('.grab-elm-bg input[type=text]').prop('disabled', false);
            
            // Initiate hsl preview
            $(".grab-bg-color").css({
              "background": $(".bg-cpick-code-hsl").val(),
              "border-color": $(".bg-cpick-code-hsl").val()
            });
            
            $(".bg-cpick-code-rgb").val( $(".grab-bg-color").css("backgroundColor") );
            $("#stylethis").css('backgroundColor', $(".bg-cpick-code-rgb").val());
            
            // Alpha Saturation
            $(".bg-cpick-s-bg").css({
              "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".bg-cpick-hue").val() + ",50%," + $(".bg-cpick-l").val() + "%)" + " 100%)"
            });
            
            // Alpha Lightness
            $(".bg-cpick-l-bg").css({
              "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".bg-cpick-hue").val() + "," + $(".bg-cpick-s").val() + "%,50%) 50%,#ffffff 100%)"
            });
            
            // Alpha Preview
            $(".bg-cpick-a-bg").css({
              "background": "linear-gradient(to right, rgba(51,51,51,0) 0%," + "hsl(" + $(".bg-cpick-hue").val() + "," + $(".bg-cpick-s").val() + "%," + $(".bg-cpick-l").val() + "%)" + " 100%)"
            });
          });

          // Initiate rgb preview
          $(".bg-cpick-code-rgb").on('change keyup focus', function() {
            $(".grab-bg-color").css({
              "background": $(this).val(),
              "border-color": $(this).val()
            });
            
            $("#stylethis").css('backgroundColor', $(this).val());
          });
          $('.grab-bg-color').on('mouseup touchend', function() {
            $('.bg-color-picker').toggle();
          }); $('.bg-color-picker').hide();
          
        });
          
        // Sets Border
        $(function() {
          if ( $('#lborder').prop('checked') === true ) {
            $('.grab-elm-border input[type=text]').prop('disabled', false);
          }
          if ( $('#lborder').prop('checked') === false ) {
            $('.grab-elm-border input[type=text]').prop('disabled', true);
            $('.borders a').removeClass('border-active').css({
              'border-color': '#a9a9a9',
              'background-color': '#444'
            });
            $('.none').css('border-color', '#444');
          }
          $('.grab-borders a').click(function() {
            $('.grab-users-border-style').val($(this).attr('title'));
          });

          // Handles Border Styles
          $(function() {
            $('.none').click(function() {
              $('.borders a').removeClass('border-active').css({
                'border-color': '#a9a9a9',
                'background-color': '#444'
              });
              $('.none').css('border-color', '#444');
              $(this).addClass('border-active').css('border-color', '#1c1c1c');
              $("#lborder").prop('checked', true);
            });
            
            $('.solid, .dotted, .dashed, .double, .ridge, .groove, .inset, .outset').click(function() {
              $('.grab-border a, .borders a').removeClass('border-active').css({
                'border-color': '#a9a9a9',
                'background-color': '#444'
              });
              $('.none').css('border-color', '#444');
              $(this).addClass('border-active');
              $("#lborder").prop('checked', true);
            });
          });
          
          // Set border
          $('.grab-none, .grab-solid, .grab-dotted, .grab-dashed, .grab-double, .grab-ridge, .grab-groove, .grab-inset, .grab-outset').on('click', function() {
            $('.grab-border-style').val($(this).attr('title'))
            $("#stylethis").css({
              'border-style': $('.grab-border-style').val()
            });
          });
          
          // Border Color Picker - Setup Hue Saturation Value & Alpha
          $(".cpick-hue, .cpick-s, .cpick-l, .cpick-a").on('change', function() {
            $(".cpick-code-hsl").trigger('change');
          });
          $(".cpick-s-bg").css({
            "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".cpick-hue").val() + "," + $(".cpick-s").val() + "%," + $(".cpick-l").val() + "%)" + " 100%)"
          });
          $(".cpick-l-bg").css({
            "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".cpick-hue").val() + "," + $(".cpick-s").val() + "%,50%) 50%,#ffffff 100%)"
          });
          $(".cpick-a-bg").css({
            "background": "linear-gradient(to right, rgba(51,51,51,0) 0%," + "hsl(" + $(".cpick-hue").val() + "," + $(".cpick-s").val() + "%," + $(".cpick-l").val() + "%)" + " 100%)"
          });
          $(".cpick-code-hsl").on('change keyup', function() {
            $(this).val( "hsla(" + $(".cpick-hue").val() + ", " + $(".cpick-s").val() + "%, " + $(".cpick-l").val() + "%, " + $(".cpick-a").val() + ")");
            
            // Initiate hsl preview
            $(".grab-border-color").css({
              "background": $(".cpick-code-hsl").val(),
              "border-color": $(".cpick-code-hsl").val(),
              "border-size": "2px"
            });
            
            $(".cpick-code-rgb").val( $(".grab-border-color").css("backgroundColor") );
            $("#stylethis").css('border-color', $(".cpick-code-rgb").val());
            
            // Alpha Saturation
            $(".cpick-s-bg").css({
              "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".cpick-hue").val() + "," + $(".cpick-s").val() + "%," + $(".cpick-l").val() + "%)" + " 100%)"
            });
            
            // Alpha Lightness
            $(".cpick-l-bg").css({
              "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".cpick-hue").val() + "," + $(".cpick-s").val() + "%,50%) 50%,#ffffff 100%)"
            });
            
            // Alpha Preview
            $(".cpick-a-bg").css({
              "background": "linear-gradient(to right, rgba(51,51,51,0) 0%," + "hsl(" + $(".cpick-hue").val() + "," + $(".cpick-s").val() + "%," + $(".cpick-l").val() + "%)" + " 100%)"
            });
          });
          $(".cpick-code-rgb").on('change keyup focus', function() {
            $(".grab-border-color").css({
              "background": $(this).val(),
              "border-color": $(this).val(),
              "border-size": "2px"
            });
            
            $("#stylethis").css('border-color', $(this).val());
          });
          $('.grab-border-color').on('mouseup touchend', function() {
            $('.border-color-picker').toggle();
          }); $('.border-color-picker').hide();
          
          $('.border-size-all').on('change', function() {
            if($('.border-top').is(':checked')) {
              $("#lborder").prop("checked", true);
              $("#stylethis").css({'border-top-width': $('.border-size-all').val() + "px"});
              $(".your-border-top").val($('.border-size-all').val() + "px");
            }
            if($('.border-right').is(':checked')) {
              $("#lborder").prop("checked", true);
              $("#stylethis").css({'border-right-width': $('.border-size-all').val() + "px"});
              $(".your-border-right").val($('.border-size-all').val() + "px");
            }
            if($('.border-bottom').is(':checked')) {
              $("#lborder").prop("checked", true);
              $("#stylethis").css({'border-bottom-width': $('.border-size-all').val() + "px"});
              $(".your-border-bottom").val($('.border-size-all').val() + "px");
            }
            if($('.border-left').is(':checked')) {
              $("#lborder").prop("checked", true);
              $("#stylethis").css({'border-left-width': $('.border-size-all').val() + "px"});
              $(".your-border-left").val($('.border-size-all').val() + "px");
            }
            $(".your-border-code").val(( $(".your-border-top").val() === "" ? "" : "\n  border-top-width: " + $(".your-border-top").val() + ";" ) + ( $(".your-border-left").val() === "" ? "" : "\n  border-left-width: " + $(".your-border-left").val() + ";" ) + ( $(".your-border-bottom").val() === "" ? "" : "\n  border-bottom-width: " + $(".your-border-bottom").val() + ";" ) + ( $(".your-border-right").val() === "" ? "" : "\n  border-right-width: " + $(".your-border-right").val() + ";" ));
          });
          $('.border-top, .border-right, .border-bottom, .border-left').on('change', function() {
            if($('.border-top').is(':checked')) {
              $("#lborder").prop("checked", true);
              $("#stylethis").css({'border-top-width': $('.border-size-all').val() + "px"});
              $(".your-border-top").val($('.border-size-all').val() + "px");
            }
            if($('.border-right').is(':checked')) {
              $("#lborder").prop("checked", true);
              $("#stylethis").css({'border-right-width': $('.border-size-all').val() + "px"});
              $(".your-border-right").val($('.border-size-all').val() + "px");
            }
            if($('.border-bottom').is(':checked')) {
              $("#lborder").prop("checked", true);
              $("#stylethis").css({'border-bottom-width': $('.border-size-all').val() + "px"});
              $(".your-border-bottom").val($('.border-size-all').val() + "px");
            }
            if($('.border-left').is(':checked')) {
              $("#lborder").prop("checked", true);
              $("#stylethis").css({'border-left-width': $('.border-size-all').val() + "px"});
              $(".your-border-left").val($('.border-size-all').val() + "px");
            }
            $(".your-border-code").val(( $(".your-border-top").val() === "" ? "" : "\n  border-top-width: " + $(".your-border-top").val() + ";" ) + ( $(".your-border-left").val() === "" ? "" : "\n  border-left-width: " + $(".your-border-left").val() + ";" ) + ( $(".your-border-bottom").val() === "" ? "" : "\n  border-bottom-width: " + $(".your-border-bottom").val() + ";" ) + ( $(".your-border-right").val() === "" ? "" : "\n  border-right-width: " + $(".your-border-right").val() + ";" ));
          });
          $('.border-radius-all').on('change', function() {
            if($('.border-radius-top-left').is(':checked')) {
              $("#stylethis").css({'border-top-left-radius': $('.border-radius-all').val() + "px"});
              $(".your-border-radius-topleft").val($('.border-radius-all').val() + "px");
            }
            if($('.border-radius-top-right').is(':checked')) {
              $("#stylethis").css({'border-top-right-radius': $('.border-radius-all').val() + "px"});
              $(".your-border-radius-topright").val($('.border-radius-all').val() + "px");
            }
            if($('.border-radius-bottom-left').is(':checked')) {
              $("#stylethis").css({'border-bottom-left-radius': $('.border-radius-all').val() + "px"});
              $(".your-border-radius-bottomleft").val($('.border-radius-all').val() + "px");
            }
            if($('.border-radius-bottom-right').is(':checked')) {
              $("#stylethis").css({'border-bottom-right-radius': $('.border-radius-all').val() + "px"});
              $(".your-border-radius-bottomright").val($('.border-radius-all').val() + "px");
            }
            $(".your-border-radius-code").val(( $(".your-border-radius-topleft").val() === "" ? "" : "\n  border-top-left-radius: " + $(".your-border-radius-topleft").val() + ";" ) + ( $(".your-border-radius-topright").val() === "" ? "" : "\n  border-top-right-radius: " + $(".your-border-radius-topright").val() + ";" ) + ( $(".your-border-radius-bottomleft").val() === "" ? "" : "\n  border-bottom-left-radius: " + $(".your-border-radius-bottomleft").val() + ";" ) + ( $(".your-border-radius-bottomright").val() === "" ? "" : "\n  border-bottom-right-radius: " + $(".your-border-radius-bottomright").val() + ";" ));
          });
          $('.border-radius-top-left, .border-radius-top-right, .border-radius-bottom-left, .border-radius-bottom-right').on('change', function() {
            if($('.border-radius-top-left').is(':checked')) {
              $("#stylethis").css({'border-top-left-radius': $('.border-radius-all').val() + "px"});
              $(".your-border-radius-topleft").val($('.border-radius-all').val() + "px");
            }
            if($('.border-radius-top-right').is(':checked')) {
              $("#stylethis").css({'border-top-right-radius': $('.border-radius-all').val() + "px"});
              $(".your-border-radius-topright").val($('.border-radius-all').val() + "px");
            }
            if($('.border-radius-bottom-left').is(':checked')) {
              $("#stylethis").css({'border-bottom-left-radius': $('.border-radius-all').val() + "px"});
              $(".your-border-radius-bottomleft").val($('.border-radius-all').val() + "px");
            }
            if($('.border-radius-bottom-right').is(':checked')) {
              $("#stylethis").css({'border-bottom-right-radius': $('.border-radius-all').val() + "px"});
              $(".your-border-radius-bottomright").val($('.border-radius-all').val() + "px");
            }
            $(".your-border-radius-code").val(( $(".your-border-radius-topleft").val() === "" ? "" : "\n  border-top-left-radius: " + $(".your-border-radius-topleft").val() + ";" ) + ( $(".your-border-radius-topright").val() === "" ? "" : "\n  border-top-right-radius: " + $(".your-border-radius-topright").val() + ";" ) + ( $(".your-border-radius-bottomleft").val() === "" ? "" : "\n  border-bottom-left-radius: " + $(".your-border-radius-bottomleft").val() + ";" ) + ( $(".your-border-radius-bottomright").val() === "" ? "" : "\n  border-bottom-right-radius: " + $(".your-border-radius-bottomright").val() + ";" ));
          });
        });
        
        // Sets Typography
        $(function() {
          if ( $('#ltypography').prop('checked') === true ) {
            $('.grab-elm-typography input[type=text]').prop('disabled', false);
          }
          if ( $('#ltypography').prop('checked') === false ) {
            $('.grab-elm-typography input[type=text]').prop('disabled', true);
          }
          $('.grab-txt-align a').click(function() {
            $("#stylethis").css({
              'text-align': $(this).attr('title')
            });
            $('.grab-txt-align a').css('backgroundColor', '#444');
            $(this).css('backgroundColor', '#1c1c1c');
            $('.grab-text-align').val($(this).attr('title'));
            $("#ltypography").prop('checked', true);
            $('.grab-elm-typography input[type=text]').prop('disabled', false);
          });
          $('.grab-typography a').click(function() {
            $("#stylethis").css({
              'font-family': $(this).text()
            });
            $('.grab-typography a').css('backgroundColor', '#444');
            $(this).css('backgroundColor', '#1c1c1c');
            $('.grab-font-family').val($(this).text());
            $("#ltypography").prop('checked', true);
            $('.grab-elm-typography input[type=text]').prop('disabled', false);
          });
          // Text Color Picker - Setup Hue Saturation Value & Alpha
          $(".txt-cpick-hue, .txt-cpick-s, .txt-cpick-l, .txt-cpick-a").on('change', function() {
            $(".txt-cpick-code-hsl").trigger('change');
          });
          $(".txt-cpick-s-bg").css({
            "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".txt-cpick-hue").val() + ",50%," + $(".txt-cpick-l").val() + "%)" + " 100%)"
          });
          $(".txt-cpick-l-bg").css({
            "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".txt-cpick-hue").val() + "," + $(".txt-cpick-s").val() + "%,50%) 50%,#ffffff 100%)"
          });
          $(".txt-cpick-a-bg").css({
            "background": "linear-gradient(to right, rgba(51,51,51,0) 0%," + "hsl(" + $(".txt-cpick-hue").val() + "," + $(".txt-cpick-s").val() + "%," + $(".txt-cpick-l").val() + "%)" + " 100%)"
          });
          
          // Setup Color Picker Code
          $(".txt-cpick-code-hsl").on('change keyup', function() {
            $(this).val( "hsla(" + $(".txt-cpick-hue").val() + ", " + $(".txt-cpick-s").val() + "%, " + $(".txt-cpick-l").val() + "%, " + $(".txt-cpick-a").val() + ")");
            
            // Initiate hsl preview
            $(".grab-txt-color").css({
              "background": $(".txt-cpick-code-hsl").val(),
              "border-color": $(".txt-cpick-code-hsl").val()
            });
            
            $(".txt-cpick-code-rgb").val( $(".grab-txt-color").css("backgroundColor") );
            $("#stylethis").css('color', $(".txt-cpick-code-rgb").val());
            
            // Alpha Saturation
            $(".txt-cpick-s-bg").css({
              "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".txt-cpick-hue").val() + ",50%," + $(".txt-cpick-l").val() + "%)" + " 100%)"
            });
            
            // Alpha Lightness
            $(".txt-cpick-l-bg").css({
              "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".txt-cpick-hue").val() + "," + $(".txt-cpick-s").val() + "%,50%) 50%,#ffffff 100%)"
            });
            
            // Alpha Preview
            $(".txt-cpick-a-bg").css({
              "background": "linear-gradient(to right, rgba(51,51,51,0) 0%," + "hsl(" + $(".txt-cpick-hue").val() + "," + $(".txt-cpick-s").val() + "%," + $(".txt-cpick-l").val() + "%)" + " 100%)"
            });
          });

          // Initiate rgb preview
          $(".txt-cpick-code-rgb").on('change keyup focus', function() {
            $(".grab-txt-color").css({
              "background": $(this).val(),
              "border-color": $(this).val()
            });
            
            $("#stylethis").css('color', $(this).val());
          });
          $('.grab-txt-color').on('mouseup touchend', function() {
            $('.text-color-picker').toggle();
          }); $('.text-color-picker').hide();
          
          // Set's Font Family, Size, Etc:
          $('.grab-typography a').each(function() {
            $(this).css('font-family', $(this).text());
          });
        });
        
        // Sets Font Family, Size, Etc:
        $('.grab-elm-typography input[type=text], .grab-elm-typography input[type=range]').on('keyup change', function() {
          $("#stylethis").css({
            'font-varient': $('.grab-font-varient').val(),
            'font-style': $('.grab-font-style').val(),
            'font-family': $('.grab-font-family').val(),
            'font-size': $('.grab-font-size').val() + "px",
            'line-height': $('.grab-line-height').val(),
            'letter-spacing': $('.grab-letter-spacing').val(),
            'word-spacing': $('.grab-word-spacing').val(),
            'text-transform': $('.grab-text-transform').val(),
            'text-align': $('.grab-text-align').val(),
            'word-wrap': $('.grab-word-wrap').val(),
            'white-space': $('.grab-white-space').val()
          });
          if ( $(".grab-text-align").val() === "" ) {
            $('.grab-txt-align a').css('backgroundColor', '#444');
          }
        });
        
        // Sets Advanced Section
        $(function() {
          if ( $('#ladvanced').prop('checked') === true ) {
            $('.grab-elm-advanced-opt input[type=text]').prop('disabled', false);
          }
          if ( $('#ladvanced').prop('checked') === false ) {
            $('.grab-elm-advanced-opt input[type=text]').prop('disabled', true);
          }
          $('.grab-elm-advanced-opt input[type=text]').on('keyup change', function() {
            $("#stylethis").css({
              'display': $('.grab-display').val(),
              'padding': $('.grab-padding').val(),
              'margin': $('.grab-margin').val(),
              'overflow': $('.grab-overflow').val(),
              'opacity': $('.grab-opacity').val(),
              'outline': $('.grab-outline').val(),
              'transition': $('.grab-transition').val(),
              'resize': $('.grab-resize').val(),
              'float': $('.grab-float').val(),
              'z-index': $('.grab-z-index').val()
            });
          });
        });
      }
    } else {
      elmstyle = false;
      $('.select-properties').hide();
      $('.starter-properties').show();
      $('.canves, .canves *').removeClass('editable');
      $('.canves, .canves *').removeAttr('id');
      $('.canves').children().removeAttr('id');
      $('.canves').find('*').removeAttr('id');
      $('.canves *').attr('contenteditable', false);
      $('.grabmy-typography a').css('backgroundColor', '#444');
      $('div.handle').remove();
      if ($(".canves").children("*").html() === "" ) {
        $(this).remove();
      }
      
      code.val(preview.html());
      preview.html(code.val());
      FinalizePrev();
      return false;
    }
  });
  $(".canves").on('mousedown touchstart', function(e) {
    if(editable) {
      $(".canves *").attr('contenteditable', true);
    }
  });

  // Remove Tool
  $(".remove-tool").click(function() {
    $(".inspector").trigger('click');
    FinalizePrev();
    $(this).toggleClass('remove-active');
    if ($('.remove-active').is(':visible')) {
      elmstyle = false;
      drawable = false;
      editable = false,
      removediv = 1;
      $('.dialogs').val('remove-properties').trigger('change');
      $(".starter-properties").show();
      $(".select-properties, .draw-properties").hide();
      
      if(removediv) {
        $('.canves *').on('mousedown touchstart', function() {
          if(removediv) {
            $(this).remove();
          }
        });
      }
      
      if ($('.select-active, .edit-active').is(':visible')) {
        $('.select-active, .edit-active').trigger('click');
      }
	
      e.preventDefault();
    } else {
      removediv = false;
      return false;
    }
  });
  
  // Edit Tool
  $(".edit-tool").click(function() {
    $(".inspector").trigger('click');
    FinalizePrev();
    $(this).toggleClass('edit-active');
    if ($('.edit-active').is(':visible')) {
      elmstyle = false;
      drawable = false;
      editable = 1,
      removediv = false;
      $('.dialogs').val('edit-properties').trigger('change');
      $(".starter-properties").show();
      $(".select-properties, .draw-properties").hide();
      
      // Manipulate Inline Elements
      $('#inactive-menubtns').hide();
      $('#idive select#elm-font-family').on('click change', function(e) {
        document.execCommand('FontName',false,$(this).val());
      });
      $('#idive select#elm-font-size').on('click change', function(e) {
        document.execCommand('FontSize',false,$(this).val());
      });
      $('#idive a#txtcolor').click(function(e) {
        document.execCommand('ForeColor',false,$('#elm-color').val());
      });
      $('#idive a#backcolor').click(function(e) {
        document.execCommand('BackColor',false,$('#elm-bgcolor').val());
      });
      $('#idive select#elm-txt-align').on('change', function(e) {
        document.execCommand($(this).val(),false,null);
      });
      $('#idive select#elm-heading').on('change', function(e) {
        document.execCommand('formatBlock',false,$(this).val());
      });
      $('.insert-html').on('click', function(e) {
        var HTMLCode = prompt('Enter HTML code', ''); if(HTMLCode != null) {$('.editable').focus(); pasteHtmlAtCaret(HTMLCode); }
      });
      
      if(editable) {
        $('.canves *').addClass('editable').on('mousedown touchstart', function() {
          if(editable) {
            $('.editable').attr('contenteditable', true);
          }
        });
      }
      
      if ($('.select-active, .remove-active').is(':visible')) {
        $('.select-active, .remove-active').trigger('click');
      }
      
      return false;
    } else {
      editable = false;
      $('.canves *').attr('contenteditable', false);
      $('#inactive-menubtns').show();
      return false;
    }
  });

  // Custom CSS Sheet
  $('.custom-css-sheet').on('keyup change', function() {
    $(".c-css-sheet").html("<style type='text/css'>" + $(this).val() + "</style>");
  });
  $(".add-css-selector").on('click', function() {
    if ( $(".add-css-selector-val").val() === "" ) {
      alert("Add class denied because value is blank.");
    } else {
      $(".list-of-css-selectors").append("<div class='list-of-css-selectors-container'><a href='javascript:void(0)' class='del-global-css-style'><span class='fa fa-times'></span></a> <button>"+ $(".add-css-selector-val").val() +"</button>"+ "<pre style='text-align:left; padding-top:5px; overflow:auto;'>"+ $(".add-css-selector-val").val() +" {"+ ( $(".grab-pos-val").val() === "" ? "" : "\n  position: " + $(".grab-pos-val").val() + ";" ) + ( $(".grab-postop").val() === "" ? "" : "\n  top: " + $(".grab-postop").val() + ";" ) + ( $(".grab-posleft").val() === "" ? "" : "\n  left: " + $(".grab-posleft").val() + ";" ) + ( $(".grab-posright").val() === "" ? "" : "\n  right: " + $(".grab-posright").val() + ";" ) + ( $(".grab-posbottom").val() === "" ? "" : "\n  bottom: " + $(".grab-posbottom").val() + ";" ) + ( $(".grab-width").val() === "" ? "" : "\n  width: " + $(".grab-width").val() + ";" ) + ( $(".grab-height").val() === "" ? "" : "\n  height: " + $(".grab-height").val() + ";" ) + ( $(".grab-bg-url").val() === "" ? "" : "\n  background-image: url('" + $(".grab-bg-url").val() + "');" ) + ( $(".grab-bg-position").val() === "" ? "" : "\n  background-position: " + $(".grab-bg-position").val() + ";" ) + ( $(".grab-bg-repeat").val() === "" ? "" : "\n  background-repeat: " + $(".grab-bg-repeat").val() + ";" ) + ( $(".grab-bg-attach-val").val() === "" ? "" : "\n  background-attachment: "+ $(".grab-bg-attach-val").val() +";" ) + ( $(".grab-bg-size").val() === "" ? "" : "\n  background-size: "+ $(".grab-bg-size").val() +";" ) + ( $(".bg-cpick-code-rgb").val() === "" ? "" : "\n  background-color: "+ $(".bg-cpick-code-rgb").val() +";" ) + ( $(".grab-users-border-style").val() === "" ? "" : "\n  border-style: "+ $(".grab-users-border-style").val() +";" ) + ( $(".cpick-code-rgb").val() === "" ? "" : "\n  border-color: "+ $(".cpick-code-rgb").val() +";" ) + ( $(".your-border-code").val() === "" ? "" : ""+ $(".your-border-code").val() +"" ) + ( $(".your-border-radius-code").val() === "" ? "" : ""+ $(".your-border-radius-code").val() +"" ) + ( $(".grab-font-family").val() === "" ? "" : "\n  font-family: "+ $(".grab-font-family").val() +";" ) + ( $(".txt-cpick-code-rgb").val() === "" ? "" : "\n  color: "+ $(".txt-cpick-code-rgb").val() +";" ) + ( $(".grab-font-size").val() === "" ? "" : "\n  font-size: "+ $(".grab-font-size").val() +"px;" ) + ( $(".grab-font-varient").val() === "" ? "" : "\n  font-varient: "+ $(".grab-font-varient").val() +";" ) + ( $(".grab-font-style").val() === "" ? "" : "\n  font-style: "+ $(".grab-font-style").val() +";" ) + ( $(".grab-font-weight").val() === "" ? "" : "\n  font-weight: "+ $(".grab-font-weight").val() +";" ) + ( $(".grab-line-height").val() === "" ? "" : "\n  line-height: "+ $(".grab-line-height").val() +";" ) + ( $(".grab-letter-spacing").val() === "" ? "" : "\n  letter-spacing: "+ $(".grab-letter-spacing").val() +";" ) + ( $(".grab-word-spacing").val() === "" ? "" : "\n  word-spacing: "+ $(".grab-word-spacing").val() +";" ) + ( $(".grab-text-transform").val() === "" ? "" : "\n  text-transform: "+ $(".grab-text-transform").val() +";" ) + ( $(".grab-text-align").val() === "" ? "" : "\n  text-align: "+ $(".grab-text-align").val() +";" ) + ( $(".grab-word-wrap").val() === "" ? "" : "\n  word-wrap: "+ $(".grab-word-wrap").val() +";" ) + ( $(".grab-white-space").val() === "" ? "" : "\n  white-space: "+ $(".grab-white-space").val() +";" ) + ( $(".grab-display").val() === "" ? "" : "\n  display: "+ $(".grab-display").val() +";" ) + ( $(".grab-padding").val() === "" ? "" : "\n  padding: "+ $(".grab-padding").val() +";" ) + ( $(".grab-margin").val() === "" ? "" : "\n  margin: "+ $(".grab-margin").val() +";" ) + ( $(".grab-overflow").val() === "" ? "" : "\n  overflow: "+ $(".grab-overflow").val() +";" ) + ( $(".grab-opacity").val() === "" ? "" : "\n  opacity: "+ $(".grab-opacity").val() +";" ) + ( $(".grab-outline").val() === "" ? "" : "\n  outline: "+ $(".grab-outline").val() +";" ) + ( $(".grab-transition").val() === "" ? "" : "\n  transition: "+ $(".grab-transition").val() +";" ) + ( $(".grab-resize").val() === "" ? "" : "\n  resize: "+ $(".grab-resize").val() +";" ) + ( $(".grab-float").val() === "" ? "" : "\n  float: "+ $(".grab-float").val() +";" ) + ( $(".grab-z-index").val() === "" ? "" : "\n  z-index: "+ $(".grab-z-index").val() +";" ) + "}</pre>\n</div>");
      
      $(".add-css-selector-val, .custom-css-sheet").val("");
      $(".c-css-sheet").html("").html( $(".list-of-css-selectors").html() );
      $(".c-css-sheet textarea, .c-css-sheet a, .c-css-sheet button").remove();
      $(".custom-css-sheet").val( $('.c-css-sheet').html().replace(/<\/?/g,'').replace(/div class="c-css-sheet hide">/g,'').replace(/div>div class="list-of-css-selectors-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/pre>div>/g,'').replace(/ }div>div class="list-of-css-selectors-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/pre>/g,'').replace(/div>/g,'').replace(/}/g,'\n}') );
      $(".add-css-refer-val").val("");
      FinalizePrev();
    }
    
    $(".del-global-css-style").on('click', function() {
      $(this).parent().remove();
      $(".custom-css-sheet").val("");
      $(".c-css-sheet").html("").html( $(".list-of-css-selectors").html() );
      $(".c-css-sheet textarea, .c-css-sheet a, .c-css-sheet button").remove();
      $(".custom-css-sheet").val( $('.c-css-sheet').html().replace(/<\/?/g,'').replace(/div class="c-css-sheet hide">/g,'').replace(/div>div class="list-of-css-selectors-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/pre>div>/g,'').replace(/ }div>div class="list-of-css-selectors-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/ }/g,'').replace(/pre>/g,'').replace(/div>/g,'').replace(/link href="/g,'<link href="').replace(/css">/g,'css">\n') );
      FinalizePrev();
    });
  });
  $(".add-css-selector-val").on('keyup change', function() {
    if ( $(this).val() === "body" ) {
      $(this).val("");
      alert("Access denied!");
    }
  });
  
  // Adds CSS Link References
  $(".add-css-refer").on('click', function() {
    if ( $(".add-css-refer-val").val() === "" ) {
      alert("Add reference denied because value is blank.");
    } else {
      $(".list-of-css-references").append("<div class='list-of-css-references-container'><a href='javascript:void(0)' class='del-css-refer'><span class='fa fa-times'></span></a> <button>"+ $(".add-css-refer-val").val() +"</button>"+ "<pre style='text-align:left; padding-top:5px; overflow:auto;'>"+ "<link href='"+ $(".add-css-refer-val").val() +"' rel='stylesheet' type='text/css'></pre>" +"</div>");
    
      $(".dadamcssreflist").val("");
      $(".dadamcssrefhtml").html("").html( $(".list-of-css-references").html() );
      $(".dadamcssrefhtml textarea, .dadamcssrefhtml a, .dadamcssrefhtml button").remove();
      $(".dadamcssreflist").val( $('.dadamcssrefhtml').html().replace(/<\/?/g,'').replace(/div class="dadamcssrefhtml hide">/g,'').replace(/div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/pre>div>/g,'').replace(/ }div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/ }/g,'').replace(/pre>/g,'').replace(/div>/g,'').replace(/link href="/g,'<link href="').replace(/css">/g,'css">\n') );
      $(".add-css-refer-val").val("");
      FinalizePrev();
    }
    
    $(".del-css-refer").on('click', function() {
      $(this).parent().remove();
      $(".dadamcssreflist").val("");
      $(".dadamcssrefhtml").html("").html( $(".list-of-css-references").html() );
      $(".dadamcssrefhtml textarea, .dadamcssrefhtml a, .dadamcssrefhtml button").remove();
      $(".dadamcssreflist").val( $('.dadamcssrefhtml').html().replace(/<\/?/g,'').replace(/div class="dadamcssrefhtml hide">/g,'').replace(/div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/pre>div>/g,'').replace(/ }div>div class="list-of-css-references-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/ }/g,'').replace(/pre>/g,'').replace(/div>/g,'').replace(/link href="/g,'<link href="').replace(/css">/g,'css">\n') );
      FinalizePrev();
    });
  });
  
  // Adds Media Queries
  $(".add-media-query").on('click', function() {
    $('.yourcss').html($('.canves').html());
    $('.yourcss').children("*").html("");
    $(".yourcss *").removeAttr('id');
    $(".yourcss *").removeAttr('contenteditable');
    $(".dadammediaquery").val($(".yourcss").html().replace(/<\/?/g,'').replace(/header /g,'').replace(/div /g,'').replace(/span /g,'').replace(/footer /g,'').replace(/class="/g,'.').replace(/header/g,'').replace(/div/g,'').replace(/span/g,'').replace(/footer/g,'').replace(/style="/g,'{\n  ').replace(/;/g,';\n ').replace(/:/g,': ').replace(/:  /g,': ').replace(/"/g,'').replace(/ >>/g,'}').replace(/>>/g,' {}').replace(/}/g,'}\n\n'));
    
    $(".list-of-media-queries").append("<div class='list-of-media-queries-container'><a href='javascript:void(0)' class='del-media-query'><span class='fa fa-times'></span></a> <button>"+ $(".cwidth").val() +"px</button>"+ "<pre style='text-align:left; padding-top:5px; overflow:auto;'>"+ "@media all and (max-width:"+ $(".cwidth").val() +"px) { \n\n" + $(".dadammediaquery").val() +" }</pre>" +"</div>");
    
    $(".dadammediaquerylist").val("");
    $(".dadammediaqueryshtml").html("").html( $(".list-of-media-queries").html() );
    $(".dadammediaqueryshtml textarea, .dadammediaqueryshtml a, .dadammediaqueryshtml button").remove();
    $(".dadammediaquerylist").val( $('.dadammediaqueryshtml').html().replace(/<\/?/g,'').replace(/div class="dadammediaqueryshtml hide">/g,'').replace(/div>div class="list-of-media-queries-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/pre>div>/g,'').replace(/ }div>div class="list-of-media-queries-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,' }').replace(/ }/g,'}').replace(/}pre>/g,'}') + "\n" );
    
    $(".del-media-query").on('click', function() {
      $(this).parent().remove();
      $(".dadammediaquerylist").val("");
      $(".dadammediaqueryshtml").html("").html( $(".list-of-media-queries").html() );
      $(".dadammediaqueryshtml textarea, .dadammediaqueryshtml a, .dadammediaqueryshtml button").remove();
      $(".dadammediaquerylist").val( $('.dadammediaqueryshtml').html().replace(/<\/?/g,'').replace(/div class="dadammediaqueryshtml hide">/g,'').replace(/div>div class="list-of-media-queries-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,'').replace(/pre>div>/g,'').replace(/ }div>div class="list-of-media-queries-container"> pre style="text-align:left; padding-top:5px; overflow:auto;">/g,' }').replace(/ }/g,'}').replace(/}pre>/g,'}') );
      FinalizePrev();
    });
  });
  $(".list-of-media-queries-container button").on('click', function() {
    $(".cwidth").val( $(this).text().replace(/px/g,'') ).trigger('change');
  });
  
  // Add Elements
  $(".add-elm").on('click', function() {
    $(".canves").append('<'+ $(this).text() +' class="box" style="">'+ $(this).text() +'</'+ $(this).text() +'>');
  });
  
  // Set & Adjust Canvas Size
  $(function() {
    $('.cwidth').attr('max', $('.canves').width()).val($('.canves, #workflow').width());
    $('.cwidth').on('mousedown touchstart', function(e) {
        $('.media-query-slider').show();
      $('.cwidth').on('mouseup touchend', function(e) {
        $('.media-query-slider').hide();
      });
    });
    
    $('.cwidth').on('change', function() {
      $('.canves, #workflow').css({
        'width' : $('.cwidth').val() + 'px'
      });
    });
    
    $(document).on('mousemove touchmove change', function(e) {
      $('.media-query-slider').text( $('.cwidth').val() + "px" ).css({
        left: e.pageX - $('.media-query-slider').width() / 1.25 + "px"
      });
    });
  });
  
  // Autocomplete Search
  $(".search4urdamelms").on('keyup change', function() {
    var $val = $(this).val();
      
    if($.inArray($val.toLowerCase(), ["save"]) > -1) {
      var x = window.confirm("Are you sure you wish to save?")
      if (x)
        saveTextAsHTML();
      else
        return false;
    }
    
    if($.inArray($val.toLowerCase(), ["all"]) > -1) {
      $("." + $(".dialogs option:selected").val() + " .drop").css('color', '#999').next().show();
    }
    
    if($.inArray($val.toLowerCase(), ["none"]) > -1) {
      $("." + $(".dialogs option:selected").val() + " .drop").css('color', '#666').next().hide();
    }
    
    if($.inArray($val.toLowerCase(), ["tool options"]) > -1) {
      $("." + $(".dialogs option:selected").val() + " .drop").css('color', '#666').next().hide();
      $(".grab-"+ $val.toLowerCase().replace(/ /g, "-")).css( "color", "#999" ).next().show();
    }
    
    if($.inArray($val.toLowerCase(), ["global styles"]) > -1) {
      $("." + $(".dialogs option:selected").val() + " .drop").css('color', '#666').next().hide();
      $(".grab-tool-options").css( "color", "#999" ).next().show();
      $(".list-of-css-selectors").css( "color", "#999" ).next().show();
    }
    
    if($.inArray($val.toLowerCase(), ["size", "background", "border", "typography", "advanced"]) > -1) {
      $("." + $(".dialogs option:selected").val() + " .drop").css('color', '#666').next().hide();
      $(".grab-"+ $val.toLowerCase()).css( "color", "#999" ).next().show();
    }
  });
  
  // Misc
  $(function() {
    // Hide onload
    $(".select-properties, #preview-pane").hide();
    $(".canves").html("");
    $(".dadammediaquery, .css-sheet, .html-sheet, .dadammediaquerylist").val("");

    // Toggle Design Visibility
    $(function(){
      if ($(this).prop('checked') === true ) {
        $(".canves").hide();
        $("#preview-pane").show();
        
        if ($('.select-active, .edit-active, .remove-active').is(':visible')) {
          $('.select-active, .edit-active, .remove-active').trigger('click');
        }
        FinalizePrev();
      }
      if ($(this).prop('checked') === false ) {
        $(".canves").show();
        $("#preview-pane").hide();
        FinalizePrev();
      }
      $('.toggle-workflow-visibility').on('change', function(){
        if ($(this).prop('checked') === true ) {
          $(".canves").hide();
          $("#preview-pane").show();
        
          if ($('.select-active, .edit-active, .remove-active').is(':visible')) {
            $('.select-active, .edit-active, .remove-active').trigger('click');
          }
          
          FinalizePrev();
        }
        if ($(this).prop('checked') === false ) {
          $(".canves").show();
          $("#preview-pane").hide();
          FinalizePrev();
        }
      });
    });
    
    // New and Save Document
    $('.new-doc').on('click', function() {
      var x = window.confirm("Are you sure you wish to start a new project?\nAll your changes will be removed once MMD restarts. ")
      if (x)
        location.reload(true);
      else
        return false;
      
    });
    $(".open-save-dialog").on('click', function() {
      FinalizePrev();
      var x = window.confirm("Are you sure you wish to save?")
      if (x)
        saveTextAsHTML();
      else
        return false;
        
      return false;
    });
    
    // Toggle Options Panel Visibility
    $(".hide-options").click(function() {
      $(".show-options").slideDown();
      $(".disismyfukentoolbuxhhehahooo").animate({
        right : "-300px"
      }, 200);
      $(".itsthecavnescontainerbro").animate({
        top : "36px"
      }, 200);
      $(".cwidth-containment, .itsthecavnescontainerbro, #idive-container, .ruler-container").animate({
        right : "0px"
      }, 200);
      $('.cwidth').attr('max', $(window).width()).val($(window).width());
      $('.canves, #workflow').css({'width': '100%'});
      $('.ruler').empty();
      createRuler(); 
    });
    $(".show-options").click(function () {
      $(this).slideUp();
      $(".disismyfukentoolbuxhhehahooo").animate({
        right : "0px"
      }, 200);
      $(".itsthecavnescontainerbro").animate({
        top : "25px"
      }, 200);
      $(".cwidth-containment, .itsthecavnescontainerbro, #idive-container, .ruler-container").animate({
        right : "300px"
      }, 200);
      $('.cwidth').attr('max', $(window).width() - 300).val($(window).width() - 300);
      $('.canves, #workflow').css({'width': '100%'});
      $('.ruler').empty();
      createRuler(); 
    });
    
    // Detect Active Tool
    $(".dialogs").on('change', function() {
      var val = $(this).val();
      
      if( $("." + val) && $("." + val).length ){
        $('.show').hide();
        $("." + val).show();
      }
    });
    
    // Toggles Property Containment Area
    $(".drop, .dropp").click(function() {
      $(this).toggleClass('title-active');
      if ($(this).hasClass('title-active')) {
        $(this).css('color', '#666');
        $(this).next().hide();
      } else {
        $(this).css('color', '#999');
        $(this).next().show();
       }
    });
    $('.drop-section a, .dropp-section a').click(function() {
      $(this).toggleClass('active-btn');
    });
  });
});
