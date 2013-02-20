
  /*
  ** YOU DON'T WANT TO USE THE CODE BELOW FOR YOUR PROJECT.
  ** TRUST ME.
  **
  ** Any hidden code (other than the one made visible
  ** on the sample pages) isn't needed for Reel.
  ** Everything is explained within the individual samples.
  */

(function run(){

  var
    default_jquery = '1.9.1'

  yepnope( {
    load: [
      'http://code.jquery.com/jquery-'+(location.params.jq || default_jquery)+'.min.js',
      'lib/vendor/jquery.cookie-min.js'
    ],
    complete: function(){

      $('#control_events button').click(function(){
        var
          command= $(this).text()

        with(frames.test_stage){
          $('#image').trigger( command );
        }
      });

      $('.samples li a').click(function(e){
        if (e.button || e.metaKey || e.shiftKey || e.ctrlKey) return;
        var
          url= $(this).attr('href'),
          id= $(this).parent().attr('id')

        $('#test_stage').attr({
          src: url
        }).one('load', function(){
          $.ajax(url, {
            success: function(a,b,xhr){
              var
                iframe_pool= $('#test_stage').contents()

              // Once the test stage is loaded,
              // we want to hijack the Reel from example
              // and take over with the local version for testing
              iframe_pool.ready(function(){
                with(frames.test_stage){
                  var
                    source= xhr.responseText,
                    script= /<script>((.|\n)+)<\/script>/.exec(source)[1]

//                  $.getScript('http://code.jquery.com/jquery-'+(parent.location.params.jq || default_jquery)+'.min.js', function(){
                    $.reel= undefined;
                    $.getScript('../../jquery.reel.js', function(){
                      setTimeout(function(){
                        eval(script);
                      }, 0);
                    });
//                  });
                }

              });
            }
          });
        });

        $.cookie('reel.test.sample', id);
        return false;
      });

      /*
      Cookie persistence of last selected sample.
      */
      var $recovered= $('#'+$.cookie('reel.test.sample')+' a');
      ( !!$recovered.length && $recovered || $('.groups li:first .samples li:first a') ).click();

    }
  } );

})();
