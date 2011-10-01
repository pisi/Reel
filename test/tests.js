/**
 * .reel Unit Test
 */
(function($){


  QUnit.done = function(failures, total, config) {
    if (failures){
      $('body').addClass('failure');
    }

    $.post('http://jquery.vostrel.cz/collect/reel/testrun/results', {
      timestamp:  +new Date(),
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

    function dump($collection){
      var collection = [];
      $collection.each(function(){
        collection.push($(this).html())
      })
      return collection;
    }
  }

})(jQuery);
