/**
 * .reel Unit Test
 */
( function run(){

  yepnope( {
    load: [
      'http://code.jquery.com/jquery-'+(location.params.jq || '1.6.1')+'.min.js',
      '../jquery.reel-min.js',
      '../example/inc/jquery.disabletextselect-min.js',
      '../example/inc/jquery.mousewheel-min.js',

      'qunit/qunit.js',
      'qunit/quny.js',

      'unit/selector.js',
      'unit/parameters.js',
      'unit/events.js',
      'unit/computation.js',
      'unit/animation.js',
      'unit/rendering.js',
      'unit/data.js',
      'unit/api.js',
      'unit/interaction.js',
      'unit/sprite.js',
      'unit/issues.js'
    ],
    complete: function(){

      QUnit.load();

      QUnit.done = function(failures, total, config) {
        if (failures){
          $('body').addClass('failure');
        }

        /*
         * Results of the just finished testrun are automatically submitted
         * and collected on the Reel webserver as a kind of distributed
         * testing effort. Thanks for being a part of it!
         *
         * Data collected:
         * - timestamp
         * - counts (total number of tests, fails, passes)
         * - failures themselves
         * - versions (version of jQuery and Reel)
         * - the results summary line with duration
         * - user agent string (your browser name and its version(s))
         */
        var
          //server= 'http://au:4567',
          server= 'http://jquery.vostrel.cz',
          timestamp= +new Date()

        $.post(server+'/collect/reel/testrun/results', {
          timestamp:  timestamp,
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
        });
        $('#result_link').attr('href', server+'/view/reel/testrun/result/'+timestamp);

        function dump($collection){
          var collection = [];
          $collection.each(function(){
            collection.push($(this).html())
          })
          return collection;
        }
      }

      $('#against-jquery-versions')
      .val( location.params.jq || '1.6.1' )
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

    }
  } );

} )();
