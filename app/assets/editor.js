// Call our functions when the page is ready.
$(document).ready(function() {
  // Defines our variables
  var enabled = false,
    cbody = $('.canves'),
    drawable = false,
    drawing  = false,
    onresize = false,
    movediv = false,
    adddiv = false,
    editable = false,
    removediv = false,
    mymenu = false,
    mS = {}, // mouse start 
    dBox;
    
  // Mirror code
  $(window).on('load mousedown touchstart mouseup touchend change keyup', function() {
    $('.mirror-title').text($('.website-title').val());
    $('.mirror-html').text($('.canves').html());
    $('#code').val($('.mirror-code').text());
  });
  
  // Hide onload
  $(".hair, #mousepos, .groups-sec").hide();
  
  // Select Tool
  $('.select-tool').click(function() {
    $(".inspector").trigger('click');
    $(this).toggleClass('select-active');
    if ($('.select-active').is(':visible')) {
      $('.dialogs').val('select-properties').trigger('change');
      movediv = 1;
      drawable = false;
      editable = false,
      removediv = false;
      
      // If other tools are visible hide them
      if ($('.draw-active, .edit-active, .remove-active, .table-active').is(':visible')) {
        $('.draw-active, .edit-active, .remove-active, .table-active').trigger('click');
      }
      
      if(movediv) {
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
          if ( dd.attrd.indexOf("moveable") > -1 ){
            props.top = dd.offsetY;
            props.left = dd.offsetX;
          }
          $('#moveable').css( props );
        }, {relative:true});
        
        $('.canves *').on('mousedown touchstart', function(e) {
          if(movediv) {
            // Shows selected element's position
            $('.elmpos').show().css({
              top: e.pageY + 'px',
              left: e.pageX + 'px'
            }, 800).html("T: " + $(this).css('top') + ", L: " + $(this).css('left') + ", B: " + $(this).css('bottom') + ", R: " + $(this).css('right') + "<br /> W: " + $(this).css('width') + " H: " + $(this).css('height'));
            
            // Add moveable class
            $('.handle, .NN, .NE, .EE, .SE, .SS, .SW, .WW, .NW').remove();
            $('.canves, .canves *').removeAttr('id')
            $(this).attr('id', 'moveable').append('<div class="handle NE"></div> <div class="handle NN"></div> <div class="handle NW"></div> <div class="handle WW"></div> <div class="handle EE"></div> <div class="handle SW"></div> <div class="handle SS"></div> <div class="handle SE"></div>');
            $('.canves *').on('mousemove touchmove', function(e) {
              $('.elmpos').css({
                top: e.pageY + 'px',
                left: e.pageX + 'px'
              }, 800).html("T: " + $(this).css('top') + ", L: " + $(this).css('left') + ", B: " + $(this).css('bottom') + ", R: " + $(this).css('right') + "<br /> W: " + $(this).css('width') + " H: " + $(this).css('height'));
            });
            
            // First we must detect our selection
            $('.find-elm-name').text(this.nodeName.toLowerCase());
            $('.findclassname').val($(this).attr('class'));
            $('.grab-postop').val($(this).css('top'));
            $('.grab-posleft').val($(this).css('left'));
            $('.grab-posbottom').val($(this).css('bottom'));
            $('.grab-posright').val($(this).css('right'));
            $('.grab-width').val($(this).css('width'));
            $('.grab-height').val($(this).css('height'));
            $('.grab-bg-url').val($(this).css('background-image'));
            $('.grab-bg-position').val($(this).css('background-position'));
            $('.grab-bg-repeat').val($(this).css('background-repeat'));
            $('.grab-bg-size').val($(this).css('background-size'));
            $('.grab-bg-color').val($(this).css('background-color'));
            
            $('.cpick-code-rgb').val($(this).css('borderColor'));
            $('.grab-border-color').css({
              'background': $(this).css('backgroundColor'),
              'border-color': $(this).css('borderColor')
            });
            
            $('.border-size-all').val($(this).css('borderWidth').replace(/px/g,""));
            $('.show-border-size').val($(this).css('borderWidth'));
            $('.border-radius-all').val($(this).css('borderRadius').replace(/px/g,""));
            $('.show-border-radius').val($(this).css('borderRadius'));
            
            $('.txt-cpick-code-rgb').val($(this).css('color'));
            $('.grab-txt-color').css({
              'background': $(this).css('color'),
              'border-color': $(this).css('color')
            });
            
            $('.grab-font-size-int').val($(this).css('font-size').replace(/px/g,""));
            $('.grab-font-size').val($(this).css('font-size'));
            $('.grab-font-family').val($(this).css('font-family').toLowerCase());
            $('.grab-line-height').val($(this).css('line-height'));
            $('.grab-letter-spacing').val($(this).css('letter-spacing'));
            $('.grab-word-spacing').val($(this).css('word-spacing'));
            $('.grab-text-transform').val($(this).css('text-transform'));
            $('.grab-text-align').val($(this).css('text-align'));
            $('.grab-word-wrap').val($(this).css('word-wrap'));
            $('.grab-white-space').val($(this).css('white-space'));
            $('.grab-display').val($(this).css('display'));
            $('.grab-padding').val($(this).css('padding'));
            $('.grab-margin').val($(this).css('margin'));
            $('.grab-overflow').val($(this).css('overflow'));
            $('.grab-transition').val($(this).css('transition'));
            $('.grab-transform').val($(this).css('transform'));
            $('.grab-filter').val($(this).css('filter'));
            $('.select-properties input[type=checkbox]').prop('checked', 'checked');
            $('.check-inputs').find('input[type=text]').prop('enabled', true);
            $('.check-inputs').find('input[type=text]').prop('disabled', false);
            
            // Changes Class Name
            $('.findclassname').on('keyup change', function() {
              $('#moveable').attr('class', '');
              $('#moveable').attr('class', $(this).val());
            });
            
            // Show position & size changes onmove
            if(movediv) {
              $(this).on('mousedown touchstart', function() {
                $(this).on('mousemove touchmove', function() {
                  if(movediv) {
                    $('.grab-postop').val($(this).css('top'));
                    $('.grab-posleft').val($(this).css('left'));
                    $('.grab-posbottom').val($(this).css('bottom'));
                    $('.grab-posright').val($(this).css('right'));
                    $('.grab-width').val($(this).css('width'));
                    $('.grab-height').val($(this).css('height'));
                  }
                });
              });
            }
            
            // Detect FontFamily
            var fontFamily = $(this).css('font-family').toLowerCase().replace(/ /g, '-');
            $('.grab-' + fontFamily).trigger('click');
            $('.setmy-typography a').css('backgroundColor', '#444');
            $('.grab-' + fontFamily).css('backgroundColor', '#1c1c1c');
            
            // Detect Text Align
            var txtAlign = $(this).css('text-align').toLowerCase().replace(/ /g, '-');
            $('.grab-align-' + txtAlign).trigger('click');
            $('.grab-txt-align a').css('backgroundColor', '#444');
            $('.grab-align-' + txtAlign).css('backgroundColor', '#1c1c1c');
            
            // Detect BorderStyle
            var borderStyle = $(this).css('border-style').toLowerCase().replace(/ /g, '-');
            $('.set-' + borderStyle).trigger('click');
            $('.set-borders a').css('backgroundColor', '#444');
            $('.set-' + borderStyle).css('backgroundColor', '#1c1c1c');
          }
        });
        
        $('.canves *').on('mouseup touchend', function() {
          $('.elmpos').hide();
        });
        
        $('.grab-pos-static').css('backgroundColor', '#444');
        $('.grab-pos-relative').css('backgroundColor', '#444');
        $('.grab-pos-absolute').css('backgroundColor', '#444');
        $('.grab-pos-fixed').css('backgroundColor', '#444');
        
        // If moduals are checked enable texboxs if unchecked disable textboxs
        $('.check-inputs').find('input[type=text]').prop('disabled', true);
        
        $('#lpos').on('change', function() {
          $('.grab-elm-pos').find('input[type=text]')
          .prop('disabled', !this.checked)
          .val(this.checked ? "" : "");
        });
        $('#lsize').on('change', function() {
          $('.grab-elm-size').find('input[type=text]')
          .prop('disabled', !this.checked)
          .val(this.checked ? "" : "");
        });
        $('#lbg').on('change', function() {
          $('.grab-elm-bg').find('input[type=text]')
          .prop('disabled', !this.checked)
          .val(this.checked ? "" : "");
        });
        $('#lborder').on('change', function() {
          $('.grab-elm-border').find('input[type=text]')
          .prop('disabled', !this.checked)
          .val(this.checked ? "" : "");
        });
        $('#ltypography').on('change', function() {
          $('.grab-elm-typography').find('input[type=text]')
          .prop('disabled', !this.checked)
          .val(this.checked ? "" : "");
        });
        $('#ladvanced').on('change', function() {
          $('.grab-elm-advanced-opt').find('input[type=text]')
          .prop('disabled', !this.checked)
          .val(this.checked ? "" : "");
        });
        
        // Detect/Set selected elements font family
        $('.grabmy-typography a').click(function() {
          $("#moveable").css({
            'font-family': $(this).text()
          });
          $('.grabmy-typography a').css('backgroundColor', '#444');
          $(this).css('backgroundColor', '#1c1c1c');
          $('.grab-font-family').val($(this).text());
        });
        
        // Detect/Set selected elements text align
        $('.grab-txt-align a').click(function() {
          $("#moveable").css({
            'text-align': $(this).attr('title')
          });
          $('.grab-txt-align a').css('backgroundColor', '#444');
          $(this).css('backgroundColor', '#1c1c1c');
          $('.grab-text-align').val($(this).attr('title'));
        });
        
        // Detect/Set selected elements position
        if ($(this).css('position') === 'static') {
          $('.grab-pos-static').css('backgroundColor', '#1c1c1c');
          $('.grab-pos-relative').css('backgroundColor', '#444');
          $('.grab-pos-absolute').css('backgroundColor', '#444');
          $('.grab-pos-fixed').css('backgroundColor', '#444');
        }
        
        if ($(this).css('position') === 'relative') {
          $('.grab-pos-static').css('backgroundColor', '#444');
          $('.grab-pos-relative').css('backgroundColor', '#1c1c1c');
          $('.grab-pos-absolute').css('backgroundColor', '#444');
          $('.grab-pos-fixed').css('backgroundColor', '#444');
        }
        
        if ($(this).css('position') === 'absolute') {
          $('.grab-pos-static').css('backgroundColor', '#444');
          $('.grab-pos-relative').css('backgroundColor', '#444');
          $('.grab-pos-absolute').css('backgroundColor', '#1c1c1c');
          $('.grab-pos-fixed').css('backgroundColor', '#444');
        }
        
        if ($(this).css('position') === 'fixed') {
          $('.grab-pos-static').css('backgroundColor', '#444');
          $('.grab-pos-relative').css('backgroundColor', '#444');
          $('.grab-pos-absolute').css('backgroundColor', '#444');
          $('.grab-pos-fixed').css('backgroundColor', '#1c1c1c');
        }
        
        // Set position
        $('.grab-elm-pos a').click(function() {
          $("#moveable").css({
            'position': $(this).attr('title')
          });
          $('.grab-elm-pos a').css('backgroundColor', '#444');
          $(this).css('backgroundColor', '#1c1c1c');
          $('.grab-pos-val').val($(this).attr('title'));
        });
        
        $('.grab-postop').on('keyup change', function() {
          $("#moveable").css({
            'top': $(this).val()
          });
        });
        
        $('.grab-posleft').on('keyup change', function() {
          $("#moveable").css({
            'left': $(this).val()
          });
        });
        
        $('.grab-posbottom').on('keyup change', function() {
          $("#moveable").css({
            'bottom': $(this).val()
          });
        });
        
        $('.grab-posright').on('keyup change', function() {
          $("#moveable").css({
            'right': $(this).val()
          });
        });
        
        // Set width & height
        $('.grab-width').on('keyup change', function() {
          $("#moveable").css({
            'width': $(this).val()
          });
        });
        
        $('.grab-height').on('keyup change', function() {
          $("#moveable").css({
            'height': $(this).val()
          });
        });
        
        // Set Background
        $('.grab-bg-url').on('keyup change', function() {
          $("#moveable").css({
            'background-image': 'url(' + $(this).val() + ')'
          });
        });
        
        $('.grab-bg-position').on('keyup change', function() {
          $("#moveable").css({
            'background-position': $(this).val()
          });
        });
        
        $('.grab-bg-repeat').on('keyup change', function() {
          $("#moveable").css({
            'background-repeat': $(this).val()
          });
        });
        
        $('.grab-bg-size').on('keyup change', function() {
          $("#moveable").css({
            'background-size': $(this).val()
          });
        });
        
        $('.grab-bg-color').on('keyup change', function() {
          $("#moveable").css({
            'background-color': $(this).val()
          });
        });
        
        // Set border
        $('.grab-none, .grab-solid, .grab-dotted, .grab-dashed, .grab-double, .grab-ridge, .grab-groove, .grab-inset, .grab-outset').on('click', function() {
          $('.grab-border-style').val($(this).attr('title'))
          $("#moveable").css({
            'border-style': $('.grab-border-style').val()
          });
        });
        
        // Border Color Picker - Setup Hue Saturation Value & Alpha
        $(".cpick-hue, .cpick-s, .cpick-l, .cpick-a").on('change', function() {
          $(".cpick-code-hsl").trigger('change');
        });
        
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
          $("#moveable").css('border-color', $(".cpick-code-rgb").val());
          
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
          
          $("#moveable").css('border-color', $(this).val());
        });
        
        $('.grab-border-color').on('mousedown touchstart', function() {
          $('.border-color-picker').toggle();
        }); $('.border-color-picker').hide();
        
        $('.border-size-all').on('change', function() {
          $('.show-border-size').val($(this).val() + 'px');
          
          if($('.border-top').is(':checked')) {
            $("#moveable").css({'border-top-width': $('.show-border-size').val()});
          }
          
          if($('.border-right').is(':checked')) {
            $("#moveable").css({'border-right-width': $('.show-border-size').val()});
          }
          
          if($('.border-bottom').is(':checked')) {
            $("#moveable").css({'border-bottom-width': $('.show-border-size').val()});
          }
          
          if($('.border-left').is(':checked')) {
            $("#moveable").css({'border-left-width': $('.show-border-size').val()});
          }
        }).trigger('change');
        
        $('.border-radius-all').on('change', function() {
          $('.show-border-radius').val($(this).val() + 'px');
          
          if($('.border-radius-top-left').is(':checked')) {
            $("#moveable").css({'border-top-left-radius': $('.show-border-radius').val()});
          }
          
          if($('.border-radius-top-right').is(':checked')) {
            $("#moveable").css({'border-top-right-radius': $('.show-border-radius').val()});
          }
          
          if($('.border-radius-bottom-left').is(':checked')) {
            $("#moveable").css({'border-bottom-left-radius': $('.show-border-radius').val()});
          }
          
          if($('.border-radius-bottom-right').is(':checked')) {
            $("#moveable").css({'border-bottom-right-radius': $('.show-border-radius').val()});
          }
        }).trigger('change');
        
        // Text Color Picker - Setup Hue Saturation Value & Alpha
        $(".txt-cpick-hue, .txt-cpick-s, .txt-cpick-l, .txt-cpick-a").on('change', function() {
          $(".txt-cpick-code-hsl").trigger('change');
        });
        
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
        
        // Setup Color Picker Code
        $(".txt-cpick-code-hsl").on('change keyup', function() {
          $(this).val( "hsla(" + $(".txt-cpick-hue").val() + ", " + $(".txt-cpick-s").val() + "%, " + $(".txt-cpick-l").val() + "%, " + $(".txt-cpick-a").val() + ")");
          
          // Initiate hsl preview
          $(".grab-txt-color").css({
            "background": $(".txt-cpick-code-hsl").val(),
            "border-color": $(".txt-cpick-code-hsl").val()
          });
          
          $(".txt-cpick-code-rgb").val( $(".grab-txt-color").css("backgroundColor") );
          $("#moveable").css('color', $(".txt-cpick-code-rgb").val());
          
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
          
          $("#moveable").css('color', $(this).val());
        });
        
        $('.grab-txt-color').on('mousedown touchstart', function() {
          $('.text-color-picker').toggle();
        }); $('.text-color-picker').hide();
        
        // Set font family
        $('.grab-typography a').each(function(){
          $(this).css('font-family', $(this).text());
        });
        
        $('.grab-font-size-int').on('keyup change', function () {
          $("#moveable").css({
            'font-size': $(this).val() + "px"
          });
          $('.grab-font-size').val( $(this).val() + "px" );
        });
        
        $('.grab-font-size').on('keyup change', function () {
          $(this).attr('size', this.value.length);
          $("#moveable").css({
            'font-size': $(this).val()
          });
          $('.grab-font-size-int').val( $(this).val().replace(/px/g,"") );
        }).trigger('keyup');
        
        $('.grab-font-family').on('keyup change', function() {
          $("#moveable").css({
            'font-family': $(this).val()
          });
        });
        
        $('.enable-line-height').on('change', function() {
          $('.grab-line-height').prop('disabled', !this.checked)
                                .val(this.checked ? "" : "");
        });
        
        $('.grab-line-height').on('keyup change', function() {
          $("#moveable").css({
            'line-height': $(this).val()
          });
        });
        
        $('.enable-letter-spacing').on('change', function() {
          $('.grab-letter-spacing').prop('disabled', !this.checked)
                                   .val(this.checked ? "" : "");
        });
        
        $('.grab-letter-spacing').on('keyup change', function() {
          $("#moveable").css({
            'letter-spacing': $(this).val()
          });
        });
        
        $('.enable-word-spacing').on('change', function() {
          $('.grab-word-spacing').prop('disabled', !this.checked)
                                 .val(this.checked ? "" : "");
        });
        
        $('.grab-word-spacing').on('keyup change', function() {
          $("#moveable").css({
            'word-spacing': $(this).val()
          });
        });
        
        $('.enable-text-transform').on('change', function() {
          $('.grab-text-transform').prop('disabled', !this.checked)
                                   .val(this.checked ? "" : "");
        });
        
        $('.grab-text-transform').on('keyup change', function() {
          $("#moveable").css({
            'text-transform': $(this).val()
          });
        });
        
        $('.enable-text-align').on('change', function() {
          $('.grab-text-align').prop('disabled', !this.checked)
                               .val(this.checked ? "" : "");
        });
        
        $('.grab-text-align').on('keyup change', function() {
          $("#moveable").css({
            'text-align': $(this).val()
          });
        });
        
        $('.enable-word-wrap').on('change', function() {
          $('.grab-word-wrap').prop('disabled', !this.checked)
                              .val(this.checked ? "" : "");
        });
        
        $('.grab-word-wrap').on('keyup change', function() {
          $("#moveable").css({
            'word-wrap': $(this).val()
          });
        });
        
        $('.enable-white-space').on('change', function() {
          $('.grab-white-space').prop('disabled', !this.checked)
                            .val(this.checked ? "" : "");
        });
        
        $('.grab-white-space').on('keyup change', function() {
          $("#moveable").css({
            'white-space': $(this).val()
          });
        });
        
        // Setup Advanced Section
        $('.enable-display').on('change', function() {
          $('.grab-display').prop('disabled', !this.checked)
                            .val(this.checked ? "" : "");
        });

        $('.grab-display').on('keyup change', function() {
          $("#moveable").css({
            'display': $(this).val()
          });
        });
        
        $('.enable-padding').on('change', function() {
          $('.grab-padding').prop('disabled', !this.checked)
                            .val(this.checked ? "0px" : "");
        });

        $('.grab-padding').on('keyup change', function() {
          $("#moveable").css({
            'padding': $(this).val()
          });
        });
        
        $('.enable-margin').on('change', function() {
          $('.grab-margin').prop('disabled', !this.checked)
                            .val(this.checked ? "0px" : "");
        });
        
        $('.grab-margin').on('keyup change', function() {
          $("#moveable").css({
            'margin': $(this).val()
          });
        });
        
        $('.enable-opacity').on('change', function() {
          $('.grab-opacity').prop('disabled', !this.checked)
                            .val(this.checked ? "1" : "");
        });
        
        $('.grab-opacity').on('keyup change', function() {
          $("#moveable").css({
            'opacity': $(this).val()
          });
        });
        
        $('.enable-overflow').on('change', function() {
          $('.grab-overflow').prop('disabled', !this.checked)
                            .val(this.checked ? "auto" : "");
        });
        
        $('.grab-overflow').on('keyup change', function() {
          $("#moveable").css({
            'overflow': $(this).val()
          });
        });
        
        $('.enable-transition').on('change', function() {
          $('.grab-transition').prop('disabled', !this.checked)
                            .val(this.checked ? "all 0s ease 0s" : "");
        });
        
        $('.grab-transition').on('keyup change', function() {
          $("#moveable").css({
            'transition': $(this).val()
          });
        });
        
        $('.enable-transform').on('change', function() {
          $('.grab-transform').prop('disabled', !this.checked)
                            .val(this.checked ? "none" : "");
        });
        
        $('.grab-transform').on('keyup change', function() {
          $("#moveable").css({
            'transform': $(this).val()
          });
        });
        
        $('.enable-filter').on('change', function() {
          $('.grab-filter').prop('disabled', !this.checked)
                            .val(this.checked ? "none" : "");
        });
        
        $('.grab-filter').on('keyup change', function() {
          $("#moveable").css({
            'filter': $(this).val()
          });
        });
      }
      
    } else {
      movediv = false;
      $('.handle, .NN, .NE, .EE, .SE, .SS, .SW, .WW, .NW').remove();
      $('.canves').children().removeAttr('id');
      $('.canves').find('*').removeAttr('id');
      return false;
    }
  });

  // DIV Tool
  $('.draw-tool').click(function() {
    $(".inspector").trigger('click');
    $(this).toggleClass('draw-active');
    if ($('.draw-active').is(':visible')) {
      movediv = false;
      editable = false,
      removediv = false;
      drawable = 1;
      
      $('.dialogs').val('draw-properties').trigger('change');
      $(".starter-properties, .select-properties").hide();
      
      // Disable div drag selections.
      $('.canves').addClass('noselect');
      
      if ($('.select-active, .remove-active, .table-active, .edit-active').is(':visible')) {
        $('.select-active, .remove-active, .table-active, .edit-active').trigger('click');
      }
    } else {
      drawable = false;
      // Enable drag selections.
      $('.canves').removeClass('noselect');
    }
  });

  $('.canves').on('mousedown touchstart', function(e) {
    if(drawable) {
      drawing = true;
      mS.x = e.pageX;
      mS.y = e.pageY;
      dBox = $("<div class='box' />");
      $(this).append(dBox);
      
      // Shows drawn element's size
      $('.elmsize').show().css({
        top: e.pageY + 'px',
        left: e.pageX + 'px'
      }, 800);
      e.preventDefault();
    }
    
    if(editable) {
      $('.canves *').attr('contenteditable', true);
    }
  });

  $('.canves').on('mousemove touchmove', function(e) {
    if(drawing && drawable){
      var mPos = {x:e.pageX - 2, y:e.pageY - 28};
      var css = {};
      css.position = 'absolute';
      css.top    = (mPos.y > mS.y) ? mS.y : mPos.y;
      css.left   = (mPos.x > mS.x) ? mS.x : mPos.x;
      css.width  = Math.abs(mPos.x - mS.x);
      css.height = Math.abs(mPos.y - mS.y);
      css.backgroundColor = 'rgba(0, 34, 102, 0.5)';
      css.border = '1px solid #fff';
      dBox.css(css);
      $('.elmsize').css({
        top: e.pageY + 'px',
        left: e.pageX + 'px'
      }, 800).html(Math.abs(mPos.x - mS.x) + "px, " + Math.abs(mPos.y - mS.y) + "px");
    }
  }).on('mouseup touchend', function(e) {
    drawing  = false;
    $('.elmsize').hide();
  });

  // Remove Tool
  $(".remove-tool").click(function() {
    $(".inspector").trigger('click');
    $(this).toggleClass('remove-active');
    if ($('.remove-active').is(':visible')) {
      movediv = false;
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
      
      if ($('.select-active, .draw-active, .edit-active, .table-active').is(':visible')) {
        $('.select-active, .draw-active, .edit-active, .table-active').trigger('click');
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
    $(this).toggleClass('edit-active');
    if ($('.edit-active').is(':visible')) {
      movediv = false;
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
      
      $('#idive select#elm-txt-align').on('click change', function(e) {
        document.execCommand($(this).val(),false,null);
      });
      
      $('#idive select#elm-heading').on('click change', function(e) {
        document.execCommand('formatBlock',false,$(this).val());
      });
      
      if(editable) {
        $('.canves *').addClass('editable').on('mousedown touchstart', function() {
          if(editable) {
            $('.editable').attr('contenteditable', true);
          }
        });
      }
      
      if ($('.select-active, .draw-active, .remove-active').is(':visible')) {
        $('.select-active, .draw-active, .remove-active').trigger('click');
      }
	
      e.preventDefault();
    } else {
      editable = false;
      $('.canves *').attr('contenteditable', false);
      $('#inactive-menubtns').show();
      return false;
    }
  });
  
  // When no tools are active show head and canvas properties
  $(".select-tool, .draw-tool, .edit-tool").on("mouseup touchend", function() {
    if ($(".select-properties, .draw-properties").is(':hidden')) {
      $(".starter-properties").show();
      $(".select-properties, .draw-properties").hide();
    }
  });

  $(".select-properties, .draw-properties").hide();
  
  // Tabs
  $(function() {
    // Inspector
    $('.inspector').click(function() {
      $(this).removeClass('tab-normal');
      $(this).addClass('tab-active');
      $('.groups').removeClass('tab-active');
      $('.groups').addClass('tab-normal');
      $(".inspection").show();
      $(".groups-sec").hide();
    });
    
    // Groups
    $('.groups').click(function() {
      $(this).removeClass('tab-normal');
      $(this).addClass('tab-active');
      $('.inspector').removeClass('tab-active');
      $('.inspector').addClass('tab-normal');
      $(".groups-sec, .groups-sec *").show();
      $(".inspection").hide();
    });
    
    // Toggles Property Containers
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
  });
    
  // Set & Adjust Canvas Size
  $(function() {
    $('.canves').css({
      'width' : $('.cwidth').val(),
      'height' : $('.cheight').val()
    });
    
    $('.cwidth, .cheight').on('keyup', function() {
      $('.canves').css({
        'width' : $('.cwidth').val(),
        'height' : $('.cheight').val()
      });
    });
  });
  
  // Handles Drop Section Styles
  $(function() {
    $('.drop-section a').click(function() {
      $(this).toggleClass('active-btn');
    });
    
    // Border Styles
    $(function() {
      $('.none').click(function() {
        $('.borders a').removeClass('border-active');
        $('.borders a').css({
          'border-color': '#a9a9a9',
          'background-color': '#444'
        });
        $('.none').css('border-color', '#444');
        $(this).addClass('border-active');
        $(this).css('border-color', '#1c1c1c');
      });
      
      $('.solid, .dotted, .dashed, .double, .ridge, .groove, .inset, .outset').click(function() {
        $('.grab-border a, .borders a').removeClass('border-active');
        $('.grab-border a, .borders a').css({
          'border-color': '#a9a9a9',
          'background-color': '#444'
        });
        $('.none').css('border-color', '#444');
        $(this).addClass('border-active');
      });
    });
  });
  
  // Autocomplete Search
  $(".search").on('keyup change', function() {
    var $val = $(this).val();
      
    if($.inArray($val.toLowerCase(), ["save"]) > -1) {
      saveTextAsFile();
    }
    
    if($.inArray($val.toLowerCase(), ["all"]) > -1) {
      $("." + $(".dialogs option:selected").val() + " .drop").css('color', '#999').next().show();
    }
    
    if($.inArray($val.toLowerCase(), ["none"]) > -1) {
      $("." + $(".dialogs option:selected").val() + " .drop").css('color', '#666').next().hide();
    }
    
    if($.inArray($val.toLowerCase(), ["uncheck all"]) > -1) {
      $("." + $(".dialogs option:selected").val() + " input[type=checkbox]").prop('checked', false);
    }
    
    if($.inArray($val.toLowerCase(), ["class name", "position", "size", "background", "border", "typography", "advanced"]) > -1) {
      $("." + $(".dialogs option:selected").val() + " .drop").css('color', '#666').next().hide();
      if ($.inArray($val.toLowerCase(), [$(".classname").prop('title'), $(".classname").prop('title').toLowerCase()]) > -1) {
        $(".classname").css( "color", "#999" );
        $(".classname").next().show();
      }
      
      if ($.inArray($val.toLowerCase(), [$(".pos").prop('title'), $(".pos").prop('title').toLowerCase()]) > -1) {
        $(".pos").css( "color", "#999" );
        $(".pos").next().show();
      }
      
      if ($.inArray($val.toLowerCase(), [$(".size-call").prop('title'), $(".size-call").prop('title').toLowerCase()]) > -1) {
        $(".size-call").css( "color", "#999" );
        $(".size-call").next().show();
      }

      if ($.inArray($val.toLowerCase(), [$(".bg-call").prop('title'), $(".bg-call").prop('title').toLowerCase()]) > -1) {
        $(".bg-call").css( "color", "#999" );
        $(".bg-call").next().show();
      }
      
      if ($.inArray($val.toLowerCase(), [$(".border-call").prop('title'), $(".border-call").prop('title').toLowerCase()]) > -1) {
        $(".border-call").css( "color", "#999" );
        $(".border-call").next().show();
      }
      
      if ($.inArray($val.toLowerCase(), [$(".txt-style-call").prop('title'), $(".txt-style-call").prop('title').toLowerCase()]) > -1) {
        $(".txt-style-call").css( "color", "#999" );
        $(".txt-style-call").next().show();
      }
      
      if ($.inArray($val.toLowerCase(), [$(".grab-advanced").prop('title'), $(".grab-advanced").prop('title').toLowerCase()]) > -1) {
        $(".grab-advanced").css( "color", "#999" );
        $(".grab-advanced").next().show();
      }
    }
  });
  
  // Detect Active Tool
  $(".dialogs").on('change', function() {
    var val = $(this).val();
    
    if( $("." + val) && $("." + val).length ){
      $('.show').hide();
      $("." + val).show();
    }
  });
  
  // Toggle Options Panel Dialog Visibility (Hide)
  $(".hide-options").click(function() {
    $(".show-options").slideDown();
    $(".toolbox").animate({
      right : "-300px"
    }, 200);
    $("#idive-container").animate({
      top : "36px",
      right : "0px"
    }, 200);
    $(".container").animate({
      top : "61px",
      right : "0px"
    }, 200);
  });
    
  // Toggle Options Panel Visibility (Show)
  $(".show-options").click(function () {
    $(this).slideUp();
    $(".toolbox").animate({
      right : "0px"
    }, 200);
    $("#idive-container").animate({
      top : "0px",
      right : "300px"
    }, 200);
    $(".container").animate({
      top : "25px",
      right : "300px"
    }, 200);
  });
  
});
