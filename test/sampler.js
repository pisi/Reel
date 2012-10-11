
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
    default_jquery = '1.8.2'

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
          id= $(this).parent().attr('id'),
          hijacked= false,
          scripts_loaded= 0,
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
              delete jQuery;
              inject_script('http://code.jquery.com/jquery-'+(parent.location.params.jq || default_jquery)+'.min.js');
              inject_script("../../jquery.reel-min.js");

              function inject_script(url){
                var script= document.createElement('script');
                script.type= "text/javascript";
                script.src= url;
                script.onload= wait_for_source;
                document.getElementsByTagName('head')[0].appendChild(script);
              }
              function wait_for_source(){
                // We wait for both sources to fully arrive via XHR
                if(++scripts_loaded != 2) return;
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
      });

      /*
      Cookie persistence of last selected sample.
      */
      var $recovered= $('#'+$.cookie('reel.test.sample')+' a');
      ( !!$recovered.length && $recovered || $('.groups li:first .samples li:first a') ).click();

    }
  } );

})();
