Tests in Browsers
=================

Results of `test/index.html` runs in various browsers and environments. Grouped by browser. Including shortened browser signatures.


Summary - 10 out of 12
----------------------

Both manual and automated tests indicate, that Reel is easily compatible with everything - nearly.
From an array of 12 browsers Reel fails in just two cases, in mobile Opera Mini (see [FAQ][FAQ] for explanation) and on Windows Phones.
I could as well leave out these browsers completely to have it look like Reel is 100% compatible, but let's leave it here to be fair.


Statistics
----------

Between releases (1.1.4 and 1.2), the unit test coverage has been **increased by 470%** with 99% of code being covered. We now have **1192 tests in 317 tasks and 10 modules**.


Desktop-class
-------------

### Chrome

* `Mozilla/5.0 (Windows; U; Windows NT 5.1) AppleWebKit/533.4 Chrome/5.0.375.125 Safari/533.4`
  * **OK** -- Unit
  * **OK** -- Interaction
* `Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5) AppleWebKit/534.16 Chrome/10.0.648.205 Safari/534.16`
  * **OK** -- Unit
  * **OK** -- Interaction


### Firefox

* `Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:8.0.1) Gecko/20100101 Firefox/8.0.1`
  * **OK** -- Unit
  * **OK** -- Interaction
* `Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; rv:1.9.2.16) Gecko/20110319 Firefox/3.6.16`
  * **OK** -- Unit
  * **OK** -- Interaction


### Internet Explorer

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


### Safari / WebKit

* `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.6+ (KHTML, like Gecko) Version/5.1 Safari/534.50`
  * **OK** -- Unit
  * **OK** -- Interaction
* `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50`
  * **OK** -- Unit
  * **OK** -- Interaction


### Opera

* `Opera/9.80 (Macintosh; Intel Mac OS X; U; en) Presto/2.2.15 Version/10.10`
  * **OK** -- Unit
  * **OK** -- Interaction


### Camino
* `Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; rv:1.9.0.19) Gecko/2010111021 Camino/2.0.6`
  * **OK** -- Unit
  * **OK** -- Interaction


Mobile-class
------------

### iOS Safari

* `Mozilla/5.0 (iPad; U; CPU OS 4_2_1 like Mac OS X) AppleWebKit/533.17.9 Version/5.0.2 Mobile/8C148 Safari/6533.18.5`
  * **OK** -- Unit
  * **OK** -- Interaction
* `Mozilla/5.0 (iPhone Simulator; U; CPU iPhone OS 3_0) AppleWebKit/528.18 Version/4.0 Mobile/7A341 Safari/528.16`
  * **OK** -- Unit
  * **OK** -- Interaction


### Android WebKit

* `Mozilla/5.0 (Linux; U; Android 2.3.5; ZTE-SKATE) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1`
  * **OK** -- Unit
  * **OK** -- Interaction


### Opera Mobile

* `Opera/9.80 (Macintosh; Intel Mac OS X; Opera Mobi/27; U) Presto/2.4.18 Version/10.00`
  * **OK** -- Unit
  * **FAIL** -- Interaction


### Opera Mini

* `Opera/9.80 (J2ME/MIDP; Opera Mini/5.0.18697/19.892; U) Presto/2.5.25`
  * **FAIL** -- Unit
  * **FAIL** -- Interaction
  * See [FAQ][FAQ] for information why this particular "browser" fails


### Fennec

* `Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.5; rv:1.9.1b2pre) Gecko/20081015 Fennec/1.0a1`
  * **OK** -- Unit
  * **FAIL** -- Interaction


### Windows Mobile

* `Mozilla/5.0 (???)`
  * **?** -- Unit
  * **FAIL** -- Interaction


Missing some?
-------------
Do you have a test suite run result not listed here? Send it to [me][pisi] (_Petr Vostřel_) along with the signature found at the top of the QUnit test page. I will happily add it here.
Or you can always fork the project and commit the updated file.



[FAQ]:http://wiki.github.com/pisi/Reel/faq
[pisi]:mailto:petr@vostrel.cz
