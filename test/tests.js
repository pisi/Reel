/**
 * .reel Unit Test
 */
( function run(){
  
  var
    test_subjects_snapshot,
    default_jquery = '1.10.2',
    jquery_versions = [
      '2.1.0-beta1',
      '2.0.3',
      '2.0.2',
      '2.0.1',
      '2.0.0',
      '1.11.0-beta1',
      '1.10.2',
      '1.10.1',
      '1.10.0',
      '1.9.1',
      '1.9.0',
      '1.8.3',
      '1.8.2',
      '1.8.1',
      '1.8.0',
      '1.7.2',
      '1.7.1',
      '1.7',
      '1.6.4',
      '1.6.3',
      '1.6.2',
      'all'
    ],
    version = location.params.jq,
    version = isNaN(+version) || version < jquery_versions.length ? version : 1,
    use_jquery = isNaN(+version) ? version : jquery_versions[version - 1]

  yepnope( {
    load: [
      'http://code.jquery.com/jquery-'+(use_jquery || default_jquery)+'.min.js',
      'lib/vendor/jquery.xdomainrequest.js',
      '../jquery.reel.js?'+(+new Date()),
      'lib/vendor/jquery.mousewheel-min.js',

      'lib/vendor/qunit.js',
      'lib/vendor/jquery.cookie-min.js',
      'lib/quny.js',

      'unit/sprite.js?'+(+new Date()),
      'unit/selector.js?'+(+new Date()),
      'unit/rendering.js?'+(+new Date()),
      'unit/options.js?'+(+new Date()),
      'unit/issues.js?'+(+new Date()),
      'unit/interaction.js?'+(+new Date()),
      'unit/events.js?'+(+new Date()),
      'unit/data.js?'+(+new Date()),
      'unit/computation.js?'+(+new Date()),
      'unit/api.js?'+(+new Date()),
      'unit/annotations.js?'+(+new Date()),
      'unit/animation.js?'+(+new Date())
    ],
    complete: function(){

      var
        dawn= +new Date(),
        bads= 0,
        counts= 0

      test_subjects_snapshot= $('#Body').html();

      QUnit.load();
      QUnit.stop();

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
          server= 'http://reel360.org',
          timestamp= +new Date(),
          report= {
            timestamp:  timestamp,
            duration:   qunit_completed_in,
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

        $.ajax({
          url: server+'/collect/reel/testrun/results',
          method: 'POST',
          dataType: 'json',
          cache: false,
          data: report
        });

        if (!isNaN(+version) && !failures){
          if (++version < jquery_versions.length){
            var url= location.href.replace( /jq=[0-9.a-z\-]+/, 'jq=' + version );
            var interval= 5000;
          }
        }else if (location.params.respawn){
          var url= location.href;
          var interval= 60000;
        }

        url && setTimeout(function(){
          location.href= url;
        }, interval);

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

      $.each(jquery_versions, function(ix, version){
        $('<option>', { value: version, text: version }).appendTo('#against-jquery-versions');
      });

      $('#against-jquery-versions')
      .val( use_jquery )
      .change( function(){
        var url= '';
        var version= $(this).val() == 'all' ? 1 : $(this).val();
        if( location.params.jq === undefined ){
          if( location.search === '' ){
            url= location.href.replace( /\?$/, '' ) + '?jq=' + version
          }else{
            url= location.href + '&jq=' + version
          }
        }else{
          url= location.href.replace( /jq=[0-9.a-z\-]+/, 'jq=' + version );
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
    setup: function(){
      $.reel.intense= true;
    },
    teardown: function(){
      $('#Body *').add(document).unbind('.test');
      $.reel.instances.unreel();
      $('#my_data_configured_image').remove();
      $('#Body .no_id').removeAttr('id');

      // Verify the integrity of test samples
      QUnit.stop();
      if ($('#Body').html() === test_subjects_snapshot){
        QUnit.start();
      }else{
        console.error('Test subjects intergrity has been compromised:');
        console.info( $('#Body').html() );
        console.warn('... should have read:');
        console.info( test_subjects_snapshot );
        console.error('Can not continue...');
      }
    }
  }

} )();
