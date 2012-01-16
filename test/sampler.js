
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
      'http://code.jquery.com/jquery-'+(location.params.jq || '1.7.1')+'.min.js',
      'lib/vendor/jquery.cookie-min.js'
    ],
    complete: function(){

      $('#control_events button').click(function(){
        $('#image', $('#test_stage').contents()).trigger( $(this).text() );
      });

      $('.samples li a').click(function(e){
        if (!e.button && !e.metaKey && !e.shiftKey && !e.ctrlKey){
        var
          url= $(this).attr('href'),
          id= $(this).parent().attr('id'),
          hijacked= false,
          call

        $('#test_stage').attr({
          src: url
        }).one('load', function(){
          // Once the test stage is loaded,
          // we want to hijack the Reel from example
          // and take over with the local version for testing
          with(frames.test_stage){
            $(function(){
              $('#image').trigger('teardown');
              delete jQuery.reel;
              var script= document.createElement('script');
              script.type= "text/javascript";
              script.src= "../../jquery.reel.js";
              script.onload= wait_for_source;
              document.getElementsByTagName('head')[0].appendChild(script);
              // We wait for source via XHR to execute it again
              function wait_for_source(){
                var
                  wait= setInterval(function(){
                    if (call){
                      clearInterval(wait);
                      eval(call);
                    }
                }, 300);
              }
            })
          }
          $.ajax(url, {
            success: function(a,b,xhr){
              var
                iframe_pool= $('#test_stage').contents()

              iframe_pool.ready(function(){
                var
                  iframe_pool= $('#test_stage').contents(),
                  source= xhr.responseText

                call= /<script>\n((.|\n)+)<\/script>/.exec(source)[1]
              })
            }
          });
        });

        $.cookie('reel.test.sample', id);
        return false;
        }
      });

      /*
      Cookie persistence of last selected sample.
      */
      var $recovered= $('#'+$.cookie('reel.test.sample')+' a');
      ( !!$recovered.length && $recovered || $('.groups li:first .samples li:first a') ).click();

    }
  } );

})();
