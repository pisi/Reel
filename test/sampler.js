$(function ready(){

  /*
  Code used in the #drone example; based on one by Mark Leidman
  */
  function drone_frames(frames){
    var frames= 179, every= 5, stack= []
    for(var i= 1; i <= frames; i+= every){
      var name= [i, '.png'].join('')
      while (name.length < 9) name= '0'+name
      stack.push(name)
    }
    return stack
  }

  function mini_frames(frames){
    var frames= 120, every= 1, stack= []
    for(var i= 1; i <= frames; i+= every){
      var name= [i, '.jpg'].join('')
      while (name.length < 7) name= '0'+name
      stack.push(name)
    }
    return stack
  }

  function phone_frames(frames){
    var every= 1, stack= []
    for(var i= 1; i <= frames; i+= every){
      var name= [i, '.png'].join('')
      while (name.length < 6) name= '0'+name
      stack.push(name)
    }
    return stack
  }













  /*
  Following code is NOT needed to initiate the Reel. It is here for switching Reel samples
  on and off. It essentially is a shortcut for `$(target).reel(options)`
  You don't need (and want) to use it.
  */
  $('#control_events button').click(function(){
    $('#image').trigger( $(this).text() );
  });

  $('.samples li').click(function(){
    var
      options= cut_out_object( $('.js', this).text() ),
      css= cut_out_css_object( $('.css', this).text() )

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
        console.log(images)
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

  image= function(uri, label){
    var
      $image= $('<div/>', { 'class': 'img' } ),
      $label= $('<span>', { text: label }).appendTo($image),
      $link= $('<a/>', { href: uri, text: ''+uri }).appendTo($image),
      $img= $('<img/>', { src: uri }).appendTo($link)
    return $image
  }

  cut_out_object= function(string){
    string= string.substr( string.indexOf('{') );
    string= string.substr( 0, string.indexOf('}')+1 );
    return eval('('+string+')')
  }
  cut_out_css_object= function(string){
    string= string.substr( string.indexOf('{') );
    string= string.substr( 0, string.indexOf('}')+1 );
    string= string.replace(/\: /g, ': "');
    string= string.replace(/\; \}/g, '" }');
    string= string.replace(/\; /g, '", ');
    return eval('('+string+')')
  }

});
