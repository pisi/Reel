
  /*
  ** YOU DON'T WANT TO USE THE CODE BELOW FOR YOUR PROJECT.
  ** TRUST ME.
  **
  ** Any hidden code (other than the one made visible
  ** on the sample pages) isn't needed for Reel.
  ** Everything is explained within the individual samples.
  */

(function run(){

  yepnope( {
    load: [
      'http://code.jquery.com/jquery-'+(location.params.jq || '1.6.4')+'.min.js',
      '../jquery.reel-min.js',
      '../example/inc/jquery.disabletextselect-min.js',
      '../example/inc/jquery.mousewheel-min.js',
      '../example/inc/jquery.cookie-min.js'
    ],
    complete: function(){

      /*
      Preset common indicator size
      */
      $.reel.def.indicator= 5;

      $('#control_events button').click(function(){
        $('#image').trigger( $(this).text() );
      });

      $('.samples li').click(function(){
        var
          options= cut_out_object( $('.js', this).text() ),
          css= cut_out_css_object( $('.css', this).text() )

        $('#js_options ul').empty();
        $.each( options, function( ix, option ){
          $('#js_options ul').append(
            $('<li>').append(
              $('<a>', {
                href: 'http://jquery.vostrel.cz/reel#'+ix,
                text: ''+ix
              })
            )
          )
        } );

        options.attr= {
          src     : $('.html', this).text().match(/src='(.+)'/)[1],
          width   : parseInt(css.width),
          height  : parseInt(css.height)
        }

        $('#control_events').toggle( !!options.speed );

        $('#the_one').addClass('on');
        $('#meta').html( $('.meta', this).text() );
        $('#html').text( $('.html', this).text().trim() );
        $('#css').text( $('.css', this).text().trim() );
        $('#js').text( $('.js', this).text().trim() );
        $('#image')
          .reel( options )
          .bind('loaded', function(){
            var
              images= $(this).data('images')

            $('#images').prev('h4').find('.count').text( 1 +images.length );
            $('#images').empty().append( image($(this).data('backup').src, 'The `<img src>` Original ') );
            if (images.length == 1){
              $('#images').append( image(images[0], 'And The Sprite ') );
            }else{
              $.each( images, function(ix){
                $('#images').append( image(this, 'Sequence frame '+(ix+1)+' ') );
              })
            }
          });

        $.cookie('reel.test.sample', $(this).attr('id'));
      });

      /*
      Cookie persistence of last selected sample.
      */
      var $recovered= $('#'+$.cookie('reel.test.sample'));
      ( !!$recovered.length && $recovered || $('.groups li:first .samples li:first') ).click();

    }
  } );

  function image(uri, label){
    var
      $image= $('<div/>', { 'class': 'img' } ),
      $label= $('<span>', { text: label }).appendTo($image),
      $link= $('<a/>', { href: uri, text: ''+uri }).appendTo($image),
      $img= $('<img/>', { src: uri }).appendTo($link)
    return $image
  }

  function cut_out_object(string){
    string= string.substr( string.indexOf('{') );
    string= string.substr( 0, string.lastIndexOf('}')+1 );
    return eval('('+string+')')
  }
  function cut_out_css_object(string){
    string= string.substr( string.indexOf('{') );
    string= string.substr( 0, string.lastIndexOf('}')+1 );
    string= string.replace(/\: /g, ': "');
    string= string.replace(/\; \}/g, '" }');
    string= string.replace(/\; /g, '", ');
    return eval('('+string+')')
  }

})();
