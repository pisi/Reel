/**
 * .reel Unit Test
 */
(function($){


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

})(jQuery);
