/**
 * .reel Unit Test
 */
( function run(){
  
  var
    default_jquery = '1.9.1'

  yepnope( {
    load: [
      'http://code.jquery.com/jquery-'+(location.params.jq || default_jquery)+'.min.js',
      '../jquery.reel.js',
      'lib/vendor/jquery.mousewheel-min.js',

      'lib/vendor/qunit.js',
      'lib/vendor/jquery.cookie-min.js',
      'lib/quny.js',

      'unit/annotations.js',
      'unit/issues.js',
      'unit/data.js',
      'unit/selector.js',
      'unit/rendering.js',
      'unit/api.js',
      'unit/computation.js',
      'unit/sprite.js',
      'unit/events.js',
      'unit/options.js',
      'unit/animation.js'
    ],
    complete: function(){

      location.params.respawn && setTimeout(function(){
        location.href= location.href;
      }, location.params.respawn * 1000);
      QUnit.load();
      QUnit.stop();

      var
        bads= 0,
        counts= 0

      QUnit.testDone = function(testName, bad, count) {
        bad && (bads+= bad);
        counts+= count;
        $('#qunit-banner .pass').text(counts - bads);
        $('#qunit-banner .fail').text(bads || '');
      }

      QUnit.done = function(failures, total, config) {
        $('body').addClass('done');
        if (failures){
          location.params.respawn && $('#qunit-filter-pass').click();
          $('body').addClass('failure');
          $('#call h2 .number').text(failures);
          failures <= 1 && $('#failure h2 .plural').hide();
        }else{
          $('body').addClass('success');
        }
        $('#qunit-testrunner-toolbar').show();

        /*
         * Results of the just finished testrun are automatically submitted
         * and collected on the Reel webserver as a kind of distributed
         * testing effort. Thanks for being a part of it!
         *
         * Data collected:
         * - timestamp
         * - counts (total number of tests, fails and passes)
         * - failures themselves
         * - versions (version of jQuery and Reel)
         * - the results summary line with duration
         * - user agent string (your browser name and its version(s))
         * - test host domain
         */
        var
          //server= 'http://au:4567',
          server= 'http://jquery.vostrel.cz',
          timestamp= +new Date(),
          report= {
            timestamp:  timestamp,
            host:       location.host,
            filter:     config.filters,
            count: {
              total:    total,
              pass:     total - failures,
              fail:     failures
            },
            fails:      dump($('#qunit-tests li.fail')),
            version: {
              jquery:   $().jquery,
              reel:     $.reel.version
            },
            results:    $('#qunit-testresult').html(),
            agent:      $('#qunit-userAgent').html()
          }

        $('<a/>', { name: 'receipt' }).appendTo('#qunit-testresult');
        formatted(report, 'Summary').appendTo( $('<ul/>').appendTo('#receipt') );
        try{ $.post(server+'/collect/reel/testrun/results', report) }
        catch(e){}

        function formatted( bit, label ){
          var $result= $('<li/>')
          if( typeof bit == 'object' ){
            if( typeof bit.length != 'number' || bit.length > 0 ){ // Object/Array
              $result.text( label+':' );
              var $list= $('<ul/>').appendTo( $result )
              $.each( bit, function( label, value ){
                $list.append( formatted(value, label) );
              } );
            }
          }else{ // Value
            $result.html( label+': '+bit );
          }
          return $result
        }

        function dump($collection){
          var collection = [];
          $collection.each(function(){
            collection.push($(this).html())
          })
          return collection;
        }
      }

      $('#against-jquery-versions')
      .val( location.params.jq || default_jquery )
      .change( function(){
        var url= ''
        if( location.params.jq === undefined ){
          if( location.search === '' ){
            url= location.href.replace( /\?$/, '' ) + '?jq='+$(this).val()
          }else{
            url= location.href + '&jq=' + $(this).val()
          }
        }else{
          url= location.href.replace( 'jq=' + location.params.jq, 'jq=' + $(this).val() );
        }
        location.href= url;
      } )

      var oldstart= window.start;
      window.start= function(){
        $(document).unbind('.test');
        oldstart();
      }

    }
  } );

  reel_test_module_routine= {
    teardown: function(){
      $('#Body *').add(document).unbind('.test');
      $('.reel').unreel();
    }
  }

} )();
