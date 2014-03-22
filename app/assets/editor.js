// Call our functions when the page is ready.
$(document).ready(function() {
  var enabled = false,
    elmstyle = false,
    editable = false,
    removeelm = false,
    counter = 2;
        
  // Mirror code
  $(window).on('load change keyup', function() {
    $('.mirror-title').text( $('.website-title').val() );
    $(".mirror-css").text( $('.css-sheet').val() );
    $(".mirror-html").text( $(".html-sheet").val() );
    $('#code').val( $('.mirror-code').text() );
  });
  
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

  // Adds Ruler
  $(window).on('load resize', function() {
    $('.ruler').empty();
    createRuler(); 
  });
  
  // Select Tool
  $('.select-tool').on('click', function() {
    $(".inspector").trigger('click');
    $(this).toggleClass('select-active');
    if ($('.select-active').is(':visible')) {
      $('.dialogs').val('select-properties').trigger('change');
      elmstyle = 1;
      editable = false;
      removeelm = false;
      
      if ($('.remove-active').is(':visible')) {
        $('.remove-active').trigger('click');
      }
      
      if(elmstyle) {
        $('#inactive-menubtns').show();
        
        $(".canves *").on('mousedown touchstart', function() {
          $(".known-class").text($(this).prop('class'));
          $('.canves, .canves *').removeClass('editable');
          $('.canves, .canves *').removeAttr('id');
          $(this).attr('id', 'stylethis');
        });
        
        // Add Class
        $(".add-class").on('click', function() {
          $(".css-sheet").val(function(_, oldVal) {
            return oldVal + "."+ $('.sel-css').val() + " {\n " + $('#stylethis').attr('style').replace(/;/g,';\n') + "}\n\n";
          });
          $(".sel-css").val("");
        });
        $(".sel-css").on('keyup change', function() {
          $("#stylethis").prop('class', $(this).val());
        });

        $('.search4urdamelms, .sel-css').prop('disabled', false);
        $('.select-properties input[type=text]').val("");
        $('.select-properties input[type=checkbox]').prop('checked', false);
        
        $('.borders a').removeClass('border-active').css({
          'border-color': '#a9a9a9',
          'background-color': '#444'
        }); $('.none').css('border-color', '#444').css('border-color', '#444');
        
        // Enable/Disable Styles
        $(function() {
          $('#lsize').on('change', function() {
            if ( $('#lsize').prop('checked') === true  ) {
              $('.grab-elm-size input[type=text]').prop('disabled', false);
            }
            if ( $('#lsize').prop('checked') === false ) {
              $('.grab-elm-size input[type=text]').prop('disabled', true).val("");
            }
          });
          $('#lbg').on('change', function() {
            if ( $('#lbg').prop('checked') === true ) {
              $('.grab-elm-bg input[type=text]').prop('disabled', false);
            }
            if ( $('#lbg').prop('checked') === false ) {
              $('.grab-elm-bg input[type=text]').prop('disabled', true).val("");
            }
          });
          $('#lborder').on('change', function() {
            if ( $('#lborder').prop('checked') === true ) {
              $('.grab-elm-border input[type=text]').prop('disabled', false);
            }
            if ( $('#lborder').prop('checked') === false ) {
              $('.grab-elm-border input[type=text]').prop('disabled', true).val("");
            }
            $(function() {
              if ( $('.border-top').prop('checked') === true ) {
                $('#lborder').prop('checked', true);
                $('.apply-border input[type=text]').prop('disabled', false).prop('enabled', true);
              }
              if ( $('.border-left').prop('checked') === true ) {
                $('#lborder').prop('checked', true);
                $('.apply-border input[type=text]').prop('disabled', false).prop('enabled', true);
              }
              if ( $('.border-bottom').prop('checked') === true ) {
                $('#lborder').prop('checked', true);
                $('.apply-border input[type=text]').prop('disabled', false).prop('enabled', true);
              }
              if ( $('.border-right').prop('checked') === true ) {
                $('#lborder').prop('checked', true);
                $('.apply-border input[type=text]').prop('disabled', false).prop('enabled', true);
              }
              if ( $('.border-radius-top-left').prop('checked') === true ) {
                $('#lborder').prop('checked', true);
                $('.apply-border input[type=text]').prop('disabled', false).prop('enabled', true);
              }
              if ( $('.border-radius-top-right').prop('checked') === true ) {
                $('#lborder').prop('checked', true);
                $('.apply-border input[type=text]').prop('disabled', false).prop('enabled', true);
              }
              if ( $('.border-radius-bottom-left').prop('checked') === true ) {
                $('#lborder').prop('checked', true);
                $('.apply-border input[type=text]').prop('disabled', false).prop('enabled', true);
              }
              if ( $('.border-radius-bottom-right').prop('checked') === true ) {
                $('#lborder').prop('checked', true);
                $('.apply-border input[type=text]').prop('disabled', false).prop('enabled', true);
              }
            });
          });
          $('#ltypography').on('change', function() {
            if ( $('#ltypography').prop('checked') === true ) {
              $('.grabmy-typography a').css('backgroundColor', '#444');
              $('.grab-elm-typography input[type=text]').prop('disabled', false).val("");
            }
            if ( $('#ltypography').prop('checked') === false ) {
              $('.grabmy-typography a').css('backgroundColor', '#444');
              $('.grab-elm-typography input[type=text]').prop('disabled', true);
            }
          });
          $('#ladvanced').on('change', function() {
            if ( $('#ladvanced').prop('checked') === true ) {
              $('.grab-elm-advanced-opt input[type=text]').prop('disabled', false);
            }
            if ( $('#ladvanced').prop('checked') === false ) {
              $('.grab-elm-advanced-opt input[type=text]').prop('disabled', true);
            }
          });
        });
        
        // Set selected elements font family
        $('.grab-typography a').click(function() {
          $("#stylethis").css({
            'font-family': $(this).text()
          });
          $('.grab-typography a').css('backgroundColor', '#444');
          $(this).css('backgroundColor', '#1c1c1c');
          $('.grab-font-family').val($(this).text());
          $("#ltypography").prop('checked', true);
        });
        
        // Set selected elements text align
        $('.grab-txt-align a').click(function() {
          $("#stylethis").css({
            'text-align': $(this).attr('title')
          });
          $('.grab-txt-align a').css('backgroundColor', '#444');
          $(this).css('backgroundColor', '#1c1c1c');
          $('.grab-text-align').val($(this).attr('title'));
          $("#ltypography").prop('checked', true);
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
            }
            
            if ($(this).prop('checked') === false) {
              $("#stylethis").css({
                'background-attachment': "scroll"
              });
            }
          });
          
          // BG Color Picker - Setup Hue Saturation Value & Alpha
          $(".bg-cpick-hue, .bg-cpick-s, .bg-cpick-l, .bg-cpick-a").on('change', function() {
            $(".bg-cpick-code-hsl").trigger('change');
          });
          $(".bg-cpick-s").css({
            "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".bg-cpick-hue").val() + "," + $(".bg-cpick-s").val() + "%," + $(".bg-cpick-l").val() + "%)" + " 100%)"
          });
          $(".bg-cpick-l").css({
            "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".bg-cpick-hue").val() + "," + $(".bg-cpick-s").val() + "%," + $(".bg-cpick-l").val() + "%) 50%,#ffffff 100%)"
          });
          $(".bg-cpick-a").css({
            "background": "linear-gradient(to right, rgba(51,51,51,0) 0%," + "hsl(" + $(".bg-cpick-hue").val() + "," + $(".bg-cpick-s").val() + "%," + $(".bg-cpick-l").val() + "%)" + " 100%)"
          });
          
          // Setup Color Picker Code
          $(".bg-cpick-code-hsl").on('change keyup', function() {
            $(this).val( "hsla(" + $(".bg-cpick-hue").val() + ", " + $(".bg-cpick-s").val() + "%, " + $(".bg-cpick-l").val() + "%, " + $(".bg-cpick-a").val() + ")");
            
            // Initiate hsl preview
            $(".grab-bg-color").css({
              "background": $(".bg-cpick-code-hsl").val(),
              "border-color": $(".bg-cpick-code-hsl").val()
            });
            
            $(".bg-cpick-code-rgb").val( $(".grab-bg-color").css("backgroundColor") );
            $("#stylethis").css('backgroundColor', $(".bg-cpick-code-rgb").val());
            
            // Alpha Saturation
            $(".bg-cpick-s").css({
              "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".bg-cpick-hue").val() + "," + $(".bg-cpick-s").val() + "%," + $(".bg-cpick-l").val() + "%)" + " 100%)"
            });
            
            // Alpha Lightness
            $(".bg-cpick-l").css({
              "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".bg-cpick-hue").val() + "," + $(".bg-cpick-s").val() + "%," + $(".bg-cpick-l").val() + "%) 50%,#ffffff 100%)"
            });
            
            // Alpha Preview
            $(".bg-cpick-a").css({
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
          $(".cpick-s").css({
            "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".cpick-hue").val() + "," + $(".cpick-s").val() + "%," + $(".cpick-l").val() + "%)" + " 100%)"
          });
          $(".cpick-l").css({
            "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".cpick-hue").val() + "," + $(".cpick-s").val() + "%," + $(".cpick-l").val() + "%) 50%,#ffffff 100%)"
          });
          $(".cpick-a").css({
            "background": "linear-gradient(to right, rgba(51,51,51,0) 0%," + "hsl(" + $(".cpick-hue").val() + "," + $(".cpick-s").val() + "%," + $(".cpick-l").val() + "%)" + " 100%)"
          });
          
          // Setup Color Picker Code
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
            $(".cpick-s").css({
              "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".cpick-hue").val() + "," + $(".cpick-s").val() + "%," + $(".cpick-l").val() + "%)" + " 100%)"
            });
            
            // Alpha Lightness
            $(".cpick-l").css({
              "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".cpick-hue").val() + "," + $(".cpick-s").val() + "%," + $(".cpick-l").val() + "%) 50%,#ffffff 100%)"
            });
            
            // Alpha Preview
            $(".cpick-a").css({
              "background": "linear-gradient(to right, rgba(51,51,51,0) 0%," + "hsl(" + $(".cpick-hue").val() + "," + $(".cpick-s").val() + "%," + $(".cpick-l").val() + "%)" + " 100%)"
            });
          });

          // Initiate rgb preview
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
              $("#stylethis").css({'border-top-width': $('.border-size-all').val() + "px"});
            }
            
            if($('.border-right').is(':checked')) {
              $("#stylethis").css({'border-right-width': $('.border-size-all').val() + "px"});
            }
            
            if($('.border-bottom').is(':checked')) {
              $("#stylethis").css({'border-bottom-width': $('.border-size-all').val() + "px"});
            }
            
            if($('.border-left').is(':checked')) {
              $("#stylethis").css({'border-left-width': $('.border-size-all').val() + "px"});
            }
          });
          $('.border-radius-all').on('change', function() {
            if($('.border-radius-top-left').is(':checked')) {
              $("#stylethis").css({'border-top-left-radius': $('.border-radius-all').val() + "px"});
            }
            
            if($('.border-radius-top-right').is(':checked')) {
              $("#stylethis").css({'border-top-right-radius': $('.border-radius-all').val() + "px"});
            }
            
            if($('.border-radius-bottom-left').is(':checked')) {
              $("#stylethis").css({'border-bottom-left-radius': $('.border-radius-all').val() + "px"});
            }
            
            if($('.border-radius-bottom-right').is(':checked')) {
              $("#stylethis").css({'border-bottom-right-radius': $('.border-radius-all').val() + "px"});
            }
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
          // Text Color Picker - Setup Hue Saturation Value & Alpha
          $(".txt-cpick-hue, .txt-cpick-s, .txt-cpick-l, .txt-cpick-a").on('change', function() {
            $(".txt-cpick-code-hsl").trigger('change');
          });
          $(".txt-cpick-s").css({
            "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".txt-cpick-hue").val() + "," + $(".txt-cpick-s").val() + "%," + $(".txt-cpick-l").val() + "%)" + " 100%)"
          });
          $(".txt-cpick-l").css({
            "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".txt-cpick-hue").val() + "," + $(".txt-cpick-s").val() + "%," + $(".txt-cpick-l").val() + "%) 50%,#ffffff 100%)"
          });
          $(".txt-cpick-a").css({
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
            $(".txt-cpick-s").css({
              "background": "linear-gradient(to right, #7f7f80 0%," + "hsl(" + $(".txt-cpick-hue").val() + "," + $(".txt-cpick-s").val() + "%," + $(".txt-cpick-l").val() + "%)" + " 100%)"
            });
            
            // Alpha Lightness
            $(".txt-cpick-l").css({
              "background": "linear-gradient(to right, #000000 0%," + "hsl(" + $(".txt-cpick-hue").val() + "," + $(".txt-cpick-s").val() + "%," + $(".txt-cpick-l").val() + "%) 50%,#ffffff 100%)"
            });
            
            // Alpha Preview
            $(".txt-cpick-a").css({
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
              'opacity': $('.grab-opacity').val(),
              'overflow': $('.grab-overflow').val(),
              'transition': $('.grab-transition').val(),
              'resize': $('.grab-resize').val()
            });
          });
        });
      }
      
      $('.enable-inline-editing').on('change', function() {
        if( $(this).prop('checked') === true) {
          elmstyle = false;
          removeelm = false;
          editable = 1;
          // Manipulate Inline Elements
          $('.select-properties input[type=text]').val("");
          $('#inactive-menubtns').hide();
          $('#idive select#elm-font-family').on('click change', function(e) {
            document.execCommand('FontName',false,$(this).val());
          });
          $('#idive select#elm-font-size').on('click change', function(e) {
            document.execCommand('FontSize',false,$(this).val());
          });
          $('#idive a#txtcolor').click(function(e) {
            document.execCommand('ForeColor',false,$('.txt-cpick-code-rgb').val());
          });
          $('#idive a#backcolor').click(function(e) {
            document.execCommand('BackColor',false,$('.txt-cpick-code-rgb').val());
          });
          $('#idive select#elm-txt-align').on('click change', function(e) {
            document.execCommand($(this).val(),false,null);
          });
          $('#idive select#elm-heading').on('click change', function(e) {
            document.execCommand('formatBlock',false,$(this).val());
          });
          $('.insert-html').on('click', function(e) {
            var HTMLCode = prompt('Enter HTML code', ''); if(HTMLCode != null) {$('.editable').focus(); pasteHtmlAtCaret(HTMLCode); }
          });
          if(editable) {
            $('.canves *').removeClass('editable').on('mousedown touchstart', function() {
              if(editable) {
                $('.canves *').removeClass('editable');
                $(this).addClass('editable').attr('contenteditable', true);
              }
            });
          }
          e.preventDefault();
        }
        if( $(this).prop('checked') === false) {
          elmstyle = 1;
          editable = false;
          $('#inactive-menubtns').show();
          $('.search4urdamelms').prop('disabled', false);
          $('.canves *').removeClass('editable');
          $('.canves *').attr('contenteditable', false);
          
          $('.borders a').removeClass('border-active').css({
            'border-color': '#a9a9a9',
            'background-color': '#444'
          }); $('.none').css('border-color', '#444').css('border-color', '#444');
        }
      });
    } else {
      elmstyle = false;
      editable = false;
      $('.select-properties').hide();
      $('.starter-properties').show();
      $('.canves, .canves *').removeClass('editable');
      $('.canves, .canves *').removeAttr('id');
      $('.canves').children().removeAttr('id');
      $('.canves').find('*').removeAttr('id');
      $('.canves *').attr('contenteditable', false);
      $('#inactive-menubtns').show();
      return false;
    }
  });
  $('.canves').on('mousedown touchstart', function(e) {
    if(editable) {
      $('.canves *').attr('contenteditable', true);
    }
  });
  
  // Remove Tool
  $(".remove-tool").click(function() {
    $(".inspector").trigger('click');
    $(this).toggleClass('remove-active');
    if ($('.remove-active').is(':visible')) {
      elmstyle = false;
      editable = false,
      removeelm = 1;
      $(".starter-properties").show();
      $(".select-properties").hide();
      
      if(removeelm) {
        $('.canves *').on('mousedown touchstart', function() {
          if(removeelm) {
            $(this).remove();
          }
        });
      }
      
      if ($('.select-active').is(':visible')) {
        $('.select-active').trigger('click');
      }
	
      e.preventDefault();
    } else {
      removeelm = false;
      return false;
    }
  });
  
  // Add Elements
  $(".header").on('click', function() {
    $(".canves").append("<header>Header</header>");
  });
  $(".div").on('click', function() {
    $(".canves").append("<div>Div</div>");
  });
  $(".footer").on('click', function() {
    $(".canves").append("<footer>Footer</header>");
  });
  
  // Set & Adjust Canvas Size
  $(function() {
    $('.cwidth').attr('max', $('.canves').width()).val($('.canves').width());
    $('.cwidth').on('mousedown touchstart', function(e) {
        $('.media-query-slider').show();
      $('.cwidth').on('mouseup touchend', function(e) {
        $('.media-query-slider').hide();
      });
    });
    
    $('.cwidth').on('change', function() {
      $('.canves').css({
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
      saveTextAsHTML();
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
    
    if($.inArray($val.toLowerCase(), ["size", "background", "border", "typography", "advanced"]) > -1) {
      $("." + $(".dialogs option:selected").val() + " .drop").css('color', '#666').next().hide();
      $(".grab-"+ $val.toLowerCase()).css( "color", "#999" ).next().show();
    }
  });
  
  // Misc
  $(function() {
    // Hide onload
    $(".select-properties").hide();
    $(".css-sheet, .html-sheet").val("");
    
    // New and Save Document
    $('.new-doc').on('click', function() {
      $(".canves").html("");
      $('.mirror-title').text( $('.website-title').val("New Document") );
    });
    $(".open-save-dialog").on('click', function() {
      $(".yourhtml").html($(".canves").html());
      $(".yourhtml *").removeAttr('style');
      $(".html-sheet").val($(".yourhtml").html().replace(/>/g,'>\n    ').replace(/</g,'\n  <'));
      $('.mirror-title').text( $('.website-title').val() );
      $(".mirror-css").text( $('.css-sheet').val() );
      $(".mirror-html").text( $(".html-sheet").val() );
      $('#code').val( $('.mirror-code').text() );
      saveTextAsHTML();
      return false;
    });
    
    // Toggle Options Panel Visibility (Hide)
    $(".hide-options").click(function() {
      $(".show-options").slideDown();
      $(".disismyfukentoolbuxhhehahooo").animate({
        right : "-300px"
      }, 200);
      $(".container").animate({
        top : "36px"
      }, 200);
      $(".cwidth-containment, .container, #idive-container, .ruler-container").animate({
        right : "0px"
      }, 200);
      $('.cwidth').attr('max', $(window).width()).val($(window).width());
      $('.canves').css({'width': '100%'});
      $('.ruler').empty();
      createRuler(); 
    });
      
    // Toggle Options Panel Visibility (Show)
    $(".show-options").click(function () {
      $(this).slideUp();
      $(".disismyfukentoolbuxhhehahooo").animate({
        right : "0px"
      }, 200);
      $(".container").animate({
        top : "25px"
      }, 200);
      $(".cwidth-containment, .container, #idive-container, .ruler-container").animate({
        right : "300px"
      }, 200);
      $('.cwidth').attr('max', $(window).width() - 300).val($(window).width() - 300);
      $('.canves').css({'width': '100%'});
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
    $(".drop").click(function() {
      $(this).toggleClass('title-active');
      if ($(this).hasClass('title-active')) {
        $(this).css('color', '#666');
        $(this).next().hide();
      } else {
        $(this).css('color', '#999');
        $(this).next().show();
       }
    });

    // Handles Drop Section Styles
    $('.drop-section a').click(function() {
      $(this).toggleClass('active-btn');
    });
  });
});
