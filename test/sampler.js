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

  $('.samples li').click(function(){
    var
      options= cut_out_object( $('.js', this).text() ),
      css= cut_out_css_object( $('.css', this).text() )

    options.attr= {
      src     : $('.thumb', this).attr('src'),
      width   : parseInt(css.width),
      height  : parseInt(css.height)
    }

    $('#the_one').addClass('on')
    $('#meta').html( $('.meta', this).text() )
    $('#js').text( $('.js', this).text() )
    $('#image')
      .reel( options )
  });

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

  /*
  This method is NOT needed to initiate the Reel. It is here for switching Reels on and off.
  It essentially is a shortcut for `$(target).reel(options)`
  You don't need to use it
  */
  prepare_reel_sample= function(target){
    var
      $sample= $(target).parent('.sample'),
      opts= $('pre', $sample).text(),
      options= eval('('+opts+')')

    $sample.click(function(e){
      if (!$(this).is('.on')){
        click_it(e);
        return false;
      }
    });
    $('h3', $sample).click(click_it);

    options.speed && $('<div/>', { 'class': 'control_events' })
    .append($('<button/>', { text: '▶ play' }).click(function(){ $(target).trigger('play') }))
    .append($('<button/>', { text: '❙❙ pause' }).click(function(){ $(target).trigger('pause') }))
    .append($('<button/>', { text: '◼ stop' }).click(function(){ $(target).trigger('stop') }))
    .insertAfter(target);

    $('<div/>', { 'class': 'hint', text: 'Click to activate this sample'}).appendTo($sample);

    function click_it(e){
      var
        onoff= !$sample.hasClass('on'),
        $others= $('.sample').not($sample)
      if (!e.altKey){
        $others.removeClass('on');
        $('.jquery-reel', $others).trigger('teardown');
      }

      $sample[onoff ? 'addClass' : 'removeClass']('on');
      onoff && $(target).reel(options) || $(target).trigger('teardown');
      onoff && console && console.log && console.log($(target), $(target).data());
      $.cookie('reel.test.sample', onoff ? $(target).selector : null);
      // $.cookie(onoff ? '')
      return false;
    }
  }

});