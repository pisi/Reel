jQuery Reel Test Suite
======================

Reel is very well tested. To date we have **2040 tests in 425 tasks and 12 modules**.
The unit test coverage has been **increased by 171%** (in comparison with release 1.2)
with 99% of code being covered now. The suite will keep on growing as enhancements are made
or new bugs discovered. The test suite grows independent on regular version releases.

Usage?
------

Launch `index.html` in your browser or visit [http://test.vostrel.net/jquery.reel/test][test]


Positive Results
----------------

Both manual and automated tests indicate, that Reel is extremely compatible with nearly everything.
From an array of 15 browsers on 9 platforms Reel fails badly in just two cases, in mobile Opera Mini
(see [FAQ][FAQ] for explanation) and on Windows Phones. I could as well leave out these browsers 
completely to make it seem Reel is 100% compatible, but let's leave them there to be fair.


### Desktop

#### Chrome

* `Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.66 Safari/537.36`
  * **OK** -- Unit
  * **OK** -- Interaction
* `Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5) AppleWebKit/534.16 Chrome/10.0.648.205 Safari/534.16`
  * **OK** -- Unit
  * **OK** -- Interaction
* `Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.106 Safari/535.2`
  * **OK** -- Unit
  * **OK** -- Interaction


#### Firefox

* `Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:8.0.1) Gecko/20100101 Firefox/8.0.1`
  * **OK** -- Unit
  * **OK** -- Interaction
* `Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; rv:1.9.2.16) Gecko/20110319 Firefox/3.6.16`
  * **OK** -- Unit
  * **OK** -- Interaction


#### Internet Explorer

* `Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0; SLCC2; Media Center PC 6.0)`
  * **OK** -- Unit
  * **OK** -- Interaction
* `Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; SLCC2; Media Center PC 6.0)`
  * **OK** -- Unit
  * **OK** -- Interaction
* `Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; Media Center PC 6.0)`
  * **OK** -- Unit
  * **OK** -- Interaction
* `Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)`
  * **OK** -- Unit
  * **OK** -- Interaction
* `Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)`
  * **OK** -- Unit
  * **OK** -- Interaction


#### Safari / WebKit

* `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.59.8 (KHTML, like Gecko) Version/5.1.9 Safari/534.59.8`
  * **OK** -- Unit
  * **OK** -- Interaction


#### Opera

* `Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8) Presto/2.12.388 Version/12.16`
* `Opera/9.80 (Macintosh; Intel Mac OS X; U; en) Presto/2.2.15 Version/10.10`
  * **OK** -- Unit
  * **OK** -- Interaction


#### Camino (RIP)

* `Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; en; rv:1.9.2.28) Gecko/20120308 Camino/2.1.2 (MultiLang) (like Firefox/3.6.28)`
  * **OK** -- Unit
  * **OK** -- Interaction


### Mobile

#### iOS Safari

* `Mozilla/5.0 (iPad; CPU OS 6_1_2 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10B146 Safari/8536.25`
  * **OK** -- Unit
  * **OK** -- Interaction
* `Mozilla/5.0 (iPad; CPU OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B206 Safari/7534.48.3`
  * **OK** -- Unit
  * **OK** -- Interaction


#### iOS Chrome

* `Mozilla/5.0 (iPad; CPU OS 6_1_2 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) CriOS/28.0.1500.16 Mobile/10B146 Safari/8536.25`
  * **OK** -- Unit
  * **OK** -- Interaction


#### Android WebKit

* `Mozilla/5.0 (Linux; U; Android 2.3.5; ZTE-SKATE) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1`
  * **OK** -- Unit
  * **OK** -- Interaction

* `Mozilla/5.0 (Linux; U; Android 4.2.2; cs-cz; RKM MK802IV Build/JDQ39) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30`
  * **OK** -- Unit
  * **OK** -- Interaction (no mouse wheel)


#### Blackberry Playbook

* `Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.0.0; en-US) AppleWebKit/535.8+ (KHTML, like Gecko) Version/7.2.0.0 Safari/535.8+`
  * **OK** -- Unit
  * **OK** -- Interaction (reported but not witnessed)


#### Opera Mobile

* `Opera/9.80 (Macintosh; Intel Mac OS X; Opera Mobi/27; U) Presto/2.4.18 Version/10.00`
  * **OK** -- Unit
  * **FAIL** -- Interaction


#### Opera Mini

* `Opera/9.80 (J2ME/MIDP; Opera Mini/5.0.18697/19.892; U) Presto/2.5.25`
  * **FAIL** -- Unit
  * **FAIL** -- Interaction
  * See [FAQ][FAQ] for information why this particular "browser" fails


#### Fennec

* `Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; rv:1.9.1b2pre) Gecko/20081015 Fennec/1.0a1`
  * **OK** -- Unit
  * **FAIL** -- Interaction


#### Windows Mobile

* `Mozilla/5.0 (???)`
  * **?** -- Unit
  * **FAIL** -- Interaction


### Console

#### Playstation 3

* `Mozilla/5.0 (PLAYSTATION 3 4.30) AppleWebKit/531.22.8 (KHTML, like Gecko)`
  * **OK** -- Unit
  * **?** -- Interaction (if someone can confirm please)


### Missing some?

Do you have a test suite run result not listed here?
Send it to [me][pisi] (_Petr Vostřel_) along with the signature found at the top
of the QUnit test page. I will happily add it here.
Or you can always fork the project and commit the updated file.


Results Reporting
-----------------

In 1.1 I asked you to submit failing tests reports to me. You did and it
helped me tremendously. I thank you very much for doing so!

Since 1.2 the report gathering and submission is fully automated, so
you don't need to do a thing to help. You take part in the distributed
testing efforts merely by running the tests. __Run the tests on as
many different devices as you can (even exotic ones) to help me even more.__

After each test run finishes, its anonymous results are then automatically submitted on-line
for collection and analysis. The report contains this:

``` js
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
      host:       "reel360.org", // This would be your domain name
      results:    "Tests completed in 44106 milliseconds. 655 tests of 655 passed, 0 failed.",
      agent:      "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.63 Safari/535.7"
    }
```





[test]:http://test.vostrel.net/jquery.reel/test
[FAQ]:https://github.com/pisi/Reel/wiki/FAQ
[pisi]:mailto:petr@vostrel.cz
