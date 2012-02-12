jQuery Reel Test Suite
======================
Reel is very well tested. To date we have **841 tests in 221 tasks and 10 modules**, that's 519% increase compared with previous version). The suite will keep on growing as enhancements are made or new bugs discovered. The test suite grows independent on regular version releases.

Usage?
------------
Just run `index.html` in your own browser.

Positive Results
----------------
See [detailed report][tests]. Tests were success in every case tried. With the exception of Opera Mini.

Test Results
------------

In 1.1 I asked you to submit failing tests reports to me. You did and it
helped. I thank you very much for doing so!

In 1.2 the report gathering and submission is automated, so
you don't need to do a thing to help. You take part in the distributed
testing efforts merely by running the tests. __Run the tests on as
many different devices as you can (even exotic ones) to help me more.__

After each test run finishes, its anonymous results are then automatically submitted on-line
for collection and analysis. The report contains this:

``` json
    {
      timestamp:  "1325202485687",
      filter:     [
        // Listed filtered modules (if any)
      ],
      count: {
        total:    655,
        pass:     655,
        fail:     0
      },
      fails:      [
        // List of all failing tests
      ],
      version: {
        jquery:   "1.7.1",
        reel:     "1.2"
      },
      host:       "jquery.vostrel.cz", // This would be your domain name
      results:    "Tests completed in 44106 milliseconds. 655 tests of 655 passed, 0 failed.",
      agent:      "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.63 Safari/535.7"
    }
```

[tests]: http://github.com/pisi/Reel/blob/development/TESTS.markdown
